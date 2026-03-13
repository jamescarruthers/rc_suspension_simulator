import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FixedTimestepAccumulator } from '../../engine/integration';
import { ChannelDefinition, ChannelSelector } from './ChannelSelector';

type Sample = { t: number; values: Record<string, number> };

type GraphPanelProps = {
  channels: ChannelDefinition[];
  sampleAtTime: (t: number) => Record<string, number>;
  timeWindowSec?: number;
  yMin?: number;
  yMax?: number;
  width?: number;
  height?: number;
};

const CHART_FPS = 30;
const SIM_DT = 0.001;

export function GraphPanel({
  channels,
  sampleAtTime,
  timeWindowSec = 8,
  yMin = -1,
  yMax = 1,
  width = 760,
  height = 240,
}: GraphPanelProps): JSX.Element {
  const [isRunning, setIsRunning] = useState(true);
  const [selected, setSelected] = useState<string[]>(channels.slice(0, 4).map((c) => c.key));
  const [view, setView] = useState<Sample[]>([]);

  const accumulatorRef = useRef(new FixedTimestepAccumulator(SIM_DT, 120));
  const samplesRef = useRef<Sample[]>([]);
  const rafRef = useRef<number>();
  const lastFrameRef = useRef<number>();
  const lastUiFlushRef = useRef(0);

  const flushView = (now: number): void => {
    if (now - lastUiFlushRef.current < 1000 / CHART_FPS) {
      return;
    }
    lastUiFlushRef.current = now;

    const latestTime = accumulatorRef.current.time;
    const minTime = Math.max(0, latestTime - timeWindowSec);
    const filtered = samplesRef.current.filter((s) => s.t >= minTime);
    samplesRef.current = filtered;
    setView(filtered);
  };

  useEffect(() => {
    if (!isRunning) return;

    const tick = (now: number): void => {
      if (lastFrameRef.current === undefined) {
        lastFrameRef.current = now;
      }
      const frameDt = (now - lastFrameRef.current) / 1000;
      lastFrameRef.current = now;

      accumulatorRef.current.step(frameDt, (_dt, simulationTime) => {
        samplesRef.current.push({ t: simulationTime, values: sampleAtTime(simulationTime) });
      });

      flushView(now);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isRunning, sampleAtTime, timeWindowSec]);

  const reset = (): void => {
    accumulatorRef.current.reset();
    samplesRef.current = [];
    setView([]);
    lastFrameRef.current = undefined;
    lastUiFlushRef.current = 0;
  };

  const polylines = useMemo(() => {
    if (view.length < 2) {
      return [] as JSX.Element[];
    }

    const tMin = view[0].t;
    const tMax = Math.max(view[view.length - 1].t, tMin + 1e-6);
    const ySpan = Math.max(yMax - yMin, 1e-6);

    return channels
      .filter((channel) => selected.includes(channel.key))
      .map((channel) => {
        const points = view
          .map((sample) => {
            const x = ((sample.t - tMin) / (tMax - tMin)) * width;
            const val = sample.values[channel.key] ?? 0;
            const y = height - ((val - yMin) / ySpan) * height;
            return `${x.toFixed(2)},${y.toFixed(2)}`;
          })
          .join(' ');

        return <polyline key={channel.key} points={points} fill="none" stroke={channel.color} strokeWidth={2} />;
      });
  }, [channels, selected, view, width, height, yMin, yMax]);

  return (
    <section style={{ display: 'grid', gap: 12, width }}>
      <header style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => setIsRunning((prev) => !prev)}>{isRunning ? 'Pause' : 'Play'}</button>
        <button onClick={reset}>Reset</button>
        <span style={{ opacity: 0.75 }}>
          sim time: {accumulatorRef.current.time.toFixed(3)}s · sim dt: 1ms · chart FPS: {CHART_FPS}
        </span>
      </header>

      <ChannelSelector channels={channels} selectedKeys={selected} onChange={setSelected} />

      <svg width={width} height={height} style={{ border: '1px solid #334155', background: '#0b1120' }}>
        <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="#334155" strokeDasharray="4 4" />
        {polylines}
      </svg>
    </section>
  );
}

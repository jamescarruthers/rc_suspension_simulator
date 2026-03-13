import React from 'react';

export type ChannelDefinition = {
  key: string;
  label: string;
  color: string;
};

type ChannelSelectorProps = {
  channels: ChannelDefinition[];
  selectedKeys: string[];
  onChange: (selectedKeys: string[]) => void;
};

export function ChannelSelector({ channels, selectedKeys, onChange }: ChannelSelectorProps): JSX.Element {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {channels.map((channel) => {
        const checked = selectedKeys.includes(channel.key);
        return (
          <label key={channel.key} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                if (checked) {
                  onChange(selectedKeys.filter((key) => key !== channel.key));
                } else {
                  onChange([...selectedKeys, channel.key]);
                }
              }}
            />
            <span style={{ width: 10, height: 10, background: channel.color, borderRadius: '50%' }} />
            {channel.label}
          </label>
        );
      })}
    </div>
  );
}

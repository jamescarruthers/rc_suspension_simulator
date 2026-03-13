import React from 'react';

type CopyAxleButtonProps = {
  from: 'front' | 'rear';
  to: 'front' | 'rear';
  onCopy: (from: 'front' | 'rear', to: 'front' | 'rear') => void;
};

const formatAxle = (axle: 'front' | 'rear') => axle[0].toUpperCase() + axle.slice(1);

export function CopyAxleButton({ from, to, onCopy }: CopyAxleButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onCopy(from, to)}
      className="copy-axle-btn"
      aria-label={`Copy ${formatAxle(from)} values to ${formatAxle(to)}`}
    >
      Copy {formatAxle(from)} → {formatAxle(to)}
    </button>
  );
}

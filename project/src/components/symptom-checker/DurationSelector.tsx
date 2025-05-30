import React from 'react';

interface DurationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const durations = [
  'Today only',
  '1-2 days',
  '3-6 days',
  '1-2 weeks',
  '2+ weeks',
  'Months',
  'Years'
];

const DurationSelector: React.FC<DurationSelectorProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input w-full"
    >
      {durations.map((duration) => (
        <option key={duration} value={duration}>
          {duration}
        </option>
      ))}
    </select>
  );
};

export default DurationSelector;
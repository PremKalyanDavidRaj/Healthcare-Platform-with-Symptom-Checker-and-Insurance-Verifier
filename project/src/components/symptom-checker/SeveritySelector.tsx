import React from 'react';

interface SeveritySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const SeveritySelector: React.FC<SeveritySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
        // Determine color based on level
        let bgColor = 'bg-gray-200';
        let textColor = 'text-text';
        
        if (level <= value) {
          if (level <= 3) {
            bgColor = 'bg-success';
            textColor = 'text-white';
          } else if (level <= 6) {
            bgColor = 'bg-warning';
            textColor = 'text-white';
          } else {
            bgColor = 'bg-error';
            textColor = 'text-white';
          }
        }
        
        return (
          <button
            key={level}
            type="button"
            className={`h-8 w-8 rounded-md ${bgColor} ${textColor} text-sm transition-colors hover:opacity-90`}
            onClick={() => onChange(level)}
            aria-label={`Severity level ${level}`}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
};

export default SeveritySelector;
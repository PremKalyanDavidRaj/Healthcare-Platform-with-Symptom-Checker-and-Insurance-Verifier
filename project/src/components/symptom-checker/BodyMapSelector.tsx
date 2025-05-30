import React, { useState } from 'react';

interface BodyMapSelectorProps {
  gender: 'male' | 'female';
  onSelectBodyPart: (part: string) => void;
}

const bodyParts = [
  { id: 'head', name: 'Head', coords: '120,35,160,70' },
  { id: 'chest', name: 'Chest', coords: '120,95,160,130' },
  { id: 'abdomen', name: 'Abdomen', coords: '120,145,160,180' },
  { id: 'leftArm', name: 'Left Arm', coords: '90,95,110,150' },
  { id: 'rightArm', name: 'Right Arm', coords: '170,95,190,150' },
  { id: 'leftLeg', name: 'Left Leg', coords: '115,200,135,270' },
  { id: 'rightLeg', name: 'Right Leg', coords: '145,200,165,270' },
  { id: 'back', name: 'Back', coords: '320,95,360,180' },
];

const BodyMapSelector: React.FC<BodyMapSelectorProps> = ({ gender, onSelectBodyPart }) => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const handleMouseEnter = (part: string) => {
    setHoveredPart(part);
  };

  const handleMouseLeave = () => {
    setHoveredPart(null);
  };

  return (
    <div className="relative">
      <div className="flex justify-center overflow-auto bg-white p-4">
        <div className="relative inline-block">
          <img 
            src={gender === 'female' 
              ? "https://images.pexels.com/photos/5896871/pexels-photo-5896871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              : "https://images.pexels.com/photos/5896861/pexels-photo-5896861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt={`${gender} body map`}
            className="max-h-[400px] w-auto"
            useMap="#bodyMap"
          />
          <map name="bodyMap">
            {bodyParts.map(part => (
              <area 
                key={part.id}
                shape="rect" 
                coords={part.coords}
                alt={part.name}
                title={part.name}
                onClick={() => onSelectBodyPart(part.id)}
                onMouseEnter={() => handleMouseEnter(part.id)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </map>
          
          {hoveredPart && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-primary/90 px-3 py-1 text-sm text-white">
              {bodyParts.find(part => part.id === hoveredPart)?.name}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 md:grid-cols-4">
        {bodyParts.map(part => (
          <button
            key={part.id}
            type="button"
            onClick={() => onSelectBodyPart(part.id)}
            className="rounded-md bg-white px-3 py-2 text-sm text-text shadow-sm transition-colors hover:bg-primary hover:text-white"
          >
            {part.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BodyMapSelector;
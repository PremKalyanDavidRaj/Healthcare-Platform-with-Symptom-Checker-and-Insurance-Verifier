import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  role, 
  avatarUrl 
}) => {
  return (
    <div className="card flex h-full flex-col">
      <div className="mb-4 text-primary">
        <svg width="24\" height="24\" viewBox="0 0 24 24\" fill="none\" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6 4C7.24 4 4 7.24 4 11.6V20H12.4V11.6H7.2C7.2 9.44 9.44 7.2 11.6 7.2V4ZM20 4C15.64 4 12.4 7.24 12.4 11.6V20H20.8V11.6H15.6C15.6 9.44 17.84 7.2 20 7.2V4Z\" fill="currentColor"/>
        </svg>
      </div>
      <p className="mb-6 flex-1 text-text-secondary">{quote}</p>
      <div className="flex items-center">
        <img 
          src={avatarUrl} 
          alt={`${author} avatar`} 
          className="mr-3 h-10 w-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-text">{author}</p>
          <p className="text-sm text-text-secondary">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
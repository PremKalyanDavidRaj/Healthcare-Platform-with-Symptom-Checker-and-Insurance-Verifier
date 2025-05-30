import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="card group transition-all duration-300 hover:translate-y-[-5px]">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-medium text-text">{title}</h3>
      <p className="mb-4 text-text-secondary">{description}</p>
      <Link 
        to={link} 
        className="flex items-center text-sm font-medium text-primary transition-colors group-hover:text-primary/80"
      >
        Learn more 
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default FeatureCard;
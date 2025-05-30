import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ActivitySquare, 
  Shield, 
  Clock, 
  Users, 
  Stethoscope, 
  FileSearch, 
  BadgeCheck, 
  HeartPulse 
} from 'lucide-react';
import FeatureCard from '../components/ui/FeatureCard';
import TestimonialCard from '../components/ui/TestimonialCard';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="animate-fade-in">
              <h1 className="mb-4 text-4xl font-bold leading-tight text-text md:text-5xl">
                Your Personal <span className="text-primary">Healthcare</span> Assistant
              </h1>
              <p className="mb-8 text-lg text-text-secondary">
                Get AI-powered symptom analysis and insurance plan verification to make better healthcare decisions.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/symptom-checker" className="btn btn-primary px-6 py-3">
                  Check Symptoms
                </Link>
                <Link to="/insurance-checker" className="btn btn-outline px-6 py-3">
                  Verify Insurance
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md animate-fade-in delay-150">
              <img 
                src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Healthcare professional with digital tablet" 
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-5 -left-5 rounded-lg bg-white p-4 shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-success"></div>
                  <p className="text-sm font-medium">98% Accuracy Rate</p>
                </div>
              </div>
              <div className="absolute -right-5 -top-5 rounded-lg bg-white p-4 shadow-md">
                <div className="flex items-center space-x-2">
                  <HeartPulse className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Healthcare Simplified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text">Our Key Features</h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              HealthAssist provides powerful tools to help you understand your symptoms and navigate your insurance options.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            <FeatureCard 
              icon={<ActivitySquare className="h-8 w-8 text-primary" />}
              title="AI-Powered Symptom Analysis"
              description="Input your symptoms and receive AI-powered analysis of potential conditions with severity indicators and guidance on next steps."
              link="/symptom-checker"
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Insurance Plan Verification"
              description="Verify your insurance coverage, find relevant doctors, and estimate copay costs before your appointment."
              link="/insurance-checker"
            />
            <FeatureCard 
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="Quick & Easy to Use"
              description="Get results in minutes with our user-friendly interface designed for simplicity and ease of use."
              link="/symptom-checker"
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Find the Right Doctor"
              description="Based on your symptoms and insurance, we'll help you find the right healthcare provider for your needs."
              link="/insurance-checker"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text">How It Works</h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Get the healthcare guidance you need in just a few simple steps.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="card flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Enter Your Symptoms</h3>
              <p className="text-text-secondary">
                Simply enter your symptoms or use our interactive body map to pinpoint your concerns.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <FileSearch className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Get AI Analysis</h3>
              <p className="text-text-secondary">
                Our AI analyzes your symptoms and provides potential conditions with severity ratings.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BadgeCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Take Action</h3>
              <p className="text-text-secondary">
                Receive guidance on next steps, check insurance coverage, and find appropriate doctors.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-text">What Our Users Say</h2>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Thousands of users trust HealthAssist to guide their healthcare decisions.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard 
              quote="HealthAssist helped me understand my symptoms and find the right doctor covered by my insurance. It saved me time and money!"
              author="Sarah J."
              role="Patient"
              avatarUrl="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TestimonialCard 
              quote="As a busy parent, I needed a quick way to check if my child's symptoms required immediate attention. This app gave me the guidance I needed."
              author="Michael T."
              role="Parent"
              avatarUrl="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <TestimonialCard 
              quote="I was confused about my insurance coverage and potential costs. HealthAssist made it clear and helped me find an in-network specialist."
              author="Emily R."
              role="Insurance Plan Member"
              avatarUrl="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Take Control of Your Healthcare Journey
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Start using HealthAssist today and make informed healthcare decisions with confidence.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link 
                to="/symptom-checker" 
                className="btn bg-white px-6 py-3 text-primary hover:bg-white/90"
              >
                Check Symptoms
              </Link>
              <Link 
                to="/insurance-checker" 
                className="btn border-white px-6 py-3 text-white hover:bg-white/10"
              >
                Verify Insurance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
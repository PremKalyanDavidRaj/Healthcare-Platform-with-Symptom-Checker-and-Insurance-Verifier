import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  PlusCircle, 
  Trash2, 
  ArrowRight, 
  AlertCircle, 
  X
} from 'lucide-react';
import { symptoms } from '../data/symptoms';
import BodyMapSelector from '../components/symptom-checker/BodyMapSelector';
import SeveritySelector from '../components/symptom-checker/SeveritySelector';
import DurationSelector from '../components/symptom-checker/DurationSelector';

const SymptomCheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Array<{
    id: string;
    name: string;
    severity: number;
    duration: string;
  }>>([]);
  const [showBodyMap, setShowBodyMap] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [age, setAge] = useState<string>('30');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredSymptoms = symptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10);

  const addSymptom = (symptom: { id: string; name: string }) => {
    if (selectedSymptoms.some(s => s.id === symptom.id)) {
      return;
    }
    
    setSelectedSymptoms([
      ...selectedSymptoms, 
      { ...symptom, severity: 5, duration: '1-2 days' }
    ]);
    setSearchTerm('');
  };

  const removeSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== id));
  };

  const updateSymptomSeverity = (id: string, severity: number) => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === id ? { ...s, severity } : s
      )
    );
  };

  const updateSymptomDuration = (id: string, duration: string) => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === id ? { ...s, duration } : s
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSymptoms.length === 0) {
      setError('Please add at least one symptom to continue.');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a unique ID for this analysis
      const analysisId = Date.now().toString();
      navigate(`/results/symptoms/${analysisId}`);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-text">Symptom Checker</h1>
        <p className="mb-8 text-text-secondary">
          Enter your symptoms to get an AI-powered analysis of potential conditions and recommended next steps.
        </p>
        
        {error && (
          <div className="mb-6 flex items-center rounded-md bg-error/10 p-4 text-error">
            <AlertCircle className="mr-2 h-5 w-5" />
            <span>{error}</span>
            <button 
              className="ml-auto text-error" 
              onClick={() => setError(null)}
              aria-label="Dismiss error"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="card">
            <h2 className="mb-4 text-xl font-medium text-text">Basic Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="gender" className="mb-1 block text-sm font-medium text-text">
                  Gender
                </label>
                <div className="flex rounded-md border border-gray-300">
                  <button
                    type="button"
                    className={`flex-1 rounded-l-md px-4 py-2 text-sm transition-colors ${
                      gender === 'female' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-text-secondary hover:bg-gray-50'
                    }`}
                    onClick={() => setGender('female')}
                  >
                    Female
                  </button>
                  <button
                    type="button"
                    className={`flex-1 rounded-r-md px-4 py-2 text-sm transition-colors ${
                      gender === 'male' 
                        ? 'bg-primary text-white' 
                        : 'bg-white text-text-secondary hover:bg-gray-50'
                    }`}
                    onClick={() => setGender('male')}
                  >
                    Male
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="age" className="mb-1 block text-sm font-medium text-text">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="0"
                  max="120"
                  className="input w-full"
                  placeholder="Enter your age"
                />
              </div>
            </div>
          </div>
          
          {/* Symptom Search */}
          <div className="card">
            <h2 className="mb-4 text-xl font-medium text-text">Symptoms</h2>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input w-full pl-10"
                  placeholder="Type a symptom (e.g., headache, fever)"
                />
              </div>
              
              {searchTerm && (
                <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-sm">
                  {filteredSymptoms.length > 0 ? (
                    filteredSymptoms.map(symptom => (
                      <button
                        key={symptom.id}
                        type="button"
                        onClick={() => addSymptom(symptom)}
                        className="flex w-full items-center px-4 py-2 text-left text-sm text-text hover:bg-primary/5"
                      >
                        <PlusCircle className="mr-2 h-4 w-4 text-primary" />
                        {symptom.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-text-secondary">
                      No symptoms found. Try a different search term.
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowBodyMap(!showBodyMap)}
                className="btn btn-outline"
              >
                {showBodyMap ? 'Hide Body Map' : 'Use Body Map'}
              </button>
            </div>
            
            {showBodyMap && (
              <div className="mb-6 overflow-hidden rounded-lg border border-gray-300">
                <BodyMapSelector 
                  gender={gender}
                  onSelectBodyPart={(part) => {
                    const symptomForPart = symptoms.find(s => s.bodyPart === part);
                    if (symptomForPart) {
                      addSymptom(symptomForPart);
                    }
                  }}
                />
              </div>
            )}
            
            {selectedSymptoms.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-md font-medium text-text">Selected Symptoms:</h3>
                {selectedSymptoms.map(symptom => (
                  <div key={symptom.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-md font-medium text-text">{symptom.name}</h4>
                      <button
                        type="button"
                        onClick={() => removeSymptom(symptom.id)}
                        className="text-error transition-colors hover:text-error/80"
                        aria-label={`Remove ${symptom.name}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-text">
                          Severity
                        </label>
                        <SeveritySelector 
                          value={symptom.severity}
                          onChange={(value) => updateSymptomSeverity(symptom.id, value)}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-text">
                          Duration
                        </label>
                        <DurationSelector 
                          value={symptom.duration}
                          onChange={(value) => updateSymptomDuration(symptom.id, value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md bg-gray-50 p-6 text-center text-text-secondary">
                <p>No symptoms selected. Search or use the body map to add symptoms.</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary flex items-center px-6 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="mr-2 h-5 w-5 animate-spin\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4\" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Symptoms
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
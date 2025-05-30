import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  AlertCircle,
  X
} from 'lucide-react';
import { insuranceProviders } from '../data/insurance';
import { diagnosisCodes } from '../data/diagnosis';

const InsurancePlanPage: React.FC = () => {
  const navigate = useNavigate();
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [planId, setPlanId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [diagnosisSearch, setDiagnosisSearch] = useState('');
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<{ code: string; description: string } | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredProviders = insuranceProviders.filter(provider => 
    provider.name.toLowerCase().includes(insuranceProvider.toLowerCase())
  ).slice(0, 5);

  const filteredDiagnoses = diagnosisCodes.filter(diagnosis => 
    diagnosis.code.includes(diagnosisSearch) || 
    diagnosis.description.toLowerCase().includes(diagnosisSearch.toLowerCase())
  ).slice(0, 10);

  const handleSelectProvider = (provider: string) => {
    setInsuranceProvider(provider);
  };

  const handleSelectDiagnosis = (diagnosis: { code: string; description: string }) => {
    setSelectedDiagnosis(diagnosis);
    setDiagnosisSearch('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!insuranceProvider) {
      setError('Please select an insurance provider.');
      return;
    }

    if (!planId) {
      setError('Please enter your insurance plan ID.');
      return;
    }

    if (!memberId) {
      setError('Please enter your member ID.');
      return;
    }

    if (!selectedDiagnosis) {
      setError('Please select a diagnosis code.');
      return;
    }

    if (!zipCode || zipCode.length !== 5) {
      setError('Please enter a valid 5-digit zip code.');
      return;
    }
    
    setError(null);
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate a unique ID for this verification
      const verificationId = Date.now().toString();
      navigate(`/results/insurance/${verificationId}`);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-text">Insurance Plan Checker</h1>
        <p className="mb-8 text-text-secondary">
          Verify your insurance coverage, find relevant doctors, and estimate copay costs before your appointment.
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
          {/* Insurance Information */}
          <div className="card">
            <div className="mb-6 flex items-center">
              <Shield className="mr-3 h-6 w-6 text-primary" />
              <h2 className="text-xl font-medium text-text">Insurance Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="insurance-provider" className="mb-1 block text-sm font-medium text-text">
                  Insurance Provider
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    id="insurance-provider"
                    value={insuranceProvider}
                    onChange={(e) => setInsuranceProvider(e.target.value)}
                    className="input w-full pl-10"
                    placeholder="Search for your insurance provider"
                  />
                </div>
                
                {insuranceProvider && filteredProviders.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-sm">
                    {filteredProviders.map(provider => (
                      <button
                        key={provider.id}
                        type="button"
                        onClick={() => handleSelectProvider(provider.name)}
                        className="flex w-full items-center px-4 py-2 text-left text-sm text-text hover:bg-primary/5"
                      >
                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                        {provider.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="plan-id" className="mb-1 block text-sm font-medium text-text">
                    Plan ID
                  </label>
                  <input
                    type="text"
                    id="plan-id"
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    className="input w-full"
                    placeholder="Enter your plan ID"
                  />
                </div>
                <div>
                  <label htmlFor="member-id" className="mb-1 block text-sm font-medium text-text">
                    Member ID
                  </label>
                  <input
                    type="text"
                    id="member-id"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="input w-full"
                    placeholder="Enter your member ID"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Diagnosis Information */}
          <div className="card">
            <h2 className="mb-4 text-xl font-medium text-text">Diagnosis Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="diagnosis-code" className="mb-1 block text-sm font-medium text-text">
                  Diagnosis Code (ICD-10)
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    id="diagnosis-code"
                    value={diagnosisSearch}
                    onChange={(e) => setDiagnosisSearch(e.target.value)}
                    className="input w-full pl-10"
                    placeholder="Search by code or description (e.g., J01.00, Acute Sinusitis)"
                  />
                </div>
                
                {diagnosisSearch && filteredDiagnoses.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-300 bg-white shadow-sm">
                    {filteredDiagnoses.map(diagnosis => (
                      <button
                        key={diagnosis.code}
                        type="button"
                        onClick={() => handleSelectDiagnosis(diagnosis)}
                        className="flex w-full items-center px-4 py-2 text-left text-sm text-text hover:bg-primary/5"
                      >
                        <span className="mr-2 font-medium">{diagnosis.code}</span>
                        {diagnosis.description}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {selectedDiagnosis && (
                <div className="rounded-md bg-primary/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="mr-2 font-medium text-primary">{selectedDiagnosis.code}</span>
                      <span>{selectedDiagnosis.description}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedDiagnosis(null)}
                      className="text-text-secondary transition-colors hover:text-primary"
                      aria-label="Remove diagnosis"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="zip-code" className="mb-1 block text-sm font-medium text-text">
                  Zip Code (for finding nearby doctors)
                </label>
                <input
                  type="text"
                  id="zip-code"
                  value={zipCode}
                  onChange={(e) => {
                    // Only allow digits and limit to 5
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setZipCode(value);
                  }}
                  className="input w-full"
                  placeholder="Enter your 5-digit zip code"
                  maxLength={5}
                />
              </div>
            </div>
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
                  Verifying...
                </>
              ) : (
                <>
                  Verify Insurance
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

export default InsurancePlanPage;
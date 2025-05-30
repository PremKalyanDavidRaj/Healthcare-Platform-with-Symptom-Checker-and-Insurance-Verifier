import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  Shield,
  MapPin,
  DollarSign,
  Star,
  ChevronRight
} from 'lucide-react';
import { mockSymptomResults } from '../data/symptomResults';
import { mockInsuranceResults } from '../data/insuranceResults';

type ResultsType = 'symptoms' | 'insurance';

const ResultsPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any>(null);
  const resultsType = type as ResultsType;

  useEffect(() => {
    // Simulate API call with a timeout
    const timer = setTimeout(() => {
      if (resultsType === 'symptoms') {
        setResults(mockSymptomResults);
      } else if (resultsType === 'insurance') {
        setResults(mockInsuranceResults);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resultsType, id]);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <svg className="h-12 w-12 animate-spin text-primary\" viewBox="0 0 24 24">
              <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4\" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-medium text-text">Loading results...</h2>
          <p className="text-text-secondary">Please wait while we prepare your information.</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-lg bg-error/10 p-8 text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-error" />
          <h2 className="mb-2 text-2xl font-bold text-text">Results Not Found</h2>
          <p className="mb-6 text-text-secondary">
            We couldn't find the results you're looking for. The results may have expired or the link is invalid.
          </p>
          <Link to="/" className="btn btn-primary">Return to Home</Link>
        </div>
      </div>
    );
  }

  if (resultsType === 'symptoms') {
    return <SymptomResults results={results} />;
  } else if (resultsType === 'insurance') {
    return <InsuranceResults results={results} />;
  }

  return null;
};

const SymptomResults: React.FC<{ results: any }> = ({ results }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/symptom-checker\" className="inline-flex items-center text-text-secondary transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Symptom Checker
        </Link>
      </div>
      
      <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-text">Symptom Analysis Results</h1>
          <p className="text-text-secondary">
            Analysis completed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0">
          <button className="btn btn-outline flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Save as PDF
          </button>
          <button className="btn btn-outline flex items-center">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </button>
        </div>
      </div>
      
      {/* Summary Card */}
      <div className="mb-8 rounded-xl bg-primary p-6 text-white shadow-md">
        <h2 className="mb-4 text-xl font-medium">Analysis Summary</h2>
        <p className="mb-6">
          Based on your reported symptoms and information, our AI analysis suggests the following possibilities. 
          Always consult with a healthcare professional for proper diagnosis and treatment.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-4">
            <h3 className="mb-2 font-medium">Severity Level</h3>
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
              <span className="text-lg font-medium">{results.severityLevel}</span>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-4">
            <h3 className="mb-2 font-medium">Recommended Action</h3>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span>{results.recommendedAction}</span>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-4">
            <h3 className="mb-2 font-medium">Reported Symptoms</h3>
            <div className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              <span>{results.symptoms.length} symptoms</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Possible Conditions */}
      <div className="mb-8 card">
        <h2 className="mb-6 text-xl font-medium text-text">Possible Conditions</h2>
        <div className="space-y-4">
          {results.possibleConditions.map((condition: any, index: number) => (
            <div 
              key={index} 
              className={`rounded-lg border p-4 transition-all duration-300 hover:shadow-md ${
                condition.matchScore > 80 
                  ? 'border-primary/30 bg-primary/5' 
                  : 'border-gray-200'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium text-text">{condition.name}</h3>
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium text-text-secondary">Match:</span>
                  <span 
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      condition.matchScore > 80 
                        ? 'bg-primary text-white' 
                        : condition.matchScore > 50 
                          ? 'bg-warning text-white' 
                          : 'bg-gray-200 text-text'
                    }`}
                  >
                    {condition.matchScore}%
                  </span>
                </div>
              </div>
              <p className="mb-3 text-text-secondary">{condition.description}</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    condition.severity === 'High' 
                      ? 'text-error' 
                      : condition.severity === 'Medium' 
                        ? 'text-warning' 
                        : 'text-success'
                  }`} />
                  <span className="text-sm">
                    <span className="font-medium">Severity:</span> {condition.severity}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm">
                    <span className="font-medium">Urgency:</span> {condition.urgency}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">
                    <span className="font-medium">Common:</span> {condition.commonness}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommended Steps */}
      <div className="mb-8 card">
        <h2 className="mb-6 text-xl font-medium text-text">Recommended Next Steps</h2>
        <div className="space-y-6">
          {results.recommendedSteps.map((step: any, index: number) => (
            <div key={index} className="flex">
              <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {index + 1}
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-text">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Doctor Types */}
      <div className="mb-8 card">
        <h2 className="mb-6 text-xl font-medium text-text">Recommended Specialists</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.recommendedDoctors.map((doctor: any, index: number) => (
            <div key={index} className="rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
              <h3 className="mb-2 text-lg font-medium text-text">{doctor.speciality}</h3>
              <p className="mb-4 text-sm text-text-secondary">{doctor.description}</p>
              <Link 
                to="/insurance-checker" 
                className="flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Check insurance coverage
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="rounded-lg bg-gray-50 p-4 text-sm text-text-secondary">
        <p className="font-medium">Important Disclaimer</p>
        <p>
          This analysis is provided for informational purposes only and is not a substitute for professional 
          medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified 
          health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </div>
  );
};

const InsuranceResults: React.FC<{ results: any }> = ({ results }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/insurance-checker\" className="inline-flex items-center text-text-secondary transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Insurance Checker
        </Link>
      </div>
      
      <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-text">Insurance Verification Results</h1>
          <p className="text-text-secondary">
            Verification completed on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:mt-0">
          <button className="btn btn-outline flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Save as PDF
          </button>
          <button className="btn btn-outline flex items-center">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </button>
        </div>
      </div>
      
      {/* Summary Card */}
      <div className="mb-8 rounded-xl bg-primary p-6 text-white shadow-md">
        <h2 className="mb-4 text-xl font-medium">Verification Summary</h2>
        <p className="mb-6">
          Based on the insurance information provided, we've verified your coverage for the specified diagnosis code.
          Below you'll find coverage details and in-network providers in your area.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-4">
            <h3 className="mb-2 font-medium">Insurance Provider</h3>
            <div className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              <span>{results.insuranceProvider}</span>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-4">
            <h3 className="mb-2 font-medium">Coverage Status</h3>
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-success" />
              <span>{results.coverageStatus}</span>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-4">
            <h3 className="mb-2 font-medium">Diagnosis</h3>
            <div className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              <span>{results.diagnosis.code} - {results.diagnosis.description}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coverage Details */}
      <div className="mb-8 card">
        <h2 className="mb-6 text-xl font-medium text-text">Coverage Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 pl-4 text-left text-sm font-medium text-text-secondary">Service Type</th>
                <th className="pb-3 text-left text-sm font-medium text-text-secondary">Coverage</th>
                <th className="pb-3 text-left text-sm font-medium text-text-secondary">In-Network Copay</th>
                <th className="pb-3 pr-4 text-left text-sm font-medium text-text-secondary">Out-of-Network</th>
              </tr>
            </thead>
            <tbody>
              {results.coverageDetails.map((detail: any, index: number) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 pl-4 text-sm text-text">{detail.serviceType}</td>
                  <td className="py-3 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      detail.covered 
                        ? 'bg-success/10 text-success' 
                        : 'bg-error/10 text-error'
                    }`}>
                      {detail.covered ? 'Covered' : 'Not Covered'}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-text">{detail.inNetworkCopay}</td>
                  <td className="py-3 pr-4 text-sm text-text">{detail.outOfNetwork}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 rounded-md bg-gray-50 p-4 text-sm text-text-secondary">
          <p className="flex items-center font-medium">
            <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
            Important Note
          </p>
          <p>
            Coverage details may vary based on your specific plan benefits and annual deductible status. 
            Always confirm with your insurance provider before scheduling services.
          </p>
        </div>
      </div>
      
      {/* In-Network Providers */}
      <div className="mb-8 card">
        <h2 className="mb-6 text-xl font-medium text-text">In-Network Providers Near You</h2>
        <div className="space-y-4">
          {results.inNetworkProviders.map((provider: any, index: number) => (
            <div key={index} className="rounded-lg border border-gray-200 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
              <h3 className="mb-1 text-lg font-medium text-text">{provider.name}</h3>
              <p className="mb-3 text-sm text-text-secondary">{provider.specialty}</p>
              <div className="mb-3 grid gap-2 md:grid-cols-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{provider.distance} miles away</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-success" />
                  <span className="text-sm">Est. copay: {provider.estimatedCopay}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-warning" />
                  <span className="text-sm">Rating: {provider.rating}/5 ({provider.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-primary btn-sm">Schedule Appointment</button>
                <button className="btn btn-outline btn-sm">View Profile</button>
                <button className="btn btn-ghost btn-sm">Get Directions</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Next Steps */}
      <div className="mb-8 card">
        <h2 className="mb-6 text-xl font-medium text-text">Recommended Next Steps</h2>
        <div className="space-y-6">
          {results.nextSteps.map((step: any, index: number) => (
            <div key={index} className="flex">
              <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {index + 1}
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-text">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="rounded-lg bg-gray-50 p-4 text-sm text-text-secondary">
        <p className="font-medium">Important Disclaimer</p>
        <p>
          This verification is based on the information provided and is for informational purposes only.
          Final coverage determinations and costs are made by your insurance provider at the time services are rendered.
          We recommend confirming all details directly with your insurance provider.
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;
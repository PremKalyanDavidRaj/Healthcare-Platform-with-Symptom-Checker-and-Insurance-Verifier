export const mockInsuranceResults = {
  id: '67890',
  insuranceProvider: 'Blue Cross Blue Shield',
  planType: 'PPO',
  coverageStatus: 'Verified - In Network',
  diagnosis: {
    code: 'J01.00',
    description: 'Acute maxillary sinusitis, unspecified'
  },
  coverageDetails: [
    {
      serviceType: 'Primary Care Visit',
      covered: true,
      inNetworkCopay: '$25',
      outOfNetwork: '60% after deductible'
    },
    {
      serviceType: 'Specialist Visit',
      covered: true,
      inNetworkCopay: '$40',
      outOfNetwork: '60% after deductible'
    },
    {
      serviceType: 'Urgent Care',
      covered: true,
      inNetworkCopay: '$50',
      outOfNetwork: '60% after deductible'
    },
    {
      serviceType: 'X-Ray',
      covered: true,
      inNetworkCopay: '10% after deductible',
      outOfNetwork: '60% after deductible'
    },
    {
      serviceType: 'Prescription - Generic',
      covered: true,
      inNetworkCopay: '$10',
      outOfNetwork: 'Not covered'
    },
    {
      serviceType: 'Prescription - Brand',
      covered: true,
      inNetworkCopay: '$25',
      outOfNetwork: 'Not covered'
    }
  ],
  inNetworkProviders: [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Family Medicine',
      distance: '1.2',
      estimatedCopay: '$25',
      rating: '4.8',
      reviewCount: 124,
      address: '123 Medical Plaza, Suite 101',
      phoneNumber: '(555) 123-4567'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'ENT Specialist',
      distance: '2.5',
      estimatedCopay: '$40',
      rating: '4.9',
      reviewCount: 89,
      address: '456 Specialist Center, Suite 200',
      phoneNumber: '(555) 234-5678'
    },
    {
      name: 'Urgent Care Center',
      specialty: 'Urgent Care',
      distance: '0.8',
      estimatedCopay: '$50',
      rating: '4.6',
      reviewCount: 210,
      address: '789 Healthcare Blvd',
      phoneNumber: '(555) 345-6789'
    }
  ],
  nextSteps: [
    {
      title: 'Schedule an appointment',
      description: 'Contact one of the in-network providers listed above to schedule an appointment.'
    },
    {
      title: 'Confirm coverage details',
      description: 'When scheduling, confirm that the provider accepts your specific insurance plan and verify your copay amount.'
    },
    {
      title: 'Prepare for your visit',
      description: 'Bring your insurance card, photo ID, and a list of current medications to your appointment.'
    },
    {
      title: 'Ask about telehealth options',
      description: 'Some providers offer telehealth visits which may be more convenient and have different copay amounts.'
    }
  ]
};
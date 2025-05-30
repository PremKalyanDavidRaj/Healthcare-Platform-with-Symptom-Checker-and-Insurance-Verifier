export const mockSymptomResults = {
  id: '12345',
  severityLevel: 'Moderate',
  recommendedAction: 'See a doctor within 24-48 hours',
  symptoms: [
    { name: 'Headache', severity: 7, duration: '3-6 days' },
    { name: 'Fever', severity: 5, duration: '1-2 days' },
    { name: 'Sinus Pressure', severity: 8, duration: '3-6 days' }
  ],
  possibleConditions: [
    {
      name: 'Acute Sinusitis',
      description: 'Inflammation of the sinuses, typically caused by a viral or bacterial infection.',
      matchScore: 85,
      severity: 'Medium',
      urgency: 'Within 48 hours',
      commonness: 'Very Common'
    },
    {
      name: 'Migraine',
      description: 'A type of headache that can cause severe throbbing pain or a pulsing sensation, typically on one side of the head.',
      matchScore: 62,
      severity: 'Medium',
      urgency: 'Non-urgent',
      commonness: 'Common'
    },
    {
      name: 'Upper Respiratory Infection',
      description: 'An infection of the upper respiratory tract, including the nose, throat, sinuses, and larynx.',
      matchScore: 58,
      severity: 'Low',
      urgency: 'Non-urgent',
      commonness: 'Very Common'
    },
    {
      name: 'Seasonal Allergies',
      description: 'An allergic reaction to pollen or other seasonal allergens that can cause sinus congestion, headache, and other symptoms.',
      matchScore: 45,
      severity: 'Low',
      urgency: 'Non-urgent',
      commonness: 'Very Common'
    }
  ],
  recommendedSteps: [
    {
      title: 'Schedule a doctor\'s appointment',
      description: 'Based on your symptoms, we recommend seeing a primary care physician or ENT specialist within 24-48 hours.'
    },
    {
      title: 'Consider over-the-counter relief',
      description: 'Decongestants, pain relievers, and nasal saline sprays may provide temporary relief. Follow package instructions.'
    },
    {
      title: 'Stay hydrated and rest',
      description: 'Drink plenty of fluids and get adequate rest to help your body recover.'
    },
    {
      title: 'Watch for worsening symptoms',
      description: 'If your fever increases significantly, you develop severe dizziness, or symptoms worsen, seek immediate medical attention.'
    }
  ],
  recommendedDoctors: [
    {
      speciality: 'Primary Care Physician',
      description: 'A general doctor who can diagnose and treat common conditions and provide referrals if needed.'
    },
    {
      speciality: 'ENT Specialist (Otolaryngologist)',
      description: 'A doctor who specializes in conditions affecting the ear, nose, and throat.'
    },
    {
      speciality: 'Neurologist',
      description: 'If symptoms persist or are primarily headache-related, a neurologist may be recommended.'
    }
  ]
};
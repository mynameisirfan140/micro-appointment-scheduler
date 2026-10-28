import { FC } from 'react';

const features = [
  {
    title: 'Create 15‑minute slots',
    description: 'Add client name and provider for each slot.',
    icon: '📅'
  },
  {
    title: 'Shareable link',
    description: 'Generate a unique URL for each appointment.',
    icon: '🔗'
  },
  {
    title: 'Google Calendar sync',
    description: 'Real‑time sync with your Google Calendar.',
    icon: '🗓️'
  },
  {
    title: 'Email confirmations',
    description: 'Automatic confirmation and reminder emails.',
    icon: '✉️'
  },
  {
    title: 'Live calendar view',
    description: 'Filter, search, and view slots instantly.',
    icon: '🔍'
  },
  {
    title: 'Responsive UI',
    description: 'Smooth interactions on mobile and desktop.',
    icon: '📱'
  }
];

const FeaturesList: FC = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center">
            <span className="text-3xl mb-2">{feature.icon}</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesList;
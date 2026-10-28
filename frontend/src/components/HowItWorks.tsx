import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    title: 'Create a 15‑minute slot',
    description: 'Enter the client name and select a provider. The slot is automatically timed for 15 minutes.'
  },
  {
    title: 'Share your link',
    description: 'A unique, shareable URL is generated for each slot, allowing clients to book instantly.'
  },
  {
    title: 'Sync & get reminders',
    description: 'Appointments sync in real time with Google Calendar and confirmation emails are sent automatically.'
  }
];

export default function HowItWorks() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
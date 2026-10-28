import React, { useState } from 'react';
import './AppointmentForm.css';

const providers = [
  { value: '1', label: 'John Doe' },
  { value: '2', label: 'Jane Smith' },
  { value: '3', label: 'Alex Johnson' }
];

export default function AppointmentForm() {
  const [clientName, setClientName] = useState('');
  const [providerId, setProviderId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isValid = clientName.trim() && providerId && startTime;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMsg('');

    if (!isValid) {
      setSubmitError('All fields are required.');
      return;
    }

    const payload = {
      provider_id: parseInt(providerId, 10),
      client_name: clientName.trim(),
      start_time: startTime
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to create appointment');
      }

      const data = await response.json();
      setSuccessMsg(`Appointment created! ID: ${data.id}`);
      // reset form
      setClientName('');
      setProviderId('');
      setStartTime('');
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <form className="max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="clientName" className="block text-sm font-medium">
          Client Name
        </label>
        <input
          id="clientName"
          type="text"
          required
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {submitError && (
          <p className="text-red-600 text-sm mt-1" role="alert">{submitError}</p>
        )}
      </div>

      <div>
        <label htmlFor="provider" className="block text-sm font-medium">
          Provider
        </label>
        <select
          id="provider"
          required
          value={providerId}
          onChange={(e) => setProviderId(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a provider</option>
          {providers.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        {submitError && (
          <p className="text-red-600 text-sm mt-1" role="alert">{submitError}</p>
        )}
      </div>

      <div>
        <label htmlFor="startTime" className="block text-sm font-medium">
          Start Time
        </label>
        <input
          id="startTime"
          type="datetime-local"
          required
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {submitError && (
          <p className="text-red-600 text-sm mt-1" role="alert">{submitError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Appointment
      </button>

      {successMsg && (
        <p className="text-green-600 text-lg mt-2">{successMsg}</p>
      )}
    </form>
  );
}
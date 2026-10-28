import { useEffect, useState } from 'react';
import Link from 'next/link';
import AppointmentForm from '../components/AppointmentForm';
import useAppointment from '../hooks/useAppointment';
import { useSearchParams } from 'next/navigation';

const SchedulePage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { appointments, isLoading, isError, error } = useAppointment();

  const filteredAppointments = appointments.filter((appt) => {
    if (!searchTerm.trim()) return true;
    return (
      appt.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.provider_id.toString().includes(searchTerm)
    );
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Available Slots</h1>

        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by client name or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading / Error states */}
        {isLoading && <p className="text-gray-600">Loading available slots...</p>}
        {isError && <p className="text-red-600">Error: {error.message}</p>}

        {/* Slots list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="font-medium text-gray-800">
                {appt.client_name} — {new Date(appt.start_time).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{appt.status}</p>
            </div>
          ))}
        </div>

        {/* Form for new appointment */}
        <AppointmentForm className="mt-12" />

        {/* CTA to create a new slot */}
        <Link
          href="/schedule"
          className="mt-8 inline-block bg-blue-600 text-white font-medium py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create a New Slot
        </Link>
      </div>
    </main>
  );
};

export default SchedulePage;
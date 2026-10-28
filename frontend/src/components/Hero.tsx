import Link from 'next/link';

const Hero: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={`bg-white py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Micro-Appointment Scheduler
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Book 15‑minute slots with a shareable link, synced to Google Calendar
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Manage your availability, send automatic confirmations and reminders, and stay in sync with your calendar — all from a simple, shareable link.
        </p>
        <Link
          href="/schedule"
          className="inline-block bg-blue-600 text-white font-medium py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Hero;
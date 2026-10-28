import type { NextPage } from 'next';
import Hero from '../components/Hero';
import FeaturesList from '../components/FeaturesList';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import Link from 'next/link';

const HomePage: NextPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero className="py-20" />
      <section className="container mx-auto px-6 py-12">
        <FeaturesList className="mb-12" />
        <HowItWorks className="mb-12" />
      </section>
      <Footer className="py-8" />
    </main>
  );
};

export default HomePage;
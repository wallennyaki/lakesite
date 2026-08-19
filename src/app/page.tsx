import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import NewsSection from '@/app/components/NewsSection';
import GallerySection from '@/app/components/GallerySection';
import ContactSection from '@/app/components/ContactSection';
import ScrollAnimator from '@/app/components/ScrollAnimator';
import FeaturedPlayersSection from '@/app/components/FeaturedPlayersSection';
import UpcomingEventsSection from '@/app/components/UpcomingEventsSection';
import CtaSection from '@/app/components/CtaSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <ScrollAnimator />
      <main className="pt-[60px]">
        <HeroSection />
        <AboutSection />
        <FeaturedPlayersSection />
        <UpcomingEventsSection />
        <NewsSection />
        <GallerySection />
        <ContactSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
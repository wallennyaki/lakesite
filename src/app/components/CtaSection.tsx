import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function CtaSection() {
  return (
    <section className="bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden min-h-[400px] flex items-center animate-on-scroll">
          <AppImage
  src="/assets/images/1.jpg"
  alt="Lakesite Soccer Academy players training together"
  className="rounded-2xl shadow-xl w-full object-cover"
/>
          
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-secondary/20" />

          <div className="relative z-10 px-8 md:px-16 py-16 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-4 block">Ready to Begin?</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-5">
              Your Journey to<br />
              <span className="text-accent">Champions League</span><br />
              Starts Here.
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Join Lakesite Football Academy today. Limited spots available for the 2025/26 season. Our team will contact you within 48 hours of registration.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/registration"
                className="bg-accent text-accent-foreground font-bold px-8 py-3.5 rounded-full hover:bg-accent/90 transition-all shadow-lg hover:-translate-y-0.5 text-base">
                
                Register Now
              </Link>
              <Link
                href="/#contact"
                className="glass-card text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/15 transition-all text-base">
                
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
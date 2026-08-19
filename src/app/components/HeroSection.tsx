'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    if (heroRef.current) {
      heroRef.current.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    if (heroRef.current) {
      heroRef.current.style.transform = 'translate(0,0) scale(1)';
    }
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-end pb-16 md:pb-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-secondary">
        <div ref={heroRef} className="w-full h-full transition-transform duration-700 ease-out">
          <AppImage
            src="/assets/images/1.jpg"
            alt="Football players training on a green pitch at dusk, action shot with stadium lights"
            fill
            priority
            className="object-cover animate-cinematic opacity-0"
            sizes="100vw" />
          
        </div>
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-transparent to-transparent" />
        {/* Pitch pattern */}
        <div className="absolute inset-0 pitch-pattern opacity-30" />
      </div>

      {/* Floating badge */}
      <div
        className="absolute top-28 right-6 md:right-16 z-20 animate-slide-up opacity-0"
        style={{ animationDelay: '2.8s', animationFillMode: 'forwards' }}>
        
        <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-white/90">Est. 2018 · Langata, Nairobi</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        {/* Left — Main Headline */}
        <div className="md:col-span-7">
          <div
            className="flex items-center gap-3 mb-6 animate-slide-up opacity-0"
            style={{ animationDelay: '1.0s', animationFillMode: 'forwards' }}>
            
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-accent">Lakesite Football Academy</span>
          </div>

          <h1 className="font-extrabold text-white leading-[0.88] tracking-tight mb-6">
            <span
              className="block text-hero-xl animate-slide-up opacity-0"
              style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
              
              LAKESITE
            </span>
            <div
              className="flex items-baseline gap-4 md:gap-6 animate-slide-up opacity-0"
              style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
              
              <span className="text-hero-xl text-accent">FA</span>
              <span
                className="text-hero-md font-light italic text-white/40"
                style={{ fontStyle: 'italic' }}>
                
                Kenya
              </span>
            </div>
          </h1>

          <p
            className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8 max-w-md animate-slide-up opacity-0"
            style={{ animationDelay: '1.6s', animationFillMode: 'forwards' }}>
            
            Nurturing champions from Nairobi. Developing skilled footballers and disciplined individuals since 2018.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-slide-up opacity-0"
            style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
            
            <Link
              href="/registration"
              className="bg-accent text-accent-foreground font-bold px-7 py-3.5 rounded-full hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base">
              
              Join the Academy
            </Link>
            <a
              href="#about"
              className="glass-card text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/15 transition-all duration-300 text-base">
              
              Learn More
            </a>
          </div>
        </div>

        {/* Right — Stats Card */}
        <div
          className="md:col-span-4 md:col-start-9 animate-slide-up opacity-0"
          style={{ animationDelay: '2.0s', animationFillMode: 'forwards' }}>
          
          <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
            <div className="shimmer-overlay" />
            <div className="relative z-10">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-5 font-mono">Academy at a Glance</p>
              <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
                {[
                { val: '500+', label: 'Players Trained' },
                { val: '7', label: 'Years Active' },
                { val: '12', label: 'Trophies Won' },
                { val: '5', label: 'Age Groups' }].
                map((s) =>
                <div key={s.label}>
                    <span className="block text-2xl font-extrabold text-accent">{s.val}</span>
                    <span className="block text-xs text-white/50 mt-0.5">{s.label}</span>
                  </div>
                )}
              </div>
              <Link
                href="/#programs"
                className="mt-5 flex items-center justify-between w-full border-b border-white/25 pb-2 hover:border-white/60 transition-colors group">
                
                <span className="text-sm font-semibold text-white">View Programs</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-slide-up opacity-0"
        style={{ animationDelay: '2.5s', animationFillMode: 'forwards' }}>
        
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>);

}
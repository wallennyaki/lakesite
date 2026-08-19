import React from 'react';
import AppImage from '@/components/ui/AppImage';

const stats = [
  { val: '500+', label: 'Players Trained', icon: '⚽' },
  { val: '2018', label: 'Founded', icon: '📅' },
  { val: '12', label: 'Trophies Won', icon: '🏆' },
  { val: '5', label: 'Age Groups', icon: '👥' },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-background py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 blob-gold opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start mb-16">
          <div className="flex-1 animate-on-scroll">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">
              Our Story
            </span>

            <h2 className="text-section-xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
              Building More Than<br />
              <span className="text-primary">Footballers</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2018 at Lakesite School in Langata, Nairobi, our academy was born from a simple belief: every child in our community deserves world-class football development. We tap into the power of football to unearth, nurture, and develop grassroots talent across Kenya.
            </p>
          </div>

          <div className="flex-1 animate-on-scroll stagger-2">
            <div className="bg-primary/5 border border-primary/15 rounded-3xl p-8 space-y-6">
              {[
                {
                  label: 'Mission',
                  text: "To identify and develop exceptional football talent in Nairobi's youth through structured coaching, mentorship, and competitive exposure.",
                },
                {
                  label: 'Vision',
                  text: "To produce Kenya's next generation of professional footballers who excel on and off the pitch.",
                },
                {
                  label: 'Values',
                  text: 'Discipline · Teamwork · Excellence · Community · Integrity',
                },
              ].map((item) => (
                <div key={item.label}>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                    {item.label}
                  </h3>

                  <p className="text-foreground/80 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="animate-on-scroll stagger-1 rounded-3xl overflow-hidden h-72 lg:h-auto min-h-[300px] relative">
            <AppImage
              src="/assets/images/1.jpg"
              alt="Lakesite Soccer Academy players during football training"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent" />

            <div className="absolute bottom-6 left-6">
              <span className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                Langata, Nairobi
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-card border border-border rounded-2xl p-6 flex flex-col justify-between spotlight-card animate-on-scroll stagger-${i + 1}`}
              >
                <span className="text-2xl">{s.icon}</span>

                <div>
                  <span className="block text-3xl font-extrabold text-primary">
                    {s.val}
                  </span>

                  <span className="block text-sm text-muted-foreground mt-1">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
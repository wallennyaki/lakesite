import React from 'react';
import Link from 'next/link';

const programs = [
  {
    group: 'U8',
    age: 'Ages 5–8',
    title: 'Little Kickers',
    desc: 'Foundational skills, fun-first approach. Ball mastery, coordination, and love for the game.',
    schedule: 'Sat & Sun · 8:00–9:30 AM',
    fee: 'KES 3,500/month',
    color: 'from-rose-900/20 to-rose-800/10',
    border: 'border-rose-800/30',
  },
  {
    group: 'U12',
    age: 'Ages 9–12',
    title: 'Junior Lions',
    desc: 'Technical development, tactical awareness, and competitive league participation begins.',
    schedule: 'Tue, Thu, Sat · 4:00–6:00 PM',
    fee: 'KES 4,500/month',
    color: 'from-yellow-400/20 to-yellow-600/10',
    border: 'border-yellow-500/30',
  },
  {
    group: 'U16',
    age: 'Ages 13–16',
    title: 'Rising Stars',
    desc: 'Advanced tactics, strength & conditioning, FKF youth league competition.',
    schedule: 'Mon, Wed, Fri · 4:30–7:00 PM',
    fee: 'KES 5,500/month',
    color: 'from-blue-400/20 to-blue-600/10',
    border: 'border-blue-500/30',
  },
  {
    group: 'U19',
    age: 'Ages 17–19',
    title: 'Elite Academy',
    desc: 'Pre-professional pathway. Video analysis, sports psychology, and trials for higher leagues.',
    schedule: 'Mon–Fri · 5:00–7:30 PM',
    fee: 'KES 7,000/month',
    color: 'from-purple-400/20 to-purple-600/10',
    border: 'border-purple-500/30',
  },
  {
    group: 'Senior',
    age: 'Ages 20+',
    title: 'Senior Squad',
    desc: 'Competitive football for adults. League fixtures, tournaments, and professional coaching.',
    schedule: 'Tue, Thu, Sat · 6:00–8:30 PM',
    fee: 'KES 6,000/month',
    color: 'from-accent/20 to-accent/10',
    border: 'border-accent/40',
  },
];

export default function ProgramsSection() {
  return (
    <section id="programs" className="bg-secondary py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pitch-pattern opacity-20" />
      <div className="absolute top-20 left-0 w-80 h-80 blob-green opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="animate-on-scroll">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">Training Programs</span>
            <h2 className="text-section-xl font-extrabold text-white tracking-tight leading-tight">
              Find Your<br />
              <span className="text-accent">Age Group</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-xs text-sm leading-relaxed animate-on-scroll stagger-2">
            Structured development pathways from grassroots to elite level, tailored for every stage of a player&apos;s journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs?.map((p, i) => (
            <div
              key={p?.group}
              className={`relative bg-gradient-to-br ${p?.color} border ${p?.border} rounded-3xl p-6 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 spotlight-card animate-on-scroll stagger-${Math.min(i + 1, 5)}`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-3xl font-extrabold text-white">{p?.group}</span>
                    <span className="block text-xs text-white/50 mt-0.5">{p?.age}</span>
                  </div>
                  <span className="bg-white/10 text-white/80 text-xs font-semibold px-3 py-1 rounded-full border border-white/15">
                    {p?.title}
                  </span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">{p?.desc}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    {p?.schedule}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-accent font-semibold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" /></svg>
                    {p?.fee}
                  </div>
                </div>
              </div>
              <Link
                href="/registration"
                className="block text-center bg-white/10 hover:bg-accent hover:text-accent-foreground text-white text-sm font-bold py-2.5 rounded-full border border-white/20 hover:border-accent transition-all duration-300"
              >
                Enroll Now
              </Link>
            </div>
          ))}

          {/* CTA Card */}
          <div className="bg-accent/10 border border-accent/30 rounded-3xl p-6 flex flex-col justify-between animate-on-scroll stagger-5">
            <div>
              <span className="text-2xl font-extrabold text-accent block mb-2">Not Sure?</span>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Come for a free trial session. Our coaches will assess the best program for your child.
              </p>
            </div>
            <Link
              href="/#contact"
              className="block text-center bg-accent text-accent-foreground text-sm font-bold py-2.5 rounded-full hover:bg-accent/90 transition-colors"
            >
              Book Free Trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
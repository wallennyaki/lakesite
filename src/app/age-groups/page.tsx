'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const ageGroups = [
  {
    id: 1,
    name: 'U8',
    fullName: 'Under 8',
    ageRange: 'Ages 5–8',
    description: 'Introduction to football fundamentals. Fun-based learning focused on ball familiarity, basic coordination, and love for the game.',
    trainingDays: 'Monday, Wednesday, Friday',
    trainingTime: '4:00 PM – 5:30 PM',
    coach: 'Coach Mary Wanjiku',
    players: 12,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'U10',
    fullName: 'Under 10',
    ageRange: 'Ages 8–10',
    description: 'Building on fundamentals with small-sided games, dribbling, passing, and basic tactical awareness in a fun environment.',
    trainingDays: 'Monday, Wednesday, Friday',
    trainingTime: '4:00 PM – 5:30 PM',
    coach: 'Coach Mary Wanjiku',
    players: 18,
    color: 'bg-green-600',
  },
  {
    id: 3,
    name: 'U12',
    fullName: 'Under 12',
    ageRange: 'Ages 10–12',
    description: 'Technical development phase. Focus on individual skills, positional play, and introduction to team tactics and formations.',
    trainingDays: 'Tuesday, Thursday, Saturday',
    trainingTime: '4:00 PM – 6:00 PM',
    coach: 'Coach Mary Wanjiku',
    players: 22,
    color: 'bg-purple-600',
  },
  {
    id: 4,
    name: 'U14',
    fullName: 'Under 14',
    ageRange: 'Ages 12–14',
    description: 'Tactical development and competitive football. Players compete in local leagues and tournaments while refining technical skills.',
    trainingDays: 'Tuesday, Thursday, Saturday',
    trainingTime: '4:00 PM – 6:00 PM',
    coach: 'Coach Peter Kariuki',
    players: 25,
    color: 'bg-orange-600',
  },
  {
    id: 5,
    name: 'U16',
    fullName: 'Under 16',
    ageRange: 'Ages 14–16',
    description: 'High-performance development. Intensive tactical training, physical conditioning, and regular competitive fixtures at regional level.',
    trainingDays: 'Monday, Wednesday, Friday',
    trainingTime: '5:00 PM – 7:00 PM',
    coach: 'Coach Peter Kariuki',
    players: 28,
    color: 'bg-[#800020]',
  },
  {
    id: 6,
    name: 'U18',
    fullName: 'Under 18',
    ageRange: 'Ages 16–18',
    description: 'Elite youth development. Preparing players for professional pathways through advanced tactical, technical, and physical training.',
    trainingDays: 'Monday, Wednesday, Friday',
    trainingTime: '5:00 PM – 7:00 PM',
    coach: 'Coach Peter Kariuki',
    players: 20,
    color: 'bg-gray-800',
  },
];

export default function AgeGroupsPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="bg-[#800020] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">Development Pathways</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Age Groups</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Structured development programs for every stage of a player&apos;s journey, from first touch to elite performance.
            </p>
          </div>
        </section>

        {/* Age Groups Grid */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ageGroups?.map((group) => (
                <div
                  key={group?.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <div className={`${group?.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-4xl font-extrabold">{group?.name}</span>
                      <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">{group?.players} Players</span>
                    </div>
                    <div className="text-white/80 text-sm font-semibold">{group?.fullName} · {group?.ageRange}</div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{group?.description}</p>

                    <div className="space-y-2.5 mb-5">
                      <div className="flex items-center gap-2.5 text-sm">
                        <svg className="text-[#800020] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        <span className="text-gray-700 font-medium">{group?.trainingDays}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm">
                        <svg className="text-[#800020] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span className="text-gray-700 font-medium">{group?.trainingTime}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm">
                        <svg className="text-[#800020] shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span className="text-gray-700 font-medium">{group?.coach}</span>
                      </div>
                    </div>

                    <Link
                      href="/registration"
                      className="w-full block text-center bg-[#800020] text-white text-sm font-bold py-2.5 rounded-xl hover:bg-[#6b0019] transition-colors"
                    >
                      Register for {group?.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Join?</h2>
            <p className="text-gray-600 mb-8">Register your child today and begin their football development journey with Lakesite Soccer Academy.</p>
            <Link
              href="/registration"
              className="inline-flex items-center gap-2 bg-[#800020] text-white font-bold px-8 py-4 rounded-full hover:bg-[#6b0019] transition-colors shadow-lg"
            >
              Apply Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

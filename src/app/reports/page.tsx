'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const reports = [
  {
    id: 1,
    title: 'End of Season Report 2023/24',
    type: 'Academy Report',
    date: '2024-07-30',
    description: 'Comprehensive review of the 2023/24 season including player development, match results, and academy achievements.',
    isPublic: true,
    fileSize: '2.4 MB',
    icon: '📊',
  },
  {
    id: 2,
    title: 'U16 Regional Championship Match Report',
    type: 'Match Report',
    date: '2024-08-05',
    description: 'Detailed match analysis of the U16 Regional Championship Final including tactical breakdown and player ratings.',
    isPublic: true,
    fileSize: '1.1 MB',
    icon: '⚽',
  },
  {
    id: 3,
    title: 'Inter-Academy Tournament Report',
    type: 'Tournament Report',
    date: '2024-06-15',
    description: 'Full report from the Nairobi Inter-Academy Tournament covering all matches, player performances, and outcomes.',
    isPublic: true,
    fileSize: '1.8 MB',
    icon: '🏆',
  },
  {
    id: 4,
    title: 'Q2 2024 Player Development Report',
    type: 'Development Report',
    date: '2024-06-30',
    description: 'Individual player development assessments for Q2 2024 across all age groups.',
    isPublic: false,
    fileSize: '3.2 MB',
    icon: '📈',
  },
  {
    id: 5,
    title: 'July 2024 Training Report',
    type: 'Training Report',
    date: '2024-07-31',
    description: 'Monthly training report covering attendance, drills, fitness assessments, and coach observations for July 2024.',
    isPublic: true,
    fileSize: '0.9 MB',
    icon: '🏃',
  },
];

const reportTypes = ['All Types', 'Match Report', 'Tournament Report', 'Academy Report', 'Development Report', 'Training Report'];

export default function ReportsPage() {
  const [typeFilter, setTypeFilter] = useState('All Types');

  const filtered = reports?.filter((r) => {
    const matchType = typeFilter === 'All Types' || r?.type === typeFilter;
    return matchType && r?.isPublic;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="bg-[#800020] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">Documentation</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Academy Reports</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Public reports, match analyses, and academy documentation available for download.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="py-6 px-6 bg-white border-b border-gray-100 sticky top-[60px] z-30">
          <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto pb-1">
            {reportTypes?.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  typeFilter === type ? 'bg-[#800020] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Reports List */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {filtered?.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No public reports found for this category.</div>
            ) : (
              filtered?.map((report) => (
                <div key={report?.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all duration-200">
                  <div className="text-4xl shrink-0">{report?.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#800020]/10 text-[#800020] text-xs font-bold px-2 py-0.5 rounded-full">{report?.type}</span>
                      <span className="text-gray-400 text-xs">{report?.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{report?.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{report?.description}</p>
                    <p className="text-gray-400 text-xs mt-1">File size: {report?.fileSize}</p>
                  </div>
                  <button className="shrink-0 flex items-center gap-2 bg-[#800020] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#6b0019] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    <span className="hidden sm:block">Download</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

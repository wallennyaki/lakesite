'use client';
import React from 'react';

const events = [
  {
    date: { day: '18', month: 'Aug' },
    title: 'U16 Regional Championship',
    location: 'City Stadium, Nairobi',
    type: 'Match',
    color: 'bg-[#800020]',
  },
  {
    date: { day: '24', month: 'Aug' },
    title: 'Open Training Day',
    location: 'Lakesite School Ground',
    type: 'Training',
    color: 'bg-gray-700',
  },
  {
    date: { day: '01', month: 'Sep' },
    title: '2024/25 Season Registration Deadline',
    location: 'Online & Academy Office',
    type: 'Registration',
    color: 'bg-amber-600',
  },
  {
    date: { day: '07', month: 'Sep' },
    title: 'Inter-Academy Tournament',
    location: 'Langata Sports Complex',
    type: 'Tournament',
    color: 'bg-[#800020]',
  },
  {
    date: { day: '15', month: 'Sep' },
    title: 'Parent-Coach Meeting',
    location: 'Lakesite School Hall',
    type: 'Meeting',
    color: 'bg-gray-700',
  },
];

export default function UpcomingEventsSection() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="text-[#800020] text-xs font-bold uppercase tracking-widest mb-2 block">Calendar</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">Upcoming Activities</h2>
        </div>

        <div className="space-y-3">
          {events?.map((event, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 lg:p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#800020]/20"
            >
              <div className={`${event?.color} text-white rounded-xl w-14 h-14 flex flex-col items-center justify-center shrink-0`}>
                <span className="text-xl font-extrabold leading-none">{event?.date?.day}</span>
                <span className="text-xs font-semibold opacity-80">{event?.date?.month}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm lg:text-base truncate">{event?.title}</h3>
                <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {event?.location}
                </p>
              </div>
              <span className={`${event?.color} text-white text-xs font-bold px-3 py-1 rounded-full hidden sm:block`}>
                {event?.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

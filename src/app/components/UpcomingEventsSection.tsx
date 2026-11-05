'use client';

import React from 'react';

export default function UpcomingEventsSection() {
  return (
    <section className="py-20 px-6 bg-muted">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">
            Stay Involved
          </span>

          <h2 className="text-section-xl font-extrabold text-foreground tracking-tight">
            Upcoming <span className="text-primary">Activities</span>
          </h2>

          <p className="text-muted-foreground text-sm mt-4 max-w-md">
            Keep up with upcoming matches, training sessions, tournaments and academy events.
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-10 md:p-16 text-center">
          <div className="text-4xl mb-4">📅</div>

          <h3 className="text-xl font-bold text-foreground mb-3">
            New Activities Coming Soon
          </h3>

          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Upcoming matches, training sessions and academy events will be announced here. Stay connected with Lakesite Football Academy.
          </p>
        </div>
      </div>
    </section>
  );
}
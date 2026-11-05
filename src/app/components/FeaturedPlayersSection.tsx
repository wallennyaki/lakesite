'use client';

import React from 'react';
import Link from 'next/link';

export default function FeaturedPlayersSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">
              Our Team
            </span>

            <h2 className="text-section-xl font-extrabold text-foreground tracking-tight">
              Meet Our <span className="text-primary">Players</span>
            </h2>

            <p className="text-muted-foreground text-sm mt-4 max-w-md">
              Discover the young talents developing their skills and passion for football at Lakesite Football Academy.
            </p>
          </div>

          <Link
            href="/players"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            View All Players
            <span>→</span>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-3xl p-10 md:p-16 text-center">
          <div className="text-4xl mb-4">⚽</div>

          <h3 className="text-xl font-bold text-foreground mb-3">
            Our Young Talents
          </h3>

          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Player profiles and highlights will be available here soon. Visit our players page to learn more about the academy.
          </p>
        </div>
      </div>
    </section>
  );
}
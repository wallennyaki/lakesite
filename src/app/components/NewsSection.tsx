import React from 'react';

export default function NewsSection() {
  return (
    <section id="news" className="bg-muted py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">
              Latest Updates
            </span>

            <h2 className="text-section-xl font-extrabold text-foreground tracking-tight">
              News &<br />
              <span className="text-primary">Events</span>
            </h2>
          </div>

          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Stay connected with the latest news and announcements from Lakesite Football Academy.
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-10 md:p-16 text-center">
          <div className="text-4xl mb-4">⚽</div>

          <h3 className="text-xl font-bold text-foreground mb-3">
            Exciting Updates Coming Soon
          </h3>

          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            We are preparing the latest academy news, match reports and announcements. Check back soon!
          </p>
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import Link from 'next/link';

function LSALogo({ size = 40 }: { size?: number }) {
  return (
    <img
      src="assets/images/lakesite.jpg"
      alt="Lakesite Soccer Academy"
      width={size}
      height={size}
      className="object-contain"
    />
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <LSALogo size={44} />
              <div>
                <span className="text-white font-extrabold text-base block leading-tight">LAKESITE SOCCER</span>
                <span className="text-white/50 text-xs tracking-widest block">ACADEMY</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Developing champions on and off the pitch. Located at Lakesite School, Langata, Nairobi — opposite Onyomka Estate.
            </p>
            <div className="flex items-center gap-3">
              {[
                { name: 'facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { name: 'youtube', path: 'M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
              ].map((s) => (
              <a
  key={s.name}
  href={
    s.name === 'instagram'
      ? 'https://www.instagram.com/lakesitesoccer/'
      : '#'
  }
  aria-label={s.name}
  className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:bg-[#800020] hover:border-[#800020] transition-all duration-200"
>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About the Club', href: '/about' },
                { label: 'Age Groups', href: '/age-groups' },
                { label: 'Players', href: '/players' },
                { label: 'News', href: '/news' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#800020] inline-block" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Academy</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Gallery', href: '/gallery' },
                { label: 'Reports', href: '/reports' },
                { label: 'Register a Player', href: '/registration' },
                { label: 'Staff Portal', href: '/admin-dashboard' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#800020] inline-block" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Lakesite School, Langata<br />Nairobi, Kenya<br /><span className="text-white/35 text-xs">Opposite Onyomka Estate</span></span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.18a16 16 0 006.91 6.91l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                info@lakesiteacademy.ac.ke
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© 2024 Lakesite Soccer Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
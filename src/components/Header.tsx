'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Age Groups', href: '/age-groups' },
  { label: 'Players', href: '/players' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reports', href: '/reports' },
];
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav
          className={`w-full flex items-center justify-between px-4 lg:px-8 py-3 transition-all duration-300 ${
            scrolled
              ? 'bg-[#800020] shadow-2xl'
              : 'bg-[#800020]/95 backdrop-blur-md'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
            <LSALogo size={40} />
            <div className="hidden sm:block">
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">LAKESITE SOCCER</span>
              <span className="font-bold text-xs tracking-widest text-white/70 block">ACADEMY</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-white text-[#800020]'
                    : 'text-white/80 hover:text-white hover:bg-white/15'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/admin-dashboard"
              className="hidden md:flex text-xs font-semibold text-white/60 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
            >
              Staff Login
            </Link>
            <Link
              href="/registration"
              className="bg-white text-[#800020] text-sm font-bold px-4 py-2 rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg"
            >
              Register
            </Link>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#800020] flex flex-col pt-20 px-6 pb-8 overflow-y-auto">
          <nav className="flex flex-col gap-1 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={`text-lg font-bold py-3 px-4 rounded-xl transition-colors border-b border-white/10 ${
                  isActive(link.href) ? 'bg-white text-[#800020]' : 'text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin-dashboard"
              onClick={closeMenu}
              className="text-base font-semibold py-3 px-4 text-white/60 hover:text-white transition-colors"
            >
              Staff Login
            </Link>
            <Link
              href="/registration"
              onClick={closeMenu}
              className="mt-4 bg-white text-[#800020] text-lg font-bold px-6 py-4 rounded-2xl text-center"
            >
              Register Now
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
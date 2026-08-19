'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { supabase } from '@/lib/supabase';

type AuthUser = { role: 'staff' | 'ceo'; email: string };

interface Props {
  onLogin: (user: AuthUser) => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [role, setRole] = useState<'staff' | 'ceo'>('staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!email || !password) {
    setError('Please enter your email and password.');
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError('Password must be at least 6 characters.');
    setLoading(false);
    return;
  }

  const { data, error: authError } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (authError) {
    setError('Invalid email or password.');
    setLoading(false);
    return;
  }

  if (!data.user) {
    setError('Login failed. Please try again.');
    setLoading(false);
    return;
  }

  const userRole = data.user.user_metadata?.role;

  if (userRole !== 'ceo' && userRole !== 'staff') {
    await supabase.auth.signOut();
    setError('Your account does not have staff or CEO permissions.');
    setLoading(false);
    return;
  }

  onLogin({
    role: userRole,
    email: data.user.email ?? email,
  });

  setLoading(false);
};


  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pitch-pattern opacity-10" />
      <div className="absolute top-20 right-20 w-72 h-72 blob-gold opacity-10 pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-72 h-72 blob-green opacity-15 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <AppLogo size={48} />
            <span className="text-white font-extrabold text-2xl tracking-tight">LakesiteFA</span>
          </div>
          <p className="text-white/50 text-sm">Staff & Administration Portal</p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <h2 className="text-white font-extrabold text-xl mb-6">Sign In</h2>

<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1.5">
      Email Address
    </label>

    <input
      type="email"
      required
      autoComplete="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#800020] transition-colors"
    />
  </div>

  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1.5">
      Password
    </label>

    <input
      type="password"
      required
      autoComplete="current-password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#800020] transition-colors"
    />
  </div>

  {error && (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
      {error}
    </div>
  )}

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-[#800020] text-white font-bold py-3.5 rounded-full hover:bg-[#6b0019] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
  >
    {loading ? (
      <>
        <svg
          className="animate-spin"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
        Signing in...
      </>
    ) : (
      'Sign In'
    )}
  </button>

  <div className="text-center">
    <span className="text-white/40 text-xs">
      Forgot password? Contact IT support
    </span>
  </div>
</form>
         

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1.5">
                Password
              </label>
              <input
  type="email"
  required
  autoComplete="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-accent transition-colors"
/>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-3.5 rounded-full transition-all duration-300 text-sm shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 ${
                role === 'ceo' ?'bg-accent text-accent-foreground hover:bg-accent/90' :'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                  Signing in...
                </>
              ) : (
                `Sign in as ${role === 'ceo' ? 'CEO' : 'Staff'}`
              )}
            </button>

            <div className="text-center">
              <a href="#" className="text-white/40 text-xs hover:text-white/60 transition-colors">
                Forgot password? Contact IT support
              </a>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-white/40 text-xs hover:text-white/60 transition-colors">
            ← Back to Lakesite FA Website
          </Link>
        </div>
      </div>
    </div>
  );
}
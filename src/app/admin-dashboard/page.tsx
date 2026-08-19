'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// ─── Types ───────────────────────────────────────────────────────────────────
type Role = 'ceo' | 'staff' | 'player';
type AuthUser = { role: Role; email: string; name: string } | null;
type Tab = 'overview' | 'players' | 'staff' | 'applications' | 'recruitment' | 'revenue' | 'content' | 'settings' | 'notifications' | 'audit';

type AuditCategory = 'player' | 'staff' | 'application' | 'content' | 'settings' | 'system';

interface AuditEntry {
  id: number;
  time: string;
  user: string;
  role: string;
  action: string;
  category: AuditCategory;
  detail?: string;
}

interface Notification {
  id: number;
  type: 'application' | 'approved' | 'rejected' | 'staff' | 'player' | 'content' | 'info';
  message: string;
  detail?: string;
  time: string;
  timestamp: number;
  read: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────







const INITIAL_AUDIT: AuditEntry[] = [];
const INITIAL_NOTIFICATIONS: Notification[] = [];
// ─── Audit & Notification Context ────────────────────────────────────────────
// Shared state via module-level refs (avoids prop drilling across all tabs)
let _auditLog: AuditEntry[] = [...INITIAL_AUDIT];
let _notifications: Notification[] = [...INITIAL_NOTIFICATIONS];
let _auditListeners: Array<(log: AuditEntry[]) => void> = [];
let _notifListeners: Array<(notifs: Notification[]) => void> = [];
let _nextAuditId = INITIAL_AUDIT.length + 1;
let _nextNotifId = INITIAL_NOTIFICATIONS.length + 1;

function formatNow(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function addAuditEntry(entry: Omit<AuditEntry, 'id' | 'time'>) {
  const newEntry: AuditEntry = { id: _nextAuditId++, time: formatNow(), ...entry };
  _auditLog = [newEntry, ..._auditLog];
  _auditListeners.forEach((fn) => fn([..._auditLog]));
}

function addNotification(notif: Omit<Notification, 'id' | 'time' | 'timestamp' | 'read'>) {
  const newNotif: Notification = { id: _nextNotifId++, time: 'Just now', timestamp: Date.now(), read: false, ...notif };
  _notifications = [newNotif, ..._notifications];
  _notifListeners.forEach((fn) => fn([..._notifications]));
}

function markAllRead() {
  _notifications = _notifications.map((n) => ({ ...n, read: true }));
  _notifListeners.forEach((fn) => fn([..._notifications]));
}

function markOneRead(id: number) {
  _notifications = _notifications.map((n) => n.id === id ? { ...n, read: true } : n);
  _notifListeners.forEach((fn) => fn([..._notifications]));
}

function useAuditLog() {
  const [log, setLog] = useState<AuditEntry[]>([..._auditLog]);
  useEffect(() => {
    _auditListeners.push(setLog);
    return () => { _auditListeners = _auditListeners.filter((fn) => fn !== setLog); };
  }, []);
  return log;
}

function useNotifications() {
  const [notifs, setNotifs] = useState<Notification[]>([..._notifications]);
  useEffect(() => {
    _notifListeners.push(setNotifs);
    return () => { _notifListeners = _notifListeners.filter((fn) => fn !== setNotifs); };
  }, []);
  return notifs;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function calcAge(dob: string) {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Active: 'bg-green-100 text-green-700',
    Suspended: 'bg-yellow-100 text-yellow-700',
    Released: 'bg-gray-100 text-gray-600',
    Pending: 'bg-blue-100 text-blue-700',
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
    'More Info Needed': 'bg-orange-100 text-orange-700',
    Inactive: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${colors[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

const CATEGORY_META: Record<AuditCategory, { icon: string; color: string; label: string }> = {
  player: { icon: '⚽', color: 'bg-blue-100 text-blue-700', label: 'Player' },
  staff: { icon: '👥', color: 'bg-purple-100 text-purple-700', label: 'Staff' },
  application: { icon: '📋', color: 'bg-orange-100 text-orange-700', label: 'Application' },
  content: { icon: '📰', color: 'bg-green-100 text-green-700', label: 'Content' },
  settings: { icon: '⚙️', color: 'bg-gray-100 text-gray-700', label: 'Settings' },
  system: { icon: '🔒', color: 'bg-slate-100 text-slate-600', label: 'System' },
};

const NOTIF_META: Record<Notification['type'], { icon: string; color: string }> = {
  application: { icon: '📋', color: 'bg-blue-50 border-blue-200' },
  approved: { icon: '✅', color: 'bg-green-50 border-green-200' },
  rejected: { icon: '❌', color: 'bg-red-50 border-red-200' },
  staff: { icon: '👥', color: 'bg-purple-50 border-purple-200' },
  player: { icon: '⚽', color: 'bg-orange-50 border-orange-200' },
  content: { icon: '📰', color: 'bg-teal-50 border-teal-200' },
  info: { icon: 'ℹ️', color: 'bg-gray-50 border-gray-200' },
};

// ─── Login Form ───────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: (u: AuthUser) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    if (!data.user) {
      setError('Sign in failed. Please try again.');
      return;
    }

    const role = (data.user.user_metadata?.role || 'player') as Role;

    const name =
      data.user.user_metadata?.name ||
      data.user.email?.split('@')[0] ||
      'User';

    onLogin({
      role,
      email: data.user.email || email,
      name,
    });
  } catch (err) {
    console.error(err);
    setError('Something went wrong while signing in.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pitch-pattern opacity-10" />
      <div className="absolute top-20 right-20 w-72 h-72 blob-green opacity-15 pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
  src="/assets/images/lakesite.jpg"
  alt="Lakesite Soccer Academy"
  className="w-[52px] h-[52px] object-contain rounded-xl"
/>
            <div>
              <span className="text-white font-extrabold text-lg block leading-tight">LAKESITE SOCCER</span>
              <span className="text-white/50 text-xs tracking-widest">ACADEMY</span>
            </div>
          </div>
          <p className="text-white/50 text-sm">Staff & Administration Portal</p>
        </div>
        <div className="glass-card rounded-3xl p-8">
<h2 className="text-white font-extrabold text-xl mb-6">Sign In</h2>

<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1.5">
      Email
    </label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#800020] transition-colors"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1.5">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#800020] transition-colors"
                placeholder="Enter password" />
            </div>
            {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full bg-[#800020] text-white font-bold py-3.5 rounded-full hover:bg-[#6b0019] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>
        <div className="text-center mt-6">
          <Link href="/" className="text-white/40 text-xs hover:text-white/60 transition-colors">← Back to Website</Link>
        </div>
      </div>
    </div>
  );
}

// ─── Notification Bell ────────────────────────────────────────────────────────
function NotificationBell() {
  const notifications = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Notifications"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#800020] text-white text-[10px] rounded-full flex items-center justify-center font-bold px-1 animate-pulse">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-96 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-gray-900 text-sm">Notifications</span>
              {unread > 0 && (
                <span className="bg-[#800020] text-white text-xs font-bold px-2 py-0.5 rounded-full">{unread} new</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unread > 0 && (
                <button onClick={markAllRead} className="text-xs text-[#800020] font-semibold hover:underline">
                  Mark all read
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 ml-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">No notifications</div>
            ) : (
              notifications.map((n) => {
                const meta = NOTIF_META[n.type];
                return (
                  <div
                    key={n.id}
                    onClick={() => markOneRead(n.id)}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${!n.read ? 'bg-blue-50/60' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg shrink-0 mt-0.5">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${!n.read ? 'text-gray-900' : 'text-gray-600'}`}>{n.message}</p>
                        {n.detail && <p className="text-xs text-gray-400 mt-0.5">{n.detail}</p>}
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-[#800020] shrink-0 mt-1.5" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50 text-center">
            <span className="text-xs text-gray-400">{notifications.length} total notifications</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ role }: { role: Role }) {
  const notifications = useNotifications();
  const auditLog = useAuditLog();
  const totalRevenue = 0;
  const monthRevenue = 0;
 const pending = 0;

  const stats = [{ label: 'Total Players', value: 0, icon: '⚽', color: 'bg-[#800020]', sub: 'Registered' },

    { label: 'Total Staff', value: 0, icon: '👥', color: 'bg-gray-700', sub: 'Active members' },
    { label: 'Pending Applications', value: pending, icon: '📋', color: 'bg-blue-600', sub: 'Awaiting review' },
    { label: 'Age Groups', value: 6, icon: '🏷️', color: 'bg-purple-600', sub: 'Active categories' },
    ...(role === 'ceo' ? [
      { label: 'Monthly Revenue', value: `KSh ${monthRevenue.toLocaleString()}`, icon: '💰', color: 'bg-green-700', sub: 'August 2024' },
      { label: 'Total Revenue', value: `KSh ${totalRevenue.toLocaleString()}`, icon: '📈', color: 'bg-emerald-700', sub: 'Year to date' },
    ] : []),
  ]

  const unreadNotifs = notifications.filter((n) => !n.read);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-1">Dashboard Overview</h2>
        <p className="text-gray-500 text-sm">Welcome to Lakesite Soccer Academy management portal.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3`}>{stat.icon}</div>
            <div className="text-2xl font-extrabold text-gray-900 mb-0.5">{stat.value}</div>
            <div className="font-semibold text-gray-700 text-sm">{stat.label}</div>
            <div className="text-gray-400 text-xs mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Unread Notifications Alert */}
      {unreadNotifs.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-600 font-extrabold text-sm">🔔 {unreadNotifs.length} New Notification{unreadNotifs.length > 1 ? 's' : ''}</span>
            <button onClick={markAllRead} className="ml-auto text-xs text-blue-600 font-semibold hover:underline">Mark all read</button>
          </div>
          <div className="space-y-2">
            {unreadNotifs.slice(0, 3).map((n) => (
              <div key={n.id} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-blue-100">
                <span>{NOTIF_META[n.type].icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{n.message}</p>
                  {n.detail && <p className="text-xs text-gray-400">{n.detail}</p>}
                </div>
                <span className="text-xs text-gray-400 shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity from Audit Log */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-gray-900">Recent Activity</h3>
          <span className="text-xs text-gray-400">Live audit log</span>
        </div>
        <div className="space-y-2">
          {auditLog.slice(0, 6).map((entry) => {
            const meta = CATEGORY_META[entry.category];
            return (
              <div key={entry.id} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                <span className={`text-sm px-2 py-0.5 rounded-lg font-bold shrink-0 ${meta.color}`}>{meta.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-snug">{entry.action}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{entry.user} · {entry.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-extrabold text-gray-900 mb-4">Recent Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-semibold text-xs">Reference</th>
                <th className="text-left py-2 text-gray-500 font-semibold text-xs">Player</th>
                <th className="text-left py-2 text-gray-500 font-semibold text-xs">Age Group</th>
                <th className="text-left py-2 text-gray-500 font-semibold text-xs">Date</th>
                <th className="text-left py-2 text-gray-500 font-semibold text-xs">Status</th>
              </tr>
            </thead>
           <tbody>
  <tr>
    <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
      No applications found.
    </td>
  </tr>
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Players Tab ──────────────────────────────────────────────────────────────
function PlayersTab({ role, currentUser }: { role: Role; currentUser: AuthUser }) {
const [players, setPlayers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [ageFilter, setAgeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
 const [statsPlayer, setStatsPlayer] = useState<any | null>(null);
  const [statsForm, setStatsForm] = useState({ goals: 0, assists: 0, matches: 0, cleanSheets: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0 });
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const actorName = currentUser?.role === 'ceo' ? 'CEO' : currentUser?.name || 'Staff';

  const filtered = players.filter((p) => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase());
    const ma = ageFilter === 'All' || p.ageGroup === ageFilter;
    const mst = statusFilter === 'All' || p.status === statusFilter;
    return ms && ma && mst;
  });

  const changeStatus = (id: number, newStatus: string) => {
    const player = players.find((p) => p.id === id);
    if (!player) return;
    const prevStatus = player.status;
    setPlayers((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus as typeof p.status } : p));
    showToast(`Player status updated to ${newStatus}`);

    // Audit log entry
    addAuditEntry({
      user: actorName,
      role: currentUser?.role || 'staff',
      action: `Changed player status: ${player.name} → ${newStatus}`,
      category: 'player',
      detail: `Previous status: ${prevStatus}`,
    });

    // Notification for player release
    if (newStatus === 'Released') {
      addNotification({
        type: 'player',
        message: `Player released: ${player.name}`,
        detail: `${player.ageGroup} · ${player.position} — released by ${actorName}`,
      });
    } else if (newStatus === 'Suspended') {
      addNotification({
        type: 'player',
        message: `Player suspended: ${player.name}`,
        detail: `${player.ageGroup} · suspended by ${actorName}`,
      });
    }
  };

  const saveStats = () => {
    if (!statsPlayer) return;
    setPlayers((prev) => prev.map((p) => p.id === statsPlayer.id ? { ...p, ...statsForm } : p));
    setStatsPlayer(null);
    showToast('Player statistics updated successfully');
    addAuditEntry({
      user: actorName,
      role: currentUser?.role || 'staff',
      action: `Updated player statistics for ${statsPlayer.name}`,
      category: 'player',
      detail: `Goals: ${statsPlayer.goals}→${statsForm.goals}, Assists: ${statsPlayer.assists}→${statsForm.assists}, Matches: ${statsPlayer.matches}→${statsForm.matches}`,
    });
  };

  return (
    <div className="space-y-5">
      {toast && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold">{toast}</div>}

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900">Player Management</h2>
        {role === 'ceo' && (
          <button className="bg-[#800020] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#6b0019] transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
            Add Player
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="Search players..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020]" />
        <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#800020]">
          {['All', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18'].map((g) => <option key={g}>{g}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#800020]">
          {['All', 'Active', 'Suspended', 'Released'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Player', 'Age Group', 'Position', 'Jersey', 'Age', 'Status', 'Goals', 'Matches', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((player) => (
                <tr key={player.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{player.name}</td>
                  <td className="px-4 py-3 text-gray-600">{player.ageGroup}</td>
                  <td className="px-4 py-3 text-gray-600">{player.position}</td>
                  <td className="px-4 py-3 text-gray-600">#{player.jersey}</td>
                  <td className="px-4 py-3 text-gray-600">{calcAge(player.dob)}</td>
                  <td className="px-4 py-3"><StatusBadge status={player.status} /></td>
                  <td className="px-4 py-3 text-gray-600">{player.goals}</td>
                  <td className="px-4 py-3 text-gray-600">{player.matches}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setStatsPlayer(player); setStatsForm({ goals: player.goals, assists: player.assists, matches: player.matches, cleanSheets: player.cleanSheets, yellowCards: player.yellowCards, redCards: player.redCards, minutesPlayed: player.minutesPlayed }); }}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg hover:bg-blue-200 transition-colors font-semibold"
                      >Stats</button>
                      {role === 'ceo' && (
                        <>
                          {player.status === 'Active' && (
                            <button onClick={() => changeStatus(player.id, 'Suspended')} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg hover:bg-yellow-200 transition-colors font-semibold">Suspend</button>
                          )}
                          {player.status === 'Suspended' && (
                            <button onClick={() => changeStatus(player.id, 'Active')} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg hover:bg-green-200 transition-colors font-semibold">Restore</button>
                          )}
                          {player.status !== 'Released' && (
                            <button onClick={() => changeStatus(player.id, 'Released')} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-lg hover:bg-red-200 transition-colors font-semibold">Release</button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {statsPlayer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setStatsPlayer(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-extrabold text-gray-900 mb-4">Update Stats — {statsPlayer.name}</h3>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { key: 'matches', label: 'Matches Played' }, { key: 'goals', label: 'Goals' },
                { key: 'assists', label: 'Assists' }, { key: 'cleanSheets', label: 'Clean Sheets' },
                { key: 'minutesPlayed', label: 'Minutes Played' }, { key: 'yellowCards', label: 'Yellow Cards' },
                { key: 'redCards', label: 'Red Cards' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
                  <input type="number" min="0"
                    value={statsForm[key as keyof typeof statsForm]}
                    onChange={(e) => setStatsForm((p) => ({ ...p, [key]: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#800020]" />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStatsPlayer(null)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={saveStats} className="flex-1 bg-[#800020] text-white font-bold py-2.5 rounded-xl hover:bg-[#6b0019]">Save Stats</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Staff Tab ────────────────────────────────────────────────────────────────
function StaffTab({ currentUser }: { currentUser: AuthUser }) {
 const [staff, setStaff] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: '', ageGroup: '' });
  const [toast, setToast] = useState('');
  const actorName = currentUser?.role === 'ceo' ? 'CEO' : currentUser?.name || 'Staff';

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const toggleStatus = (id: number) => {
    const member = staff.find((s) => s.id === id);
    if (!member) return;
    const newStatus = member.status === 'Active' ? 'Inactive' : 'Active';
    setStaff((prev) => prev.map((s) => s.id === id ? { ...s, status: newStatus } : s));
    showToast('Staff status updated');
    addAuditEntry({
      user: actorName,
      role: 'ceo',
      action: `${newStatus === 'Inactive' ? 'Deactivated' : 'Activated'} staff account: ${member.name}`,
      category: 'staff',
      detail: `Role: ${member.role}`,
    });
    addNotification({
      type: 'staff',
      message: `Staff account ${newStatus === 'Inactive' ? 'deactivated' : 'activated'}: ${member.name}`,
      detail: `Role: ${member.role} — by ${actorName}`,
    });
  };

  const addStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.role) return;
    const added = { id: Date.now(), ...newStaff, status: 'Active', permissions: [] };
    setStaff((prev) => [...prev, added]);
    setNewStaff({ name: '', email: '', role: '', ageGroup: '' });
    setShowAdd(false);
    showToast('New staff member added successfully');
    addAuditEntry({
      user: actorName,
      role: 'ceo',
      action: `Added new staff member: ${newStaff.name} (${newStaff.role})`,
      category: 'staff',
      detail: `Email: ${newStaff.email}, Age Group: ${newStaff.ageGroup || 'Not assigned'}`,
    });
    addNotification({
      type: 'staff',
      message: `New staff member added: ${newStaff.name}`,
      detail: `Role: ${newStaff.role} — added by ${actorName}`,
    });
  };

  return (
    <div className="space-y-5">
      {toast && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold">{toast}</div>}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-gray-900">Staff Management</h2>
        <button onClick={() => setShowAdd(true)} className="bg-[#800020] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#6b0019] transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
          Add Staff
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Name', 'Email', 'Role', 'Age Group', 'Status', 'Permissions', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{s.name}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{s.email}</td>
                  <td className="px-4 py-3 text-gray-600">{s.role}</td>
                  <td className="px-4 py-3 text-gray-600">{s.ageGroup}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{s.permissions.length} permissions</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(s.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-colors ${s.status === 'Active' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                      {s.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-extrabold text-gray-900 mb-5">Add New Staff Member</h3>
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Full name' },
                { key: 'email', label: 'Email Address', placeholder: 'email@lakesiteacademy.ac.ke' },
                { key: 'role', label: 'Role/Title', placeholder: 'e.g. Assistant Coach' },
                { key: 'ageGroup', label: 'Assigned Age Group', placeholder: 'e.g. U14/U16' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">{label}</label>
                  <input value={newStaff[key as keyof typeof newStaff]}
                    onChange={(e) => setNewStaff((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020]"
                    placeholder={placeholder} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-2.5 rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={addStaff} className="flex-1 bg-[#800020] text-white font-bold py-2.5 rounded-xl hover:bg-[#6b0019]">Add Staff</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Applications Tab ─────────────────────────────────────────────────────────
function calculateAgeGroup(dateOfBirth: string) {
  if (!dateOfBirth) return 'Unknown';

  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  const monthDifference = today.getMonth() - dob.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  if (age <= 8) return 'U8';
  if (age <= 10) return 'U10';
  if (age <= 12) return 'U12';
  if (age <= 14) return 'U14';
  if (age <= 16) return 'U16';
  if (age <= 18) return 'U18';

  return '18+';
}
function ApplicationsTab({ role, currentUser }: { role: Role; currentUser: AuthUser }) {
  const [loading, setLoading] = useState(true);
    const [apps, setApps] = useState<any[]>([]);
    const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
 const [selected, setSelected] = useState<any | null>(null);
  const [toast, setToast] = useState('');
  const actorName = currentUser?.role === 'ceo' ? 'CEO' : currentUser?.name || 'Staff';

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  useEffect(() => {
  const loadApplications = async () => {
   setLoading(true);
setError('');

    const { data, error } = await supabase
      .from('player_applications')
      .select('*')
      .order('created_at', { ascending: false });
      console.log('APPLICATION DATA:', data);
console.log('APPLICATION ERROR:', error);

    if (error) {
  console.error('Error loading applications:', error);
  setError(error.message);
  showToast('Failed to load applications');
  setLoading(false);
  return;
}

    const formattedApps = (data || []).map((app) => ({
      id: app.id,
      ref: app.reference_number,
      name: `${app.first_name} ${app.last_name}`,
      ageGroup: calculateAgeGroup(app.date_of_birth),
      date: new Date(app.created_at).toLocaleDateString(),
      guardian: app.guardian_name,
      phone: app.guardian_phone,
      status: app.status,

      // Full application information
      firstName: app.first_name,
      lastName: app.last_name,
      dateOfBirth: app.date_of_birth,
      gender: app.gender,
      position: app.position,
      previousClub: app.previous_club,
      guardianEmail: app.guardian_email,
      address: app.address,
      emergencyContact: app.emergency_contact,
      emergencyPhone: app.emergency_phone,
      medicalConditions: app.medical_conditions,
      additionalNotes: app.additional_notes,
      createdAt: app.created_at,
      updatedAt: app.updated_at,
    }));

    setApps(formattedApps);
    setLoading(false);
  };

  loadApplications();
}, []);

  const updateStatus = async (id: number, newStatus: string) => {
    const app = apps.find((a) => a.id === id);
    if (!app) return;
    const prevStatus = app.status;
    const { error } = await supabase
  .from('player_applications')
  .update({
    status: newStatus,
    updated_at: new Date().toISOString(),
  })
  .eq('id', id);

if (error) {
  console.error('Error updating application:', error);
  showToast('Failed to update application');
  return;
}
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, status: newStatus } : a));
    setSelected(null);
    showToast(`Application ${newStatus.toLowerCase()}`);

    addAuditEntry({
      user: actorName,
      role: currentUser?.role || 'staff',
      action: `${newStatus} application ${app.ref} (${app.name})`,
      category: 'application',
      detail: `Status changed from ${prevStatus} to ${newStatus}`,
    });

    const notifType: Notification['type'] = newStatus === 'Approved' ? 'approved' : newStatus === 'Rejected' ? 'rejected' : 'info';
    addNotification({
      type: notifType,
      message: `Application ${newStatus.toLowerCase()}: ${app.name}`,
      detail: `${app.ref} · ${app.ageGroup} — by ${actorName}`,
    });
  };
const filtered = apps.filter((a) => {
  const name = (a.name || '').toLowerCase();
  const ref = (a.ref || '').toLowerCase();
  const searchText = search.toLowerCase();

  const ms = name.includes(searchText) || ref.includes(searchText);
  const mst = statusFilter === 'All' || a.status === statusFilter;

  return ms && mst;
});

  return (
    <div className="space-y-5">
      {toast && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold">{toast}</div>}

      <h2 className="text-xl font-extrabold text-gray-900">Application Management</h2>
      {error && (
  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
    {error}
  </div>
)}

      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="Search by name or reference..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020]" />
        <div className="flex gap-2 flex-wrap">
          {['All', 'Pending', 'Approved', 'Rejected', 'More Info Needed'].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${statusFilter === s ? 'bg-[#800020] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Reference', 'Player Name', 'Age Group', 'Date', 'Guardian', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
           <tbody>
  {loading ? (
    <tr>
      <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
        Loading applications...
      </td>
    </tr>
  ) : filtered.length === 0 ? (
    <tr>
      <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
        No applications found.
      </td>
    </tr>
  ) : (
    filtered.map((app) => (
      <tr
        key={app.id}
        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
      >
        <td className="px-4 py-3 font-mono text-xs text-gray-600">
          {app.ref}
        </td>

        <td className="px-4 py-3 font-semibold text-gray-900">
          {app.name}
        </td>

        <td className="px-4 py-3 text-gray-600">
          {app.ageGroup}
        </td>

        <td className="px-4 py-3 text-gray-500 text-xs">
          {app.date}
        </td>

        <td className="px-4 py-3 text-gray-600">
          {app.guardian}
        </td>

        <td className="px-4 py-3">
          <StatusBadge status={app.status} />
        </td>

        <td className="px-4 py-3">
          <button
            onClick={() => setSelected(app)}
            className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg hover:bg-gray-200 font-semibold"
          >
            View
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-extrabold text-gray-900">Application Details</h3>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-3 mb-5">
              {[
                { label: 'Reference', value: selected.ref },
                { label: 'Player Name', value: selected.name },
                { label: 'Age Group', value: selected.ageGroup },
                { label: 'Application Date', value: selected.date },
                { label: 'Guardian', value: selected.guardian },
                { label: 'Phone', value: selected.phone },
                { label: 'Current Status', value: selected.status },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">{label}:</span>
                  <span className="text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
            {(role === 'ceo' || role === 'staff') && selected.status === 'Pending' && (
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => updateStatus(selected.id, 'Approved')} className="bg-green-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-green-700">Approve</button>
                <button onClick={() => updateStatus(selected.id, 'More Info Needed')} className="bg-orange-500 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-orange-600">More Info</button>
                <button onClick={() => updateStatus(selected.id, 'Rejected')} className="bg-red-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-red-700">Reject</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Revenue Tab ──────────────────────────────────────────────────────────────
function RevenueTab() {
  const totalRevenue = 0;
 const monthRevenue = { registration: 0, training: 0, kits: 0, other: 0 };
  const monthTotal = monthRevenue.registration + monthRevenue.training + monthRevenue.kits + monthRevenue.other;

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-extrabold text-gray-900">Revenue & Finance</h2>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-yellow-800 text-xs font-semibold">
        🔒 This section is restricted to CEO access only.
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue (YTD)', value: `KSh ${totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-green-700' },
          { label: 'August Revenue', value: `KSh ${monthTotal.toLocaleString()}`, icon: '📅', color: 'bg-[#800020]' },
          { label: 'Registration Fees', value: 'KSh 0', icon: '📋', color: 'bg-blue-600' },
          { label: 'Training Fees', value: 'KSh 0', icon: '⚽', color: 'bg-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3`}>{stat.icon}</div>
            <div className="text-xl font-extrabold text-gray-900 mb-0.5">{stat.value}</div>
            <div className="text-gray-500 text-xs font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-extrabold text-gray-900 mb-4">Monthly Revenue Breakdown (KSh)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Month', 'Registration', 'Training Fees', 'Kit Sales', 'Other', 'Total'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-gray-500 font-semibold text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Content Tab ──────────────────────────────────────────────────────────────
function ContentTab({ currentUser }: { currentUser: AuthUser }) {
  const [activeSection, setActiveSection] = useState<'news' | 'gallery' | 'reports' | 'agegroups' | 'announcements'>('news');
  const [news, setNews] = useState([
    { id: 1, title: 'Lakesite U16 Clinches Regional Championship', date: '2024-08-05', published: true },
    { id: 2, title: 'New Training Facilities Unveiled', date: '2024-07-28', published: true },
    { id: 3, title: 'Player Spotlight: James Ochieng', date: '2024-07-15', published: true },
    { id: 4, title: '2024/25 Season Registration Open', date: '2024-07-01', published: false },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [toast, setToast] = useState('');
  const actorName = currentUser?.role === 'ceo' ? 'CEO' : currentUser?.name || 'Staff';

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const togglePublish = (id: number) => {
    const article = news.find((n) => n.id === id);
    if (!article) return;
    const willPublish = !article.published;
    setNews((prev) => prev.map((n) => n.id === id ? { ...n, published: willPublish } : n));
    showToast(`Article ${willPublish ? 'published' : 'unpublished'}`);
    addAuditEntry({
      user: actorName,
      role: currentUser?.role || 'staff',
      action: `${willPublish ? 'Published' : 'Unpublished'} news article: ${article.title}`,
      category: 'content',
      detail: `Article ${willPublish ? 'is now live' : 'moved to draft'}`,
    });
    if (willPublish) {
      addNotification({
        type: 'content',
        message: `News article published: ${article.title}`,
        detail: `Published by ${actorName}`,
      });
    }
  };

  const deleteNews = (id: number) => {
    const article = news.find((n) => n.id === id);
    if (!article) return;
    setNews((prev) => prev.filter((n) => n.id !== id));
    showToast('Article deleted');
    addAuditEntry({
      user: actorName,
      role: currentUser?.role || 'staff',
      action: `Deleted news article: ${article.title}`,
      category: 'content',
      detail: `Article permanently removed`,
    });
  };

  const addNews = () => {
    if (!newTitle.trim()) return;
    setNews((prev) => [...prev, { id: Date.now(), title: newTitle, date: new Date().toISOString().split('T')[0], published: false }]);
    setNewTitle('');
    setShowAdd(false);
    showToast('Article created (draft)');
    addAuditEntry({
      user: actorName,
      role: currentUser?.role || 'staff',
      action: `Created news article draft: ${newTitle}`,
      category: 'content',
      detail: 'Saved as draft — not yet published',
    });
  };

  const publishAnnouncement = (text: string) => {
    if (!text.trim()) return;
    addAuditEntry({
      user: actorName,
      role: currentUser?.role || 'staff',
      action: 'Published new announcement',
      category: 'content',
      detail: text.substring(0, 80) + (text.length > 80 ? '...' : ''),
    });
    addNotification({
      type: 'content',
      message: 'New announcement published',
      detail: `By ${actorName}: ${text.substring(0, 60)}${text.length > 60 ? '...' : ''}`,
    });
  };

  return (
    <div className="space-y-5">
      {toast && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold">{toast}</div>}

      <h2 className="text-xl font-extrabold text-gray-900">Content Management</h2>

      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'news', label: '📰 News' }, { id: 'gallery', label: '🖼️ Gallery' },
          { id: 'reports', label: '📊 Reports' }, { id: 'agegroups', label: '🏷️ Age Groups' },
          { id: 'announcements', label: '📢 Announcements' },
        ].map((s) => (
          <button key={s.id} onClick={() => setActiveSection(s.id as typeof activeSection)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeSection === s.id ? 'bg-[#800020] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'news' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-gray-900">News Articles</h3>
            <button onClick={() => setShowAdd(true)} className="bg-[#800020] text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#6b0019] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              New Article
            </button>
          </div>
          <div className="space-y-3">
            {news.map((article) => (
              <div key={article.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{article.title}</p>
                  <p className="text-gray-400 text-xs">{article.date}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${article.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {article.published ? 'Published' : 'Draft'}
                </span>
                <button onClick={() => togglePublish(article.id)} className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg hover:bg-blue-200 font-semibold">
                  {article.published ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => deleteNews(article.id)} className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-lg hover:bg-red-200 font-semibold">Delete</button>
              </div>
            ))}
          </div>
          {showAdd && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold text-gray-700 mb-2">Article Title</label>
              <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020] mb-3"
                placeholder="Enter article title..." />
              <div className="flex gap-2">
                <button onClick={() => setShowAdd(false)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-2 rounded-xl text-sm">Cancel</button>
                <button onClick={addNews} className="flex-1 bg-[#800020] text-white font-bold py-2 rounded-xl text-sm">Create Draft</button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSection === 'gallery' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-900 mb-4">Gallery Management</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {['Training Sessions (8)', 'Match Days (12)', 'Tournament 2024 (15)', 'Academy Events (6)'].map((album) => (
              <div key={album} className="bg-gray-50 rounded-xl p-3 border border-gray-100 text-center">
                <div className="text-2xl mb-1">🖼️</div>
                <p className="text-xs font-semibold text-gray-700">{album}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              addAuditEntry({ user: actorName, role: currentUser?.role || 'staff', action: 'Uploaded photos to gallery', category: 'content', detail: 'Gallery upload initiated' });
              showToast('Gallery upload initiated');
            }}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-gray-500 text-sm font-semibold hover:border-[#800020] hover:text-[#800020] transition-colors flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
            Upload Photos / Create Album
          </button>
        </div>
      )}

      {activeSection === 'reports' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-900 mb-4">Reports Management</h3>
          <div className="space-y-3 mb-4">
            {[
              { title: 'End of Season Report 2023/24', type: 'Academy Report', public: true },
              { title: 'U16 Championship Match Report', type: 'Match Report', public: true },
              { title: 'Q2 Player Development Report', type: 'Development Report', public: false },
            ].map((r) => (
              <div key={r.title} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{r.title}</p>
                  <p className="text-gray-400 text-xs">{r.type}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.public ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {r.public ? 'Public' : 'Private'}
                </span>
                <button
                  onClick={() => { addAuditEntry({ user: actorName, role: currentUser?.role || 'staff', action: `Deleted report: ${r.title}`, category: 'content', detail: r.type }); showToast('Report deleted'); }}
                  className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-lg hover:bg-red-200 font-semibold">Delete</button>
              </div>
            ))}
          </div>
          <button
            onClick={() => { addAuditEntry({ user: actorName, role: currentUser?.role || 'staff', action: 'Uploaded new report', category: 'content', detail: 'Report upload initiated' }); showToast('Report upload initiated'); }}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl py-4 text-gray-500 text-sm font-semibold hover:border-[#800020] hover:text-[#800020] transition-colors flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
            Upload New Report
          </button>
        </div>
      )}

      {activeSection === 'agegroups' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-gray-900">Age Groups</h3>
            <button className="bg-[#800020] text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#6b0019] flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              Add Group
            </button>
          </div>
          <div className="space-y-2">
            {['U8 — Mon/Wed/Fri 4-5:30pm — Coach: Mary Wanjiku — 12 players', 'U10 — Mon/Wed/Fri 4-5:30pm — Coach: Mary Wanjiku — 18 players', 'U12 — Tue/Thu/Sat 4-6pm — Coach: Mary Wanjiku — 22 players', 'U14 — Tue/Thu/Sat 4-6pm — Coach: Peter Kariuki — 25 players', 'U16 — Mon/Wed/Fri 5-7pm — Coach: Peter Kariuki — 28 players', 'U18 — Mon/Wed/Fri 5-7pm — Coach: Peter Kariuki — 20 players'].map((g) => (
              <div key={g} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                <p className="flex-1 text-sm text-gray-700">{g}</p>
                <button className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg font-semibold">Edit</button>
                <button className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-lg font-semibold">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'announcements' && (
        <AnnouncementsSection actorName={actorName} currentUser={currentUser} onPublish={publishAnnouncement} />
      )}
    </div>
  );
}

function AnnouncementsSection({ actorName, currentUser, onPublish }: { actorName: string; currentUser: AuthUser; onPublish: (text: string) => void }) {
  const [text, setText] = useState('');
  const [toast, setToast] = useState('');

  const handlePublish = () => {
    if (!text.trim()) return;
    onPublish(text);
    setText('');
    setToast('Announcement published successfully');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {toast && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold">{toast}</div>}
      <h3 className="font-extrabold text-gray-900 mb-4">Announcements</h3>
      <textarea rows={4} value={text} onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] resize-none mb-3"
        placeholder="Write an announcement for players and staff..." />
      <button onClick={handlePublish} className="bg-[#800020] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#6b0019] text-sm">
        Publish Announcement
      </button>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────
function SettingsTab({ currentUser }: { currentUser: AuthUser }) {
  const [settings, setSettings] = useState({
    academyName: 'Lakesite Soccer Academy',
    phone: '+254 700 000 000',
    email: 'info@lakesiteacademy.ac.ke',
    address: 'Lakesite School, Langata, Nairobi',
    facebook: 'LakesiteSoccerAcademy',
    twitter: '@LakesiteSA',
    instagram: '@lakesitesa',
    youtube: 'LakesiteSoccerAcademy',
    registrationOpen: true,
    publicGallery: true,
    publicReports: true,
  });
  const [saved, setSaved] = useState(false);
  const actorName = 'CEO';

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    addAuditEntry({
      user: actorName,
      role: 'ceo',
      action: 'Updated academy settings',
      category: 'settings',
      detail: `Academy name: ${settings.academyName}, Registration: ${settings.registrationOpen ? 'Open' : 'Closed'}`,
    });
  };

  return (
    <div className="space-y-5">
      {saved && <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-semibold">✅ Settings saved successfully</div>}

      <h2 className="text-xl font-extrabold text-gray-900">Academy Settings</h2>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-yellow-800 text-xs font-semibold">
        🔒 CEO access only. Changes here affect the entire application.
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-900 mb-4">Academy Information</h3>
          <div className="space-y-3">
            {[
              { key: 'academyName', label: 'Academy Name' }, { key: 'phone', label: 'Phone Number' },
              { key: 'email', label: 'Email Address' }, { key: 'address', label: 'Address' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
                <input value={settings[key as keyof typeof settings] as string}
                  onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020]" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-900 mb-4">Social Media Links</h3>
          <div className="space-y-3">
            {[
              { key: 'facebook', label: 'Facebook' }, { key: 'twitter', label: 'Twitter/X' },
              { key: 'instagram', label: 'Instagram' }, { key: 'youtube', label: 'YouTube' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-bold text-gray-600 mb-1">{label}</label>
                <input value={settings[key as keyof typeof settings] as string}
                  onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020]" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-900 mb-4">Academy Logo</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#800020] transition-colors cursor-pointer">
            <div className="text-4xl mb-2">🛡️</div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Upload Official Badge</p>
            <p className="text-xs text-gray-400">PNG, JPG up to 5MB. Recommended: 200×200px</p>
            <button className="mt-3 bg-[#800020] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#6b0019]">Choose File</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-900 mb-4">Feature Settings</h3>
          <div className="space-y-4">
            {[
              { key: 'registrationOpen', label: 'Registration Open', desc: 'Allow new player applications' },
              { key: 'publicGallery', label: 'Public Gallery', desc: 'Gallery visible to public visitors' },
              { key: 'publicReports', label: 'Public Reports', desc: 'Allow public access to reports' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                  <p className="text-gray-400 text-xs">{desc}</p>
                </div>
                <button
                  onClick={() => setSettings((p) => ({ ...p, [key]: !p[key as keyof typeof settings] }))}
                  className={`w-12 h-6 rounded-full transition-all duration-200 relative ${settings[key as keyof typeof settings] ? 'bg-[#800020]' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${settings[key as keyof typeof settings] ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={save} className="bg-[#800020] text-white font-bold px-8 py-3 rounded-full hover:bg-[#6b0019] transition-colors shadow-lg">
        Save All Settings
      </button>
    </div>
  );
}

// ─── Audit Log Tab ────────────────────────────────────────────────────────────
function AuditTab() {
  const auditLog = useAuditLog();
  const [categoryFilter, setCategoryFilter] = useState<AuditCategory | 'all'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'ceo' | 'staff'>('all');
  const [search, setSearch] = useState('');

  const filtered = auditLog.filter((entry) => {
    const matchCat = categoryFilter === 'all' || entry.category === categoryFilter;
    const matchRole = roleFilter === 'all' || entry.role === roleFilter;
    const matchSearch = !search || entry.action.toLowerCase().includes(search.toLowerCase()) || entry.user.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchRole && matchSearch;
  });

  const categoryCounts = auditLog.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Audit Log</h2>
          <p className="text-gray-500 text-sm mt-0.5">Real-time record of all CEO and staff actions</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Live
          </span>
          <span className="text-xs text-gray-400">{auditLog.length} entries</span>
        </div>
      </div>

      {/* Category Summary Cards */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
        {(Object.keys(CATEGORY_META) as AuditCategory[]).map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(categoryFilter === cat ? 'all' : cat)}
              className={`rounded-xl p-3 text-center border transition-all ${categoryFilter === cat ? 'border-[#800020] bg-[#800020]/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <div className="text-xl mb-1">{meta.icon}</div>
              <div className="text-lg font-extrabold text-gray-900">{categoryCounts[cat] || 0}</div>
              <div className="text-xs text-gray-500 font-medium">{meta.label}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="Search actions or users..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020]" />
        <div className="flex gap-2">
          {(['all', 'ceo', 'staff'] as const).map((r) => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${roleFilter === r ? 'bg-[#800020] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {r === 'all' ? 'All Roles' : r === 'ceo' ? '👑 CEO' : '👤 Staff'}
            </button>
          ))}
        </div>
        {(categoryFilter !== 'all' || roleFilter !== 'all' || search) && (
          <button onClick={() => { setCategoryFilter('all'); setRoleFilter('all'); setSearch(''); }}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 bg-gray-100 hover:bg-gray-200 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            Clear filters
          </button>
        )}
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs whitespace-nowrap">Date & Time</th>
                <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs">User</th>
                <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs">Category</th>
                <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs">Action</th>
                <th className="text-left px-4 py-3 text-gray-500 font-semibold text-xs hidden lg:table-cell">Detail</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">No entries match your filters</td></tr>
              ) : (
                filtered.map((entry, idx) => {
                  const meta = CATEGORY_META[entry.category];
                  const isNew = idx === 0 && entry.id > INITIAL_AUDIT.length;
                  return (
                    <tr key={entry.id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${isNew ? 'bg-blue-50/40' : ''}`}>
                      <td className="px-4 py-3 text-gray-500 text-xs font-mono whitespace-nowrap">{entry.time}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${entry.role === 'ceo' ? 'bg-[#800020] text-white' : 'bg-gray-200 text-gray-700'}`}>
                            {entry.role === 'ceo' ? '👑' : '👤'}
                          </span>
                          <span className="font-semibold text-gray-900 text-xs">{entry.user}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${meta.color}`}>{meta.icon} {meta.label}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 text-sm">{entry.action}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">{entry.detail || '—'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {auditLog.length} entries</span>
          <span className="text-xs text-gray-400">Updates in real-time as actions are performed</span>
        </div>
      </div>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────
function NotificationsTab() {
  const notifications = useNotifications();
  const [typeFilter, setTypeFilter] = useState<Notification['type'] | 'all'>('all');
  const unread = notifications.filter((n) => !n.read).length;

  const filtered = typeFilter === 'all' ? notifications : notifications.filter((n) => n.type === typeFilter);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Notifications</h2>
          <p className="text-gray-500 text-sm mt-0.5">Alerts for new applications and status changes</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-sm text-[#800020] font-bold hover:underline">
            Mark all {unread} as read
          </button>
        )}
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'application', 'approved', 'rejected', 'staff', 'player', 'content'] as const).map((t) => {
          const count = t === 'all' ? notifications.length : notifications.filter((n) => n.type === t).length;
          return (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${typeFilter === t ? 'bg-[#800020] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t !== 'all' && <span>{NOTIF_META[t].icon}</span>}
              <span className="capitalize">{t === 'all' ? 'All' : t}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${typeFilter === t ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 text-sm">No notifications</div>
        ) : (
          filtered.map((n) => {
            const meta = NOTIF_META[n.type];
            return (
              <div
                key={n.id}
                onClick={() => markOneRead(n.id)}
                className={`bg-white rounded-2xl border p-4 cursor-pointer hover:shadow-sm transition-all ${!n.read ? `${meta.color} border` : 'border-gray-100'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${!n.read ? 'text-gray-900' : 'text-gray-600'}`}>{n.message}</p>
                    {n.detail && <p className="text-xs text-gray-500 mt-0.5">{n.detail}</p>}
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                  {!n.read ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#800020] shrink-0 mt-1" />
                  ) : (
                    <span className="text-xs text-gray-300 shrink-0">Read</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── Player Dashboard ─────────────────────────────────────────────────────────
function PlayerDashboard({ user }: { user: AuthUser }) {
  const player = {
    name: user?.name || 'Player',
    position: '—',
    ageGroup: '—',
    jersey: '—',
    matches: 0,
    goals: 0,
    assists: 0,
    minutesPlayed: 0,
  };
  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-[#800020] to-[#6b0019] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-extrabold">
            {user?.name[0]}
          </div>
          <div>
            <h2 className="text-xl font-extrabold">{player.name}</h2>
            <p className="text-white/70">{player.position} · {player.ageGroup} · #{player.jersey}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ label: 'Matches', value: player.matches }, { label: 'Goals', value: player.goals }, { label: 'Assists', value: player.assists }, { label: 'Minutes', value: player.minutesPlayed }].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <div className="text-2xl font-extrabold text-[#800020]">{stat.value}</div>
            <div className="text-gray-500 text-xs font-medium mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-extrabold text-gray-900 mb-4">Training Schedule</h3>
        <div className="space-y-2">
          {['Monday — 5:00 PM – 7:00 PM — Lakesite School Ground', 'Wednesday — 5:00 PM – 7:00 PM — Lakesite School Ground', 'Friday — 5:00 PM – 7:00 PM — Lakesite School Ground'].map((s) => (
            <div key={s} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
              <span className="text-[#800020]">⚽</span>{s}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-extrabold text-gray-900 mb-3">Announcements</h3>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
          📢 Registration for the 2024/25 season is now open. Please ensure all fees are paid by September 1st.
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [auth, setAuth] = useState<AuthUser>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lsa_auth_v2');
      if (stored) setAuth(JSON.parse(stored));
    } catch {}
  }, []);

  const handleLogin = (user: AuthUser) => {
    localStorage.setItem('lsa_auth_v2', JSON.stringify(user));
    setAuth(user);
    setActiveTab('overview');
    if (user) {
      addAuditEntry({
        user: user.role === 'ceo' ? 'CEO' : user.name,
        role: user.role,
        action: `${user.role === 'ceo' ? 'CEO' : 'Staff'} logged into dashboard`,
        category: 'system',
        detail: `Email: ${user.email}`,
      });
    }
  };

  const handleLogout = () => {
    if (auth) {
      addAuditEntry({
        user: auth.role === 'ceo' ? 'CEO' : auth.name,
        role: auth.role,
        action: `${auth.role === 'ceo' ? 'CEO' : 'Staff'} logged out`,
        category: 'system',
        detail: `Session ended`,
      });
    }
    localStorage.removeItem('lsa_auth_v2');
    setAuth(null);
  };

  if (!auth) return <LoginForm onLogin={handleLogin} />;

  if (auth.role === 'player') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-[#800020] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            
           <img
  src="/assets/images/lakesite.jpg"
  alt="Lakesite Soccer Academy"
  className="w-9 h-9 object-contain rounded-lg"
/>
<span className="text-white font-extrabold">Player Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-sm hidden sm:block">{auth.name}</span>
            <button onClick={handleLogout} className="text-white/70 hover:text-white text-sm font-semibold">Sign Out</button>
          </div>
        </header>
        <main className="max-w-4xl mx-auto p-6"><PlayerDashboard user={auth} /></main>
      </div>
    );
  }

  const ceoTabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'players', label: 'Players', icon: '⚽' },
    { id: 'staff', label: 'Staff', icon: '👥' },
    { id: 'applications', label: 'Applications', icon: '📋' },
    { id: 'recruitment', label: 'Recruitment', icon: '🎯' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'content', label: 'Content', icon: '📰' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'audit', label: 'Audit Log', icon: '🔍' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const staffTabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'players', label: 'Players', icon: '⚽' },
    { id: 'applications', label: 'Applications', icon: '📋' },
    { id: 'content', label: 'Content', icon: '📰' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ];

  const tabs = auth.role === 'ceo' ? ceoTabs : staffTabs;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-60 bg-[#0f0f0f] flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <path d="M24 2L4 10v14c0 12 8.5 22.5 20 26 11.5-3.5 20-14 20-26V10L24 2z" fill="#800020" />
              <path d="M24 6L7 13v11c0 10 7 19 17 22 10-3 17-12 17-22V13L24 6z" fill="#6b0019" />
              <text x="24" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="sans-serif">LSA</text>
            </svg>
            <div>
              <span className="text-white font-extrabold text-sm block leading-tight">LAKESITE SA</span>
              <span className="text-white/40 text-xs capitalize">{auth.role} Portal</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {tabs.map((tab) => (
            <SidebarTabButton
              key={tab.id}
              tab={tab}
              active={activeTab === tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
            />
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#800020] flex items-center justify-center text-white font-bold text-sm">
              {auth.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{auth.email}</p>
              <p className="text-white/40 text-xs capitalize">{auth.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white/50 hover:text-white hover:bg-white/10 transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>
            Sign Out
          </button>
          <Link href="/" className="mt-1 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white/70 transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50" aria-label="Open sidebar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
            <div>
              <h1 className="text-gray-900 font-extrabold text-base leading-tight">{tabs.find((t) => t.id === activeTab)?.label || 'Dashboard'}</h1>
              <p className="text-gray-400 text-xs">Lakesite Soccer Academy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${auth.role === 'ceo' ? 'bg-[#800020]/10 text-[#800020]' : 'bg-gray-100 text-gray-600'}`}>
              {auth.role === 'ceo' ? '👑 CEO' : '👤 Staff'}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 overflow-auto">
          {activeTab === 'overview' && <OverviewTab role={auth.role} />}
          {activeTab === 'players' && <PlayersTab role={auth.role} currentUser={auth} />}
          {activeTab === 'staff' && auth.role === 'ceo' && <StaffTab currentUser={auth} />}
          {activeTab === 'applications' && <ApplicationsTab role={auth.role} currentUser={auth} />}
          {activeTab === 'recruitment' && auth.role === 'ceo' && (
            <div className="space-y-5">
              <h2 className="text-xl font-extrabold text-gray-900">Recruitment Management</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Recruits', value: 47, color: 'bg-[#800020]' },
                  { label: 'This Month', value: 12, color: 'bg-blue-600' },
                  { label: 'Approved', value: 38, color: 'bg-green-600' },
                  { label: 'Rejected', value: 9, color: 'bg-red-600' },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl mb-3`}>🎯</div>
                    <div className="text-2xl font-extrabold text-gray-900">{s.value}</div>
                    <div className="text-gray-500 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-extrabold text-gray-900 mb-4">Recruitment by Age Group</h3>
                <div className="space-y-3">
                  {[['U8', 5], ['U10', 8], ['U12', 10], ['U14', 9], ['U16', 8], ['U18', 7]].map(([group, count]) => (
                    <div key={group} className="flex items-center gap-3">
                      <span className="w-10 text-sm font-bold text-gray-700">{group}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3">
                        <div className="bg-[#800020] h-3 rounded-full" style={{ width: `${(Number(count) / 10) * 100}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-600 w-6">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'revenue' && auth.role === 'ceo' && <RevenueTab />}
          {activeTab === 'content' && <ContentTab currentUser={auth} />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'audit' && auth.role === 'ceo' && <AuditTab />}
          {activeTab === 'settings' && auth.role === 'ceo' && <SettingsTab currentUser={auth} />}
        </main>
      </div>
    </div>
  );
}

// Sidebar tab button with notification badge for notifications tab
function SidebarTabButton({ tab, active, onClick }: { tab: { id: Tab; label: string; icon: string }; active: boolean; onClick: () => void }) {
  const notifications = useNotifications();
  const unread = tab.id === 'notifications' ? notifications.filter((n) => !n.read).length : 0;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${active ? 'bg-[#800020] text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
    >
      <span>{tab.icon}</span>
      <span className="flex-1 text-left">{tab.label}</span>
      {unread > 0 && (
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${active ? 'bg-white/20 text-white' : 'bg-[#800020] text-white'}`}>
          {unread > 9 ? '9+' : unread}
        </span>
      )}
    </button>
  );
}

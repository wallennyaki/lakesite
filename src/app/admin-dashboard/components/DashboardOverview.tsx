'use client';
import React from 'react';


const stats = [
  { label: 'Total Registrations', val: 47, icon: '👥', color: 'bg-primary/10 text-primary', change: '+8 this month' },
  { label: 'Pending Review', val: 12, icon: '⏳', color: 'bg-yellow-100 text-yellow-700', change: '3 new today' },
  { label: 'Approved', val: 31, icon: '✅', color: 'bg-rose-100 text-rose-800', change: '2 approved today' },
  { label: 'Rejected', val: 4, icon: '❌', color: 'bg-red-100 text-red-700', change: '0 this month' },
];

const recentActivity = [
  { action: 'New registration', name: 'Amani Ochieng', time: '2 minutes ago', type: 'new' },
  { action: 'Registration approved', name: 'Fatuma Wanjiku', time: '1 hour ago', type: 'approved' },
  { action: 'News article published', name: 'U16 Championship Win', time: '3 hours ago', type: 'content' },
  { action: 'New registration', name: 'Tobias Mwenda', time: '5 hours ago', type: 'new' },
  { action: 'Registration rejected', name: 'Paul Kamau (duplicate)', time: 'Yesterday', type: 'rejected' },
];

interface Props { role: 'staff' | 'ceo'; }

export default function DashboardOverview({ role }: Props) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-secondary rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 pitch-pattern opacity-10" />
        <div className="relative z-10">
          <p className="text-white/60 text-sm mb-1">Welcome back,</p>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {role === 'ceo' ? '👑 CEO Dashboard' : '👤 Staff Dashboard'}
          </h2>
          <p className="text-white/50 text-sm mt-1">
            Lakesite Football Academy · {new Date().toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-lg mb-3`}>
              {s.icon}
            </div>
            <p className="text-2xl font-extrabold text-foreground">{s.val}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            <p className="text-xs text-primary mt-1 font-medium">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Age Group Breakdown */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-bold text-foreground mb-4">Registrations by Age Group</h3>
        <div className="space-y-3">
          {[
            { group: 'U8', count: 8, total: 47 },
            { group: 'U12', count: 14, total: 47 },
            { group: 'U16', count: 11, total: 47 },
            { group: 'U19', count: 9, total: 47 },
            { group: 'Senior', count: 5, total: 47 },
          ].map((item) => (
            <div key={item.group} className="flex items-center gap-3">
              <span className="text-xs font-bold text-primary w-12 shrink-0">{item.group}</span>
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${(item.count / item.total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-6 text-right shrink-0">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-bold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
              <span className="text-lg shrink-0 mt-0.5">
                {item.type === 'new' ? '🆕' : item.type === 'approved' ? '✅' : item.type === 'content' ? '📰' : '❌'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground truncate">{item.name}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {role === 'staff' && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-sm text-primary">
          <strong>Staff Note:</strong> CEO panel and analytics are only accessible with CEO credentials. Contact admin for elevated access.
        </div>
      )}
    </div>
  );
}
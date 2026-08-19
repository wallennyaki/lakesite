'use client';
import React, { useState } from 'react';

type Status = 'Pending' | 'Approved' | 'Rejected';
type Registration = {
  id: string;
  name: string;
  ageGroup: string;
  guardian: string;
  phone: string;
  position: string;
  date: string;
  status: Status;
};


  
const statusColors: Record<Status, string> = {
  Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  Approved: 'bg-green-100 text-green-700 border-green-200',
  Rejected: 'bg-red-100 text-red-700 border-red-200',
};

export default function RegistrationsTable() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filter, setFilter] = useState<Status | 'All'>('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Registration | null>(null);

  const filtered = registrations.filter((r) => {
    const matchFilter = filter === 'All' || r.status === filter;
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.ageGroup.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const updateStatus = (id: string, status: Status) => {
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    setSelected(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-foreground">Player Registrations</h2>
          <p className="text-sm text-muted-foreground">{registrations.length} total registrations</p>
        </div>
        <button className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors shadow-sm">
          + Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, ID, or age group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-card focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
        />
        <div className="flex gap-2">
          {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === s
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">ID</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Player</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Age Group</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Position</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((reg) => (
                <tr key={reg.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{reg.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{reg.name}</p>
                    <p className="text-xs text-muted-foreground">{reg.guardian}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                      {reg.ageGroup}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{reg.position}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">{reg.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[reg.status]}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(reg)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground text-sm">
                    No registrations found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-3xl p-7 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-extrabold text-foreground">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">{selected.id}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-border transition-colors"
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {[
                ['Age Group', selected.ageGroup],
                ['Position', selected.position],
                ['Guardian', selected.guardian],
                ['Phone', selected.phone],
                ['Registered', selected.date],
                ['Current Status', selected.status],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-foreground">{val}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Update Status</p>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selected.id, 'Approved')}
                  className="flex-1 bg-green-600 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-green-700 transition-colors"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'Pending')}
                  className="flex-1 bg-yellow-500 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-yellow-600 transition-colors"
                >
                  ⏳ Pending
                </button>
                <button
                  onClick={() => updateStatus(selected.id, 'Rejected')}
                  className="flex-1 bg-red-600 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-red-700 transition-colors"
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
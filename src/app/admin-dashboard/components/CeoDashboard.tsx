'use client';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const registrationTrend = [
  { month: 'Jan', registrations: 8, approved: 6 },
  { month: 'Feb', registrations: 12, approved: 10 },
  { month: 'Mar', registrations: 7, approved: 5 },
  { month: 'Apr', registrations: 15, approved: 13 },
  { month: 'May', registrations: 11, approved: 9 },
  { month: 'Jun', registrations: 18, approved: 16 },
  { month: 'Jul', registrations: 14, approved: 12 },
  { month: 'Aug', registrations: 9, approved: 7 },
];

const ageGroupData = [
  { group: 'U8', count: 8 },
  { group: 'U12', count: 14 },
  { group: 'U16', count: 11 },
  { group: 'U19', count: 9 },
  { group: 'Senior', count: 5 },
];

const staffList = [
  { name: 'David Ochieng', email: 'david@lakesitefootball.ac.ke', role: 'Head Coach', status: 'Active' },
  { name: 'Grace Wanjiku', email: 'grace@lakesitefootball.ac.ke', role: 'Youth Coach', status: 'Active' },
  { name: 'James Kamau', email: 'james@lakesitefootball.ac.ke', role: 'S&C Coach', status: 'Active' },
  { name: 'Patricia Mwangi', email: 'patricia@lakesitefootball.ac.ke', role: 'Administrator', status: 'Active' },
  { name: 'Robert Otieno', email: 'robert@lakesitefootball.ac.ke', role: 'Kit Manager', status: 'Inactive' },
];

type SiteSettings = { academyName: string; phone: string; email: string; twitter: string; facebook: string; instagram: string };

export default function CeoDashboard() {
  const [activeSection, setActiveSection] = useState<'analytics' | 'staff' | 'settings' | 'announcement'>('analytics');
  const [announcement, setAnnouncement] = useState('');
  const [announcementSent, setAnnouncementSent] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    academyName: 'Lakesite Football Academy',
    phone: '+254 700 000 000',
    email: 'info@lakesitefootball.ac.ke',
    twitter: '@LakesiteFA',
    facebook: 'LakesiteFootballAcademy',
    instagram: '@lakesitefa',
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const sections = [
    { id: 'analytics', label: '📈 Analytics', description: 'Registration trends and data' },
    { id: 'staff', label: '👥 Staff Management', description: 'View and manage staff accounts' },
    { id: 'settings', label: '⚙️ Site Settings', description: 'Update academy information' },
    { id: 'announcement', label: '📢 Announcements', description: 'Broadcast messages to staff' },
  ] as const;

  const handleSaveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleSendAnnouncement = () => {
    if (!announcement.trim()) return;
    setAnnouncementSent(true);
    setAnnouncement('');
    setTimeout(() => setAnnouncementSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* CEO Header */}
      <div className="bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">👑</span>
          <div>
            <h2 className="text-xl font-extrabold text-foreground">CEO Command Panel</h2>
            <p className="text-sm text-muted-foreground">Elevated access — full platform control</p>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`rounded-2xl p-4 text-left transition-all duration-200 border ${
              activeSection === s.id
                ? 'bg-primary text-white border-primary shadow-lg'
                : 'bg-card border-border text-foreground hover:border-primary/40 hover:bg-primary/5'
            }`}
          >
            <p className={`text-sm font-bold mb-0.5 ${activeSection === s.id ? 'text-white' : 'text-foreground'}`}>{s.label}</p>
            <p className={`text-xs leading-snug ${activeSection === s.id ? 'text-white/70' : 'text-muted-foreground'}`}>{s.description}</p>
          </button>
        ))}
      </div>

      {/* Analytics */}
      {activeSection === 'analytics' && (
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-5">Registration Trend — 2025</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={registrationTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="registrations"
                  stroke="#800020"
                  strokeWidth={2.5}
                  dot={{ fill: '#800020', r: 4 }}
                  name="Total Registrations"
                />
                <Line
                  type="monotone"
                  dataKey="approved"
                  stroke="#f5a623"
                  strokeWidth={2.5}
                  dot={{ fill: '#f5a623', r: 4 }}
                  name="Approved"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-bold text-foreground mb-5">Registrations by Age Group</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ageGroupData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="group" tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '13px' }}
                />
                <Bar dataKey="count" fill="#800020" radius={[6, 6, 0, 0]} name="Players" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue (Est.)', val: 'KES 282,500', icon: '💰', sub: 'This month' },
              { label: 'Avg. Registrations/Mo', val: '11.8', icon: '📊', sub: '2025 average' },
              { label: 'Retention Rate', val: '87%', icon: '🔄', sub: 'Players returning' },
              { label: 'Trial Conversion', val: '73%', icon: '⚽', sub: 'Trials to enrolled' },
            ].map((m) => (
              <div key={m.label} className="bg-card border border-border rounded-2xl p-5">
                <span className="text-2xl block mb-2">{m.icon}</span>
                <p className="text-xl font-extrabold text-foreground">{m.val}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                <p className="text-xs text-primary mt-1 font-medium">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Management */}
      {activeSection === 'staff' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-foreground">Staff Accounts</h3>
            <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              Add Staff
            </button>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {staffList.map((staff) => (
                  <tr key={staff.email} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{staff.name}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">{staff.email}</td>
                    <td className="px-4 py-3">
                      <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{staff.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${staff.status === 'Active' ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs font-semibold text-red-500 hover:underline">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Site Settings */}
      {activeSection === 'settings' && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h3 className="font-bold text-foreground">Academy Site Settings</h3>

          {settingsSaved && (
            <div className="bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 text-primary text-sm font-semibold">
              ✅ Settings saved successfully!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(settings) as (keyof SiteSettings)[]).map((key) => (
              <div key={key}>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="text"
                  value={settings[key]}
                  onChange={(e) => setSettings((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full border border-input rounded-xl px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveSettings}
            className="bg-primary text-white font-bold px-7 py-3 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            Save Settings
          </button>
        </div>
      )}

      {/* Announcements */}
      {activeSection === 'announcement' && (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h3 className="font-bold text-foreground">Broadcast Announcement</h3>
          <p className="text-sm text-muted-foreground">Send a message to all staff members. This will appear in their dashboard notifications.</p>

          {announcementSent && (
            <div className="bg-green-100 border border-green-300 rounded-xl px-4 py-3 text-green-700 text-sm font-semibold">
              📢 Announcement broadcast successfully to all staff!
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Announcement Message
            </label>
            <textarea
              rows={5}
              placeholder="e.g. Reminder: All coaches must submit their monthly training reports by Friday 5PM..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSendAnnouncement}
              disabled={!announcement.trim()}
              className="bg-accent text-accent-foreground font-bold px-7 py-3 rounded-full hover:bg-accent/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>
              Broadcast to All Staff
            </button>
            <span className="text-xs text-muted-foreground">
              Will be sent to {staffList.filter((s) => s.status === 'Active').length} active staff members
            </span>
          </div>

          {/* Previous announcements */}
          <div className="border-t border-border pt-5">
            <h4 className="text-sm font-bold text-foreground mb-3">Recent Announcements</h4>
            <div className="space-y-3">
              {[
                { msg: 'Season 2025/26 registration is now open. Please update your player lists by end of month.', date: '10/08/2025', by: 'CEO' },
                { msg: 'All coaches are required to complete the FKF refresher course by September 30.', date: '01/08/2025', by: 'CEO' },
                { msg: 'New training kit has arrived. Please collect from the store room this week.', date: '25/07/2025', by: 'CEO' },
              ].map((a, i) => (
                <div key={i} className="bg-muted rounded-xl p-4">
                  <p className="text-sm text-foreground leading-relaxed mb-2">{a.msg}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="bg-accent/20 text-accent font-bold px-2 py-0.5 rounded-full">{a.by}</span>
                    <span>{a.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
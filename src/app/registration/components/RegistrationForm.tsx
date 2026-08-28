'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
console.log('Using Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
type FormData = {
  fullName: string;
  dob: string;
  guardianName: string;
  phone: string;
  email: string;
  position: string;
  ageGroup: string;
  medicalNotes: string;
};

const initialForm: FormData = {
  fullName: '',
  dob: '',
  guardianName: '',
  phone: '',
  email: '',
  position: '',
  ageGroup: '',
  medicalNotes: '',
};

const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Not Sure Yet'];
const ageGroups = ['U8 (Ages 5–8)', 'U12 (Ages 9–12)', 'U16 (Ages 13–16)', 'U19 (Ages 17–19)', 'Senior (Ages 20+)'];

export default function RegistrationForm() {
    console.log('REGISTRATION FORM COMPONENT IS RUNNING');
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormData, val: string) => setForm((p) => ({ ...p, [field]: val }));

const handleSubmit = async (e: React.FormEvent) => {
  console.log('HANDLE SUBMIT CALLED');
  e.preventDefault();

  console.log('HANDLE SUBMIT STARTED');
  console.log('FORM DATA:', form);

  setLoading(true);
  const referenceNumber = `LFA-${new Date().getFullYear()}-${Math.floor(
    Math.random() * 9000
  ) + 1000}`;

  try {
    const nameParts = form.fullName.trim().split(/\s+/);

    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || 'N/A';

    const { error } = await supabase
      .from('player_applications')
      .insert({
        reference_number: referenceNumber,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: form.dob || null,
        position: form.position || null,
        guardian_name: form.guardianName,
        guardian_phone: form.phone,
        guardian_email: form.email || null,
        medical_conditions: form.medicalNotes || null,
        additional_notes: `Age Group: ${form.ageGroup}`,
        status: 'pending',
      });

    console.log('PLAYER APPLICATION ERROR:', error);

    if (error) {
      alert(`Supabase error: ${error.message}`);
      return;
    }

    alert(`Application saved! Reference: ${referenceNumber}`);

    setSubmitted(true);
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    alert('Something went wrong while submitting.');
  } finally {
    setLoading(false);
  }
};
 
  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-3xl p-10 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#800020" strokeWidth="2.5" strokeLinecap="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-2xl font-extrabold text-foreground mb-2">Registration Submitted!</h2>
        <p className="text-muted-foreground leading-relaxed mb-2">
          Thank you, <strong>{form.fullName}</strong>! Your registration for the <strong>{form.ageGroup}</strong> program has been received.
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          Our coaching team will review your application and contact you at <strong>{form.email || form.phone}</strong> within <strong>48 hours</strong>.
        </p>
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 mb-6 text-sm text-foreground/80">
          📋 <strong>Reference:</strong> LFA-{new Date().getFullYear()}-{Math.floor(Math.random() * 9000) + 1000}
        </div>
        <button
          onClick={() => { setSubmitted(false); setForm(initialForm); }}
          className="text-primary font-semibold text-sm hover:underline"
        >
          Register another player
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-7 space-y-5">
<h2 className="text-xl font-extrabold text-foreground mb-1">TEST 12345</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Fields marked <span className="text-red-500">*</span> are required.
      </p>

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Brian Mwangi"
            value={form.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            required
            value={form.dob}
            onChange={(e) => set('dob', e.target.value)}
            className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Parent / Guardian Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Joseph Mwangi"
          value={form.guardianName}
          onChange={(e) => set('guardianName', e.target.value)}
          className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Contact Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+254 7XX XXX XXX"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            placeholder="parent@example.com"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Position Played <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.position}
            onChange={(e) => set('position', e.target.value)}
            className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">Select position...</option>
            {positions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Age Group <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={form.ageGroup}
            onChange={(e) => set('ageGroup', e.target.value)}
            className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">Select age group...</option>
            {ageGroups.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>

      {/* Medical Notes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          Medical Notes / Conditions
        </label>
        <textarea
          rows={3}
          placeholder="Any allergies, injuries, or medical conditions we should know about..."
          value={form.medicalNotes}
          onChange={(e) => set('medicalNotes', e.target.value)}
          className="w-full border border-input rounded-xl px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Notice */}
      <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-sm text-foreground/80">
        <strong>📞 Note:</strong> Our team will contact you within 48 hours of submission to confirm your enrollment and schedule a trial session.
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-primary/90 transition-all duration-300 text-base shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
            Submitting...
          </>
        ) : (
          'Submit Registration'
        )}
      </button>
    </form>
  );
}
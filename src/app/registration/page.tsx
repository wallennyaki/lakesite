'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Step = 1 | 2 | 3;

interface FormData {
  // Step 1 - Player Info
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  position: string;
  previousClub: string;
  preferredAgeGroup: string;
  // Step 2 - Guardian & Contact
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianEmail: string;
  playerPhone: string;
  emergencyContact: string;
  emergencyPhone: string;
  address: string;
  // Step 3 - Additional
  biography: string;
  medicalNotes: string;
  howHeard: string;
}

const initialForm: FormData = {
  firstName: '', lastName: '', dob: '', gender: '', position: '', previousClub: '', preferredAgeGroup: '',
  guardianName: '', guardianRelationship: '', guardianPhone: '', guardianEmail: '', playerPhone: '',
  emergencyContact: '', emergencyPhone: '', address: '',
  biography: '', medicalNotes: '', howHeard: '',
};

const positions = ['Goalkeeper', 'Defender', 'Centre-Back', 'Full-Back', 'Midfielder', 'Defensive Midfielder', 'Attacking Midfielder', 'Winger', 'Forward', 'Striker', 'Not Sure Yet'];
const ageGroups = ['U8 (Ages 5–8)', 'U10 (Ages 8–10)', 'U12 (Ages 10–12)', 'U14 (Ages 12–14)', 'U16 (Ages 14–16)', 'U18 (Ages 16–18)', 'Senior (Ages 18+)'];
const genders = ['Male', 'Female', 'Prefer not to say'];
const relationships = ['Parent', 'Guardian', 'Sibling', 'Other'];
const howHeardOptions = ['Social Media', 'Friend/Family Referral', 'School', 'Flyer/Poster', 'Website', 'Other'];

function generateRef() {
  return `LSA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

export default function RegistrationPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field: keyof FormData, val: string) => setForm((p) => ({ ...p, [field]: val }));

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setRefNumber(generateRef());
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-[60px] py-20 px-6">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Application Submitted!</h1>
            <p className="text-gray-600 mb-2">Thank you, <strong>{form.firstName} {form.lastName}</strong>!</p>
            <p className="text-gray-600 mb-6">Your registration application has been received. Our team will review it and contact you within 48 hours.</p>
            <div className="bg-[#800020]/10 border border-[#800020]/30 rounded-2xl p-5 mb-8">
              <p className="text-sm text-gray-600 mb-1">Your Reference Number</p>
              <p className="text-2xl font-extrabold text-[#800020]">{refNumber}</p>
              <p className="text-xs text-gray-500 mt-1">Please keep this for your records</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-600 mb-8 text-left">
              <p className="font-bold text-gray-800 mb-2">What happens next?</p>
              <ol className="space-y-1.5">
                <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#800020] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>Our staff will review your application</li>
                <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#800020] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>You will be contacted at {form.guardianEmail || form.guardianPhone}</li>
                <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-full bg-[#800020] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>If approved, you will receive an invitation to join the academy</li>
              </ol>
            </div>
            <button
              onClick={() => { setSubmitted(false); setForm(initialForm); setStep(1); }}
              className="text-[#800020] font-semibold text-sm hover:underline"
            >
              Submit another application
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="bg-[#800020] py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">Join the Academy</span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">Player Registration</h1>
            <p className="text-white/70">Complete the form below to apply for a place at Lakesite Soccer Academy.</p>
          </div>
        </section>

        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {([1, 2, 3] as Step[]).map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-2 ${step >= s ? 'text-[#800020]' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step > s ? 'bg-[#800020] text-white' : step === s ? 'bg-[#800020] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {step > s ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg> : s}
                    </div>
                    <span className="text-xs font-semibold hidden sm:block">
                      {s === 1 ? 'Player Info' : s === 2 ? 'Contact Details' : 'Additional Info'}
                    </span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-[#800020]' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-1">Player Information</h2>
                  <p className="text-sm text-gray-500 mb-5">Fields marked <span className="text-red-500">*</span> are required.</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                      <input required value={form.firstName} onChange={(e) => set('firstName', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="First name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                      <input required value={form.lastName} onChange={(e) => set('lastName', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="Last name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
                      <input type="date" required value={form.dob} onChange={(e) => set('dob', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Gender <span className="text-red-500">*</span></label>
                      <select required value={form.gender} onChange={(e) => set('gender', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] bg-white transition-colors">
                        <option value="">Select gender</option>
                        {genders.map((g) => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Preferred Position <span className="text-red-500">*</span></label>
                      <select required value={form.position} onChange={(e) => set('position', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] bg-white transition-colors">
                        <option value="">Select position</option>
                        {positions.map((p) => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Preferred Age Group <span className="text-red-500">*</span></label>
                      <select required value={form.preferredAgeGroup} onChange={(e) => set('preferredAgeGroup', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] bg-white transition-colors">
                        <option value="">Select age group</option>
                        {ageGroups.map((g) => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Previous Club (if any)</label>
                    <input value={form.previousClub} onChange={(e) => set('previousClub', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="Previous club name or 'None'" />
                  </div>

                  <button
                    onClick={() => {
                      if (!form.firstName || !form.lastName || !form.dob || !form.gender || !form.position || !form.preferredAgeGroup) {
                        alert('Please fill in all required fields.');
                        return;
                      }
                      setStep(2);
                    }}
                    className="w-full bg-[#800020] text-white font-bold py-3.5 rounded-full hover:bg-[#6b0019] transition-colors"
                  >
                    Continue to Contact Details →
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-1">Contact & Guardian Details</h2>
                  <p className="text-sm text-gray-500 mb-5">Required for players under 18 years old.</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Guardian/Parent Name <span className="text-red-500">*</span></label>
                      <input required value={form.guardianName} onChange={(e) => set('guardianName', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Relationship <span className="text-red-500">*</span></label>
                      <select required value={form.guardianRelationship} onChange={(e) => set('guardianRelationship', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] bg-white transition-colors">
                        <option value="">Select</option>
                        {relationships.map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Guardian Phone <span className="text-red-500">*</span></label>
                      <input type="tel" required value={form.guardianPhone} onChange={(e) => set('guardianPhone', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="+254 7XX XXX XXX" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Guardian Email <span className="text-red-500">*</span></label>
                      <input type="email" required value={form.guardianEmail} onChange={(e) => set('guardianEmail', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="email@example.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Player Phone (if applicable)</label>
                    <input type="tel" value={form.playerPhone} onChange={(e) => set('playerPhone', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="+254 7XX XXX XXX" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Emergency Contact Name <span className="text-red-500">*</span></label>
                      <input required value={form.emergencyContact} onChange={(e) => set('emergencyContact', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">Emergency Phone <span className="text-red-500">*</span></label>
                      <input type="tel" required value={form.emergencyPhone} onChange={(e) => set('emergencyPhone', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="+254 7XX XXX XXX" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Home Address</label>
                    <input value={form.address} onChange={(e) => set('address', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors" placeholder="Area, Nairobi" />
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                    <button
                      onClick={() => {
                        if (!form.guardianName || !form.guardianPhone || !form.guardianEmail || !form.emergencyContact || !form.emergencyPhone) {
                          alert('Please fill in all required fields.');
                          return;
                        }
                        setStep(3);
                      }}
                      className="flex-1 bg-[#800020] text-white font-bold py-3.5 rounded-full hover:bg-[#6b0019] transition-colors"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-1">Additional Information</h2>
                  <p className="text-sm text-gray-500 mb-5">Help us understand the player better.</p>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Player Biography / About the Player</label>
                    <textarea
                      value={form.biography}
                      onChange={(e) => set('biography', e.target.value)}
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors resize-none"
                      placeholder="Tell us about the player's football journey, strengths, and goals..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Medical Notes / Conditions</label>
                    <textarea
                      value={form.medicalNotes}
                      onChange={(e) => set('medicalNotes', e.target.value)}
                      rows={2}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] transition-colors resize-none"
                      placeholder="Any medical conditions, allergies, or notes the coaching staff should know..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">How did you hear about us?</label>
                    <select value={form.howHeard} onChange={(e) => set('howHeard', e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#800020] bg-white transition-colors">
                      <option value="">Select an option</option>
                      {howHeardOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 rounded-2xl p-4 text-sm">
                    <p className="font-bold text-gray-800 mb-3">Application Summary</p>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <div><span className="text-gray-400">Player:</span> {form.firstName} {form.lastName}</div>
                      <div><span className="text-gray-400">DOB:</span> {form.dob}</div>
                      <div><span className="text-gray-400">Position:</span> {form.position}</div>
                      <div><span className="text-gray-400">Age Group:</span> {form.preferredAgeGroup}</div>
                      <div><span className="text-gray-400">Guardian:</span> {form.guardianName}</div>
                      <div><span className="text-gray-400">Contact:</span> {form.guardianPhone}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-50 transition-colors">
                      ← Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 bg-[#800020] text-white font-bold py-3.5 rounded-full hover:bg-[#6b0019] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                          Submitting...
                        </>
                      ) : 'Submit Application'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
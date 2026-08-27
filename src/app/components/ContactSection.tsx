'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  console.log('AUTH USER:', userData.user);
  console.log('AUTH ERROR:', userError);

  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    })
    .select();

  console.log('INSERT DATA:', data);
  console.log('INSERT ERROR:', error);

  if (error) {
    alert(`Supabase error: ${error.message}`);
    return;
  }

  alert('Message successfully saved!');
  setSent(true);
  setForm({ name: '', email: '', subject: '', message: '' });
};
  return (
    <section id="contact" className="bg-secondary py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pitch-pattern opacity-10" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-3 block">Get in Touch</span>
          <h2 className="text-section-xl font-extrabold text-white tracking-tight">
            Contact<br /><span className="text-accent">the Academy</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div className="space-y-6 animate-on-scroll">
            {[
              { icon: '📍', label: 'Address', val: 'Lakesite School, Langata\nNairobi, Kenya\n(Opposite Onyomka Estate)' },
              { icon: '📞', label: 'Phone', val: '+254 700 000 000' },
              { icon: '📧', label: 'Email', val: 'info@lakesitefootball.ac.ke' },
              { icon: '🕐', label: 'Office Hours', val: 'Mon–Fri: 8:00 AM – 6:00 PM\nSat: 7:00 AM – 2:00 PM' },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-2xl p-5 flex items-start gap-4">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">{item.label}</span>
                  <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{item.val}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="glass-card rounded-2xl overflow-hidden h-48 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/20" />
              <div className="relative z-10 text-center">
                <span className="text-4xl block mb-2">🗺️</span>
                <p className="text-white/60 text-sm">Lakesite School, Langata</p>
                <a
                  href="https://maps.google.com/?q=Lakesite+School+Langata+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-accent text-xs font-semibold hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-3xl p-7 animate-on-scroll stagger-2">
            {sent ? (
              <div className="text-center py-12">
                <span className="text-5xl block mb-4">✅</span>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-accent text-sm font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-5">Send a Message</h3>
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g. John Kariuki' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'e.g. Enrollment Inquiry' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs text-white/60 font-semibold uppercase tracking-wider mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-white/60 font-semibold uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground font-bold py-3.5 rounded-full hover:bg-accent/90 transition-all duration-300 text-base shadow-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
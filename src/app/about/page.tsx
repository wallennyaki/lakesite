import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="bg-[#800020] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">Who We Are</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">About Lakesite Soccer Academy</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Developing champions on and off the pitch since 2018, from the heart of Langata, Nairobi.
            </p>
          </div>
        </section>

        {/* History */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#800020] text-xs font-bold uppercase tracking-widest mb-3 block">Our Story</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-5">History of the Academy</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Lakesite Soccer Academy was founded in 2018 with a clear vision: to provide structured, professional football development for young players in Langata, Nairobi. Located at Lakesite School opposite Onyomka Estate, the academy was born from a passion for developing grassroots football talent in Kenya.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Starting with just two age groups and a handful of dedicated coaches, the academy has grown steadily into a respected institution in Nairobi West football. Today, Lakesite Soccer Academy runs programs from U8 through to Senior level, nurturing over 120 registered players.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our players have gone on to represent county teams, national youth squads, and professional clubs — a testament to the quality of development we provide.
                </p>
              </div>
              <div className="relative">
               <img
  src="/assets/images/1.jpg"
  alt="Lakesite Soccer Academy players training together"
  className="rounded-2xl shadow-xl w-full object-cover"
/>
                <div className="absolute -bottom-4 -left-4 bg-[#800020] text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-3xl font-extrabold">2018</div>
                  <div className="text-xs font-semibold opacity-80">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Vision */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
              {
                icon: '🎯',
                title: 'Our Mission',
                text: 'To identify, nurture, and develop football talent from grassroots level, providing every young player with professional coaching, mentorship, and competitive opportunities to reach their full potential.'
              },
              {
                icon: '👁️',
                title: 'Our Vision',
                text: 'To become the premier football development academy in East Africa, producing world-class players who excel both on the pitch and as responsible members of society.'
              },
              {
                icon: '⭐',
                title: 'Our Values',
                text: 'Discipline, Respect, Excellence, Teamwork, and Integrity. We believe football is a vehicle for character development and life skills that extend far beyond the pitch.'
              }]?.
              map((item) =>
              <div key={item?.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="text-4xl mb-4">{item?.icon}</div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-3">{item?.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item?.text}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Objectives */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <span className="text-[#800020] text-xs font-bold uppercase tracking-widest mb-3 block">What We Stand For</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Club Objectives</h2>
                <ul className="space-y-3">
                  {[
                  'Develop technically skilled, tactically aware footballers',
                  'Provide equal opportunities for all young players regardless of background',
                  'Build character, discipline, and leadership through sport',
                  'Create pathways to professional football in Kenya and beyond',
                  'Foster a love for the game and lifelong participation in sport',
                  'Engage with the local community and promote football in Langata',
                  'Maintain the highest standards of coaching and player welfare']?.
                  map((obj, i) =>
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#800020] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                      {obj}
                    </li>
                  )}
                </ul>
              </div>
              <div>
                <span className="text-[#800020] text-xs font-bold uppercase tracking-widest mb-3 block">How We Develop Players</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Coaching Philosophy</h2>
                <div className="space-y-4">
                  {[
                  { title: 'Player-Centred Approach', desc: 'Every training session is designed around the individual needs of each player, ensuring personalised development pathways.' },
                  { title: 'Technical Foundation', desc: 'We prioritise technical excellence — ball control, passing, shooting, and positional play — as the bedrock of all development.' },
                  { title: 'Tactical Intelligence', desc: 'Players are taught to understand the game deeply, read situations, and make intelligent decisions under pressure.' },
                  { title: 'Physical & Mental Strength', desc: 'We develop physical fitness, resilience, and mental toughness alongside technical skills.' }]?.
                  map((item) =>
                  <div key={item?.title} className="border-l-4 border-[#800020] pl-4">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{item?.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item?.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academy Structure */}
        <section className="py-16 px-6 bg-[#800020]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">Structure</span>
            <h2 className="text-3xl font-extrabold text-white mb-10">Academy Structure</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
              { label: 'Age Groups', value: '7', sub: 'U8 to Senior' },
              { label: 'Registered Players', value: '120+', sub: 'Active players' },
              { label: 'Coaching Staff', value: '8', sub: 'Qualified coaches' },
              { label: 'Years Active', value: '6+', sub: 'Since 2018' }]?.
              map((stat) =>
              <div key={stat?.label} className="bg-white/10 rounded-2xl p-5 text-white">
                  <div className="text-3xl font-extrabold mb-1">{stat?.value}</div>
                  <div className="font-semibold text-sm">{stat?.label}</div>
                  <div className="text-white/60 text-xs mt-1">{stat?.sub}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>);

}
'use client';
import React from 'react';
import Link from 'next/link';

const players = [
{
  name: 'James Ochieng',
  position: 'Forward',
  ageGroup: 'U16',
  jersey: 10,
  goals: 14,
  matches: 22,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d319c308-1772629704473.png",
  alt: 'Young male footballer in maroon jersey dribbling a football on a grass pitch'
},
{
  name: 'Brian Kamau',
  position: 'Midfielder',
  ageGroup: 'U14',
  jersey: 8,
  goals: 7,
  matches: 18,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18297e2de-1767565210597.png",
  alt: 'Young African footballer in training kit controlling a football'
},
{
  name: 'Kevin Mwangi',
  position: 'Goalkeeper',
  ageGroup: 'U18',
  jersey: 1,
  goals: 0,
  matches: 20,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d91e6e7c-1764678800613.png",
  alt: 'Young goalkeeper in green jersey diving to save a football'
},
{
  name: 'Samuel Otieno',
  position: 'Defender',
  ageGroup: 'U12',
  jersey: 4,
  goals: 2,
  matches: 15,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10f024b1d-1772167173531.png",
  alt: 'Young footballer in training kit standing on a football pitch'
}];


export default function FeaturedPlayersSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[#800020] text-xs font-bold uppercase tracking-widest mb-2 block">Our Players</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">Featured Players</h2>
          </div>
          <Link href="/players" className="hidden sm:flex items-center gap-2 text-[#800020] font-semibold text-sm hover:gap-3 transition-all">
            View All Players
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {players?.map((player) =>
          <div key={player?.name} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative overflow-hidden aspect-square bg-gray-100">
                <img
                src={player?.image}
                alt={player?.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
                <div className="absolute top-3 right-3 bg-[#800020] text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{player?.jersey}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-white/80 text-xs font-semibold">{player?.ageGroup}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{player?.name}</h3>
                <p className="text-[#800020] text-xs font-semibold mb-3">{player?.position}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span><strong className="text-gray-800">{player?.goals}</strong> Goals</span>
                  <span><strong className="text-gray-800">{player?.matches}</strong> Matches</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/players" className="inline-flex items-center gap-2 text-[#800020] font-semibold text-sm">
            View All Players
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>);

}
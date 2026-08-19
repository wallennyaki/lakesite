'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Player {
  id: number;
  name: string;
  position: string;
  ageGroup: string;
  jersey: number;
  dob: string;
  age: number;
  status: 'Active' | 'Suspended' | 'Released';
  goals: number;
  assists: number;
  matches: number;
  cleanSheets: number;
  biography: string;
  image: string;
  alt: string;
}

const players: Player[] = [
{
  id: 1,
  name: 'James Ochieng',
  position: 'Forward',
  ageGroup: 'U16',
  jersey: 10,
  dob: '2008-03-15',
  age: 16,
  status: 'Active',
  goals: 14,
  assists: 6,
  matches: 22,
  cleanSheets: 0,
  biography: 'James is a dynamic forward with exceptional pace and finishing ability. He joined the academy in 2021 and has been a consistent top scorer.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d319c308-1772629704473.png",
  alt: 'Young male footballer in maroon jersey dribbling a football on a grass pitch'
},
{
  id: 2,
  name: 'Brian Kamau',
  position: 'Midfielder',
  ageGroup: 'U14',
  jersey: 8,
  dob: '2010-07-22',
  age: 14,
  status: 'Active',
  goals: 7,
  assists: 12,
  matches: 18,
  cleanSheets: 0,
  biography: 'Brian is a creative central midfielder with excellent vision and passing range. Known for his work rate and leadership on the pitch.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_18297e2de-1767565210597.png",
  alt: 'Young African footballer in training kit controlling a football on a pitch'
},
{
  id: 3,
  name: 'Kevin Mwangi',
  position: 'Goalkeeper',
  ageGroup: 'U18',
  jersey: 1,
  dob: '2006-11-05',
  age: 17,
  status: 'Active',
  goals: 0,
  assists: 1,
  matches: 20,
  cleanSheets: 9,
  biography: 'Kevin is a commanding goalkeeper with excellent reflexes and shot-stopping ability. He has been with the academy since U12 level.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d91e6e7c-1764678800613.png",
  alt: 'Young goalkeeper in green jersey making a save during a football match'
},
{
  id: 4,
  name: 'Samuel Otieno',
  position: 'Defender',
  ageGroup: 'U12',
  jersey: 4,
  dob: '2012-04-18',
  age: 12,
  status: 'Active',
  goals: 2,
  assists: 3,
  matches: 15,
  cleanSheets: 0,
  biography: 'Samuel is a composed central defender with strong aerial ability and excellent reading of the game for his age.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0f1a92c-1773127075762.png",
  alt: 'Young footballer in training kit standing confidently on a football pitch'
},
{
  id: 5,
  name: 'David Njoroge',
  position: 'Midfielder',
  ageGroup: 'U16',
  jersey: 6,
  dob: '2008-09-30',
  age: 15,
  status: 'Active',
  goals: 5,
  assists: 9,
  matches: 21,
  cleanSheets: 0,
  biography: 'David is a box-to-box midfielder with tremendous energy and technical quality. He captains the U16 side.',
  image: "https://images.unsplash.com/photo-1674941136150-aa2f2df3e128",
  alt: 'Young footballer in maroon jersey running with a football on a grass pitch'
},
{
  id: 6,
  name: 'Peter Waweru',
  position: 'Winger',
  ageGroup: 'U18',
  jersey: 7,
  dob: '2007-01-12',
  age: 17,
  status: 'Active',
  goals: 11,
  assists: 8,
  matches: 19,
  cleanSheets: 0,
  biography: 'Peter is a tricky winger with exceptional dribbling skills and pace. He has attracted interest from several professional clubs.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d319c308-1772629704473.png",
  alt: 'Young footballer in action dribbling past a defender on a football pitch'
}];


const positions = ['All Positions', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Winger'];
const ageGroups = ['All Groups', 'U8', 'U10', 'U12', 'U14', 'U16', 'U18'];

export default function PlayersPage() {
  const [search, setSearch] = useState('');
  const [posFilter, setPosFilter] = useState('All Positions');
  const [ageFilter, setAgeFilter] = useState('All Groups');
  const [selected, setSelected] = useState<Player | null>(null);

  const filtered = players.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchPos = posFilter === 'All Positions' || p.position === posFilter;
    const matchAge = ageFilter === 'All Groups' || p.ageGroup === ageFilter;
    return matchSearch && matchPos && matchAge && p.status === 'Active';
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="bg-[#800020] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">Our Squad</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Player Directory</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Meet the talented players of Lakesite Soccer Academy across all age groups.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-6 bg-white border-b border-gray-100 sticky top-[60px] z-30 shadow-sm">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020] transition-colors" />
            
            <select
              value={posFilter}
              onChange={(e) => setPosFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020] bg-white">
              
              {positions.map((p) => <option key={p}>{p}</option>)}
            </select>
            <select
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#800020] bg-white">
              
              {ageGroups.map((g) => <option key={g}>{g}</option>)}
            </select>
          </div>
        </section>

        {/* Players Grid */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {filtered.length === 0 ?
            <div className="text-center py-20 text-gray-500">No players found matching your search.</div> :

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((player) =>
              <button
                key={player.id}
                onClick={() => setSelected(player)}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left">
                
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <img
                    src={player.image}
                    alt={player.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                      <div className="absolute top-2 right-2 bg-[#800020] text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                        {player.jersey}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{player.name}</h3>
                      <p className="text-[#800020] text-xs font-semibold">{player.position}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{player.ageGroup}</p>
                    </div>
                  </button>
              )}
              </div>
            }
          </div>
        </section>

        {/* Player Modal */}
        {selected &&
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          
            <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            
              <div className="relative">
                <img
                src={selected.image}
                alt={selected.alt}
                className="w-full h-56 object-cover rounded-t-3xl" />
              
                <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
                <div className="absolute bottom-4 left-4 bg-[#800020] text-white text-sm font-bold px-3 py-1 rounded-full">
                  #{selected.jersey} · {selected.ageGroup}
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{selected.name}</h2>
                <p className="text-[#800020] font-bold mb-1">{selected.position}</p>
                <p className="text-gray-500 text-sm mb-4">DOB: {selected.dob} · Age: {selected.age}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{selected.biography}</p>

                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                { label: 'Matches', value: selected.matches },
                { label: 'Goals', value: selected.goals },
                { label: 'Assists', value: selected.assists },
                { label: 'Clean Sheets', value: selected.cleanSheets }].
                map((stat) =>
                <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
                      <div className="text-xl font-extrabold text-[#800020]">{stat.value}</div>
                      <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                    </div>
                )}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${selected.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {selected.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        }
      </main>
      <Footer />
    </div>);

}
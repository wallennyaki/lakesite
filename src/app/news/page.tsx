'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


const newsArticles = [
{
  id: 1,
  title: 'Lakesite U16 Clinches Regional Championship Title',
  excerpt: 'Our U16 squad delivered a stunning performance to win the Nairobi West Regional Championship, defeating rivals 3-1 in the final at City Stadium.',
  content: 'In a thrilling final played at City Stadium, Nairobi, the Lakesite Soccer Academy U16 team delivered a masterclass performance to clinch the Nairobi West Regional Championship. Goals from James Ochieng (2) and David Njoroge sealed a 3-1 victory against strong opposition. The team, coached by Peter Kariuki, showed exceptional tactical discipline and technical quality throughout the tournament.',
  date: '2024-08-05',
  category: 'Match Report',
  image: "/assets/images/8.jpg",
  alt: 'Football team celebrating a championship victory on a grass pitch',
  author: 'Academy Staff'
},
{
  id: 2,
  title: 'New Training Facilities Unveiled at Lakesite School',
  excerpt: 'The academy has invested in state-of-the-art training equipment and upgraded facilities to enhance player development across all age groups.',
  content: 'Lakesite Soccer Academy is proud to announce the unveiling of upgraded training facilities at Lakesite School. The new equipment includes professional training cones, rebounders, agility ladders, and a new set of match balls. The CEO expressed confidence that the improved facilities will significantly enhance the quality of training for all age groups.',
  date: '2024-07-28',
  category: 'Academy News',
  image: "/assets/images/8.jpg",
  alt: 'Modern football training facility with equipment on a green pitch',
  author: 'Academy Staff'
},
{
  id: 3,
  title: 'Player Spotlight: James Ochieng — Rising Star',
  excerpt: 'We profile James Ochieng, our U16 top scorer who has been in outstanding form this season with 14 goals in 22 appearances.',
  content: 'James Ochieng has been the standout performer for Lakesite Soccer Academy this season. The 16-year-old forward has scored 14 goals in 22 appearances, earning recognition from scouts across Nairobi. James joined the academy at U12 level and has developed into one of the most exciting young forwards in the region.',
  date: '2024-07-15',
  category: 'Player Spotlight',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1336d7b27-1772797226673.png",
  alt: 'Young male footballer in maroon jersey celebrating a goal on a football pitch',
  author: 'Academy Staff'
},
{
  id: 4,
  title: '2024/25 Season Registration Now Open',
  excerpt: 'Registration for the 2024/25 season is now open for all age groups from U8 to Senior. Limited places available — apply early to secure your spot.',
  content: 'Lakesite Soccer Academy is pleased to announce that registration for the 2024/25 season is now officially open. Places are available across all age groups from U8 to Senior level. Interested players and parents are encouraged to complete the online registration form or visit the academy office at Lakesite School, Langata.',
  date: '2024-07-01',
  category: 'Registration',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12978773a-1770933217761.png",
  alt: 'Young footballers in training kits lined up on a football pitch ready for training',
  author: 'Academy Staff'
},
{
  id: 5,
  title: 'Academy Partners with Nairobi County Football Association',
  excerpt: 'A landmark partnership agreement has been signed between Lakesite Soccer Academy and the Nairobi County Football Association to enhance youth development.',
  content: 'Lakesite Soccer Academy has signed a landmark partnership agreement with the Nairobi County Football Association (NCFA). The partnership will provide academy players with access to county-level competitions, coaching workshops, and potential pathways to national youth teams. This is a significant milestone in the academy\'s development.',
  date: '2024-06-20',
  category: 'Partnership',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_154a503c6-1767702853329.png",
  alt: 'Football officials shaking hands at a partnership signing ceremony',
  author: 'Academy Staff'
},
{
  id: 6,
  title: 'Inter-Academy Tournament: Lakesite Finishes Runners-Up',
  excerpt: 'Our U14 team put in a commendable performance at the Inter-Academy Tournament, finishing as runners-up after a closely contested final.',
  content: 'The Lakesite Soccer Academy U14 team delivered an impressive performance at the Nairobi Inter-Academy Tournament, reaching the final before narrowly losing 2-1 to a strong opponent. The team showed tremendous character throughout the competition, winning four consecutive matches before the final. Coach Mary Wanjiku praised the team\'s development and resilience.',
  date: '2024-06-10',
  category: 'Tournament',
  image: "https://images.unsplash.com/photo-1677852199915-a180bdf8965e",
  alt: 'Young football team posing with runners-up trophy after a tournament',
  author: 'Academy Staff'
}];


const categories = ['All', 'Match Report', 'Academy News', 'Player Spotlight', 'Registration', 'Partnership', 'Tournament'];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<typeof newsArticles[0] | null>(null);

  const filtered = newsArticles?.filter((a) => activeCategory === 'All' || a?.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="bg-[#800020] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">Latest Updates</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Academy News</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Stay up to date with the latest news, match reports, and announcements from Lakesite Soccer Academy.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 px-6 bg-white border-b border-gray-100 sticky top-[60px] z-30">
          <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto pb-1">
            {categories?.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              activeCategory === cat ?
              'bg-[#800020] text-white' :
              'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
              }>
              
                {cat}
              </button>
            )}
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered?.map((article) =>
              <button
                key={article?.id}
                onClick={() => setSelected(article)}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left">
                
                  <div className="relative overflow-hidden aspect-video">
                    <img
                    src={article?.image}
                    alt={article?.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                    <div className="absolute top-3 left-3 bg-[#800020] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {article?.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-400 text-xs mb-2">{article?.date}</p>
                    <h3 className="font-extrabold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#800020] transition-colors">{article?.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{article?.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-[#800020] text-sm font-semibold">
                      Read More
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Article Modal */}
        {selected &&
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          
            <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e?.stopPropagation()}>
            
              <div className="relative">
                <img src={selected?.image} alt={selected?.alt} className="w-full h-64 object-cover rounded-t-3xl" />
                <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#800020] text-white text-xs font-bold px-2.5 py-1 rounded-full">{selected?.category}</span>
                  <span className="text-gray-400 text-xs">{selected?.date}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">{selected?.title}</h2>
                <p className="text-gray-600 leading-relaxed">{selected?.content}</p>
                <p className="text-gray-400 text-xs mt-4">By {selected?.author}</p>
              </div>
            </div>
          </div>
        }
      </main>
      <Footer />
    </div>);

}
'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Photo {
  id: number;
  src: string;
  alt: string;
  album: string;
  caption: string;
}

interface Album {
  id: number;
  name: string;
  count: number;
}

const albums: Album[] = [
{ id: 1, name: 'Training Sessions', count: 8 },
{ id: 2, name: 'Match Days', count: 12 },
{ id: 3, name: 'Tournament 2024', count: 15 },
{ id: 4, name: 'Academy Events', count: 6 }];


const photos: Photo[] = [
{ id: 1, src: "https://img.rocket.new/generatedImages/rocket_gen_img_1caaa17de-1777834002900.png", alt: 'Football players training together on a grass pitch in Nairobi', album: 'Training Sessions', caption: 'Morning training session' },
{ id: 2, src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d319c308-1772629704473.png", alt: 'Young footballer dribbling with a football during a match', album: 'Match Days', caption: 'U16 Regional Championship Final' },
{ id: 3, src: "https://img.rocket.new/generatedImages/rocket_gen_img_134d12fe6-1785622439617.png", alt: 'Football players in training kits lined up on a pitch', album: 'Training Sessions', caption: 'Pre-season training' },
{ id: 4, src: "https://images.unsplash.com/photo-1529278920603-29bdebaca498", alt: 'Goalkeeper making a save during a football match', album: 'Match Days', caption: 'Kevin Mwangi in action' },
{ id: 5, src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9af0f9e-1772169629751.png", alt: 'Young footballers celebrating after scoring a goal', album: 'Tournament 2024', caption: 'Celebrating the winning goal' },
{ id: 6, src: "https://images.unsplash.com/photo-1565547314169-859a493874e6", alt: 'Football players in action during a competitive match', album: 'Tournament 2024', caption: 'Inter-Academy Tournament' },
{ id: 7, src: "https://images.unsplash.com/photo-1635555418169-4cdd11826d3a", alt: 'Football pitch with goal posts at sunset in Nairobi', album: 'Academy Events', caption: 'Our home ground at Lakesite School' },
{ id: 8, src: "https://img.rocket.new/generatedImages/rocket_gen_img_103cc2133-1772884770813.png", alt: 'Football players warming up before a training session', album: 'Training Sessions', caption: 'Warm-up drills' },
{ id: 9, src: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae22ae84-1772097698442.png", alt: 'Young football players in a team huddle before a match', album: 'Match Days', caption: 'Team talk before kick-off' }];


export default function GalleryPage() {
  const [activeAlbum, setActiveAlbum] = useState<string>('All');
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = activeAlbum === 'All' ? photos : photos.filter((p) => p.album === activeAlbum);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-[60px]">
        {/* Hero */}
        <section className="bg-[#800020] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">Photo Gallery</span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Academy Gallery</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Moments from the pitch — training sessions, match days, tournaments, and academy life.
            </p>
          </div>
        </section>

        {/* Albums */}
        <section className="py-10 px-6 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveAlbum('All')}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeAlbum === 'All' ? 'bg-[#800020] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                
                All Photos ({photos.length})
              </button>
              {albums.map((album) =>
              <button
                key={album.id}
                onClick={() => setActiveAlbum(album.name)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeAlbum === album.name ? 'bg-[#800020] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                
                  {album.name} ({album.count})
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Photo Grid */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((photo) =>
              <button
                key={photo.id}
                onClick={() => setLightbox(photo)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                
                  <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <p className="text-white text-xs font-semibold p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                      {photo.caption}
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightbox &&
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          
            <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
              <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-2xl shadow-2xl" />
              <p className="text-white/80 text-sm text-center mt-3">{lightbox.caption}</p>
              <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg">
              
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        }
      </main>
      <Footer />
    </div>);

}
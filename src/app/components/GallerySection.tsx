'use client';
import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const categories = ['All', 'Training', 'Matches', 'Events', 'Team Photos'];

const photos = [
{ src: "/assets/images/2.jpg", alt: 'Players training on pitch at dusk, action shot with green jerseys', cat: 'Training', span: 'col-span-2 row-span-2' },
{ src: "/assets/images/3.jpg", alt: 'Youth players in a passing drill, coach watching, sunny afternoon', cat: 'Training', span: '' },
{ src: "/assets/images/4.jpg", alt: 'Team celebrating a goal, green jerseys, hands raised', cat: 'Matches', span: '' },
{ src: "/assets/images/1.jpg", alt: 'Match action — player dribbling past defender, crowd in background', cat: 'Matches', span: '' },
{ src: "/assets/images/2.jpg", alt: 'Training camp drills with young players in a line on grass', cat: 'Events', span: '' },
{ src: "/assets/images/3.jpg", alt: 'Full team photo on stadium pitch, green and gold kits, coach in center', cat: 'Team Photos', span: 'col-span-2' },
{ src: "/assets/images/4.jpg", alt: 'Aerial view of Lakesite School football pitch, white lines, green grass', cat: 'Events', span: '' },
{ src: "/assets/images/5.jpg", alt: 'Conditioning drill with players sprinting between cones on pitch', cat: 'Training', span: '' }];


export default function GallerySection() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === 'All' ? photos : photos?.filter((p) => p?.cat === active);

  return (
    <section id="gallery" className="bg-background py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Gallery</span>
          <h2 className="text-section-xl font-extrabold text-foreground tracking-tight">
            Life at<br /><span className="text-primary">Lakesite FA</span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-on-scroll stagger-2">
          {categories?.map((cat) =>
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            active === cat ?
            'bg-primary text-white shadow-lg' :
            'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'}`
            }>
            
              {cat}
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px]">
          {filtered?.map((photo, i) =>
          <div
            key={photo?.src + i}
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${photo?.span}`}
            onClick={() => setLightbox(photo?.src)}>
            
              <AppImage
              src={photo?.src}
              alt={photo?.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, 25vw" />
            
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {photo?.cat}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Lightbox */}
      {lightbox &&
      <div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
        onClick={() => setLightbox(null)}>
        
          <button
          onClick={() => setLightbox(null)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          aria-label="Close lightbox">
          
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <div
          className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
          onClick={(e) => e?.stopPropagation()}>
          
            <AppImage
            src={lightbox}
            alt="Gallery image expanded view"
            width={1200}
            height={800}
            className="object-contain w-full h-full" />
          
          </div>
        </div>
      }
    </section>);

}
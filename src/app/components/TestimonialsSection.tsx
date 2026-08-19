'use client';
import React, { useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  quote: 'My son joined Lakesite FA at U12 and within 18 months he was selected for the Nairobi West regional team. The coaches here are exceptional.',
  name: 'Margaret Achieng',
  role: 'Parent of U16 Player',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_157487ef7-1772198984574.png",
  alt: 'Kenyan woman smiling warmly, outdoor portrait',
  rotate: '-rotate-2'
},
{
  quote: 'The discipline and teamwork I learned at Lakesite FA changed my life. I now play in the FKF Premier League and I owe it all to Coach Ochieng.',
  name: 'Brian Otieno',
  role: 'Former Academy Player, FKF Premier League',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16462a2d6-1772798857015.png",
  alt: 'Young Kenyan man in football jersey, confident smile',
  rotate: 'rotate-1'
},
{
  quote: 'As a parent, I was impressed by the professionalism and the structured curriculum. My daughter loves every training session — she wakes up early on training days!',
  name: 'Joseph Mwangi',
  role: 'Parent of U8 Player',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b66a5095-1772199004332.png",
  alt: 'Middle-aged Kenyan man with warm expression, casual attire',
  rotate: '-rotate-1'
},
{
  quote: 'The Senior Squad program is exactly what I needed to stay sharp after university. Competitive, well-organized, and the facilities at Lakesite School are great.',
  name: 'Kevin Njoroge',
  role: 'Senior Squad Player',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_180d36757-1763296172839.png",
  alt: 'Young African man smiling outdoors in casual clothes',
  rotate: 'rotate-2'
},
{
  quote: 'Coach Grace is incredible with the young ones. My son used to be shy but now he leads warm-ups. The academy builds character, not just football skills.',
  name: 'Esther Kamau',
  role: 'Parent of U8 Player',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e6580498-1772093557110.png",
  alt: 'Kenyan woman in colorful attire, warm smile, natural light portrait',
  rotate: '-rotate-1'
}];


export default function TestimonialsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scroll = (dir: number) => {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir * 520, behavior: 'smooth' });
  };

  const updateButtons = () => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanPrev(scrollLeft > 10);
    setCanNext(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <section className="bg-background py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="animate-on-scroll">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Testimonials</span>
            <h2 className="text-section-xl font-extrabold text-foreground tracking-tight">
              Champions<br /><span className="text-primary">Speak.</span>
            </h2>
          </div>
          <div className="flex gap-3 animate-on-scroll stagger-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canPrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canNext}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-primary border border-primary flex items-center justify-center text-white hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          
          <div
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div
            ref={railRef}
            onScroll={updateButtons}
            className="flex gap-5 overflow-x-auto pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            
            {testimonials.map((t, i) =>
            <article
              key={t.name}
              className={`min-w-[320px] sm:min-w-[440px] max-w-[520px] bg-card border border-border rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow ${t.rotate}`}>
              
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) =>
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#f5a623"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  )}
                  </div>
                  <p className="text-foreground/80 text-base leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                    <AppImage
                    src={t.image}
                    alt={t.alt}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full" />
                  
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>);

}
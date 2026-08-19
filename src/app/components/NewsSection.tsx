import React from 'react';
import AppImage from '@/components/ui/AppImage';

const news = [
{
  title: 'Lakesite FA U16s Win Nairobi West Regional Championship',
  date: '28 Jul 2025',
  excerpt: 'Our U16 squad delivered a stunning 3-1 victory over Kibera FC in the final, securing the Nairobi West Regional Championship title for the second consecutive year.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aeb5c138-1772333559862.png",
  alt: 'Young football players celebrating a victory, green jerseys, trophy raised, sunny pitch',
  tag: 'Match Result'
},
{
  title: 'Holiday Training Camp: August 2025 Registration Open',
  date: '20 Jul 2025',
  excerpt: 'Our intensive 5-day holiday training camp runs August 18–22 at Lakesite School. Open to all age groups with limited spots available. Register before August 10.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b67ca9c3-1767196764619.png",
  alt: 'Football training camp with young players doing drills in a line on a grass pitch',
  tag: 'Event'
},
{
  title: 'Three Academy Players Called Up to Nairobi County Squad',
  date: '15 Jul 2025',
  excerpt: 'Congratulations to Brian Mutua (U19), Collins Odhiambo (U19), and Sheila Wambui (Senior) on their call-up to represent Nairobi County in the National Youth Games.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc32accf-1772167317575.png",
  alt: 'Kenyan youth football players in county kit posing for team photo on stadium grass',
  tag: 'Achievement'
},
{
  title: 'New Strength & Conditioning Programme Launches for U16+',
  date: '8 Jul 2025',
  excerpt: 'Coach James Kamau introduces a periodized strength and conditioning curriculum for our U16, U19, and Senior squads, designed to reduce injury and boost performance.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_194558146-1772204130238.png",
  alt: 'Football players doing athletic conditioning drills, cones on grass pitch, coach supervising',
  tag: 'Academy News'
},
{
  title: 'Partnership with Lakesite School Renewed for 5 More Years',
  date: '1 Jul 2025',
  excerpt: 'We are proud to announce the renewal of our long-standing partnership with Lakesite School, securing our home ground in Langata for the next five years.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_143e5bc94-1772134741494.png",
  alt: 'Aerial view of a well-maintained football pitch with white lines and green grass',
  tag: 'Partnership'
},
{
  title: 'FKF National Youth Tournament: Lakesite FA Advances to Semis',
  date: '22 Jun 2025',
  excerpt: 'Our U19 squad beat Mathare United Youth 2-0 in the FKF National Youth Tournament quarter-finals. Semi-final clash against Gor Mahia Youth set for July 12.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1097395b4-1764656196750.png",
  alt: 'Football match action shot with player dribbling past defender, crowd in background',
  tag: 'Tournament'
}];


export default function NewsSection() {
  return (
    <section id="news" className="bg-muted py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="animate-on-scroll">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Latest Updates</span>
            <h2 className="text-section-xl font-extrabold text-foreground tracking-tight">
              News &<br /><span className="text-primary">Events</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed animate-on-scroll stagger-2">
            Stay up to date with match results, training camps, and academy announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {news?.map((item, i) =>
          <article
            key={item?.title}
            className={`bg-card border border-border rounded-3xl overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-on-scroll stagger-${Math.min(i + 1, 5)}`}>
            
              <div className="relative h-48 overflow-hidden">
                <AppImage
                src={item?.image}
                alt={item?.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item?.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-2">{item?.date}</p>
                <h3 className="text-base font-bold text-foreground leading-snug mb-2 line-clamp-2">{item?.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item?.excerpt}</p>
                <button className="mt-4 text-primary text-sm font-semibold flex items-center gap-1.5 group/btn hover:gap-2.5 transition-all">
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/btn:translate-x-0.5 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}
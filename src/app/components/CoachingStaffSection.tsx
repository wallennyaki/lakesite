import React from 'react';
import AppImage from '@/components/ui/AppImage';

const coaches = [
{
  name: 'David Ochieng',
  role: 'Head Coach & Technical Director',
  bio: 'UEFA B License holder with 12 years of coaching experience. Former KPL player who has developed 50+ players into professional contracts.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1caaa17de-1777834002900.png",
  alt: 'African male coach in green training gear standing on football pitch, confident pose, sunny day',
  badges: ['UEFA B License', 'FKF Certified', '12 Years Exp.']
},
{
  name: 'Grace Wanjiku',
  role: 'Youth Development Coach',
  bio: 'Specialist in grassroots development and sports psychology. Leads the U8 and U12 programs with a fun-first philosophy that builds lasting skills.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1caaa17de-1777834002900.png",
  alt: 'Female African football coach in yellow training vest smiling at youth players on a green pitch',
  badges: ['FKF Level 2', 'Sports Psych', 'U12 Lead']
},
{
  name: 'James Kamau',
  role: 'Strength & Conditioning Coach',
  bio: 'Sports science graduate from University of Nairobi. Designs periodized training programs for U16, U19, and Senior squads to maximize athletic performance.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_140173f7a-1767728456792.png",
  alt: 'Athletic African male coach in black sportswear leading a training drill on a football field',
  badges: ['BSc Sports Science', 'NSCA Certified', 'Senior Lead']
}];


export default function CoachingStaffSection() {
  return (
    <section className="bg-background py-20 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 blob-green opacity-5 pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 animate-on-scroll">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Meet the Team</span>
          <h2 className="text-section-xl font-extrabold text-foreground tracking-tight">
            World-Class<br /><span className="text-primary">Coaching Staff</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
            Our certified coaches bring decades of playing and coaching experience to every training session.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coaches?.map((coach, i) =>
          <div
            key={coach?.name}
            className={`bg-card border border-border rounded-3xl overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 animate-on-scroll stagger-${i + 1}`}>
            
              <div className="relative h-64 overflow-hidden">
                <AppImage
                src={coach?.image}
                alt={coach?.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-0.5">{coach?.name}</h3>
                <p className="text-primary text-sm font-semibold mb-3">{coach?.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{coach?.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {coach?.badges?.map((b) =>
                <span key={b} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20">
                      {b}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}
import { useRef } from 'react';
import LazyImage from './ui/LazyImage';
import { getOptimizedUnsplashUrl, getLoadingProps } from '../utils/imageOptimization';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const teamMembers = [
    {
        id: 1,
        name: "Sadia Islam",
        role: "Master Stylist",
        image: "/assets/team/sadia.png",
        specialties: ["Bridal Makeover", "Hair Rebonding"],
        color: "from-pink-400 to-rose-400"
    },
    {
        id: 2,
        name: "Rahim Khan",
        role: "Creative Director",
        image: "/assets/team/rahim.png",
        specialties: ["Celebrity Styling", "Colorist"],
        color: "from-purple-400 to-indigo-400"
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Lead Esthetician",
        image: "/assets/team/nusrat.png",
        specialties: ["HydraFacial", "Laser Treatment"],
        color: "from-teal-400 to-cyan-400"
    },
    {
        id: 4,
        name: "Rumana Ahmed",
        role: "Henna & Nail Artist",
        image: "/assets/team/rumana.png",
        specialties: ["Bridal Mehendi", "Acrylic Nails"],
        color: "from-orange-400 to-amber-400"
    }
];

const TeamCard = ({ member, index }) => {
    return (
        <div className="group h-[450px] w-full perspective-1000 cursor-pointer">
            <div className="relative h-full w-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">

                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden shadow-xl">
                    <LazyImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={400}
                        height={500}
                        {...getLoadingProps(false)}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white text-2xl font-serif">{member.name}</h3>
                        <p className="text-white/80 font-sans tracking-wide text-sm">{member.role}</p>
                    </div>
                </div>

                {/* Back Face */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br ${member.color} text-white shadow-xl`}>
                    <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden mb-6 mx-auto">
                        <LazyImage
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            width={96}
                            height={96}
                            loading="lazy"
                        />
                    </div>
                    <h3 className="text-3xl font-serif mb-2">{member.name}</h3>
                    <p className="text-white/90 font-medium mb-6 uppercase tracking-wider text-sm">{member.role}</p>

                    <div className="space-y-2 mb-8">
                        {member.specialties.map((spec, i) => (
                            <span key={i} className="block bg-white/20 py-1 px-3 rounded-full text-sm backdrop-blur-sm">
                                {spec}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-4">
                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors"><Instagram size={20} /></button>
                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors"><Twitter size={20} /></button>
                        <button className="p-2 hover:bg-white/20 rounded-full transition-colors"><Linkedin size={20} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Team = () => {
    // Add CSS class for rotate-y-180 if not standard in tailwind v4 yet or check if it matches the plugin usage
    // Tailwind usually needs 'rotate-y-180' class to exist if using standard.
    // I'll assume standard utilities or add style prop to be safe.

    return (
        <section id="team" className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-sans uppercase tracking-[0.3em] text-charcoal/50 mb-4">The Artisans</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-charcoal">Meet the Team</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamCard key={member.id} member={member} index={index} />
                    ))}
                </div>
            </div>

            {/* Inline style for 3D flip since Tailwind defaults might not cover perspective utilities fully without config */}
            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
        </section>
    );
};

export default Team;

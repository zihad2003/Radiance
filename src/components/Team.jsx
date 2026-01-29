import { useRef } from 'react';
import LazyImage from './ui/LazyImage';
import { getOptimizedUnsplashUrl, getLoadingProps } from '../utils/imageOptimization';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Sparkles } from 'lucide-react';

const teamMembers = [
    {
        id: 1,
        name: "Sadia Islam",
        role: "Master Stylist",
        image: "https://images.unsplash.com/photo-1595475038784-bbe4766e9afa?q=80&w=600",
        specialties: ["Bridal Makeover", "Hair Rebonding"],
        color: "from-purple-900 to-black"
    },
    {
        id: 2,
        name: "Rahim Khan",
        role: "Creative Director",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600",
        specialties: ["Celebrity Styling", "Colorist"],
        color: "from-blue-900 to-black"
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Lead Esthetician",
        image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600",
        specialties: ["HydraFacial", "Laser Treatment"],
        color: "from-emerald-900 to-black"
    },
    {
        id: 4,
        name: "Rumana Ahmed",
        role: "Henna & Nail Artist",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600",
        specialties: ["Bridal Mehendi", "Acrylic Nails"],
        color: "from-red-900 to-black"
    }
];

const TeamCard = ({ member, index }) => {
    return (
        <div className="group h-[500px] w-full perspective-1000 cursor-pointer">
            <div className="relative h-full w-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180">

                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bento-card p-0 overflow-hidden bg-[#0A0A0A] border border-white/5">
                    <LazyImage
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 font-sans"
                        width={400}
                        height={500}
                        {...getLoadingProps(false)}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />

                    <div className="absolute inset-x-0 bottom-0 p-8">
                        <div className="mb-2 w-fit px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                            <p className="text-[9px] text-primary font-black uppercase tracking-widest">{member.role}</p>
                        </div>
                        <h3 className="text-white text-3xl font-sans font-black uppercase tracking-tighter">{member.name}</h3>
                    </div>
                </div>

                {/* Back Face */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 bento-card p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br ${member.color} border border-white/10 shadow-2xl`}>
                    <div className="w-24 h-24 rounded-full border border-white/10 overflow-hidden mb-6 mx-auto p-1 bg-white/5">
                        <LazyImage
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-full"
                            width={96}
                            height={96}
                            loading="lazy"
                        />
                    </div>
                    <h3 className="text-3xl font-sans font-black uppercase tracking-tighter mb-2 text-white">{member.name}</h3>
                    <p className="text-primary font-bold mb-6 uppercase tracking-widest text-[9px]">{member.role}</p>

                    <div className="space-y-3 mb-8 w-full">
                        {member.specialties.map((spec, i) => (
                            <div key={i} className="flex items-center justify-center gap-2 bg-black/20 py-2 px-4 rounded-xl border border-white/5 w-full">
                                <Sparkles size={12} className="text-primary" />
                                <span className="text-xs font-bold text-white/80 uppercase tracking-wider">{spec}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex space-x-4 mt-auto">
                        <button className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all text-white border border-white/10"><Instagram size={18} /></button>
                        <button className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all text-white border border-white/10"><Twitter size={18} /></button>
                        <button className="p-3 bg-white/5 hover:bg-white hover:text-black rounded-full transition-all text-white border border-white/10"><Linkedin size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Team = () => {
    return (
        <section id="team" className="bg-transparent relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member, index) => (
                    <TeamCard key={member.id} member={member} index={index} />
                ))}
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

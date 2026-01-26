// Stylist Database for Radiance Beauty Salon

export const stylistsDatabase = [
    {
        id: 'stylist_1',
        name: 'Nazia Rahman',
        title: 'Senior Bridal Specialist',
        experience: 12,
        specialties: ['Bridal Makeup', 'Airbrush Expert', 'HD Makeup'],
        rating: 4.9,
        reviews: 450,
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
        bio: 'Award-winning bridal makeup artist with expertise in traditional and contemporary styles',
        availability: true
    },
    {
        id: 'stylist_2',
        name: 'Farhana Sultana',
        title: 'Hair Color Specialist',
        experience: 8,
        specialties: ['Hair Coloring', 'Balayage', 'Keratin Treatments'],
        rating: 4.8,
        reviews: 320,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        bio: 'Expert in color transformations and hair treatments',
        availability: true
    },
    {
        id: 'stylist_3',
        name: 'Tasneem Ahmed',
        title: 'Makeup Artist',
        experience: 6,
        specialties: ['Party Makeup', 'Photoshoot Makeup', 'Contouring'],
        rating: 4.7,
        reviews: 280,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        bio: 'Creative makeup artist specializing in glamorous looks',
        availability: true
    },
    {
        id: 'stylist_4',
        name: 'Mehjabin Chowdhury',
        title: 'Facial & Skincare Expert',
        experience: 10,
        specialties: ['Facials', 'Skin Treatments', 'Anti-Aging'],
        rating: 4.9,
        reviews: 410,
        image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=400',
        bio: 'Certified aesthetician with advanced skincare training',
        availability: true
    },
    {
        id: 'stylist_5',
        name: 'Sabrina Khan',
        title: 'Hair Stylist',
        experience: 7,
        specialties: ['Haircuts', 'Styling', 'Updos'],
        rating: 4.8,
        reviews: 295,
        image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=400',
        bio: 'Creative hairstylist with expertise in modern cuts and styles',
        availability: true
    },
    {
        id: 'stylist_6',
        name: 'Ayesha Siddiqui',
        title: 'Mehendi Artist',
        experience: 9,
        specialties: ['Bridal Mehendi', 'Arabic Designs', 'Indo-Pak Patterns'],
        rating: 4.9,
        reviews: 380,
        image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400',
        bio: 'Master mehendi artist known for intricate bridal designs',
        availability: true
    },
    {
        id: 'stylist_7',
        name: 'Rifat Jahan',
        title: 'Nail Technician',
        experience: 5,
        specialties: ['Gel Extensions', 'Nail Art', 'Manicure/Pedicure'],
        rating: 4.7,
        reviews: 215,
        image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400',
        bio: 'Creative nail artist with expertise in latest trends',
        availability: true
    },
    {
        id: 'stylist_8',
        name: 'Lamia Rahman',
        title: 'Junior Makeup Artist',
        experience: 3,
        specialties: ['Natural Makeup', 'Office Looks', 'Casual Styling'],
        rating: 4.6,
        reviews: 145,
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
        bio: 'Talented young artist specializing in natural, everyday looks',
        availability: true
    }
];

export const getStylistById = (id) => {
    return stylistsDatabase.find(stylist => stylist.id === id);
};

export const getAvailableStylists = () => {
    return stylistsDatabase.filter(stylist => stylist.availability);
};

export const getStylistsBySpecialty = (specialty) => {
    return stylistsDatabase.filter(stylist =>
        stylist.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
    );
};

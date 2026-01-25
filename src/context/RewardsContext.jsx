import { createContext, useContext, useState, useEffect } from 'react';

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
    const [points, setPoints] = useState(() => {
        const saved = localStorage.getItem('radiance_points');
        return saved ? parseInt(saved) : 0;
    });

    const [level, setLevel] = useState('Bronze');

    // Levels configuration
    const levels = [
        { name: 'Bronze', min: 0, color: '#CD7F32' },
        { name: 'Silver', min: 500, color: '#C0C0C0' },
        { name: 'Gold', min: 1000, color: '#FFD700' },
        { name: 'Platinum', min: 2500, color: '#E5E4E2' }
    ];

    useEffect(() => {
        localStorage.setItem('radiance_points', points.toString());

        // Update level based on points
        const newLevel = [...levels].reverse().find(l => points >= l.min);
        if (newLevel && newLevel.name !== level) {
            setLevel(newLevel.name);
        }
    }, [points]);

    const earnPoints = (amount, reason) => {
        setPoints(prev => prev + amount);
        // You could add toast notification here
        console.log(`Earned ${amount} points for ${reason}`);
    };

    const spendPoints = (amount) => {
        if (points >= amount) {
            setPoints(prev => prev - amount);
            return true;
        }
        return false;
    };

    const getNextLevel = () => {
        const currentIdx = levels.findIndex(l => l.name === level);
        if (currentIdx < levels.length - 1) {
            return levels[currentIdx + 1];
        }
        return null; // Max level
    };

    return (
        <RewardsContext.Provider value={{
            points,
            level,
            earnPoints,
            spendPoints,
            levels,
            getNextLevel
        }}>
            {children}
        </RewardsContext.Provider>
    );
};

import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('fresh'); // 'fresh' or 'warm'

    useEffect(() => {
        const savedTheme = localStorage.getItem('site-theme') || 'fresh';
        setTheme(savedTheme);
        applyTheme(savedTheme);
    }, []);

    const applyTheme = (newTheme) => {
        const root = document.documentElement;
        if (newTheme === 'warm') {
            root.classList.add('theme-warm');
        } else {
            root.classList.remove('theme-warm');
        }
    };

    const toggleTheme = () => {
        const newTheme = theme === 'fresh' ? 'warm' : 'fresh';
        setTheme(newTheme);
        localStorage.setItem('site-theme', newTheme);
        applyTheme(newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed left-6 bottom-6 z-50 flex items-center justify-center w-12 h-12 bg-white text-gray-800 rounded-full shadow-lg border-2 border-primary-500 hover:scale-110 transition-transform duration-300 group"
            title={`Switch to ${theme === 'fresh' ? 'Warm' : 'Fresh'} Theme`}
        >
            <div className="absolute -top-12 left-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {theme === 'fresh' ? 'Try Warm Theme 🍊' : 'Try Fresh Theme 🥗'}
            </div>
            <Palette className={`w-6 h-6 ${theme === 'fresh' ? 'text-green-600' : 'text-orange-500'}`} />
        </button>
    );
};

export default ThemeToggle;

import React from "react";

const Logo = ({ className = "h-12 w-12" }) => {
    return (
        <div className={`${className} relative`}>
            <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-cover rounded-full shadow-md transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(255,183,3,0.6)] group-hover:scale-105 border-2 border-white/50 bg-white"
            />
            {/* Subtle inner lens flare / highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none"></div>
        </div>
    );
};

export default Logo;

import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-lg">
            {/* Logo and Title */}
            <Link to="/" className="flex items-center space-x-3">
                <img src="https://img.vsco.co/a520fd/172811525/673d746ad275598201fcce0b/troncoslogo.jpeg" alt="Team Logo" className="h-12" />
                <span className="text-2xl font-bold text-[#D12F23]">TRONCOS FC</span> {/* Custom Red */}
            </Link>

            {/* Navigation Links */}
            <div className="flex bg-black rounded-lg overflow-hidden">
                <Link
                    to="/team"
                    className="px-4 py-2 text-lg text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                    Teams
                </Link>
                <Link
                    to="/merch"
                    className="px-4 py-2 text-lg text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                    Merch
                </Link>
                <Link
                    to="/sponsors"
                    className="px-4 py-2 text-lg text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                    Sponsors
                </Link>
            </div>
        </nav>
    );
};

export default Header;

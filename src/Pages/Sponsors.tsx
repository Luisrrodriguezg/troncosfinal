// src/Pages/Sponsors.tsx
import React from 'react';
import Sponsor from '../components/Sponsor';
import ContactForm from '../components/ContactForm';

const Sponsors: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-center">MEET OUR SPONSORS</h1>
            </header>

            {/* Sponsors List */}
            <div className="flex flex-col items-center space-y-8">
                <Sponsor
                    name="Spotify"
                    entryDate={new Date(2024, 0)} // January 2024
                    logoPath="https://www.citypng.com/public/uploads/preview/square-black-green-spotify-app-icon-png-701751694969849j7wtxvnrgo.png" // Pass the path as a prop
                    description="Spotify is supporting our team because they believe in the power of music to motivate athletes. They are passionate about bringing music and sports together. CEO: Daniel Ek."
                />
                <Sponsor
                    name="Nike"
                    entryDate={new Date(2024, 5)} // June 2024
                    logoPath="https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png" // Pass the path as a prop
                    description="Nike sponsors us to promote a healthier and more active lifestyle through their sportswear. They are committed to elevating athletes to their best. CEO: John Donahoe."
                />
            </div>

            {/* Contact Section */}
            <div className="mt-20">
                <ContactForm />
            </div>
        </div>
    );
};

export default Sponsors;

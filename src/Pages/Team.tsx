// src/Pages/Team.tsx
import React, { useState } from 'react';
import FirstTeam from '../components/FirstTeam';
import ManageRoster from '../components/ManageRoster';

const Team: React.FC = () => {
    const [showManageRoster, setShowManageRoster] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleManageRoster = () => {
        const password = prompt('Enter the password to manage the roster:');
        if (password === 'iLoveTr0ncos') {
            setError(null);
            setShowManageRoster(true);
        } else {
            setError('Incorrect password! Access denied.');
        }
    };

    return (
        <div className="bg-black text-white min-h-screen py-8">
            <FirstTeam />
            <div className="text-center mt-8">
                <button
                    onClick={handleManageRoster}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold shadow-lg border-2 border-white transition-all"
                >
                    Manage Roster
                </button>
                {error && (
                    <p className="mt-4 text-red-400 font-semibold border border-red-500 p-4 rounded-lg bg-red-900">
                        {error}
                    </p>
                )}
            </div>
            {showManageRoster && (
                <div className="mt-8 px-4">
                    <ManageRoster />
                </div>
            )}
        </div>
    );
};

export default Team;

import React, { useState, useEffect } from 'react';
import PlayerList from './PlayerList';
import { Player } from '../interfaces/Player';

const API_URL = "https://troncos-fc-api-fr.onrender.com/players"; // Replace with your Render API URL

const FirstTeam: React.FC = () => {
    const [squad, setSquad] = useState<Player[]>([]);
    const [openPlayer, setOpenPlayer] = useState<Player | null>(null);

    // Fetch the players from the backend
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch players: ${response.statusText}`);
                }
                const data = await response.json();
                setSquad(data);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        fetchPlayers();
    }, []);


    const handleOpenModal = (player: Player) => {
        setOpenPlayer(player);
    };

    const handleCloseModal = () => {
        setOpenPlayer(null);
    };

    return (
        <div className="team-page bg-black text-black min-h-screen">
            <div className="text-center my-8">
                <h1 className="text-5xl font-extrabold relative inline-block py-4 px-8 border-4 border-red-500 bg-white rounded-lg shadow-lg">
                    Squad
                    <span className="absolute -inset-1.5 border-2 border-yellow-400 rounded-lg blur-md"></span>
                </h1>
            </div>

            {/* Player List */}
            <PlayerList
                title="The Crew"
                players={squad}
                openPlayer={openPlayer}
                onOpenModal={handleOpenModal}
                onCloseModal={handleCloseModal}
            />
        </div>
    );
};

export default FirstTeam;

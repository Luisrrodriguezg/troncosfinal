// src/components/PlayerList.tsx
import React from 'react';
import PlayerCard from "./PlayerCard.tsx";
import { Player } from '../interfaces/Player';

interface PlayerListProps {
    title: string;
    players: Player[];
    openPlayer: Player | null;
    onOpenModal: (player: Player) => void;
    onCloseModal: () => void;
}

const PlayerList: React.FC<PlayerListProps> = ({ title, players, openPlayer, onOpenModal, onCloseModal }) => {
    return (
        <div className="my-8">
            <h2 className="text-3xl font-bold mb-4 text-white text-center relative">
                {title}
                <span className="block w-24 h-1 mx-auto bg-gradient-to-r from-red-500 to-yellow-500 mt-2"></span> {/* Gradient underline */}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {players.map((player, index) => (
                    <PlayerCard
                        key={index}
                        player={player}
                        isOpen={openPlayer === player}
                        onOpenModal={onOpenModal}
                        onCloseModal={onCloseModal}
                    />
                ))}
            </div>
        </div>
    );
};

export default PlayerList;

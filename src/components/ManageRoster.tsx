import React, { useState, useEffect } from 'react';

const ManageRoster: React.FC = () => {
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        alias: '',
        birth: '',
        program: '',
        description: '',
        photo: '',
    });
    const [deleteId, setDeleteId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Fetch all players from the API
    useEffect(() => {
        fetch('https://troncos-fc-api-fr.onrender.com/players')
            .then((response) => response.json())
            .then((data) => setPlayers(data))
            .catch((error) => console.error('Error fetching players:', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddPlayer = () => {
        if (
            !formData.fullName ||
            !formData.alias ||
            !formData.birth ||
            !formData.program ||
            !formData.description ||
            !formData.photo
        ) {
            setError('All fields are required to add a player.');
            return;
        }
        setError(null);
        fetch('https://troncos-fc-api-fr.onrender.com/players', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    setSuccess('Player added successfully!');
                    setFormData({
                        fullName: '',
                        alias: '',
                        birth: '',
                        program: '',
                        description: '',
                        photo: '',
                    });
                    fetch('https://troncos-fc-api-fr.onrender.com/players') // Refresh player list
                        .then((response) => response.json())
                        .then((data) => setPlayers(data));
                } else {
                    setError('Failed to add player.');
                }
            })
            .catch(() => setError('Error adding player.'));
    };

    const handleDeletePlayer = () => {
        if (!deleteId) {
            setError('Player ID is required to delete.');
            return;
        }
        setError(null);
        fetch(`https://troncos-fc-api-fr.onrender.com/players/${deleteId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setSuccess('Player deleted successfully!');
                    setDeleteId('');
                    fetch('https://troncos-fc-api-fr.onrender.com/players') // Refresh player list
                        .then((response) => response.json())
                        .then((data) => setPlayers(data));
                } else {
                    setError('Failed to delete player.');
                }
            })
            .catch(() => setError('Error deleting player.'));
    };

    return (
        <div className="bg-white text-black p-8 rounded-lg shadow-lg border border-red-500">
            <h2 className="text-3xl font-extrabold text-center text-red-600 mb-8">Manage Roster</h2>

            {/* Success Message */}
            {success && (
                <p className="text-green-500 font-semibold mb-4 border border-green-500 p-4 bg-green-100 rounded-lg">
                    {success}
                </p>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-red-500 font-semibold mb-4 border border-red-500 p-4 bg-red-100 rounded-lg">
                    {error}
                </p>
            )}

            {/* Player List */}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-700">Current Roster</h3>
                <ul className="border border-gray-200 rounded-lg overflow-hidden">
                    {players.map((player: any) => (
                        <li
                            key={player.id}
                            className="border-b p-4 bg-gray-50 hover:bg-gray-100"
                        >
                            <span>
                                {player.id}. {player.fullName}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Add Player */}
            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-red-700">Add New Player</h3>
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="border border-red-400 p-2 w-full mb-2 rounded"
                />
                <input
                    type="text"
                    name="alias"
                    placeholder="Alias"
                    value={formData.alias}
                    onChange={handleChange}
                    className="border border-red-400 p-2 w-full mb-2 rounded"
                />
                <input
                    type="date"
                    name="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    className="border border-red-400 p-2 w-full mb-2 rounded"
                />
                <input
                    type="text"
                    name="program"
                    placeholder="Program"
                    value={formData.program}
                    onChange={handleChange}
                    className="border border-red-400 p-2 w-full mb-2 rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border border-red-400 p-2 w-full mb-2 rounded"
                />
                <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    value={formData.photo}
                    onChange={handleChange}
                    className="border border-red-400 p-2 w-full mb-2 rounded"
                />
                <button
                    onClick={handleAddPlayer}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                    Add Player
                </button>
            </div>

            {/* Delete Player */}
            <div>
                <h3 className="text-xl font-bold mb-4 text-red-700">Delete Player</h3>
                <input
                    type="text"
                    placeholder="Player ID"
                    value={deleteId}
                    onChange={(e) => setDeleteId(e.target.value)}
                    className="border border-red-400 p-2 w-full mb-2 rounded"
                />
                <button
                    onClick={handleDeletePlayer}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                    Delete Player
                </button>
            </div>
        </div>
    );
};

export default ManageRoster;

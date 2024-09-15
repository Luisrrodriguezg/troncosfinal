import React, { useState, useEffect } from 'react';

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

const ContainerComponent: React.FC = () => {
    const matchDate = new Date('2024-09-21T09:00:00');
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    function calculateTimeLeft(): TimeLeft {
        const now = new Date();
        const difference = matchDate.getTime() - now.getTime();
        let timeLeft: TimeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        const key = interval as keyof TimeLeft;

        if (!timeLeft[key]) {
            return null;
        }

        return (
            <span key={interval} className="mx-2">
                {timeLeft[key]} {interval}{' '}
            </span>
        );
    });

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center p-6 bg-white text-black rounded-lg shadow-lg transition-all hover:bg-red-500 hover:text-white" style={{ width: '100%' }}>
            {/* Team Logo */}
            <div className="flex-shrink-0 text-center">
                <img
                    src="src/assets/troncoslogo.jpeg"
                    alt="Los Troncos FC Logo"
                    className="w-80 h-80 lg:w-80 lg:h-80 mb-4 lg:mb-0"
                />
            </div>

            {/* Match Info */}
            <div className="flex flex-col items-center lg:items-center text-center lg:text-center lg:ml-8">
                <h2 className="text-4xl font-semibold mb-4">NEXT</h2>
                <h2 className="text-4xl font-semibold mb-4">MATCH</h2>
                <div className="flex flex-col items-center mb-4">
                    <span className="text-3xl font-semibold mb-4">VS</span>

                    <div className="flex flex-col items-center">
                        <img
                            src="src/assets/Barca.png"
                            alt="Opponent Team Logo"
                            className="w-32 h-32 mb-4 rounded-full"
                        />
                        <span className="text-2xl font-semibold">SELECCIÓN MASÍA</span>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="text-2xl font-bold text-red-500 hover:text-white">
                    {timerComponents.length ? timerComponents : <span>Match Time!</span>}
                </div>
                <div className="text-sm mt-2">
                    {matchDate.toLocaleDateString()} {matchDate.toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
};

export default ContainerComponent;

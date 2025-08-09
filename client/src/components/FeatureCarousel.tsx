import { useState, useEffect } from 'react';

const carouselFeatures = [
  {
    title: 'Track Your Progress',
    description: 'Monitor growth, XP, streaks, and badges with real-time stats.',
    icon: (
      <svg className="w-16 h-16 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Leaderboard Challenges',
    description: 'Compete with peers and climb the ranks on monthly leaderboards.',
    icon: (
      <svg className="w-16 h-16 text-pink-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 20H5a2 2 0 01-2-2v-5a2 2 0 012-2h4" />
        <path d="M14 4h6a2 2 0 012 2v5a2 2 0 01-2 2h-6" />
      </svg>
    ),
  },
  {
    title: 'Secure & Reliable',
    description: 'Access securely with modern authentication protecting your data.',
    icon: (
      <svg className="w-16 h-16 text-purple-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx={2} ry={2} />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
];

export default function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselFeatures.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { title, description, icon } = carouselFeatures[currentIndex];

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white/20 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl transition-colors duration-500">
      <div className="flex flex-col items-center text-center space-y-6 p-6">
        <div>{icon}</div>
        <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {title}
        </h3>
        <p className="text-gray-900 dark:text-gray-200 text-lg max-w-3xl">{description}</p>
        <div className="flex space-x-3 mt-4">
          {carouselFeatures.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Show slide ${idx + 1}`}
              className={`w-5 h-5 rounded-full focus:outline-none transition-colors ${
                idx === currentIndex ? 'bg-pink-500' : 'bg-gray-400 dark:bg-gray-600'
              }`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import FeatureCarousel from './FeatureCarousel';

export default function Home() {
  return (
    <main
      className="
        relative min-h-screen overflow-hidden
        bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        text-gray-900 dark:text-white transition-colors duration-500
        select-none
      "
      aria-label="Home Page"
    >
      {/* Animated Background Circles */}
      <div
        className="
          pointer-events-none fixed -top-48 -left-48 w-[600px] h-[600px] rounded-full
          bg-gradient-to-tr from-blue-300 via-purple-400 to-pink-400 opacity-30
          animate-blob animation-delay-4000
        "
      />
      <div
        className="
          pointer-events-none fixed bottom-0 right-0 w-[500px] h-[500px] rounded-full
          bg-gradient-to-l from-purple-700 via-pink-700 to-indigo-700 opacity-40
          animate-blob animation-delay-2000
        "
      />

      {/* Container */}
      <div className="container mx-auto max-w-7xl px-8 py-20 flex flex-col gap-20">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center space-y-6">
          <h1
            className="
              text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg
              text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-700 animate-text-glow
            "
          >
            Decode Salesforce Learning
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 drop-shadow-sm max-w-xl mx-auto">
            Master Salesforce cloud, CRM, and development with dynamic quizzes & real-time leaderboard — all in one sleek platform.
          </p>
          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <button
              className="px-10 py-3 font-semibold rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition"
              // onClick examples: navigate('/login')
            >
              Get Started
            </button>
            <button
              className="px-10 py-3 font-semibold rounded-full border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition"
              // onClick examples: navigate('/learn-more')
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Why Learn Salesforce Section */}
        <section aria-label="Why Learn Salesforce" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg transition hover:shadow-2xl duration-300">
            <h3 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-400">150,000+ Companies</h3>
            <p className="text-gray-700 dark:text-gray-300">Trust Salesforce to power their CRM and grow business worldwide.</p>
          </div>
          <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg transition hover:shadow-2xl duration-300">
            <h3 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">$110,000 Average Salary</h3>
            <p className="text-gray-700 dark:text-gray-300">Salesforce professionals rank among the highest-paid in tech.</p>
          </div>
          <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg transition hover:shadow-2xl duration-300">
            <h3 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Top 5 CRM Platform</h3>
            <p className="text-gray-700 dark:text-gray-300">Leading platform chosen for customization, automation, and analytics.</p>
          </div>
        </section>

        {/* Feature Carousel Section (Centerpiece) */}
        <section aria-label="Platform Features Carousel">
          <FeatureCarousel />
        </section>

        {/* How It Works Section */}
        <section aria-label="How It Works" className="max-w-5xl mx-auto text-center space-y-14">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              {
                number: '1',
                title: 'Sign Up',
                desc: 'Create your free account to start your Salesforce learning journey.',
              },
              {
                number: '2',
                title: 'Take Quizzes',
                desc: 'Practice with real-world questions in various Salesforce domains.',
              },
              {
                number: '3',
                title: 'Track Progress',
                desc: 'Monitor XP, streaks, and badges to see your skill grow daily.',
              },
              {
                number: '4',
                title: 'Climb Leaderboard',
                desc: 'Compete with peers and reach the top ranks on the leaderboard.',
              },
            ].map(({ number, title, desc }) => (
              <div
                key={number}
                className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg transition hover:shadow-2xl duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-pink-500 text-white font-bold text-lg flex items-center justify-center mb-4">
                  {number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section aria-label="Testimonials" className="container max-w-5xl mx-auto px-4 py-20 space-y-10 text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
            What Our Learners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'This platform transformed my career. I landed a Salesforce job within months!',
                name: 'Anita Kumar, Developer',
              },
              {
                quote: 'The leaderboard keeps me motivated daily. Love it!',
                name: 'Rahul Singh, Admin',
              },
              {
                quote: 'Clean UI, diverse questions, excellent support -- highly recommend.',
                name: 'Sneha Patel, Consultant',
              },
            ].map(({ quote, name }, idx) => (
              <blockquote
                key={idx}
                className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-md rounded-xl p-8 text-gray-800 dark:text-gray-200 shadow-lg"
                aria-label={`Testimonial from ${name}`}
              >
                <p className="mb-4 italic">"{quote}"</p>
                <footer className="font-semibold">{name}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      </div>


      {/* Animations CSS */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite ease-in-out; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .text-glow {
          text-shadow:
            0 0 6px #8b5cf6,
            0 0 12px #8b5cf6,
            0 0 18px #8b5cf6,
            0 0 24px #8b5cf6;
        }
      `}</style>
    </main>
  );
}

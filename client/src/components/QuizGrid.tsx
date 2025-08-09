// Replace with real API/props and connect to your company/difficulty filter
// This is demo data; wire up with useEffect and state as in your current Dashboard logic

const dummyQuizzes = [
  { _id: '1', title: 'Lightning Basics', company: 'Salesforce', difficulty: 'Easy', description: 'Intro to Lightning platform.' },
  { _id: '2', title: 'Advanced Triggers', company: 'Salesforce', difficulty: 'Hard', description: 'Deep dive into Apex triggers.' },
  { _id: '3', title: 'CRM Data Modeling', company: 'Amazon', difficulty: 'Medium', description: 'Entity/relationship best practices.' },
];

function badgeColor(difficulty: string) {
  if (difficulty === 'Easy') return 'bg-green-300 text-green-900';
  if (difficulty === 'Medium') return 'bg-yellow-300 text-yellow-900';
  if (difficulty === 'Hard') return 'bg-red-300 text-red-900';
  return 'bg-gray-300 text-gray-900';
}

export default function QuizGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyQuizzes.map(q => (
        <div key={q._id} className="bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-lg px-6 py-6 flex flex-col space-y-3 hover:scale-[1.03] transition">
          <div className="flex items-center gap-2 text-sm mb-1 font-semibold">
            <span className="bg-blue-100 text-blue-900 rounded px-2 py-0.5">{q.company}</span>
            <span className={`${badgeColor(q.difficulty)} ml-2 px-2 py-0.5 rounded`}>
              {q.difficulty}
            </span>
          </div>
          <div className="font-bold text-xl text-indigo-800 dark:text-indigo-100">{q.title}</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">{q.description}</div>
          <button className="bg-indigo-600 mt-4 px-4 py-2 rounded-lg text-white font-semibold hover:bg-indigo-700">
            Start Quiz
          </button>
        </div>
      ))}
    </div>
  );
}

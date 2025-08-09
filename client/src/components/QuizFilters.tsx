import { useState } from 'react';

export default function QuizFilters() {
  // Demo filter UI; wire these to redux/context or parent if needed
  const [search, setSearch] = useState('');
  const [company, setCompany] = useState('All');
  const [difficulty, setDifficulty] = useState('All');

  return (
    <section className="flex flex-col md:flex-row md:items-center gap-4 bg-white/10 rounded-lg px-4 py-3 shadow">
      <input
        placeholder="Search quizzes…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="flex-1 px-3 py-2 rounded-md bg-white/30 text-white placeholder-indigo-200"
      />
      <select onChange={e => setCompany(e.target.value)} value={company}
        className="px-3 py-2 rounded-md bg-white/30 text-white">
        <option>All Companies</option>
        <option>Salesforce</option>
        <option>Google</option>
        <option>Amazon</option>
      </select>
      <select onChange={e => setDifficulty(e.target.value)} value={difficulty}
        className="px-3 py-2 rounded-md bg-white/30 text-white">
        <option>All Difficulties</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button className="px-4 py-2 bg-indigo-600 rounded-md text-white font-semibold hover:bg-indigo-700">
        Filter
      </button>
    </section>
  );
}

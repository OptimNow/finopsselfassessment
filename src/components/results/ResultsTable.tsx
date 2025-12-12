type Row = { category: string; score: number; primaryGap: string };

export function ResultsTable({ rows }: { rows: Row[] }) {
  const sorted = [...rows].sort((a, b) => a.score - b.score);
  const top2 = new Set(sorted.slice(0, 2).map((r) => r.category));

  return (
    <div className="mt-6">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Category</th>
            <th className="py-2">Score</th>
            <th className="py-2">Primary gap</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.category} className="border-b">
              <td className="py-2">
                <span className={top2.has(r.category) ? "font-semibold" : ""}>{r.category}</span>
              </td>
              <td className="py-2">
                <span className={top2.has(r.category) ? "font-semibold" : ""}>{r.score}</span>
              </td>
              <td className="py-2">
                <span className={top2.has(r.category) ? "font-semibold" : ""}>{r.primaryGap}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

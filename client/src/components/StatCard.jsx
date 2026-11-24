export default function StatCard({ label, value, color = "text-gray-900" }) {
  return (
    <div className="flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <span className={`text-3xl font-bold ${color}`}>{value}</span>
      <span className="mt-1 text-sm text-gray-500">{label}</span>
    </div>
  );
}
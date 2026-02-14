interface FormProgressBarProps {
  percentage: number;
}

export default function FormProgressBar({ percentage }: FormProgressBarProps) {
  return (
    <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white/90">Form Completion</h3>
          <p className="text-xs text-white/60 mt-0.5">Fill in all fields to publish your post</p>
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {percentage}%
        </div>
      </div>
      <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

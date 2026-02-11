export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-glass-10 border border-border-10 rounded-lg p-6 max-w-md backdrop-blur-sm">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-text-60 mb-4">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-border-10 bg-glass-5 hover:bg-glass-10 text-text-90 rounded transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-error hover:bg-error/80 text-white rounded transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

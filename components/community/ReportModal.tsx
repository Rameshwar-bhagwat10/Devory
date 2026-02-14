'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface ReportModalProps {
  postId: string;
  postTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const REPORT_REASONS = [
  { value: 'SPAM', label: 'Spam or Misleading' },
  { value: 'HARASSMENT', label: 'Harassment or Bullying' },
  { value: 'INAPPROPRIATE', label: 'Inappropriate Content' },
  { value: 'OFFENSIVE', label: 'Offensive or Hateful' },
  { value: 'COPYRIGHT', label: 'Copyright Violation' },
  { value: 'MISINFORMATION', label: 'False Information' },
  { value: 'OTHER', label: 'Other' },
];

export default function ReportModal({ postId, postTitle, isOpen, onClose }: ReportModalProps) {
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason) {
      setError('Please select a reason');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/community/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          reason,
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit report');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setReason('');
        setDescription('');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Report Post</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Post Info */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-sm text-white/60 mb-1">Reporting:</p>
            <p className="text-white/90 font-medium line-clamp-2">{postTitle}</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
              <p className="text-green-400 text-sm font-medium">
                Report submitted successfully. Thank you for helping keep our community safe.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Reason Selection */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-3">
              Why are you reporting this post? <span className="text-red-400">*</span>
            </label>
            <div className="space-y-2">
              {REPORT_REASONS.map((reportReason) => (
                <label
                  key={reportReason.value}
                  className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                    reason === reportReason.value
                      ? 'bg-purple-500/20 border-purple-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reportReason.value}
                    checked={reason === reportReason.value}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-4 h-4 text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-white/90 font-medium">{reportReason.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-3">
              Additional details (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide any additional context that might help us review this report..."
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
            />
            <p className="text-xs text-white/40 mt-2">
              {description.length}/500 characters
            </p>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <p className="text-sm text-blue-400">
              Reports are reviewed by our moderation team. False reports may result in account restrictions.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white/90 font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !reason || success}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:from-white/10 disabled:to-white/10 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : success ? 'Submitted!' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

interface EditProfileButtonProps {
  currentProfile?: {
    bio?: string;
    github?: string;
    linkedin?: string;
    portfolio?: string;
    skillLevel?: string;
    academicYear?: string;
    institution?: string;
    preferredDomains?: string[];
  };
}

export default function EditProfileButton({ currentProfile }: EditProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2"
      >
        <Edit className="w-5 h-5" />
        Edit Profile
      </button>

      {isOpen && (
        <EditProfileModal
          onClose={() => setIsOpen(false)}
          currentProfile={currentProfile}
        />
      )}
    </>
  );
}

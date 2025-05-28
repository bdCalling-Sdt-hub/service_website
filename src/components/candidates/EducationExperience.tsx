import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { ProfileData } from '@/types/profile.type';

interface EducationExperienceProps {
  profileData: ProfileData;
}

const EducationExperience: React.FC<EducationExperienceProps> = ({ profileData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">EXPERIENCE</p>
            <p className="text-sm font-medium text-gray-700">2-4 Years</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">EDUCATION</p>
            <p className="text-sm font-medium text-gray-700">{profileData.education}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationExperience;
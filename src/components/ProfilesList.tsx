import React, { useState } from 'react';
import { Profile } from '../Pages/Types.tsx';
import { profiles as mockProfiles } from './DummyUsers.js'; // Import the mock profiles

interface ProfilesListProps {
  onProfileSelect: (profile: Profile) => void;
}

const ProfilesList: React.FC<ProfilesListProps> = ({ onProfileSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter profiles based on search term
  const filteredProfiles = mockProfiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search Input */}
      <input
        type="text"
        aria-label="Search Profiles"
        placeholder="Search Profiles by name or city"
        className="w-full p-2 mb-4 border mt-12 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Profiles Grid */}
      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="bg-white rounded shadow p-4 transition-transform transform hover:scale-105">
              {/* Profile Image */}
              <img
                src={profile.profileImageUrl}
                alt={`${profile.name}'s profile`}
                className="w-full h-48 object-cover rounded"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image')}
              />
              {/* Profile Info */}
              <div className="mt-4">
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-gray-600 truncate">{profile.description}</p>
                <p className="text-gray-600">
                  {profile.address.city}, {profile.address.country}
                </p>
                {/* View on Map Button */}
                <button
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => onProfileSelect(profile)}
                >
                  View on Map
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No profiles found. Try adjusting your search.</p>
      )}
    </div>
  );
};

export default ProfilesList;

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Profile } from '../Pages/Types';

interface MapProps {
  profiles: Profile[];
  selectedProfile?: Profile;
}

const MapComponent: React.FC<MapProps> = ({ profiles, selectedProfile }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    // Mapbox requires an access token - replace with your actual token
    mapboxgl.accessToken = 'pk.eyJ1IjoicGl5dXNoMTEyMDQiLCJhIjoiY200a2I4aGNwMGt6NzJycTVrdHgzMTJmOSJ9.9MdQG3HEm3e3qEdcsK9TMw';

    if (mapContainerRef.current && !map) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2
      });

      mapInstance.on('load', () => {
        // Add markers for all profiles
        profiles.forEach(profile => {
          if (profile.address.latitude && profile.address.longitude) {
            new mapboxgl.Marker()
              .setLngLat([profile.address.longitude, profile.address.latitude])
              .setPopup(new mapboxgl.Popup().setHTML(`
                <div style="display: flex; align-items: center;">
                  <img 
                    src="${profile.profileImageUrl}" 
                    alt="${profile.name}" 
                    style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;" 
                  />
                  <h3 style="margin: 0;">${profile.name}</h3>
                </div>
                <p>${profile.address.street}, ${profile.address.city}</p>
                
              `))
              .addTo(mapInstance);
          }
        });

        // If a selected profile exists, center and zoom to its location
        if (selectedProfile?.address.latitude && selectedProfile?.address.longitude) {
          mapInstance.flyTo({
            center: [
              selectedProfile.address.longitude, 
              selectedProfile.address.latitude
            ],
            zoom: 10
          });
        }
      });

      setMap(mapInstance);
    }

    // Cleanup
    return () => {
      map?.remove();
    };
  }, [profiles, selectedProfile]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ width: '100%', height: '500px' }} 
    />
  );
};

export default MapComponent;
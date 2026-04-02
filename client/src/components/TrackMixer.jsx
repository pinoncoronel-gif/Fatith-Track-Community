import React, { useState } from 'react';

const TrackMixer = () => {
  const [tracks, setTracks] = useState([]);

  const addTrack = () => {
    const newTrack = { id: tracks.length, volume: 1.0 };
    setTracks([...tracks, newTrack]);
  };

  const handleVolumeChange = (id, value) => {
    const updatedTracks = tracks.map(track => 
      track.id === id ? { ...track, volume: value } : track
    );
    setTracks(updatedTracks);
  };

  const exportTracks = () => {
    // Add your export functionality here
    alert('Export functionality to be implemented!');
  };

  return (
    <div>
      <h1>Track Mixer</h1>
      <button onClick={addTrack}>Add Track</button>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <label>Track {track.id + 1} Volume:</label>
            <input
              type='range'
              min='0'
              max='1'
              step='0.01'
              value={track.volume}
              onChange={(e) => handleVolumeChange(track.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={exportTracks}>Export Tracks</button>
    </div>
  );
};

export default TrackMixer;
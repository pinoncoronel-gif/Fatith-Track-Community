import React, { useState, useRef } from 'react';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const handleProgressChange = (e) => {
        const newProgress = e.target.value;
        audioRef.current.currentTime = newProgress;
        setProgress(newProgress);
    };

    const updateProgress = () => {
        const currentTime = audioRef.current.currentTime;
        setProgress(currentTime);
    };

    return (
        <div>
            <audio ref={audioRef} onTimeUpdate={updateProgress} src="your-audio-source.mp3"></audio>
            <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <input type="range" min="0" max="audio-duration" value={progress} onChange={handleProgressChange} />
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        </div>
    );
};

export default AudioPlayer;
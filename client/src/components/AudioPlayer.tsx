import React, { useState } from 'react'
import * as Tone from 'tone'
import useStore from '../state/useStore'

const AudioPlayer: React.FC = () => {
  const isPlaying = useStore((s) => s.isPlaying)
  const tracks = useStore((s) => s.tracks)
  const [masterVolume, setMasterVolume] = useState(80)

  const handleMasterVolume = (val: number) => {
    setMasterVolume(val)
    Tone.getDestination().volume.value = (val - 100) * 0.6
  }

  const nowPlaying = isPlaying && tracks.length > 0 ? tracks.map((t) => t.name).join(', ') : null

  const s: Record<string, React.CSSProperties> = {
    bar: {
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#0d0d1a', borderTop: '1px solid #2d2d4e',
      padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 20,
      zIndex: 100,
    },
    status: {
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '4px 12px', borderRadius: 20,
      background: isPlaying ? '#065f46' : '#1a1a2e',
      color: isPlaying ? '#6ee7b7' : '#718096',
      fontSize: 13, flexShrink: 0,
    },
    dot: {
      width: 8, height: 8, borderRadius: '50%',
      background: isPlaying ? '#6ee7b7' : '#4a5568',
    },
    nowPlaying: {
      flex: 1, color: '#a0aec0', fontSize: 13,
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    },
    volGroup: { display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 },
    volLabel: { color: '#718096', fontSize: 12 },
    slider: { width: 100, accentColor: '#7c3aed' },
    volVal: { color: '#a0aec0', fontSize: 12, width: 28, textAlign: 'right' },
  }

  return (
    <div style={s.bar}>
      <div style={s.status}>
        <span style={s.dot} />
        {isPlaying ? 'Playing' : 'Stopped'}
      </div>
      <span style={s.nowPlaying}>
        {nowPlaying ? `🎵 ${nowPlaying}` : 'No tracks playing'}
      </span>
      <div style={s.volGroup}>
        <span style={s.volLabel}>Master:</span>
        <input
          type="range" min={0} max={100} value={masterVolume}
          style={s.slider}
          onChange={(e) => handleMasterVolume(Number(e.target.value))}
        />
        <span style={s.volVal}>{masterVolume}</span>
      </div>
    </div>
  )
}

export default AudioPlayer

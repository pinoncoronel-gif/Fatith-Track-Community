import React from 'react'
import useStore from '../state/useStore'
import { audioEngine } from '../audio-engine/audioEngine'

const TrackMixer: React.FC = () => {
  const tracks = useStore((s) => s.tracks)
  const bpm = useStore((s) => s.bpm)
  const isPlaying = useStore((s) => s.isPlaying)
  const updateTrack = useStore((s) => s.updateTrack)
  const removeTrack = useStore((s) => s.removeTrack)
  const setBPM = useStore((s) => s.setBPM)
  const setIsPlaying = useStore((s) => s.setIsPlaying)

  const handleVolumeChange = (id: string, val: number, muted: boolean) => {
    updateTrack(id, { volume: val })
    if (!muted) {
      audioEngine.setVolume(id, (val - 100) * 0.6)
    }
  }

  const handleLoopToggle = (id: string, loop: boolean) => {
    audioEngine.setLoop(id, loop)
    updateTrack(id, { loop })
  }

  const handleMuteToggle = (id: string, muted: boolean, volume: number) => {
    updateTrack(id, { muted })
    audioEngine.setVolume(id, muted ? -Infinity : (volume - 100) * 0.6)
  }

  const handleRemove = (id: string) => {
    audioEngine.stopSample(id)
    removeTrack(id)
  }

  const handlePlay = () => {
    audioEngine.startTransport()
    setIsPlaying(true)
  }

  const handleStop = () => {
    audioEngine.stopTransport()
    setIsPlaying(false)
  }

  const handleExport = async () => {
    const blob = await audioEngine.exportMix(30)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mix.webm'
    a.click()
    URL.revokeObjectURL(url)
  }

  const btnStyle = (variant: string): React.CSSProperties => ({
    padding: '6px 14px', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13,
    background: variant === 'play' ? '#065f46' : variant === 'stop' ? '#7f1d1d' : '#1e3a5f',
    color: '#fff',
  })

  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '3px 10px', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12,
    background: active ? '#7c3aed' : '#2d3748', color: '#fff',
  })

  const s: Record<string, React.CSSProperties> = {
    container: { color: '#e2e8f0' },
    toolbar: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' },
    label: { fontSize: 13, color: '#a0aec0' },
    bpmInput: {
      width: 64, padding: '4px 8px', background: '#1a1a2e', border: '1px solid #4a4a6a',
      borderRadius: 6, color: '#e2e8f0', fontSize: 14,
    },
    trackList: { display: 'flex', flexDirection: 'column', gap: 8 },
    track: {
      background: '#0f3460', borderRadius: 10, padding: '10px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
    },
    trackHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    trackName: { fontWeight: 600, fontSize: 14, color: '#e2e8f0' },
    controls: { display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
    volLabel: { fontSize: 12, color: '#a0aec0' },
    slider: { flex: 1, minWidth: 80, accentColor: '#7c3aed' },
    removeBtn: { padding: '3px 10px', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, background: '#7f1d1d', color: '#fff' },
    empty: { color: '#718096', fontSize: 13, fontStyle: 'italic', padding: 12 },
  }

  return (
    <div style={s.container}>
      <div style={s.toolbar}>
        <span style={s.label}>BPM:</span>
        <input
          type="number" min={40} max={240} value={bpm} style={s.bpmInput}
          onChange={(e) => {
            const v = Number(e.target.value)
            setBPM(v)
            audioEngine.setBPM(v)
          }}
        />
        <button style={btnStyle('play')} onClick={handlePlay} disabled={isPlaying}>▶ Play All</button>
        <button style={btnStyle('stop')} onClick={handleStop} disabled={!isPlaying}>■ Stop All</button>
        <button style={btnStyle('export')} onClick={handleExport}>⬇ Export Mix</button>
      </div>

      {tracks.length === 0 ? (
        <p style={s.empty}>No tracks yet. Add samples from the library.</p>
      ) : (
        <div style={s.trackList}>
          {tracks.map((track) => (
            <div key={track.id} style={s.track}>
              <div style={s.trackHeader}>
                <span style={s.trackName}>{track.name}</span>
                <button style={s.removeBtn} onClick={() => handleRemove(track.id)}>✕ Remove</button>
              </div>
              <div style={s.controls}>
                <span style={s.volLabel}>Vol:</span>
                <input
                  type="range" min={0} max={100} value={track.volume} style={s.slider}
                  onChange={(e) => handleVolumeChange(track.id, Number(e.target.value), track.muted)}
                />
                <span style={s.volLabel}>{track.volume}</span>
                <button style={toggleBtnStyle(track.loop)} onClick={() => handleLoopToggle(track.id, !track.loop)}>
                  {track.loop ? '🔁 Loop On' : '🔁 Loop Off'}
                </button>
                <button style={toggleBtnStyle(track.muted)} onClick={() => handleMuteToggle(track.id, !track.muted, track.volume)}>
                  {track.muted ? '🔇 Muted' : '🔊 Live'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TrackMixer

import React from 'react'
import useStore from '../state/useStore'
import { audioEngine } from '../audio-engine/audioEngine'

const SampleLibrary: React.FC = () => {
  const samples = useStore((s) => s.samples)
  const addTrack = useStore((s) => s.addTrack)

  const styles = {
    container: { marginTop: 16 } as React.CSSProperties,
    heading: { color: '#e2e8f0', fontSize: 16, fontWeight: 600, marginBottom: 8 } as React.CSSProperties,
    list: { maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 } as React.CSSProperties,
    row: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: '#0f3460', borderRadius: 8, padding: '8px 12px',
    } as React.CSSProperties,
    name: { color: '#e2e8f0', fontSize: 13, flex: 1, marginRight: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } as React.CSSProperties,
    size: { color: '#718096', fontSize: 12, marginRight: 10, flexShrink: 0 } as React.CSSProperties,
    empty: { color: '#718096', fontSize: 13, fontStyle: 'italic', padding: 12 } as React.CSSProperties,
  }

  const badgeStyle = (type: string): React.CSSProperties => ({
    padding: '2px 7px', borderRadius: 12, fontSize: 11, fontWeight: 700,
    background: type === 'mp3' ? '#1e3a5f' : '#1a365d',
    color: type === 'mp3' ? '#63b3ed' : '#90cdf4',
    marginRight: 8, flexShrink: 0,
  })

  const btnStyle = (variant: string): React.CSSProperties => ({
    padding: '4px 10px', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12,
    background: variant === 'add' ? '#7c3aed' : '#2d3748', color: '#fff', marginLeft: 4, flexShrink: 0,
  })

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Sample Library ({samples.length})</h3>
      {samples.length === 0 ? (
        <p style={styles.empty}>No samples loaded yet. Import a ZIP above.</p>
      ) : (
        <div style={styles.list}>
          {samples.map((sample) => (
            <div key={sample.id} style={styles.row}>
              <span style={styles.name}>{sample.name}</span>
              <span style={badgeStyle(sample.type)}>{sample.type.toUpperCase()}</span>
              <span style={styles.size}>{(sample.size / 1024).toFixed(1)} KB</span>
              <button style={btnStyle('preview')} onClick={() => audioEngine.playSample(sample.id)}>▶ Preview</button>
              <button style={btnStyle('add')} onClick={() => addTrack(sample.id)}>+ Mix</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SampleLibrary

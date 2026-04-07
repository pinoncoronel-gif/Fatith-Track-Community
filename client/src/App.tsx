import React from 'react'
import ZipImporter from './components/ZipImporter'
import SampleLibrary from './components/SampleLibrary'
import TrackMixer from './components/TrackMixer'
import AudioPlayer from './components/AudioPlayer'

const App: React.FC = () => {
  const s: Record<string, React.CSSProperties> = {
    root: {
      minHeight: '100vh',
      background: '#1a1a2e',
      color: '#e2e8f0',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      paddingBottom: 72,
    },
    header: {
      background: '#0d0d1a',
      borderBottom: '1px solid #2d2d4e',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    },
    title: {
      margin: 0, fontSize: 22, fontWeight: 700, color: '#e2e8f0',
    },
    layout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 20,
      padding: '20px 24px',
      maxWidth: 1200,
      margin: '0 auto',
    },
    card: {
      background: '#16213e',
      borderRadius: 14,
      padding: '18px 20px',
      border: '1px solid #2d2d4e',
    },
    cardTitle: {
      margin: '0 0 14px',
      fontSize: 16,
      fontWeight: 600,
      color: '#e2e8f0',
      borderBottom: '1px solid #2d2d4e',
      paddingBottom: 10,
    },
  }

  return (
    <div style={s.root}>
      <header style={s.header}>
        <h1 style={s.title}>🎵 Faith Track Community</h1>
      </header>

      <div style={s.layout}>
        <div>
          <div style={s.card}>
            <h2 style={s.cardTitle}>Import Samples</h2>
            <ZipImporter />
            <SampleLibrary />
          </div>
        </div>

        <div>
          <div style={s.card}>
            <h2 style={s.cardTitle}>Track Mixer</h2>
            <TrackMixer />
          </div>
        </div>
      </div>

      <AudioPlayer />
    </div>
  )
}

export default App

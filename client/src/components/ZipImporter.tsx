import React, { useRef, useState } from 'react'
import type { DragEvent, ChangeEvent } from 'react'
import { Upload, FolderOpen } from 'lucide-react'
import { extractZip } from '../file-handler/fileHandler'
import { audioEngine } from '../audio-engine/audioEngine'
import useStore from '../state/useStore'

const ZipImporter: React.FC = () => {
  const addSamples = useStore((s) => s.addSamples)
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<number | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = async (file: File) => {
    setLoading(true)
    setCount(null)
    try {
      const samples = await extractZip(file)
      addSamples(samples)
      await Promise.all(samples.map((s) => audioEngine.loadSample(s.id, s.url)))
      setCount(samples.length)
    } catch (err) {
      console.error('Failed to extract zip:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.name.endsWith('.zip')) processFile(file)
  }

  const styles: Record<string, React.CSSProperties> = {
    zone: {
      border: `2px dashed ${dragging ? '#7c3aed' : '#4a4a6a'}`,
      borderRadius: 12,
      padding: '24px 16px',
      textAlign: 'center',
      cursor: 'pointer',
      background: dragging ? '#2d1b69' : '#16213e',
      transition: 'all 0.2s',
      color: '#a0aec0',
    },
    btn: {
      marginTop: 12,
      padding: '8px 20px',
      background: '#7c3aed',
      color: '#fff',
      border: 'none',
      borderRadius: 8,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 14,
    },
    badge: {
      marginTop: 10,
      padding: '4px 10px',
      background: '#065f46',
      color: '#6ee7b7',
      borderRadius: 20,
      fontSize: 13,
      display: 'inline-block',
    },
  }

  return (
    <div>
      <div
        style={styles.zone}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {loading ? (
          <span style={{ fontSize: 14 }}>⏳ Extracting samples…</span>
        ) : (
          <>
            <Upload size={28} style={{ margin: '0 auto 8px', display: 'block', color: '#7c3aed' }} />
            <p style={{ margin: 0, fontSize: 14 }}>Drop a <strong>.zip</strong> of audio files here</p>
            <p style={{ margin: '4px 0 0', fontSize: 12 }}>or click to browse</p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".zip"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {!loading && (
        <button style={styles.btn} onClick={() => inputRef.current?.click()}>
          <FolderOpen size={16} /> Browse ZIP
        </button>
      )}
      {count !== null && (
        <span style={styles.badge}>✓ {count} sample{count !== 1 ? 's' : ''} loaded</span>
      )}
    </div>
  )
}

export default ZipImporter

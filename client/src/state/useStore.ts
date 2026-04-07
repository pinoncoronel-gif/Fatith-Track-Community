import { create } from 'zustand'
import type { AudioSample } from '../file-handler/fileHandler'

export interface Track {
  id: string
  sampleId: string
  name: string
  volume: number
  loop: boolean
  muted: boolean
}

interface StoreState {
  samples: AudioSample[]
  tracks: Track[]
  bpm: number
  isPlaying: boolean
  addSamples: (samples: AudioSample[]) => void
  addTrack: (sampleId: string) => void
  removeTrack: (id: string) => void
  updateTrack: (id: string, changes: Partial<Track>) => void
  setBPM: (bpm: number) => void
  setIsPlaying: (val: boolean) => void
}

const useStore = create<StoreState>((set, get) => ({
  samples: [],
  tracks: [],
  bpm: 120,
  isPlaying: false,

  addSamples: (samples) =>
    set((state) => ({ samples: [...state.samples, ...samples] })),

  addTrack: (sampleId) => {
    const sample = get().samples.find((s) => s.id === sampleId)
    const track: Track = {
      id: crypto.randomUUID(),
      sampleId,
      name: sample?.name ?? 'Unknown',
      volume: 80,
      loop: false,
      muted: false,
    }
    set((state) => ({ tracks: [...state.tracks, track] }))
  },

  removeTrack: (id) =>
    set((state) => ({ tracks: state.tracks.filter((t) => t.id !== id) })),

  updateTrack: (id, changes) =>
    set((state) => ({
      tracks: state.tracks.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    })),

  setBPM: (bpm) => set({ bpm }),

  setIsPlaying: (val) => set({ isPlaying: val }),
}))

export default useStore

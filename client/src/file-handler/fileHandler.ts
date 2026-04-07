import JSZip from 'jszip'

export interface AudioSample {
  id: string
  name: string
  url: string
  type: 'mp3' | 'wav'
  size: number
}

export async function extractZip(file: File): Promise<AudioSample[]> {
  const zip = await JSZip.loadAsync(file)
  const samples: AudioSample[] = []

  const promises = Object.entries(zip.files).map(async ([filename, zipEntry]) => {
    if (zipEntry.dir) return

    const lower = filename.toLowerCase()
    const isMp3 = lower.endsWith('.mp3')
    const isWav = lower.endsWith('.wav')

    if (!isMp3 && !isWav) return

    const blob = await zipEntry.async('blob')
    const url = URL.createObjectURL(blob)
    const name = filename.split('/').pop() ?? filename

    samples.push({
      id: crypto.randomUUID(),
      name,
      url,
      type: isMp3 ? 'mp3' : 'wav',
      size: blob.size,
    })
  })

  await Promise.all(promises)
  return samples
}

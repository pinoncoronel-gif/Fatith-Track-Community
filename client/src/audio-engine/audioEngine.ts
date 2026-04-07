import * as Tone from 'tone'

class AudioEngine {
  bpm: number = 120
  private players: Map<string, Tone.Player> = new Map()

  setBPM(bpm: number): void {
    this.bpm = bpm
    Tone.getTransport().bpm.value = bpm
  }

  async loadSample(id: string, url: string): Promise<void> {
    const player = new Tone.Player({
      url,
      loop: false,
    }).toDestination()
    await Tone.loaded()
    this.players.set(id, player)
  }

  playSample(id: string): void {
    const player = this.players.get(id)
    if (player) {
      player.start()
    }
  }

  stopSample(id: string): void {
    const player = this.players.get(id)
    if (player) {
      player.stop()
    }
  }

  setLoop(id: string, loop: boolean): void {
    const player = this.players.get(id)
    if (player) {
      player.loop = loop
    }
  }

  setVolume(id: string, volumeDb: number): void {
    const player = this.players.get(id)
    if (player) {
      player.volume.value = volumeDb
    }
  }

  startTransport(): void {
    Tone.getTransport().start()
  }

  stopTransport(): void {
    Tone.getTransport().stop()
  }

  scheduleTrack(id: string, startTime: string): void {
    const player = this.players.get(id)
    if (player) {
      Tone.getTransport().schedule((time) => {
        player.start(time)
      }, startTime)
    }
  }

  async exportMix(durationSeconds: number): Promise<Blob> {
    const recorder = new Tone.Recorder()
    Tone.getDestination().connect(recorder)
    recorder.start()
    this.startTransport()
    await new Promise<void>((resolve) => setTimeout(resolve, durationSeconds * 1000))
    this.stopTransport()
    const blob = await recorder.stop()
    Tone.getDestination().disconnect(recorder)
    return blob
  }
}

export const audioEngine = new AudioEngine()

import { useCallback, useEffect, useRef, useState } from 'react'

type Status = 'idle' | 'requesting' | 'live' | 'denied' | 'unsupported'
type Facing = 'user' | 'environment'

export function useLiveCamera(enabled: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const facingRef = useRef<Facing>('user')
  const [status, setStatus] = useState<Status>('idle')
  const [facingMode, setFacingMode] = useState<Facing>('user')

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    if (videoRef.current) videoRef.current.srcObject = null
  }, [])

  const attachStream = useCallback(async (stream: MediaStream) => {
    const video = videoRef.current
    if (!video) return
    video.srcObject = stream
    video.muted = true
    await video.play().catch(() => undefined)
  }, [])

  const openCamera = useCallback(
    async (facing: Facing) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus('unsupported')
        return
      }

      setStatus('requesting')
      stopTracks()

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            facingMode: { ideal: facing },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })
        streamRef.current = stream
        facingRef.current = facing
        setFacingMode(facing)
        await attachStream(stream)
        setStatus('live')
      } catch {
        setStatus('denied')
      }
    },
    [attachStream, stopTracks],
  )

  useEffect(() => {
    if (!enabled) {
      stopTracks()
      setStatus('idle')
      return
    }

    void openCamera('user')
    return () => {
      stopTracks()
    }
    // Intentionally only re-run when live room opens/closes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  useEffect(() => {
    if (status === 'live' && streamRef.current) {
      void attachStream(streamRef.current)
    }
  }, [status, attachStream])

  const flip = useCallback(() => {
    const next: Facing = facingRef.current === 'user' ? 'environment' : 'user'
    void openCamera(next)
  }, [openCamera])

  const start = useCallback(() => openCamera(facingRef.current), [openCamera])

  return {
    videoRef,
    status,
    facingMode,
    start,
    flip,
  }
}

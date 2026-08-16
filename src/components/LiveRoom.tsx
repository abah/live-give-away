import { useEffect, useMemo, useState } from 'react'
import { formatCount } from '../lib/format'
import { useLiveCamera } from '../hooks/useLiveCamera'

type Props = {
  role: 'host' | 'viewer'
  creator: string
  handle: string
  title: string
  fallbackVideoUrl?: string
  fallbackPoster?: string
  loves: number
  coins: number
  loved: boolean
  onClose: () => void
  onLove: (x: number, y: number) => void
  onOpenGift: () => void
}

const CHAT_POOL = [
  'Gass live-nya!',
  'Kirim Paus dong',
  'Mantap banget',
  'Halo dari Jakarta',
  'Love dulu ya',
  'Keren banget setupnya',
  'Gift kecil dulu',
  'Lanjut terus',
  'Suara bagus!',
  'Nyala banget roomnya',
]

const CHAT_USERS = ['Alya', 'Bima', 'Citra', 'Dika', 'Eka', 'Fajar', 'Gita', 'Hana']

export function LiveRoom({
  role,
  creator,
  handle,
  title,
  fallbackVideoUrl,
  fallbackPoster,
  loves,
  coins,
  loved,
  onClose,
  onLove,
  onOpenGift,
}: Props) {
  const camera = useLiveCamera(role === 'host')
  const [viewers, setViewers] = useState(() => 120 + Math.floor(Math.random() * 80))
  const [messages, setMessages] = useState([
    { id: 'm0', user: 'Nyala', text: 'Selamat datang di live room' },
  ])
  const [elapsed, setElapsed] = useState(0)

  const cameraReady = role === 'host' && camera.status === 'live'
  const useFallback =
    role === 'viewer' ||
    camera.status === 'denied' ||
    camera.status === 'unsupported'

  useEffect(() => {
    const tick = window.setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearInterval(tick)
  }, [])

  useEffect(() => {
    const tick = window.setInterval(() => {
      setViewers((value) => Math.max(80, value + Math.floor(Math.random() * 9) - 3))
    }, 2200)
    return () => window.clearInterval(tick)
  }, [])

  useEffect(() => {
    const tick = window.setInterval(() => {
      const user = CHAT_USERS[Math.floor(Math.random() * CHAT_USERS.length)]
      const text = CHAT_POOL[Math.floor(Math.random() * CHAT_POOL.length)]
      setMessages((prev) => [{ id: `${Date.now()}`, user, text }, ...prev].slice(0, 8))
    }, 2800)
    return () => window.clearInterval(tick)
  }, [])

  const timerLabel = useMemo(() => {
    const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
    const ss = String(elapsed % 60).padStart(2, '0')
    return `${mm}:${ss}`
  }, [elapsed])

  return (
    <section className="live-room" aria-label={`Live ${creator}`}>
      <div className="live-room__stage">
        {role === 'host' ? (
          <video
            ref={camera.videoRef}
            className={`live-room__video live-room__video--camera${cameraReady ? ' is-on' : ''}`}
            playsInline
            muted
            autoPlay
          />
        ) : null}

        {useFallback || (role === 'host' && !cameraReady) ? (
          <video
            className={`live-room__video live-room__video--fallback${cameraReady ? ' is-hidden' : ''}`}
            src={fallbackVideoUrl}
            poster={fallbackPoster}
            playsInline
            loop
            muted
            autoPlay
          />
        ) : null}

        {role === 'host' && camera.status === 'requesting' ? (
          <div className="live-room__status">Mengaktifkan kamera...</div>
        ) : null}

        {role === 'host' && (camera.status === 'denied' || camera.status === 'unsupported') ? (
          <div className="live-room__status live-room__status--banner">
            {camera.status === 'unsupported'
              ? 'Kamera tidak didukung — mode demo.'
              : 'Kamera ditolak — mode demo video.'}
            <button
              type="button"
              className="btn-solid live-room__retry"
              onClick={() => void camera.start()}
            >
              Coba kamera
            </button>
          </div>
        ) : null}

        <div className="live-room__veil" />
      </div>

      <header className="live-room__top">
        <div className="live-room__host">
          <div className="live-room__avatar" aria-hidden="true">
            {creator.slice(0, 1)}
          </div>
          <div>
            <p className="live-room__name">{creator}</p>
            <p className="live-room__handle">{handle}</p>
          </div>
        </div>

        <div className="live-room__meta">
          <span className="live-badge">LIVE</span>
          <span className="live-room__viewers">{formatCount(viewers)}</span>
          <span className="live-room__timer">{timerLabel}</span>
          <button type="button" className="live-room__close" onClick={onClose}>
            Tutup
          </button>
        </div>
      </header>

      <p className="live-room__title">{title}</p>

      <div className="live-room__chat" aria-live="polite">
        {messages.map((message) => (
          <p key={message.id} className="live-room__chat-item">
            <strong>{message.user}</strong> {message.text}
          </p>
        ))}
      </div>

      <aside className="live-room__actions">
        {role === 'host' && cameraReady ? (
          <button type="button" className="action-btn" onClick={camera.flip}>
            <span className="action-btn__icon action-btn__icon--flip" aria-hidden="true" />
            <span>Flip</span>
          </button>
        ) : null}

        <button
          type="button"
          className={`action-btn ${loved ? 'is-loved' : ''}`}
          aria-pressed={loved}
          onClick={(event) => onLove(event.clientX, event.clientY)}
        >
          <span className="action-btn__icon" aria-hidden="true">
            ♥
          </span>
          <span>{formatCount(loves)}</span>
        </button>

        <button type="button" className="action-btn action-btn--coin" onClick={onOpenGift}>
          <span className="action-btn__icon coin-orb" aria-hidden="true" />
          <span>Gift</span>
          <small className="action-btn__sub">{formatCount(coins)}</small>
        </button>
      </aside>
    </section>
  )
}

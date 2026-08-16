import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { Clip } from '../data/videos'
import { formatCount } from '../lib/format'

type Props = {
  clip: Clip
  active: boolean
  loved: boolean
  loves: number
  coins: number
  onLove: (clientX: number, clientY: number) => void
  onOpenCoins: () => void
  onEnterLive?: () => void
}

export function VideoCard({
  clip,
  active,
  loved,
  loves,
  coins,
  onLove,
  onOpenCoins,
  onEnterLive,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastTapRef = useRef(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (active) {
      video.currentTime = 0
      void video.play().then(() => setPaused(false)).catch(() => setPaused(true))
    } else {
      video.pause()
    }
  }, [active])

  function handleTap(event: MouseEvent<HTMLElement>) {
    const now = Date.now()
    if (now - lastTapRef.current < 280) {
      onLove(event.clientX, event.clientY)
      lastTapRef.current = 0
      return
    }
    lastTapRef.current = now

    if (clip.isLive && onEnterLive) {
      onEnterLive()
      return
    }

    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
      setPaused(false)
    } else {
      video.pause()
      setPaused(true)
    }
  }

  return (
    <article className={`clip ${active ? 'is-active' : ''}${clip.isLive ? ' clip--live' : ''}`}>
      <div className="clip__stage" onClick={handleTap}>
        <video
          ref={videoRef}
          className="clip__video"
          src={clip.videoUrl}
          poster={clip.poster}
          playsInline
          loop
          muted
          preload="metadata"
        />
        <div className="clip__veil" />
        {clip.isLive ? <span className="live-badge live-badge--card">LIVE</span> : null}
        {paused && active && !clip.isLive ? (
          <div className="clip__paused" aria-hidden="true">
            <span />
          </div>
        ) : null}
      </div>

      <div className="clip__meta">
        <p className="clip__handle">{clip.handle}</p>
        <h2 className="clip__caption">{clip.caption}</h2>
        <p className="clip__music">
          <span aria-hidden="true">♪</span> {clip.music}
        </p>
        {clip.isLive && onEnterLive ? (
          <button
            type="button"
            className="clip__join-live"
            onClick={(event) => {
              event.stopPropagation()
              onEnterLive()
            }}
          >
            Masuk Live
          </button>
        ) : null}
      </div>

      <aside className="clip__actions">
        <div className="creator-avatar" aria-hidden="true">
          {clip.creator.slice(0, 1)}
        </div>

        <button
          type="button"
          className={`action-btn ${loved ? 'is-loved' : ''}`}
          aria-pressed={loved}
          aria-label={loved ? 'Batalkan love' : 'Love'}
          onClick={(event) => {
            event.stopPropagation()
            onLove(event.clientX, event.clientY)
          }}
        >
          <span className="action-btn__icon" aria-hidden="true">
            ♥
          </span>
          <span>{formatCount(loves)}</span>
        </button>

        <button
          type="button"
          className="action-btn action-btn--coin"
          aria-label="Kirim gift"
          onClick={(event) => {
            event.stopPropagation()
            onOpenCoins()
          }}
        >
          <span className="action-btn__icon coin-orb" aria-hidden="true" />
          <span>Gift</span>
          <small className="action-btn__sub">{formatCount(coins)}</small>
        </button>
      </aside>
    </article>
  )
}

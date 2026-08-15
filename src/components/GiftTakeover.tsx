import { useEffect } from 'react'
import type { GiftIntensity } from '../data/videos'
import { WhaleParticleField } from './WhaleParticleField'

export type TakeoverEvent = {
  id: string
  giftId: string
  giftName: string
  coins: number
  sender: string
  creator: string
  intensity: GiftIntensity
}

type Props = {
  event: TakeoverEvent | null
  onDone: () => void
}

const DURATIONS: Record<GiftIntensity, number> = {
  soft: 1400,
  mid: 2600,
  epic: 5400,
}

export function GiftTakeover({ event, onDone }: Props) {
  useEffect(() => {
    if (!event) return
    const timer = window.setTimeout(onDone, DURATIONS[event.intensity])
    return () => window.clearTimeout(timer)
  }, [event, onDone])

  if (!event) return null

  if (event.intensity === 'epic' || event.giftId === 'whale') {
    return <WhaleTakeover event={event} />
  }

  if (event.intensity === 'mid') {
    return <MidTakeover event={event} />
  }

  return <SoftTakeover event={event} />
}

function SoftTakeover({ event }: { event: TakeoverEvent }) {
  return (
    <div className={`takeover takeover--soft takeover--${event.giftId}`} aria-live="polite">
      <div className="takeover__soft-card">
        <span className={`takeover__soft-icon gift-card__icon gift-card__icon--${event.giftId}`} />
        <div>
          <p className="takeover__sender">{event.sender}</p>
          <p className="takeover__line">
            kirim <strong>{event.giftName}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

function MidTakeover({ event }: { event: TakeoverEvent }) {
  return (
    <div className={`takeover takeover--mid takeover--${event.giftId}`} aria-live="polite">
      <div className="takeover__veil" />
      <div className="takeover__mid-burst" aria-hidden="true" />
      <div className="takeover__mid-orb" aria-hidden="true">
        <span className={`gift-card__icon gift-card__icon--${event.giftId}`} />
      </div>
      <div className="takeover__banner">
        <p className="takeover__eyebrow">Gift masuk</p>
        <h2>
          {event.sender} · {event.giftName}
        </h2>
        <p className="takeover__coins">{event.coins} koin untuk {event.creator}</p>
      </div>
    </div>
  )
}

function WhaleTakeover({ event }: { event: TakeoverEvent }) {
  return (
    <div className="takeover takeover--epic takeover--whale" aria-live="assertive">
      <WhaleParticleField active durationMs={5400} />

      <div className="whale-sea whale-sea--lite" aria-hidden="true">
        <div className="whale-sea__beams" />
        <div className="whale-shock" />
        <div className="whale-shock whale-shock--delay" />
      </div>

      <div className="whale-stage" aria-hidden="true">
        <div className="whale-glow" />
        <svg className="whale-svg" viewBox="0 0 720 300" fill="none">
          <defs>
            <linearGradient id="whaleBody" x1="40" y1="40" x2="680" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D7F3FF" />
              <stop offset="0.35" stopColor="#6EB6FF" />
              <stop offset="0.7" stopColor="#3B7EFF" />
              <stop offset="1" stopColor="#163B8C" />
            </linearGradient>
            <linearGradient id="whaleGlow" x1="120" y1="40" x2="560" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <filter id="whaleSoft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.4" />
            </filter>
            <filter id="whaleAura" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse cx="340" cy="258" rx="230" ry="18" fill="#041018" opacity="0.28" filter="url(#whaleSoft)" />
          <g className="whale-body" filter="url(#whaleAura)">
            <path
              d="M70 168c48-70 140-108 240-108 88 0 168 28 224 72 32 24 72 38 112 34-42 32-90 48-142 48-20 0-38-2-56-7-12 28-40 46-72 46-46 0-80-32-84-74-48-8-96-8-144 0-32 6-58-12-78-41z"
              fill="url(#whaleBody)"
            />
            <path
              d="M150 150c54-38 128-58 204-52 66 4 124 28 168 62"
              stroke="url(#whaleGlow)"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle cx="510" cy="128" r="8" fill="#07131F" />
            <circle cx="512.5" cy="125.5" r="2.8" fill="#E8F6FF" />
            <path d="M78 164c-32 20-54 22-74 10 20 2 38-2 56-14z" fill="#2E6CC4" />
            <path d="M268 198c26 30 12 52-20 58 38-2 66-24 56-58z" fill="#2459A8" />
            <g className="whale-spout">
              <path d="M400 88c8-34 2-56-10-78" stroke="#E7F8FF" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
              <path d="M416 94c12-30 22-50 16-76" stroke="#C8ECFF" strokeWidth="4.5" strokeLinecap="round" opacity="0.7" />
              <circle cx="384" cy="20" r="9" fill="#F4FCFF" opacity="0.85" />
              <circle cx="404" cy="30" r="6" fill="#D9F2FF" opacity="0.75" />
              <circle cx="424" cy="22" r="7" fill="#FFFFFF" opacity="0.8" />
            </g>
          </g>
        </svg>
        <div className="whale-splash" />
        <div className="whale-splash whale-splash--soft" />
      </div>

      <div className="takeover__banner takeover__banner--epic">
        <p className="takeover__eyebrow">Gift legend</p>
        <h2>{event.giftName}</h2>
        <p className="takeover__line">
          <strong>{event.sender}</strong> → {event.creator}
        </p>
        <p className="takeover__coins">{event.coins.toLocaleString('id-ID')} koin</p>
      </div>
    </div>
  )
}

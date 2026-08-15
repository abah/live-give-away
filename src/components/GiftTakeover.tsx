import { useEffect, type CSSProperties } from 'react'
import type { GiftIntensity } from '../data/videos'

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
  epic: 4800,
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
      <div className="whale-sea" aria-hidden="true">
        <div className="whale-sea__depth" />
        <div className="whale-sea__rays" />
        <div className="whale-sea__caustic" />
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className="whale-bubble"
            style={
              {
                '--bx': `${8 + ((i * 17) % 84)}%`,
                '--bd': `${1.8 + (i % 5) * 0.35}s`,
                '--bs': `${0.35 + (i % 4) * 0.2}rem`,
                '--bdelay': `${(i % 7) * 0.18}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="whale-stage" aria-hidden="true">
        <svg className="whale-svg" viewBox="0 0 640 280" fill="none">
          <defs>
            <linearGradient id="whaleBody" x1="40" y1="40" x2="600" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9AD7FF" />
              <stop offset="0.45" stopColor="#4F8CFF" />
              <stop offset="1" stopColor="#1B3F8A" />
            </linearGradient>
            <linearGradient id="whaleGlow" x1="120" y1="40" x2="520" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0.55" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <filter id="whaleBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>
          <ellipse cx="320" cy="250" rx="210" ry="18" fill="#041018" opacity="0.35" filter="url(#whaleBlur)" />
          <g className="whale-body">
            <path
              d="M90 160c40-62 120-96 210-96 78 0 148 24 198 62 28 22 62 34 98 30-36 28-78 42-124 42-18 0-34-2-50-6-10 24-34 40-62 40-40 0-70-28-74-64-42-8-84-8-126 0-28 6-52-10-70-38z"
              fill="url(#whaleBody)"
            />
            <path
              d="M150 148c46-34 110-52 176-48 58 4 108 24 146 54"
              stroke="url(#whaleGlow)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.55"
            />
            <circle cx="458" cy="126" r="7" fill="#07131F" />
            <circle cx="460" cy="124" r="2.4" fill="#E8F6FF" />
            <path
              d="M96 156c-28 18-48 20-66 10 18 2 34-2 50-12z"
              fill="#2E6CC4"
            />
            <path
              d="M248 188c22 26 10 46-18 52 34-2 58-22 50-52z"
              fill="#2459A8"
            />
            <g className="whale-spout">
              <path d="M360 92c6-28 2-48-8-68" stroke="#D7F2FF" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
              <path d="M372 96c10-26 18-44 14-66" stroke="#BFE8FF" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
              <circle cx="348" cy="28" r="7" fill="#EAF8FF" opacity="0.75" />
              <circle cx="366" cy="36" r="5" fill="#D5F0FF" opacity="0.65" />
              <circle cx="384" cy="30" r="6" fill="#F3FBFF" opacity="0.7" />
            </g>
          </g>
        </svg>
        <div className="whale-splash" />
      </div>

      <div className="takeover__banner takeover__banner--epic">
        <p className="takeover__eyebrow">Gift</p>
        <h2>{event.giftName}</h2>
        <p className="takeover__line">
          <strong>{event.sender}</strong> → {event.creator}
        </p>
        <p className="takeover__coins">{event.coins.toLocaleString('id-ID')} koin</p>
      </div>
    </div>
  )
}

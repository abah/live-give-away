import { useEffect, useState, type CSSProperties } from 'react'

export type Burst = {
  id: string
  kind: 'love' | 'coin'
  x: number
  y: number
}

type Props = {
  bursts: Burst[]
  onDone: (id: string) => void
}

export function FloatingBursts({ bursts, onDone }: Props) {
  return (
    <div className="burst-layer" aria-hidden="true">
      {bursts.map((burst) => (
        <BurstItem key={burst.id} burst={burst} onDone={onDone} />
      ))}
    </div>
  )
}

function BurstItem({
  burst,
  onDone,
}: {
  burst: Burst
  onDone: (id: string) => void
}) {
  const [alive, setAlive] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAlive(false)
      onDone(burst.id)
    }, 900)
    return () => window.clearTimeout(timer)
  }, [burst.id, onDone])

  if (!alive) return null

  const particles =
    burst.kind === 'love'
      ? Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            className="burst-particle love"
            style={
              {
                '--i': i,
                '--x': `${(i - 2.5) * 18}px`,
                '--y': `${-40 - i * 8}px`,
              } as CSSProperties
            }
          >
            ♥
          </span>
        ))
      : Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="burst-particle coin"
            style={
              {
                '--i': i,
                '--x': `${(i - 3.5) * 14}px`,
                '--y': `${-28 - (i % 3) * 16}px`,
              } as CSSProperties
            }
          >
            ●
          </span>
        ))

  return (
    <div
      className={`burst burst-${burst.kind}`}
      style={{ left: burst.x, top: burst.y }}
    >
      {particles}
    </div>
  )
}

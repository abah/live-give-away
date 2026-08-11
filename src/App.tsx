import { useCallback, useEffect, useRef, useState } from 'react'
import { CoinPanel } from './components/CoinPanel'
import { FloatingBursts, type Burst } from './components/FloatingBursts'
import { VideoCard } from './components/VideoCard'
import { clips } from './data/videos'
import { useNyalaStore } from './hooks/useNyalaStore'
import './App.css'

export default function App() {
  const { wallet, loved, stats, toggleLove, sendCoins, topUp } = useNyalaStore()
  const [activeId, setActiveId] = useState(clips[0]?.id ?? '')
  const [coinClipId, setCoinClipId] = useState<string | null>(null)
  const [bursts, setBursts] = useState<Burst[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = feedRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target instanceof HTMLElement) {
          const id = visible.target.dataset.clipId
          if (id) setActiveId(id)
        }
      },
      { root, threshold: [0.55, 0.75] },
    )

    root.querySelectorAll<HTMLElement>('[data-clip-id]').forEach((node) => {
      observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const removeBurst = useCallback((id: string) => {
    setBursts((prev) => prev.filter((burst) => burst.id !== id))
  }, [])

  function spawnBurst(kind: Burst['kind'], x: number, y: number) {
    const id = `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setBursts((prev) => [...prev, { id, kind, x, y }])
  }

  function handleLove(clipId: string, x: number, y: number) {
    const wasLoved = Boolean(loved[clipId])
    toggleLove(clipId)
    if (!wasLoved) spawnBurst('love', x, y)
  }

  function handleGift(amount: number, packName: string) {
    if (!coinClipId) return
    const ok = sendCoins(coinClipId, amount)
    if (!ok) {
      setToast('Koin tidak cukup. Isi ulang dulu.')
      return
    }
    spawnBurst('coin', window.innerWidth * 0.72, window.innerHeight * 0.42)
    setToast(`Kirim ${packName} · ${amount} koin`)
  }

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 1800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const activeClip = clips.find((clip) => clip.id === coinClipId)

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true" />
          <div>
            <p className="brand__name">Nyala</p>
            <p className="brand__tag">Love & koin buat kreator</p>
          </div>
        </div>
        <button type="button" className="wallet-pill" onClick={() => topUp()}>
          <span className="wallet-pill__coin" aria-hidden="true" />
          <span>{wallet}</span>
          <small>+isi</small>
        </button>
      </header>

      <main className="feed" ref={feedRef} aria-label="Feed video Nyala">
        {clips.map((clip) => {
          const clipStats = stats[clip.id] ?? { loves: clip.loves, coins: clip.coins }
          return (
            <div key={clip.id} className="feed__slide" data-clip-id={clip.id}>
              <VideoCard
                clip={clip}
                active={activeId === clip.id}
                loved={Boolean(loved[clip.id])}
                loves={clipStats.loves}
                coins={clipStats.coins}
                onLove={(x, y) => handleLove(clip.id, x, y)}
                onOpenCoins={() => setCoinClipId(clip.id)}
              />
            </div>
          )
        })}
      </main>

      <nav className="dock" aria-label="Navigasi">
        <span className="dock__item is-active">Beranda</span>
        <span className="dock__item">Temukan</span>
        <span className="dock__item dock__item--create" aria-hidden="true">
          +
        </span>
        <span className="dock__item">Kotak</span>
        <span className="dock__item">Profil</span>
      </nav>

      <CoinPanel
        open={Boolean(coinClipId)}
        wallet={wallet}
        creator={activeClip?.creator ?? 'kreator'}
        onClose={() => setCoinClipId(null)}
        onGift={handleGift}
        onTopUp={() => {
          topUp()
          setToast('Dompet +200 koin')
        }}
      />

      <FloatingBursts bursts={bursts} onDone={removeBurst} />

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}

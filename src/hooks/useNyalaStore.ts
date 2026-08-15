import { useEffect, useState } from 'react'
import { clips } from '../data/videos'

const WALLET_KEY = 'nyala.wallet'
const LOVED_KEY = 'nyala.loved'
const STATS_KEY = 'nyala.stats'

type ClipStats = Record<string, { loves: number; coins: number }>

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function defaultStats(): ClipStats {
  return Object.fromEntries(
    clips.map((clip) => [clip.id, { loves: clip.loves, coins: clip.coins }]),
  )
}

export function useNyalaStore() {
  const [wallet, setWallet] = useState(() => readJson(WALLET_KEY, 3000))
  const [loved, setLoved] = useState<Record<string, boolean>>(() =>
    readJson(LOVED_KEY, {}),
  )
  const [stats, setStats] = useState<ClipStats>(() =>
    readJson(STATS_KEY, defaultStats()),
  )

  useEffect(() => {
    localStorage.setItem(WALLET_KEY, JSON.stringify(wallet))
  }, [wallet])

  useEffect(() => {
    localStorage.setItem(LOVED_KEY, JSON.stringify(loved))
  }, [loved])

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  }, [stats])

  function toggleLove(clipId: string) {
    setLoved((prev) => {
      const nextLoved = !prev[clipId]
      setStats((prevStats) => {
        const current = prevStats[clipId] ?? { loves: 0, coins: 0 }
        return {
          ...prevStats,
          [clipId]: {
            ...current,
            loves: Math.max(0, current.loves + (nextLoved ? 1 : -1)),
          },
        }
      })
      return { ...prev, [clipId]: nextLoved }
    })
  }

  function sendCoins(clipId: string, amount: number): boolean {
    if (amount <= 0 || wallet < amount) return false
    setWallet((prev) => prev - amount)
    setStats((prev) => {
      const current = prev[clipId] ?? { loves: 0, coins: 0 }
      return {
        ...prev,
        [clipId]: {
          ...current,
          coins: current.coins + amount,
        },
      }
    })
    return true
  }

  function topUp(amount = 2500) {
    setWallet((prev) => prev + amount)
  }

  return {
    wallet,
    loved,
    stats,
    toggleLove,
    sendCoins,
    topUp,
  }
}

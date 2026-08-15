import { useEffect, useRef } from 'react'

type ParticleKind = 'spark' | 'bubble' | 'dust' | 'streak' | 'foam' | 'ring'

type Particle = {
  kind: ParticleKind
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  spin: number
  hue: number
  alpha: number
}

type Props = {
  active: boolean
  durationMs?: number
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function whaleX(progress: number, width: number) {
  return -0.25 * width + progress * width * 1.45
}

function whaleY(progress: number, height: number) {
  return height * (0.52 + Math.sin(progress * Math.PI * 1.2) * 0.08)
}

export function WhaleParticleField({ active, durationMs = 5200 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let running = true
    const particles: Particle[] = []
    const start = performance.now()
    let last = start

    const resize = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth || window.innerWidth
      const h = parent?.clientHeight || window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const spawnBurst = (x: number, y: number, count: number, boost = 1) => {
      for (let i = 0; i < count; i += 1) {
        const angle = rand(-Math.PI, Math.PI)
        const speed = rand(30, 180) * boost
        particles.push({
          kind: Math.random() > 0.55 ? 'spark' : 'dust',
          x: x + rand(-18, 18),
          y: y + rand(-12, 12),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - rand(20, 80),
          life: 0,
          maxLife: rand(0.55, 1.35),
          size: rand(1.2, 4.8) * boost,
          spin: rand(-4, 4),
          hue: rand(185, 215),
          alpha: rand(0.55, 1),
        })
      }
    }

    const spawnBubble = (x: number, y: number) => {
      particles.push({
        kind: 'bubble',
        x: x + rand(-40, 40),
        y: y + rand(-20, 30),
        vx: rand(-18, 18),
        vy: rand(-90, -35),
        life: 0,
        maxLife: rand(1.2, 2.4),
        size: rand(3, 14),
        spin: rand(-1, 1),
        hue: 200,
        alpha: rand(0.25, 0.65),
      })
    }

    const spawnFoam = (x: number, y: number) => {
      particles.push({
        kind: 'foam',
        x,
        y,
        vx: rand(-40, 40),
        vy: rand(-20, 40),
        life: 0,
        maxLife: rand(0.4, 0.9),
        size: rand(8, 28),
        spin: rand(-2, 2),
        hue: 200,
        alpha: rand(0.2, 0.45),
      })
    }

    const spawnStreak = (x: number, y: number, dir: number) => {
      particles.push({
        kind: 'streak',
        x,
        y,
        vx: dir * rand(120, 260),
        vy: rand(-30, 30),
        life: 0,
        maxLife: rand(0.25, 0.55),
        size: rand(18, 46),
        spin: 0,
        hue: rand(190, 210),
        alpha: rand(0.25, 0.55),
      })
    }

    // Opening shockwave rings
    for (let i = 0; i < 3; i += 1) {
      particles.push({
        kind: 'ring',
        x: 0.5,
        y: 0.48,
        vx: 0,
        vy: 0,
        life: -i * 0.12,
        maxLife: 1.1,
        size: 20 + i * 8,
        spin: 0,
        hue: 200,
        alpha: 0.55 - i * 0.1,
      })
    }

    const draw = (now: number) => {
      if (!running) return
      const elapsed = now - start
      const dt = Math.min(0.033, (now - last) / 1000)
      last = now
      const progress = Math.min(1, elapsed / durationMs)
      const w = canvas.clientWidth
      const h = canvas.clientHeight

      ctx.clearRect(0, 0, w, h)

      // Cinematic wash — covers screen impressively but keeps live readable
      const cover = 0.34 + Math.sin(progress * Math.PI) * 0.28
      const wash = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.78)
      wash.addColorStop(0, `rgba(40, 120, 200, ${0.18 + cover * 0.25})`)
      wash.addColorStop(0.4, `rgba(10, 50, 100, ${0.28 + cover * 0.35})`)
      wash.addColorStop(1, `rgba(2, 10, 24, ${0.42 + cover * 0.38})`)
      ctx.fillStyle = wash
      ctx.fillRect(0, 0, w, h)

      // Soft vignette
      const vig = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.2, w * 0.5, h * 0.5, h * 0.75)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, `rgba(0, 8, 20, ${0.35 + Math.sin(progress * Math.PI) * 0.2})`)
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, w, h)

      const wx = whaleX(progress, w)
      const wy = whaleY(progress, h)

      // Continuous trail while whale crosses
      if (progress > 0.04 && progress < 0.9) {
        if (Math.random() < 0.95) spawnBurst(wx, wy, 5 + Math.floor(Math.random() * 6), 1)
        if (Math.random() < 0.7) spawnBubble(wx - 30, wy + 10)
        if (Math.random() < 0.55) spawnFoam(wx - 20, wy + 24)
        if (Math.random() < 0.5) spawnStreak(wx, wy, 1)
        if (Math.random() < 0.35) spawnStreak(wx, wy - 18, 1)
      }

      // Peak dazzle at mid-screen
      if (progress > 0.38 && progress < 0.62) {
        spawnBurst(wx, wy, 14, 1.55)
        if (Math.random() < 0.6) spawnBurst(wx + rand(-80, 80), wy + rand(-40, 40), 8, 1.2)
      }

      // Ambient rising glitter
      if (Math.random() < 0.5) {
        particles.push({
          kind: 'dust',
          x: rand(0, w),
          y: h + 10,
          vx: rand(-20, 20),
          vy: rand(-120, -40),
          life: 0,
          maxLife: rand(1.4, 2.6),
          size: rand(1, 2.8),
          spin: rand(-2, 2),
          hue: rand(180, 220),
          alpha: rand(0.35, 0.8),
        })
      }

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const p = particles[i]
        p.life += dt
        if (p.life > p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        const t = Math.max(0, p.life / p.maxLife)
        const fade = t < 0.15 ? t / 0.15 : t > 0.7 ? (1 - t) / 0.3 : 1

        if (p.kind === 'ring') {
          const cx = w * p.x
          const cy = h * p.y
          const radius = 40 + t * Math.max(w, h) * 0.55
          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(170, 230, 255, ${p.alpha * fade * 0.55})`
          ctx.lineWidth = 3 + (1 - t) * 8
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(cx, cy, radius * 0.86, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha * fade * 0.18})`
          ctx.lineWidth = 1.5
          ctx.stroke()
          continue
        }

        p.x += p.vx * dt
        p.y += p.vy * dt

        if (p.kind === 'bubble') {
          p.vx += Math.sin((now + p.x) * 0.004) * 18 * dt
          p.vy -= 18 * dt
        } else if (p.kind === 'spark' || p.kind === 'dust') {
          p.vy += 28 * dt
          p.vx *= 0.99
        } else if (p.kind === 'foam') {
          p.vx *= 0.96
          p.vy *= 0.97
        }

        const a = p.alpha * fade

        if (p.kind === 'streak') {
          const grd = ctx.createLinearGradient(p.x, p.y, p.x - p.size, p.y)
          grd.addColorStop(0, `rgba(220, 245, 255, ${a})`)
          grd.addColorStop(1, 'rgba(120, 200, 255, 0)')
          ctx.strokeStyle = grd
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.size, p.y + p.vy * 0.02)
          ctx.stroke()
          continue
        }

        if (p.kind === 'bubble') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(210, 240, 255, ${a})`
          ctx.lineWidth = 1.4
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(p.x - p.size * 0.28, p.y - p.size * 0.28, p.size * 0.22, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.7})`
          ctx.fill()
          continue
        }

        if (p.kind === 'foam') {
          ctx.beginPath()
          ctx.ellipse(p.x, p.y, p.size, p.size * 0.45, p.spin * t, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200, 235, 255, ${a * 0.35})`
          ctx.fill()
          continue
        }

        // spark / dust
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.2)
        glow.addColorStop(0, `hsla(${p.hue}, 100%, 88%, ${a})`)
        glow.addColorStop(0.4, `hsla(${p.hue}, 90%, 70%, ${a * 0.45})`)
        glow.addColorStop(1, `hsla(${p.hue}, 90%, 60%, 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255, 255, 255, ${a})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.8, p.size * 0.45), 0, Math.PI * 2)
        ctx.fill()
      }

      // Soft light shaft following whale
      if (progress > 0.04 && progress < 0.9) {
        const shaft = ctx.createRadialGradient(wx, wy, 0, wx, wy, 160)
        shaft.addColorStop(0, 'rgba(180, 230, 255, 0.28)')
        shaft.addColorStop(0.35, 'rgba(80, 160, 255, 0.12)')
        shaft.addColorStop(1, 'rgba(20, 80, 160, 0)')
        ctx.fillStyle = shaft
        ctx.beginPath()
        ctx.arc(wx, wy, 160, 0, Math.PI * 2)
        ctx.fill()
      }

      if (elapsed < durationMs) {
        raf = requestAnimationFrame(draw)
      }
    }

    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active, durationMs])

  return <canvas ref={canvasRef} className="whale-particles" aria-hidden="true" />
}

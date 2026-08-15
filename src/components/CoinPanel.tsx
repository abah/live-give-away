import type { GiftPack } from '../data/videos'
import { giftPacks } from '../data/videos'

type Props = {
  open: boolean
  wallet: number
  creator: string
  onClose: () => void
  onGift: (gift: GiftPack) => void
  onTopUp: () => void
}

export function CoinPanel({
  open,
  wallet,
  creator,
  onClose,
  onGift,
  onTopUp,
}: Props) {
  if (!open) return null

  return (
    <div className="coin-sheet" role="dialog" aria-modal="true" aria-label="Kirim gift">
      <button className="coin-sheet__backdrop" onClick={onClose} aria-label="Tutup" />
      <div className="coin-sheet__panel">
        <div className="coin-sheet__handle" />
        <header className="coin-sheet__header">
          <div>
            <p className="coin-sheet__eyebrow">Live gift</p>
            <h2>Dukung {creator}</h2>
          </div>
          <div className="wallet-chip">
            <span className="wallet-chip__coin" aria-hidden="true" />
            <strong>{wallet.toLocaleString('id-ID')}</strong>
          </div>
        </header>

        <div className="gift-grid gift-grid--live">
          {giftPacks.map((pack) => {
            const disabled = wallet < pack.coins
            const isEpic = pack.intensity === 'epic'
            return (
              <button
                key={pack.id}
                type="button"
                className={`gift-card gift-card--${pack.id}${isEpic ? ' gift-card--epic' : ''}`}
                disabled={disabled}
                onClick={() => onGift(pack)}
              >
                <span className={`gift-card__icon gift-card__icon--${pack.id}`} aria-hidden="true" />
                <span className="gift-card__copy">
                  <span className="gift-card__name">{pack.name}</span>
                  <span className="gift-card__cost">{pack.coins.toLocaleString('id-ID')} koin</span>
                  <span className="gift-card__blurb">{pack.blurb}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="coin-sheet__footer">
          <button type="button" className="btn-ghost" onClick={onTopUp}>
            Isi ulang +2.500
          </button>
          <button type="button" className="btn-solid" onClick={onClose}>
            Selesai
          </button>
        </div>
      </div>
    </div>
  )
}

import { giftPacks } from '../data/videos'

type Props = {
  open: boolean
  wallet: number
  creator: string
  onClose: () => void
  onGift: (coins: number, packName: string) => void
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
    <div className="coin-sheet" role="dialog" aria-modal="true" aria-label="Kirim koin">
      <button className="coin-sheet__backdrop" onClick={onClose} aria-label="Tutup" />
      <div className="coin-sheet__panel">
        <div className="coin-sheet__handle" />
        <header className="coin-sheet__header">
          <div>
            <p className="coin-sheet__eyebrow">Kirim koin</p>
            <h2>Dukung {creator}</h2>
          </div>
          <div className="wallet-chip">
            <span className="wallet-chip__coin" aria-hidden="true" />
            <strong>{wallet}</strong>
          </div>
        </header>

        <div className="gift-grid">
          {giftPacks.map((pack) => {
            const disabled = wallet < pack.coins
            return (
              <button
                key={pack.id}
                type="button"
                className={`gift-card gift-card--${pack.id}`}
                disabled={disabled}
                onClick={() => onGift(pack.coins, pack.name)}
              >
                <span className={`gift-card__icon gift-card__icon--${pack.id}`} aria-hidden="true" />
                <span className="gift-card__name">{pack.name}</span>
                <span className="gift-card__cost">{pack.coins} koin</span>
              </button>
            )
          })}
        </div>

        <div className="coin-sheet__footer">
          <button type="button" className="btn-ghost" onClick={onTopUp}>
            Isi ulang +200
          </button>
          <button type="button" className="btn-solid" onClick={onClose}>
            Selesai
          </button>
        </div>
      </div>
    </div>
  )
}

export type Clip = {
  id: string
  creator: string
  handle: string
  caption: string
  music: string
  videoUrl: string
  poster: string
  loves: number
  coins: number
}

export const clips: Clip[] = [
  {
    id: 'clip-1',
    creator: 'Raka Motion',
    handle: '@rakamotion',
    caption: 'LIVE vibe rooftop — kirim Paus biar layar meledak',
    music: 'Original Sound · Raka Motion',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    loves: 12840,
    coins: 920,
  },
  {
    id: 'clip-2',
    creator: 'Maya Kitchen',
    handle: '@mayakitchen',
    caption: 'Live masak malam ini — gift kecil juga diterima',
    music: 'Sizzle Beat · Studio Nyala',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    loves: 8421,
    coins: 1540,
  },
  {
    id: 'clip-3',
    creator: 'Dio Street',
    handle: '@diostreet',
    caption: 'Skate live di kota — Paus = screen takeover',
    music: 'City Pulse · Dio Street',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster:
      'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=900&q=80',
    loves: 22105,
    coins: 3102,
  },
  {
    id: 'clip-4',
    creator: 'Luna Live',
    handle: '@lunalive',
    caption: 'Cover akustik live — Paus buat encore',
    music: 'Soft Strings · Luna Live',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80',
    loves: 15690,
    coins: 4820,
  },
  {
    id: 'clip-5',
    creator: 'Arka Travel',
    handle: '@arkatravel',
    caption: 'Live jalan-jalan — kasih love atau kirim gift',
    music: 'Wander Loop · Arka Travel',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80',
    loves: 9733,
    coins: 1188,
  },
]

export type GiftIntensity = 'soft' | 'mid' | 'epic'

export type GiftPack = {
  id: string
  name: string
  coins: number
  intensity: GiftIntensity
  blurb: string
}

export const giftPacks: GiftPack[] = [
  {
    id: 'rose',
    name: 'Mawar',
    coins: 1,
    intensity: 'soft',
    blurb: 'Gift ringan',
  },
  {
    id: 'star',
    name: 'Bintang',
    coins: 10,
    intensity: 'soft',
    blurb: 'Kilau cepat',
  },
  {
    id: 'crown',
    name: 'Mahkota',
    coins: 50,
    intensity: 'mid',
    blurb: 'Highlight room',
  },
  {
    id: 'fire',
    name: 'Api',
    coins: 100,
    intensity: 'mid',
    blurb: 'Room panas',
  },
  {
    id: 'whale',
    name: 'Paus Menyelam',
    coins: 2150,
    intensity: 'epic',
    blurb: 'Screen takeover',
  },
]

export function getGiftById(id: string): GiftPack | undefined {
  return giftPacks.find((gift) => gift.id === id)
}

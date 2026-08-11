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
    caption: 'Sunset di rooftop — vibe malam ini beda 🔥',
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
    caption: 'Resep 60 detik: mie pedas level malam minggu',
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
    caption: 'Skate line di kota — kasih love kalau landingnya clean',
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
    caption: 'Cover akustik singkat — kirim koin biar lanjut full song 💛',
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
    caption: 'Jalan kecil yang jarang dilalui — simpan buat liburan nanti',
    music: 'Wander Loop · Arka Travel',
    videoUrl:
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80',
    loves: 9733,
    coins: 1188,
  },
]

export type GiftPack = {
  id: string
  name: string
  coins: number
}

export const giftPacks: GiftPack[] = [
  { id: 'rose', name: 'Mawar', coins: 1 },
  { id: 'star', name: 'Bintang', coins: 10 },
  { id: 'crown', name: 'Mahkota', coins: 50 },
  { id: 'fire', name: 'Api', coins: 100 },
]

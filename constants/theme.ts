/**
 * constants/theme.ts
 * [IMK #1] KONSISTENSI — SATU sumber token tema (warna, font, spacing, radius).
 * Semua layar & komponen mengambil nilai dari sini, tidak ada warna/ukuran "magic".
 * [IMK #7] KURANGI BEBAN INGATAN — penempatan & gaya konsisten karena token terpusat.
 */

export const colors = {
  bg: '#F3F4F6', // background lembut, tidak glaring
  surface: '#FFFFFF', // card / item
  line: '#E5E8EC', // separator & border hairline
  textHi: '#1E2230', // teks utama (near-ink, bukan hitam pekat)
  textLo: '#6B7280', // teks sekunder
  primary: '#4F6DDE', // aksen utama: tab aktif, chip, badge
  primarySoft: '#EAEEFD', // tint aksen
};

// warna per hari — deret ANALOG yang selaras (indigo → hijau), bukan pelangi acak
export const dayColors: Record<string, { solid: string; tint: string }> = {
  Senin: { solid: '#5B6CD9', tint: '#ECEEFB' },
  Selasa: { solid: '#3E86C9', tint: '#E9F1FA' },
  Rabu: { solid: '#2F9E93', tint: '#E6F4F2' },
  Kamis: { solid: '#3FA46B', tint: '#E8F5EE' },
  Jumat: { solid: '#78A63E', tint: '#EFF5E6' },
};

// fallback aman bila nama hari tidak dikenal (mis. data typo) — [IMK #4]
export const fallbackDayColor = { solid: colors.primary, tint: colors.primarySoft };

export function getDayColor(day: string) {
  return dayColors[day] ?? fallbackDayColor;
}

/**
 * Tipografi — nama family harus sama persis dengan yang di-load di app/_layout.tsx.
 * - Space Grotesk (Bold)  → nama matkul & label hari
 * - JetBrains Mono        → SEMUA data numerik/kode (jam, kode, SKS, ruangan, P-04, tanggal)
 * - Inter                 → body (nama dosen, topik pertemuan)
 */
export const fonts = {
  display: 'SpaceGrotesk_700Bold', // judul / nama matkul / nama hari
  displayMedium: 'SpaceGrotesk_500Medium',
  mono: 'JetBrainsMono_400Regular', // data
  monoMedium: 'JetBrainsMono_500Medium', // badge / chip data
  monoBold: 'JetBrainsMono_700Bold', // blok jam besar
  body: 'Inter_400Regular', // body
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
};

// spacing kelipatan 4 — konsisten di seluruh app
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const radius = {
  sm: 8,
  md: 12, // radius kartu standar
  lg: 16,
  pill: 999,
};

// target sentuh minimal (aksesibilitas) — [IMK #2] elemen interaktif nyaman disentuh
export const HIT_TARGET = 44;

// bayangan sangat halus untuk card (iOS shadow + Android elevation)
export const cardShadow = {
  shadowColor: '#1E2230',
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
};

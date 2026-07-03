/**
 * data/scheduleData.ts
 * Semua data HARDCODE (tugas praktikum — tanpa backend/AsyncStorage/CRUD).
 * Konsisten lintas dataset: nama matkul yang sama dipakai ulang di ketiga struktur.
 */

export type MataKuliah = {
  id: string;
  nama: string;
  kode: string;
  sks: number;
  dosen: string;
};

export type Pertemuan = {
  id: string;
  namaMatkul: string;
  pertemuanKe: number;
  topik: string;
  tanggal: string; // format tampilan: DD MMM YYYY
};

export type JadwalItem = {
  id: string;
  namaMatkul: string;
  ruangan: string;
  jamMulai: string; // HH:MM
  jamSelesai: string; // HH:MM
};

export type JadwalSection = {
  title: string; // nama hari (Senin..Jumat)
  data: JadwalItem[];
};

// 1) Ringkasan Mata Kuliah — minimal 5 matkul
export const mataKuliah: MataKuliah[] = [
  { id: 'mk-01', nama: 'Interaksi Manusia & Komputer', kode: 'IF3021', sks: 3, dosen: 'Dr. Rahmawati, M.Kom' },
  { id: 'mk-02', nama: 'Pemrograman Mobile', kode: 'IF3042', sks: 3, dosen: 'Andi Prasetyo, M.T' },
  { id: 'mk-03', nama: 'Basis Data Lanjut', kode: 'IF3033', sks: 3, dosen: 'Siti Nurhaliza, M.Kom' },
  { id: 'mk-04', nama: 'Kecerdasan Buatan', kode: 'IF3054', sks: 4, dosen: 'Bagus Wicaksono, Ph.D' },
  { id: 'mk-05', nama: 'Jaringan Komputer', kode: 'IF3025', sks: 3, dosen: 'Dewi Anggraini, M.T' },
  { id: 'mk-06', nama: 'Rekayasa Perangkat Lunak', kode: 'IF3066', sks: 3, dosen: 'Fajar Nugroho, M.Kom' },
];

// 2) Daftar Pertemuan — minimal 10 item
export const pertemuan: Pertemuan[] = [
  { id: 'pt-01', namaMatkul: 'Interaksi Manusia & Komputer', pertemuanKe: 1, topik: 'Pengantar IMK & prinsip usability', tanggal: '01 Sep 2025' },
  { id: 'pt-02', namaMatkul: 'Interaksi Manusia & Komputer', pertemuanKe: 4, topik: '7 Aturan Emas Shneiderman', tanggal: '22 Sep 2025' },
  { id: 'pt-03', namaMatkul: 'Pemrograman Mobile', pertemuanKe: 2, topik: 'Komponen inti React Native', tanggal: '09 Sep 2025' },
  { id: 'pt-04', namaMatkul: 'Pemrograman Mobile', pertemuanKe: 5, topik: 'Navigasi & Expo Router', tanggal: '30 Sep 2025' },
  { id: 'pt-05', namaMatkul: 'Basis Data Lanjut', pertemuanKe: 3, topik: 'Normalisasi & indexing', tanggal: '17 Sep 2025' },
  { id: 'pt-06', namaMatkul: 'Basis Data Lanjut', pertemuanKe: 6, topik: 'Transaksi & konkurensi', tanggal: '08 Okt 2025' },
  { id: 'pt-07', namaMatkul: 'Kecerdasan Buatan', pertemuanKe: 2, topik: 'Searching & heuristik', tanggal: '10 Sep 2025' },
  { id: 'pt-08', namaMatkul: 'Kecerdasan Buatan', pertemuanKe: 7, topik: 'Pengantar machine learning', tanggal: '15 Okt 2025' },
  { id: 'pt-09', namaMatkul: 'Jaringan Komputer', pertemuanKe: 4, topik: 'Model OSI & TCP/IP', tanggal: '24 Sep 2025' },
  { id: 'pt-10', namaMatkul: 'Jaringan Komputer', pertemuanKe: 8, topik: 'Routing & subnetting', tanggal: '22 Okt 2025' },
  { id: 'pt-11', namaMatkul: 'Rekayasa Perangkat Lunak', pertemuanKe: 3, topik: 'Metodologi Agile & Scrum', tanggal: '18 Sep 2025' },
  { id: 'pt-12', namaMatkul: 'Rekayasa Perangkat Lunak', pertemuanKe: 9, topik: 'Pengujian perangkat lunak', tanggal: '29 Okt 2025' },
];

// 3) Jadwal per Hari — Senin s/d Jumat
export const jadwalPerHari: JadwalSection[] = [
  {
    title: 'Senin',
    data: [
      { id: 'jd-01', namaMatkul: 'Interaksi Manusia & Komputer', ruangan: 'Lab RPL 1', jamMulai: '07:30', jamSelesai: '10:00' },
      { id: 'jd-02', namaMatkul: 'Basis Data Lanjut', ruangan: 'Gd. C-204', jamMulai: '13:00', jamSelesai: '15:30' },
    ],
  },
  {
    title: 'Selasa',
    data: [
      { id: 'jd-03', namaMatkul: 'Pemrograman Mobile', ruangan: 'Lab Mobile', jamMulai: '08:00', jamSelesai: '10:30' },
    ],
  },
  {
    title: 'Rabu',
    data: [
      { id: 'jd-04', namaMatkul: 'Kecerdasan Buatan', ruangan: 'Gd. B-101', jamMulai: '09:30', jamSelesai: '12:00' },
      { id: 'jd-05', namaMatkul: 'Jaringan Komputer', ruangan: 'Lab Jaringan', jamMulai: '13:00', jamSelesai: '15:30' },
    ],
  },
  {
    title: 'Kamis',
    data: [
      { id: 'jd-06', namaMatkul: 'Rekayasa Perangkat Lunak', ruangan: 'Gd. C-210', jamMulai: '07:30', jamSelesai: '10:00' },
      { id: 'jd-07', namaMatkul: 'Interaksi Manusia & Komputer', ruangan: 'Lab RPL 1', jamMulai: '13:00', jamSelesai: '14:40' },
    ],
  },
  {
    title: 'Jumat',
    data: [
      { id: 'jd-08', namaMatkul: 'Kecerdasan Buatan', ruangan: 'Gd. B-101', jamMulai: '08:00', jamSelesai: '10:30' },
    ],
  },
];

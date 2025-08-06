import nativewind from "nativewind/preset";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [nativewind],
  theme: {
    extend: {
      // 1. Palet Warna (Color Palette)
      // Warna-warna ini diambil dari desain UI Kit Anda.
      colors: {
        primary: {
          DEFAULT: '#7E62F3', // Ungu utama untuk tombol dan elemen aktif
          light: '#A38EFF',   // Ungu muda untuk background atau highlight
        },
        secondary: '#F59E0B', // Oranye/kuning untuk rating atau aksen
        neutral: {
          900: '#111827', // Hitam pekat untuk judul utama
          700: '#374151', // Abu-abu tua untuk teks body
          500: '#6B7280', // Abu-abu sedang untuk sub-judul atau placeholder
          300: '#D1D5DB', // Abu-abu muda untuk border/garis
          100: '#F3F4F6', // Abu-abu sangat muda untuk background halaman
        },
        // Anda bisa menambahkan warna lain sesuai kebutuhan
        // success: '#10B981',
        // error: '#EF4444',
      },

      // 2. Tipografi (Typography)
      // Ukuran font yang konsisten untuk berbagai elemen teks.
      // Font family seperti 'Poppins' atau 'Inter' akan cocok dengan desain ini.
      // Anda perlu meng-install font tersebut secara manual di project React Native Anda.
      fontFamily: {
        // Ganti 'Poppins' dengan nama font yang Anda gunakan
        sans: ['Poppins-Regular', 'sans-serif'],
        medium: ['Poppins-Medium', 'sans-serif'],
        semibold: ['Poppins-SemiBold', 'sans-serif'],
        bold: ['Poppins-Bold', 'sans-serif'],
      },

      // 3. Radius Sudut (Border Radius)
      // Untuk membuat sudut elemen menjadi tumpul secara konsisten.
      borderRadius: {
        'sm': '4px',    // Untuk elemen kecil
        'md': '8px',    // Default untuk card, input
        'lg': '12px',   // Untuk card yang lebih besar
        'xl': '16px',   // Untuk elemen yang sangat menonjol
        'full': '9999px', // Untuk tombol atau avatar berbentuk pil/lingkaran
      },
    },
  },
  plugins: [],
};

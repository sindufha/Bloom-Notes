import {
  ArrowRight,
  StickyNote,
  KeyRound,
  Lock,
  Shield,
  Wifi,
  WifiOff,
  Flower2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
  {
    to: "/catatan",
    icon: <StickyNote className="h-10 w-10" strokeWidth={2.5} />,
    title: "Catatan Tempel",
    description:
      "Catatan warna-warni yang bisa Anda tempel, sunting, dan hapus. Cocok untuk ide singkat dan daftar tugas.",
    bg: "bg-sunny",
    tilt: "-rotate-2",
  },
  {
    to: "/brankas",
    icon: <KeyRound className="h-10 w-10" strokeWidth={2.5} />,
    title: "Brankas Kata Sandi",
    description:
      "Simpan kredensial Anda dengan aman memakai enkripsi AES-256. Dilengkapi label akun seperti Instagram, Gmail, X, dan lain-lain.",
    bg: "bg-lavender",
    tilt: "rotate-2",
  },
  {
    to: "/enkripsi",
    icon: <Lock className="h-10 w-10" strokeWidth={2.5} />,
    title: "Enkripsi Teks",
    description:
      "Enkripsi dan dekripsi teks rahasia secara luring memakai AES-256-GCM, PBKDF2-SHA256, serta salt acak per pesan.",
    bg: "bg-mint",
    tilt: "-rotate-1",
  },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <section className="text-center py-12">
        <div className="inline-flex items-center gap-2 bg-white border-3 border-ink rounded-full px-4 py-1.5 shadow-cartoon-sm mb-6">
          <Sparkles className="h-4 w-4 text-bubblegum" strokeWidth={3} />
          <span className="font-display text-sm font-semibold">
            100% lokal — data Anda tidak pernah keluar dari perangkat
          </span>
        </div>
        <h1 className="font-display font-bold text-5xl sm:text-6xl leading-[1.05] tracking-tight">
          Kotak peralatan
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">lokal yang ceria</span>
            <span className="absolute inset-x-0 bottom-1 h-4 bg-mint -z-0 rounded-full" />
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl font-body text-ink/80 max-w-xl mx-auto">
          Catatan tempel dan brankas kata sandi yang sepenuhnya berjalan di
          peramban. Tanpa akun. Tanpa awan. Murni milik Anda.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className={`group ${card.bg} ${card.tilt} border-3 border-ink rounded-blob p-7 shadow-cartoon-lg hover:rotate-0 hover:-translate-y-1 transition-all duration-300`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl border-3 border-ink shadow-cartoon-sm mb-5">
              {card.icon}
            </div>
            <h3 className="font-display font-bold text-2xl mb-2">{card.title}</h3>
            <p className="font-body text-base text-ink/80 mb-4">{card.description}</p>
            <span className="inline-flex items-center gap-1 font-display font-semibold text-sm group-hover:gap-2 transition-all">
              Buka <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>

      <section className="bg-white border-3 border-ink rounded-blob p-8 shadow-cartoon max-w-3xl mx-auto mb-16">
        <h2 className="font-display font-bold text-2xl mb-6 text-center">
          Cara kerjanya
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: <WifiOff className="h-6 w-6" />,
              title: "Sepenuhnya luring",
              text: "Berjalan tanpa internet. Pasang sebagai aplikasi untuk pengalaman terbaik.",
            },
            {
              icon: <Shield className="h-6 w-6" />,
              title: "Terenkripsi",
              text: "Brankas memakai AES-256-GCM dengan kata sandi utama Anda. Tanpa pintu belakang.",
            },
            {
              icon: <Wifi className="h-6 w-6" />,
              title: "Tanpa server",
              text: "Tidak ada data yang keluar dari peramban. Semuanya tersimpan di localStorage.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-cream border-3 border-ink rounded-full shadow-cartoon-sm mb-3">
                {item.icon}
              </div>
              <h4 className="font-display font-bold text-lg mb-1">{item.title}</h4>
              <p className="font-body text-sm text-ink/70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 border-t-3 border-ink/10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-bubblegum border-3 border-ink shadow-cartoon-sm">
            <Flower2 className="h-4 w-4 text-ink" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold">Bloom</span>
        </div>
        <p className="font-body text-sm text-ink/40">
          Dibuat dengan teliti. Semua data tetap di perangkat Anda.
        </p>
      </footer>
    </div>
  );
}

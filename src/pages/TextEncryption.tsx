import { useState } from "react";
import {
  Lock,
  Unlock,
  Copy,
  Check,
  Shuffle,
  Trash2,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { encryptText, decryptText } from "../lib/crypto";

type Mode = "encrypt" | "decrypt";

export default function TextEncryption() {
  const [mode, setMode] = useState<Mode>("encrypt");
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const switchMode = (next: Mode) => {
    setMode(next);
    setOutput("");
    setError("");
    setCopied(false);
  };

  const generateKey = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(24));
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let s = "";
    for (let i = 0; i < bytes.length; i++) s += chars[bytes[i] % chars.length];
    setKey(s);
  };

  const run = async () => {
    setError("");
    setOutput("");
    setCopied(false);
    if (!input.trim()) {
      setError("Isi teks yang ingin diproses terlebih dahulu.");
      return;
    }
    if (!key) {
      setError("Masukkan kunci terlebih dahulu.");
      return;
    }
    setBusy(true);
    try {
      const result =
        mode === "encrypt"
          ? await encryptText(input, key)
          : await decryptText(input, key);
      setOutput(result);
    } catch {
      setError(
        mode === "decrypt"
          ? "Gagal mendekripsi. Pastikan kunci dan ciphertext-nya benar."
          : "Gagal mengenkripsi teks."
      );
    } finally {
      setBusy(false);
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
    setCopied(false);
  };

  const isEncrypt = mode === "encrypt";

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-4xl animate-fade-in-up">Enkripsi Teks</h1>
        <p className="font-body text-ink/70 mt-1">
          Enkripsi atau dekripsi teks langsung di peramban Anda. AES-256-GCM
          dengan kunci yang diturunkan via PBKDF2-SHA256 (600.000 iterasi) dan
          salt acak per pesan.
        </p>
      </div>

      <div className="bg-white border-3 border-ink rounded-blob p-2 shadow-cartoon-sm mb-6 inline-flex">
        <button
          onClick={() => switchMode("encrypt")}
          className={`px-5 py-2 rounded-full font-display font-semibold transition-all ${
            isEncrypt
              ? "bg-mint border-3 border-ink shadow-cartoon-sm"
              : "border-3 border-transparent hover:bg-cream"
          }`}
        >
          <Lock className="h-4 w-4 inline mr-2" />
          Enkripsi
        </button>
        <button
          onClick={() => switchMode("decrypt")}
          className={`px-5 py-2 rounded-full font-display font-semibold transition-all ${
            !isEncrypt
              ? "bg-lavender border-3 border-ink shadow-cartoon-sm"
              : "border-3 border-transparent hover:bg-cream"
          }`}
        >
          <Unlock className="h-4 w-4 inline mr-2" />
          Dekripsi
        </button>
      </div>

      <div className="bg-white border-3 border-ink rounded-blob p-6 shadow-cartoon mb-6">
        <label className="block font-display font-semibold mb-2">
          {isEncrypt ? "Teks asli" : "Ciphertext"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={
            isEncrypt
              ? "Tempel atau ketik teks rahasia Anda di sini..."
              : "Tempel ciphertext (diawali BLOOMv1:...) di sini..."
          }
          className="w-full px-4 py-3 font-body bg-cream border-3 border-ink rounded-2xl outline-none focus:shadow-cartoon-sm transition-shadow resize-y font-mono text-sm"
        />

        <label className="block font-display font-semibold mt-5 mb-2">
          Kunci rahasia
        </label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type={showKey ? "text" : "password"}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Masukkan kunci rahasia..."
              className="w-full px-4 py-2.5 pr-12 font-mono bg-cream border-3 border-ink rounded-2xl outline-none focus:shadow-cartoon-sm transition-shadow"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              aria-label="Tampilkan atau sembunyikan kunci"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/60 transition-colors"
            >
              {showKey ? (
                <EyeOff className="h-4 w-4 text-ink/60" />
              ) : (
                <Eye className="h-4 w-4 text-ink/60" />
              )}
            </button>
          </div>
          {isEncrypt && (
            <button
              onClick={generateKey}
              className="px-4 py-2.5 font-display font-semibold text-sm bg-sunny border-3 border-ink rounded-2xl shadow-cartoon-sm hover:-translate-y-0.5 hover:shadow-cartoon transition-all"
            >
              <Shuffle className="h-4 w-4 inline mr-1" />
              Acak kunci
            </button>
          )}
        </div>
        <p className="font-body text-xs text-ink/50 mt-2">
          Simpan kunci di tempat aman. Tanpa kunci yang tepat, ciphertext tidak
          bisa dibuka kembali.
        </p>

        {error && (
          <div className="mt-4 bg-bubblegum/20 border-2 border-bubblegum rounded-xl p-3 font-body text-sm text-ink">
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-5">
          <button
            onClick={run}
            disabled={busy}
            className={`inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold border-3 border-ink rounded-full shadow-cartoon-sm hover:-translate-y-0.5 hover:shadow-cartoon transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-cartoon-sm ${
              isEncrypt ? "bg-mint" : "bg-lavender"
            }`}
          >
            {isEncrypt ? (
              <Lock className="h-4 w-4" />
            ) : (
              <Unlock className="h-4 w-4" />
            )}
            {busy
              ? "Memproses..."
              : isEncrypt
                ? "Enkripsi sekarang"
                : "Dekripsi sekarang"}
          </button>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold bg-white border-3 border-ink rounded-full shadow-cartoon-sm hover:-translate-y-0.5 hover:shadow-cartoon transition-all"
          >
            <Trash2 className="h-4 w-4" />
            Bersihkan
          </button>
        </div>
      </div>

      {output && (
        <div className="bg-cream border-3 border-ink rounded-blob p-6 shadow-cartoon-sm">
          <div className="flex items-center justify-between mb-3">
            <label className="font-display font-semibold">
              {isEncrypt ? "Hasil ciphertext" : "Hasil teks asli"}
            </label>
            <button
              onClick={copyOutput}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-display font-semibold bg-white border-2 border-ink rounded-full hover:shadow-cartoon-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Tersalin
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Salin
                </>
              )}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={6}
            className="w-full px-4 py-3 font-mono text-sm bg-white border-3 border-ink rounded-2xl outline-none resize-y"
          />
        </div>
      )}

      <div className="mt-8 flex items-start gap-3 text-ink/60">
        <Shield className="h-5 w-5 mt-0.5 shrink-0 text-ink/40" />
        <p className="font-body text-sm">
          Seluruh proses enkripsi dan dekripsi berjalan di peramban Anda. Tidak
          ada teks maupun kunci yang dikirim ke server. Salt acak 16 byte
          dilekatkan di setiap ciphertext sehingga teks yang sama dengan kunci
          yang sama akan menghasilkan hasil berbeda setiap kali.
        </p>
      </div>
    </div>
  );
}

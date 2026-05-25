import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  Flower2,
  StickyNote,
  KeyRound,
  Lock,
  Download,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { usePwaInstall } from "./hooks/usePwaInstall";
import Home from "./pages/Home";
import StickyNotes from "./pages/StickyNotes";
import PasswordVault from "./pages/PasswordVault";
import TextEncryption from "./pages/TextEncryption";
import "./App.css";

const appName = import.meta.env.VITE_APP_NAME || "Bloom";

function Navbar() {
  const { canInstall, install } = usePwaInstall();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-full font-display font-semibold transition-all ${
      isActive
        ? "bg-bubblegum text-white border-3 border-ink shadow-cartoon-sm"
        : "hover:bg-cream border-3 border-transparent"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" end className={linkClass} onClick={() => setMobileOpen(false)}>
        <Flower2 className="h-4 w-4" strokeWidth={2.5} />
        Beranda
      </NavLink>
      <NavLink to="/catatan" className={linkClass} onClick={() => setMobileOpen(false)}>
        <StickyNote className="h-4 w-4" strokeWidth={2.5} />
        Catatan
      </NavLink>
      <NavLink to="/brankas" className={linkClass} onClick={() => setMobileOpen(false)}>
        <KeyRound className="h-4 w-4" strokeWidth={2.5} />
        Brankas
      </NavLink>
      <NavLink to="/enkripsi" className={linkClass} onClick={() => setMobileOpen(false)}>
        <Lock className="h-4 w-4" strokeWidth={2.5} />
        Enkripsi
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b-3 border-ink">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bubblegum border-3 border-ink shadow-cartoon-sm group-hover:animate-wiggle">
            <Flower2 className="h-5 w-5 text-ink" strokeWidth={2.5} />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight">
            {appName}
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-2">{navLinks}</nav>

        <div className="hidden md:flex items-center gap-3">
          {canInstall && (
            <button
              onClick={install}
              className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold bg-sunny border-3 border-ink rounded-full shadow-cartoon-sm hover:-translate-y-0.5 hover:shadow-cartoon transition-all"
            >
              <Download className="h-4 w-4" strokeWidth={2.5} />
              Pasang aplikasi
            </button>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl border-3 border-ink bg-white shadow-cartoon-sm"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t-3 border-ink bg-cream px-6 py-4 flex flex-col gap-2">
          {navLinks}
          {canInstall && (
            <button
              onClick={() => {
                install();
                setMobileOpen(false);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 font-display font-semibold bg-sunny border-3 border-ink rounded-full shadow-cartoon-sm mt-2"
            >
              <Download className="h-4 w-4" strokeWidth={2.5} />
              Pasang aplikasi
            </button>
          )}
        </div>
      )}
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-body text-ink bg-cream">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catatan" element={<StickyNotes />} />
            <Route path="/brankas" element={<PasswordVault />} />
            <Route path="/enkripsi" element={<TextEncryption />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

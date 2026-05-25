const ENC_ALGO = "AES-GCM";
const KEY_ALGO = "PBKDF2";
const ITERATIONS = 600_000;

function getEnvSalt(): Uint8Array {
  const hex = import.meta.env.VITE_VAULT_SALT ?? "";
  if (!hex || hex === "replace_with_your_random_hex_string") {
    return new TextEncoder().encode("bloom-default-salt-change-me");
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    KEY_ALGO,
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: KEY_ALGO, salt, iterations: ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    { name: ENC_ALGO, length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(plaintext: string, password: string): Promise<string> {
  const salt = getEnvSalt();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: ENC_ALGO, iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  const combined = new Uint8Array(iv.length + new Uint8Array(ciphertext).length);
  combined.set(iv);
  combined.set(new Uint8Array(ciphertext), iv.length);
  return btoa(String.fromCharCode(...combined));
}

export async function decrypt(encoded: string, password: string): Promise<string> {
  const salt = getEnvSalt();
  const data = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
  const iv = data.slice(0, 12);
  const ciphertext = data.slice(12);
  const key = await deriveKey(password, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: ENC_ALGO, iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}

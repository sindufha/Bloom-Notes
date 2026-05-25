const ENC_ALGO = "AES-GCM";
const KEY_ALGO = "PBKDF2";
const ITERATIONS = 600_000;
const SALT_LEN = 16;
const IV_LEN = 12;
const TEXT_PREFIX = "BLOOMv1:";

function getEnvSalt(): Uint8Array {
  const hex = import.meta.env.VITE_VAULT_SALT ?? "";
  if (!hex || hex === "ganti_dengan_string_hex_acakmu") {
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

function bytesToBase64(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function base64ToBytes(b64: string): Uint8Array {
  const s = atob(b64);
  const bytes = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) bytes[i] = s.charCodeAt(i);
  return bytes;
}

export async function encrypt(plaintext: string, password: string): Promise<string> {
  const salt = getEnvSalt();
  const iv = crypto.getRandomValues(new Uint8Array(IV_LEN));
  const key = await deriveKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: ENC_ALGO, iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  const ctBytes = new Uint8Array(ciphertext);
  const combined = new Uint8Array(iv.length + ctBytes.length);
  combined.set(iv);
  combined.set(ctBytes, iv.length);
  return bytesToBase64(combined);
}

export async function decrypt(encoded: string, password: string): Promise<string> {
  const salt = getEnvSalt();
  const data = base64ToBytes(encoded);
  const iv = data.slice(0, IV_LEN);
  const ciphertext = data.slice(IV_LEN);
  const key = await deriveKey(password, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: ENC_ALGO, iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}

export async function encryptText(plaintext: string, password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LEN));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LEN));
  const key = await deriveKey(password, salt);
  const ciphertext = await crypto.subtle.encrypt(
    { name: ENC_ALGO, iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  const ctBytes = new Uint8Array(ciphertext);
  const combined = new Uint8Array(salt.length + iv.length + ctBytes.length);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(ctBytes, salt.length + iv.length);
  return TEXT_PREFIX + bytesToBase64(combined);
}

export async function decryptText(encoded: string, password: string): Promise<string> {
  const stripped = encoded.startsWith(TEXT_PREFIX)
    ? encoded.slice(TEXT_PREFIX.length)
    : encoded;
  const data = base64ToBytes(stripped.replace(/\s+/g, ""));
  if (data.length < SALT_LEN + IV_LEN + 1) {
    throw new Error("Format teks tidak valid.");
  }
  const salt = data.slice(0, SALT_LEN);
  const iv = data.slice(SALT_LEN, SALT_LEN + IV_LEN);
  const ciphertext = data.slice(SALT_LEN + IV_LEN);
  const key = await deriveKey(password, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: ENC_ALGO, iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}

export async function generateSaltHex(): Promise<string> {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

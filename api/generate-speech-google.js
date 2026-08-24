/**
 * /api/generate-speech-google.js — 2026-08-24
 *
 * WHAT THIS DOES: real, natural British English voice narration via
 * Google Cloud Text-to-Speech (WaveNet), replacing Sarvam for English
 * specifically. Sarvam stays completely untouched in this codebase
 * (api/generate-speech.js) for Telugu — this is a genuinely different
 * provider for a genuinely different job, not a wholesale replacement.
 *
 * WHY THIS LOOKS MORE COMPLEX THAN SARVAM: Google's Text-to-Speech API
 * requires a "service account" credential, not a simple API key.
 * That means every request needs a short-lived access token, obtained
 * by signing a JWT with the service account's private key and
 * exchanging it with Google's OAuth server — the getGoogleAccessToken
 * function below does exactly that. This was tested against a
 * throwaway keypair (sign + verify round-trip) before ever being used
 * with the real credential, to confirm the cryptography itself was
 * correct independent of any account-specific issue.
 *
 * GOOGLE_TTS_KEY_BASE64 (set in Vercel) holds the entire service
 * account JSON key, base64-encoded — this avoids the multi-line JSON
 * getting mangled by environment variable systems that don't handle
 * newlines cleanly.
 */
const crypto = require("crypto");

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getGoogleAccessToken(serviceAccount) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaimSet = base64url(JSON.stringify(claimSet));
  const signatureInput = `${encodedHeader}.${encodedClaimSet}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signatureInput);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key);
  const encodedSignature = signature
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${signatureInput}.${encodedSignature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`Google token exchange failed: ${errText}`);
  }

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { text, voiceName, pace } = req.body || {};
  if (!text) {
    return res.status(400).json({ error: "Missing required field: text" });
  }

  const keyBase64 = process.env.GOOGLE_TTS_KEY_BASE64;
  if (!keyBase64) {
    console.error("GOOGLE_TTS_KEY_BASE64 not set");
    return res.status(200).json({ audio: null, fallback: true });
  }

  try {
    const serviceAccount = JSON.parse(Buffer.from(keyBase64, "base64").toString("utf-8"));
    const accessToken = await getGoogleAccessToken(serviceAccount);

    const ttsRes = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: "en-GB",
          // en-GB-Wavenet-A: confirmed genuine British English female
          // voice, $4/1M characters, 4M free per month. To try a
          // different voice, change ONLY this line — e.g.
          // "en-GB-Wavenet-B" is the equivalent male option.
          name: voiceName || "en-GB-Wavenet-A",
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: pace || 0.7,
        },
      }),
    });

    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      console.error("Google TTS API error:", errText);
      return res.status(200).json({ audio: null, fallback: true });
    }

    const data = await ttsRes.json();
    // Google already returns base64-encoded MP3 audio in audioContent.
    return res.status(200).json({ audio: data.audioContent });
  } catch (e) {
    console.error("generate-speech-google failed:", e.message);
    return res.status(200).json({ audio: null, fallback: true });
  }
}
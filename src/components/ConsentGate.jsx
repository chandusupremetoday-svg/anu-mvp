import React, { useState } from "react";

/**
 * ConsentGate — Sprint 0
 * Traces to: SAFE-001, SAFE-002, SAFE-003
 *
 * This component is the FIRST thing rendered, before any lesson,
 * before any learner profile is created. Nothing about the child
 * is written to the database until this returns success.
 *
 * WHAT'S REAL vs WHAT'S A STUB:
 *  - The consent text and flow structure are real and usable.
 *  - The actual "verifiable" part (proving the adult signing this
 *    really is the guardian) is NOT solved here — that typically
 *    needs an OTP to a phone/email, or a small payment-style
 *    verification. This version captures clear, logged consent,
 *    which is the necessary first layer; add stronger identity
 *    verification before handling real learners at scale.
 *
 * onConsentGiven(record) is called with the data your brother
 * should write to `guardians` + `consent_records` in Supabase.
 */

const CONSENT_TEXT_VERSION = "v1.0-2026-08";

export default function ConsentGate({ onConsentGiven }) {
  const [step, setStep] = useState("info"); // info -> form -> done
  const [guardianName, setGuardianName] = useState("");
  const [email, setEmail] = useState("");
  const [learnerName, setLearnerName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!guardianName.trim() || !email.trim() || !learnerName.trim()) {
      setError("Please fill in every field.");
      return;
    }
    if (!agreed) {
      setError("Please read and check the agreement box to continue.");
      return;
    }
    setError("");
    const record = {
      guardianName: guardianName.trim(),
      email: email.trim(),
      learnerName: learnerName.trim(),
      consentTextVersion: CONSENT_TEXT_VERSION,
      consentGiven: true,
      consentGivenAt: new Date().toISOString(),
    };
    setStep("done");
    onConsentGiven(record);
  }

  const shell = {
    maxWidth: 480,
    margin: "40px auto",
    padding: 28,
    borderRadius: 20,
    background: "#FBF7F0",
    fontFamily: "system-ui, sans-serif",
    border: "1px solid #E7E1D4",
  };

  if (step === "info") {
    return (
      <div style={shell}>
        <h2>Before we begin</h2>
        <p>
          ANU is a learning tool for your child. Before any lesson starts, we need your permission
          as a parent or guardian, and we want you to know exactly what we do and don't do with your
          child's information.
        </p>
        <ul>
          <li>We store only what's needed to run the lessons — your child's first name, grade, and how they're learning.</li>
          <li>We never use your child's data to train AI models or for advertising, ever.</li>
          <li>You can ask to see or delete your child's data at any time.</li>
          <li>ANU never gives a medical, psychological, or developmental diagnosis — only a teacher/parent would do that.</li>
        </ul>
        <button onClick={() => setStep("form")} style={btnStyle}>
          Continue
        </button>
      </div>
    );
  }

  if (step === "form") {
    return (
      <div style={shell}>
        <h2>Parent/Guardian consent</h2>
        <form onSubmit={submit}>
          <label style={labelStyle}>
            Your name
            <input style={inputStyle} value={guardianName} onChange={(e) => setGuardianName(e.target.value)} />
          </label>
          <label style={labelStyle}>
            Your email
            <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label style={labelStyle}>
            Child's first name (or nickname)
            <input style={inputStyle} value={learnerName} onChange={(e) => setLearnerName(e.target.value)} />
          </label>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", margin: "16px 0" }}>
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ marginTop: 4 }} />
            <span style={{ fontSize: 14 }}>
              I am this child's parent or legal guardian, I have read the information above, and I give
              permission for my child to use ANU under these terms (consent version {CONSENT_TEXT_VERSION}).
            </span>
          </label>
          {error && <div style={{ color: "#B3261E", marginBottom: 12, fontSize: 14 }}>{error}</div>}
          <button type="submit" style={btnStyle}>
            Give permission &amp; start
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={shell}>
      <h2>Thank you</h2>
      <p>Permission recorded. Setting things up…</p>
    </div>
  );
}

const btnStyle = {
  background: "#3A6B5C",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 22px",
  fontWeight: 700,
  cursor: "pointer",
};
const labelStyle = { display: "block", marginBottom: 14, fontSize: 14, fontWeight: 600 };
const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px 12px",
  marginTop: 6,
  borderRadius: 8,
  border: "1px solid #D8D2C4",
  fontSize: 15,
  boxSizing: "border-box",
};

"use client";

import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState<'home' | 'loading' | 'player'>('home');
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [videoData, setVideoData] = useState<any>(null);
  const [error, setError] = useState(false);

  // Exact strings from the source code
  const strings = {
    home: {
      messageLine1: "Something's",
      messageHighlight: "wrong",
      messageLine1End: "with Ben.",
      messageLine2: "Input your name to",
      messageLine3: "help him communicate:",
      inputPlaceholder: "ENTER NAME"
    },
    header: {
      theatresLabel: "ONLY IN THEATRES",
      releaseDate: "JANUARY 9"
    },
    loading: {
      step1: "Analyzing Ben's behavior pattern...",
      step2: "Processing voice and gestures..."
    },
    common: { go: "GO" },
    errors: { profanity: "Try another name." }
  };

  const pollJob = async (jobId: string) => {
    let attempts = 0;
    while (attempts < 40) {
      const res = await fetch(`/api/getJob/${jobId}`);
      const data = await res.json();
      if (data.status === "complete") return data;
      if (data.status === "error") throw new Error(data.error);
      await new Promise(r => setTimeout(r, 750));
      attempts++;
      setProgress(prev => Math.min(prev + 2, 99));
    }
    throw new Error("Timeout");
  };

  const startGeneration = async () => {
    if (!name.trim()) return;
    setStep('loading');
    setProgress(10);
    try {
      const res = await fetch(`/api/create/${encodeURIComponent(name)}`, { method: 'POST' });
      const data = await res.json();
      if (data.cached) {
        setVideoData(data);
      } else {
        const result = await pollJob(data.jobId);
        setVideoData({ ...result, ...data });
      }
      setProgress(100);
      setTimeout(() => setStep('player'), 500);
    } catch (e) {
      setError(true);
      setStep('home');
    }
  };

  return (
    <div className="app">
      {/* 1:1 Header Branding */}
      <header className="header">
        <div className="header-content">
          <img src="/images/TT.png" alt="PRIMATE" className="logo" />
          <div className="tagline">
            <span className="tagline-small">{strings.header.theatresLabel}</span>
            <span className="tagline-date">{strings.header.releaseDate}</span>
          </div>
        </div>
      </header>

      <div className="site-wrapper">
        {step === 'home' && (
          <main className="main-content">
            <div className="content-container">
              <div className="message-section">
                <p className="message-text">
                  <span>{strings.home.messageLine1}</span>{" "}
                  <span className="highlight">{strings.home.messageHighlight}</span>{" "}
                  <span>{strings.home.messageLine1End}</span>
                </p>
                <p className="message-text secondary">{strings.home.messageLine2}</p>
                <p className="message-text secondary">{strings.home.messageLine3}</p>
              </div>
              <div className="input-section">
                <div className="input-wrapper">
                  <input 
                    value={name} 
                    onChange={(e) => {setName(e.target.value); setError(false);}} 
                    placeholder={strings.home.inputPlaceholder} 
                    className="name-input"
                    maxLength={15}
                  />
                  {error && <p className="profanity-error">{strings.errors.profanity}</p>}
                </div>
                <button className="proceed-btn" onClick={startGeneration}>
                  <span>{strings.common.go}</span>
                  <img src="/images/btn_arrows.png" alt="" className="proceed-icon" />
                </button>
              </div>
            </div>
          </main>
        )}

        {step === 'loading' && (
          <div className="loading-overlay">
            <div className="loading-container">
              <img src="/images/primate_loading.gif" alt="" className="loading-gif" />
              <div className="loading-text">
                <p className={`status-text ${progress > 10 ? 'active' : ''}`}>{strings.loading.step1}</p>
                <p className={`status-text ${progress > 50 ? 'active' : ''}`}>{strings.loading.step2}</p>
              </div>
            </div>
          </div>
        )}

        {step === 'player' && videoData && (
          <div className="video-player-overlay">
            <div className="video-player-container">
              <video src={`https://${videoData.url}`} controls autoPlay playsInline className="generated-video" />
              <div className="right-column">
                <div className="soundboard-row">
                  <button className="soundboard-btn" onClick={() => new Audio(`https://${videoData.nameAudioUrl}`).play()}>
                    <img src="/images/btn_soundboard.png" className="soundboard-img" alt="" />
                    <div className="soundboard-overlay">
                      <img src="/images/btn_soundboard_user.png" className="soundboard-user-icon" alt="" />
                      <span className="soundboard-user-name">{name.toUpperCase()}</span>
                    </div>
                  </button>
                  <button className="soundboard-btn" onClick={() => new Audio(`https://${videoData.badAudioUrl}`).play()}>
                    <img src="/images/btn_soundboard.png" className="soundboard-img" alt="" />
                    <div className="soundboard-overlay">
                      <img src="/images/btn_soundboard_bad.png" className="soundboard-user-icon" alt="" />
                      <span className="soundboard-user-name">BAD</span>
                    </div>
                  </button>
                </div>
                <button className="action-link" onClick={() => setStep('home')}>RESTART</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
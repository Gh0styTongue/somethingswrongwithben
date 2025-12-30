"use client";

import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState<'home' | 'loading' | 'player'>('home');
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [videoData, setVideoData] = useState<any>(null);

  const strings = {
    home: {
      messageLine1: "Something's",
      messageHighlight: "wrong",
      messageLine1End: "with Ben.",
      messageLine2: "Input your name to",
      messageLine3: "help him communicate:",
      inputPlaceholder: "ENTER NAME"
    },
    header: { theatresLabel: "ONLY IN THEATRES", releaseDate: "JANUARY 9" },
    loading: { step1: "Analyzing Ben's behavior pattern...", step2: "Processing voice and gestures..." },
    common: { go: "GO" }
  };

  const startGeneration = async () => {
    if (!name.trim()) return;
    setStep('loading');
    setProgress(10);
    
    try {
      // Direct call to your new proxy that returns the full response
      const res = await fetch(`/api/create/${encodeURIComponent(name)}`, { method: 'POST' });
      const data = await res.json();
      
      setVideoData(data);
      setProgress(100);
      setTimeout(() => setStep('player'), 500);
    } catch (e) {
      setStep('home');
    }
  };

  return (
    <div className="app">
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
                    onChange={(e) => setName(e.target.value)} 
                    placeholder={strings.home.inputPlaceholder} 
                    className="name-input"
                    maxLength={15}
                  />
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
                <button className="action-link restart-btn" onClick={() => setStep('home')}>
                   <img src="/images/btn_reset.png" alt="" className="action-icon" />
                   <span>RESTART</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
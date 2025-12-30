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
    setProgress(0);
    
    // Simulate loading progress matching the 1:1 UI steps
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    try {
      const res = await fetch(`/api/create/${encodeURIComponent(name)}`, { method: 'POST' });
      const data = await res.json();
      setVideoData(data);
      
      // Ensure progress finishes before transitioning
      setTimeout(() => setStep('player'), 3000);
    } catch (e) {
      setStep('home');
    }
  };

  return (
    <div className={`app ${step !== 'home' ? 'popup-active' : ''}`}>
      <header className="header" data-v-699a8ae9>
        <div className="header-content" data-v-699a8ae9>
          <div className="logo-container" data-v-699a8ae9>
            <img src="/images/TT.png" alt="PRIMATE" className="logo" data-v-699a8ae9 />
            <div className="tagline" data-v-699a8ae9>
              <span className="tagline-small" data-v-699a8ae9>{strings.header.theatresLabel}</span>
              <span className="tagline-date" data-v-699a8ae9>{strings.header.releaseDate}</span>
            </div>
          </div>
        </div>
      </header>

      <div className={`site-wrapper ${step !== 'home' ? 'dimmed' : ''}`}>
        {step === 'home' && (
          <main className="main-content">
            <div className="content-container">
              <div className="message-section">
                <p className="message-text">
                  {strings.home.messageLine1} <span className="highlight">{strings.home.messageHighlight}</span> {strings.home.messageLine1End}
                </p>
                <p className="message-text" style={{fontSize: '0.9rem', marginTop: '1.5rem'}}>{strings.home.messageLine2}</p>
                <p className="message-text" style={{fontSize: '0.9rem'}}>{strings.home.messageLine3}</p>
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
                  <div className="input-line"></div>
                </div>
                <button className="proceed-btn" onClick={startGeneration}>
                  <span>{strings.common.go}</span>
                  <img src="/images/btn_arrows.png" alt="" className="proceed-icon" />
                </button>
              </div>
            </div>
          </main>
        )}
      </div>

      {step === 'loading' && (
        <div className="loading-overlay" data-v-0119ed10>
          <div className="loading-container" data-v-0119ed10>
            <div className="loading-image" data-v-0119ed10>
              <img src="/images/primate_loading.gif" alt="Loading" className="loading-gif" data-v-0119ed10 />
            </div>
            <div className="loading-text" data-v-0119ed10>
              <p className={`status-text ${progress > 10 ? 'active' : ''}`} data-v-0119ed10>{strings.loading.step1}</p>
              <p className={`status-text ${progress > 60 ? 'active' : ''}`} data-v-0119ed10>{strings.loading.step2}</p>
            </div>
          </div>
        </div>
      )}

      {step === 'player' && videoData && (
        <div className="video-player-overlay" data-v-80044d11>
          <div className="video-player-container" data-v-80044d11>
            <div className="video-wrapper" data-v-80044d11>
              <video src={`https://${videoData.url}`} controls autoPlay playsInline className="generated-video" data-v-80044d11 />
            </div>
            <div className="right-column" data-v-80044d11>
              <div className="soundboard-row" data-v-80044d11>
                <button className="soundboard-btn" data-v-80044d11 onClick={() => new Audio(`https://${videoData.nameAudioUrl}`).play()}>
                  <div className="soundboard-btn-inner" data-v-80044d11>
                    <img src="/images/btn_soundboard.png" className="soundboard-img" data-v-80044d11 />
                    <div className="soundboard-overlay" data-v-80044d11>
                      <img src="/images/btn_soundboard_user.png" className="soundboard-user-icon" data-v-80044d11 />
                      <span className="soundboard-user-name" data-v-80044d11>{name.toUpperCase()}</span>
                    </div>
                  </div>
                </button>
                <button className="soundboard-btn" data-v-80044d11 onClick={() => new Audio(`https://${videoData.badAudioUrl}`).play()}>
                  <div className="soundboard-btn-inner" data-v-80044d11>
                    <img src="/images/btn_soundboard.png" className="soundboard-img" data-v-80044d11 />
                    <div className="soundboard-overlay" data-v-80044d11>
                      <img src="/images/btn_soundboard_bad.png" className="soundboard-user-icon" data-v-80044d11 />
                      <span className="soundboard-user-name" data-v-80044d11>BAD</span>
                    </div>
                  </div>
                </button>
              </div>
              <div className="action-links action-links-primary" data-v-80044d11>
                <button className="action-link" data-v-80044d11 onClick={() => window.open(`https://${videoData.url}`)}>
                  <img src="/images/btn_download.png" className="action-icon" data-v-80044d11 />
                  <span>DOWNLOAD VIDEO</span>
                </button>
                <button className="action-link" data-v-80044d11 onClick={() => setStep('home')}>
                  <img src="/images/btn_reset.png" className="action-icon" data-v-80044d11 />
                  <span>RESTART</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="footer-gradient"></div>
    </div>
  );
}
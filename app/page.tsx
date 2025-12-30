"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [step, setStep] = useState<'home' | 'loading' | 'player'>('home');
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [videoData, setVideoData] = useState<any>(null);
  const [error, setError] = useState(false);

  // Core polling logic extracted from source
  const pollJob = async (jobId: string) => {
    let attempts = 0;
    while (attempts < 40) {
      const res = await fetch(`/api/getJob/${jobId}`);
      const data = await res.json();
      
      if (data.status === "complete") return data;
      if (data.status === "error") throw new Error(data.error);
      
      await new Promise(r => setTimeout(r, 750)); // 750ms interval from source
      attempts++;
      setProgress(prev => Math.min(prev + 2, 99));
    }
    throw new Error("Timeout");
  };

  const startGeneration = async () => {
    // Profanity check mock using logic from source
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

  if (step === 'loading') {
    return (
      <div className="loading-overlay">
        <img src="/images/primate_loading.gif" alt="Loading" className="loading-gif" />
        <p className={progress > 10 ? 'active' : ''}>Analyzing Ben's behavior pattern...</p>
        <p className={progress > 50 ? 'active' : ''}>Processing voice and gestures...</p>
      </div>
    );
  }

  if (step === 'player') {
    return (
      <div className="video-player-overlay">
        <video src={videoData.url} controls autoPlay className="generated-video" />
        <div className="soundboard-row">
          <button onClick={() => new Audio(videoData.nameAudioUrl).play()}>
            {name.toUpperCase()}
          </button>
          <button onClick={() => new Audio(videoData.badAudioUrl).play()}>
            BAD
          </button>
        </div>
        <button onClick={() => setStep('home')}>RESTART</button>
      </div>
    );
  }

  return (
    <main className="main-content">
      <div className="message-section">
        <p className="message-text">Something's <span className="highlight">wrong</span> with Ben.</p>
      </div>
      <div className="input-section">
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="ENTER NAME" 
          className="name-input"
        />
        <button className="proceed-btn" onClick={startGeneration}>GO</button>
        {error && <p className="profanity-error">Try another name.</p>}
      </div>
    </main>
  );
}
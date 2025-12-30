"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  // Data extracted from the site's JS bundle
  const strings = {
    home: {
      messageLine1: "Something's",
      messageHighlight: "wrong",
      messageLine1End: "with Ben.",
      messageLine2: "Input your name to",
      messageLine3: "help him communicate:",
      inputPlaceholder: "ENTER NAME"
    },
    common: { go: "GO" },
    errors: { profanity: "Try another name." }
  };

  const handleProceed = () => {
    // Simple mock of the profanity check logic found in the code
    if (name.toLowerCase().includes("biden") || name.length < 2) {
      setError(true);
    } else {
      setError(false);
      console.log("Initiating API call to CloudFront endpoint...");
    }
  };

  return (
    <div className="app">
      <div className="site-wrapper">
        <main className="main-content">
          <div className="content-container">
            <div className="message-section">
              <p className="message-text">
                <span>{strings.home.messageLine1}</span>{" "}
                <span className="highlight">{strings.home.messageHighlight}</span>{" "}
                <span>{strings.home.messageLine1End}</span>
              </p>
              <p className="message-text">{strings.home.messageLine2}</p>
              <p className="message-text">{strings.home.messageLine3}</p>
            </div>

            <div className="input-section">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(false); }}
                  placeholder={strings.home.inputPlaceholder}
                  className="name-input"
                  maxLength={15}
                />
                <div className="input-line"></div>
                {error && <p className="profanity-error">{strings.errors.profanity}</p>}
              </div>
              <button className="proceed-btn" onClick={handleProceed}>
                <span>{strings.common.go}</span>
                <img src="/images/btn_arrows.png" alt="Submit" className="proceed-icon" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
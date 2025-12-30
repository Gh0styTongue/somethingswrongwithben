"use client";

import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState<'home' | 'loading' | 'player'>('home');
  const [name, setName] = useState("");
  const [progress, setProgress] = useState(0);
  const [videoData, setVideoData] = useState<any>(null);
  const [backendError, setBackendError] = useState(false);
  const [showBlacklist, setShowBlacklist] = useState(false);

  const ga = ["5S","affanculo","arrapato","arrapate","arrapata","ass","assfuck","asshole","assholes","bagasce","bagascia","bagascie","bastard","bastarda","bastarde","bastardi","bastardo","belin","belinone","bestiality","bimbominkia","bitc","bitch","bitches","bitchin","bitching","blowjob","blowjobs","bocchinari","bocchinaro","bocchino","boiata","bruciaculo","bucchinaro","bucchini","bucchino","cacare","cacata","cacataa","cacate","cacca","cafonata","caga","cagare","cagat","cagata","cagate","cagati","cagatone","cagna","cagne","cagnetta","cagnette","cago","cagona","cagone","cagoni","cagosa","cagoso","cagosi","cam","cancerogene","cancerogeno","casapound","casa pound","cum","cumshot","cane","cazzata","cazzate","cazzi","cazzimma","cazo","cazzo","cazzooo","cazzone","cazzoni","cazzoso","cessa","cesse","cessi","cesso","checazz","checazzo","chiavare","chiavata","chiavica","cineblog","cb01","cinquestelle","pedofilo","pedofilia","pentastellati","grillino","grillini","clitoride","cock","cocksuck","cocksucker","codio","cogliona","coglionata","coglionate","coglione","coglioni","comunismo","comunista","cracker","crap","cretina","cretinata","cretinate","cretine","cretini","cretino","culi","culo","cummer","cumming","cums","cunilingus","cunillingus","cunnilingus","cunt","cunts","cyberfuc","cyberfuck","cyberfucker","cyberfucking","cybersex","deficiente","deficente","deficienti","deficenti","demente","dildo","diocane","diomerda","dioladro","diobastardo","dioporco","download","dimaio","di maio","ditoinculo","ditoarculo","ditoalculo","dito in culo","dito al culo","cancro","cancri","satanist","satanista","ritardati","porcoiddio","schifo","degrado","tumore","fanculo","fanculizzati","fart","fava","felatio","fellatio","fessa","fica","fiche","figa","figli","figlio","finocchi","finocchio","fistfucker","foibe","fottere","fottiti","fottutissima","fregna","frocetto","froci","frocino","frocio","fuck","fucker","fucktwat","fuckwit","fuk","fuks","gangbang","gang bang","gangbanged","gangbangs","gay","gaysex","gloryhole","goddamn","gulag","hardcoresex","honky","horniest","horny","idiota","idioti","imbecille","imbecilli","incaxato","incaxxata","incaxxato","incaxxo","incazzata","incazzato","incazzo","inculata","inculato","inculare","inkaxxa","inkaxxata","inkaxxato","inkaxxo","jackass","jerkoff","jihad","kissass","kock","leccaculo","lecchini","lercio","lesbica","lesbicona","link","madonna troia","maiala","maialate","mannaggiallamadonna","mannaggia alla madonna","maricon","marikon","masturbare","masturbarsi","masturbati","merda","mmerda","merdaccia","merdata","merdate","merde","merdina","merdosa","merdose","merdosi","merdoso","mignotta","minchia","minchiata","minchiate","minchie","minchione","mongolo","mongoloide","morirai","morirete","mortacci","muore","morto","motherfucker","muori","muoiono","nigger","niggers","negra","negri","negro","negrone","nowvideo","occristo","openload","orgasm","orgasms","palestina","palestinesi","palestinese","palle","parolacce","parolaccia","penis","pezzi di merda","pezzo di merda","pezzodimerda","pisciare","piss","pompinara","pompini","pompino","ponpino","ponpini","ponpinara","porca","porcate","porcata","porcatroia","porcellina","porche","porci","porco","porcodidio","porcoddio","porcordio","porcoiddio","porcodio","porka","porn","porno","pornography","pornos","pucchiacca","pussies","pussy","puta","puttana","porca madonna","puttanat","puttanamadonna","puttanata","puttane","puttanone","rabbino","raspone","renzi","ricchione","ritardata","ritardato","rompicoglioni","rompipalle","rottoinculo","salvini","sborare","sborra","sborrare","sborro","schifezza","schifosa","schifoso","scopare","scroto","scopata","sega","segaioli","segaiolo","seghe","sex","shit","skif","skifo","slut","sluts","sbura","sburo","siffredi","smerdare","sorca","spaz","spazzatura","sperma","sticazzi","sticchio","stocazzo","stracazzo","stronza","stronzata","stronzate","stronze","stronzi","stronzo","stronzone","sucalo","sucamelo","succhia","succhiacazzi","succhialo","supersborrata","supersborrate","terrone","tette","troia","troiata","troie","troione","troioni","vaffanculo","vagina","vomitare","vomito","webcam","whale","whore","wtf","vergogna","vergognoso","zoccola","zoccolacce","zoccoletta","zoccole","zoccolone","putin","ucraina","ukraine","biden","hamas","israele","israel","aborto","tordo","ciofeca","patacca","filmaccio","troiaio","vaffa","cristo","scemo","bimbiminkia","sputtanare","boiate","Paramount","Skydance","Primate","Primate Movie","David Ellison","PSKY"];

  const categories = {
    political: ["putin", "ucraina", "ukraine", "biden", "hamas", "israele", "israel", "salvini", "comunista", "comunismo"],
    corporate: ["paramount", "skydance", "primate", "david ellison", "psky"],
    general: ga.filter(w => !["putin", "ucraina", "ukraine", "biden", "hamas", "israele", "israel", "salvini", "comunista", "comunismo", "paramount", "skydance", "primate", "david ellison", "psky"].includes(w.toLowerCase()))
  };

  const pollJob = async (jobId: string, initialData: any) => {
    let attempts = 0;
    while (attempts < 40) {
      const res = await fetch(`/api/getJob/${jobId}`);
      const data = await res.json();
      if (data.status === "complete") return { ...initialData, url: data.url };
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
    setBackendError(false);
    setProgress(10);
    try {
      const res = await fetch(`/api/create/${encodeURIComponent(name)}`, { method: 'POST' });
      const data = await res.json();
      if (data.error && data.error.includes("inappropriate")) {
        setBackendError(true);
        setStep('home');
        return;
      }
      let finalData;
      if (data.cached) {
        finalData = data;
      } else {
        finalData = await pollJob(data.jobId, data);
      }
      setVideoData(finalData);
      setProgress(100);
      setTimeout(() => setStep('player'), 1000);
    } catch (e) {
      setStep('home');
    }
  };

  return (
    <div className={`app ${backendError || showBlacklist ? 'popup-active' : ''}`}>
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <img src="/images/TT.png" alt="PRIMATE" className="logo" />
            <div className="tagline">
              <span className="tagline-small">ONLY IN THEATRES</span>
              <span className="tagline-date">JANUARY 9</span>
            </div>
          </div>
        </div>
      </header>

      <div className={`site-wrapper ${backendError || showBlacklist ? 'dimmed' : ''}`}>
        {step === 'home' && (
          <main className="main-content">
            <div className="content-container">
              <div className="message-section">
                <p className="message-text">Something's <span className="highlight">wrong</span> with Ben.</p>
                <p className="message-text secondary">Input your name to help him communicate:</p>
              </div>
              <div className="input-section">
                <div className="input-wrapper">
                  <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="ENTER NAME" 
                    className="name-input"
                    maxLength={15}
                  />
                  <div className="input-line"></div>
                </div>
                <button className="proceed-btn" onClick={startGeneration}>
                  <span>GO</span>
                  <img src="/images/btn_arrows.png" alt="" className="proceed-icon" />
                </button>
                <button className="view-blacklist-btn" onClick={() => setShowBlacklist(true)}>
                  VIEW PARAMOUNT BLACKLIST
                </button>
              </div>
            </div>
          </main>
        )}
      </div>

      {backendError && (
        <div className="video-popup-overlay">
          <div className="video-popup error-modal">
            <button className="close-btn" onClick={() => setBackendError(false)}>X</button>
            <h2 className="highlight">INAPPROPRIATE CONTENT</h2>
            <p className="error-desc">
              This isn't a blacklisted word from us—we don't have any filters on our side. 
              The only people who do are Paramount. This word is blocked by their backend systems 
              and there is nothing we can do to bypass it on our end.
            </p>
            <button className="action-link" onClick={() => setBackendError(false)}>
              <span>TRY AGAIN</span>
            </button>
          </div>
        </div>
      )}

      {showBlacklist && (
        <div className="video-popup-overlay">
          <div className="video-popup blacklist-modal">
            <button className="close-btn" onClick={() => setShowBlacklist(false)}>X</button>
            <h3 className="modal-title">PARAMOUNT BLACKLIST</h3>
            <p className="modal-hint">
              It is interesting to see what Paramount chooses to block and what they don't. 
              If your name is blocked, try adding a <strong>-</strong> or an extra silent letter to bypass their filter.
            </p>
            <div className="blacklist-scroll">
              <div className="category">
                <h4 className="highlight">CORPORATE / FILM</h4>
                <p>{categories.corporate.join(", ")}</p>
              </div>
              <div className="category">
                <h4 className="highlight">POLITICAL</h4>
                <p>{categories.political.join(", ")}</p>
              </div>
              <div className="category">
                <h4 className="highlight">GENERAL PROFANITY</h4>
                <p>{categories.general.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div className="loading-overlay">
          <div className="loading-container">
            <img src="/images/primate_loading.gif" alt="" className="loading-gif" />
            <div className="loading-text">
              <p className={`status-text ${progress >= 10 ? 'active' : ''}`}>Analyzing Ben's behavior pattern...</p>
              <p className={`status-text ${progress >= 60 ? 'active' : ''}`}>Processing voice and gestures...</p>
            </div>
          </div>
        </div>
      )}

      {step === 'player' && videoData && (
        <div className="video-player-overlay">
          <div className="video-player-container">
            <div className="video-wrapper">
              <video src={`https://${videoData.url}`} controls autoPlay playsInline className="generated-video" />
            </div>
            <div className="right-column">
              <div className="soundboard-row">
                <button className="soundboard-btn" onClick={() => new Audio(`https://${videoData.nameAudioUrl}`).play()}>
                  <div className="soundboard-btn-inner">
                    <img src="/images/btn_soundboard.png" className="soundboard-img" />
                    <div className="soundboard-overlay">
                      <img src="/images/btn_soundboard_user.png" className="soundboard-user-icon" />
                      <span className="soundboard-user-name">{name.toUpperCase()}</span>
                    </div>
                  </div>
                </button>
                <button className="soundboard-btn" onClick={() => new Audio(`https://${videoData.badAudioUrl}`).play()}>
                  <div className="soundboard-btn-inner">
                    <img src="/images/btn_soundboard.png" className="soundboard-img" />
                    <div className="soundboard-overlay">
                      <img src="/images/btn_soundboard_bad.png" className="soundboard-user-icon" />
                      <span className="soundboard-user-name">BAD</span>
                    </div>
                  </div>
                </button>
              </div>
              <div className="action-links">
                <button className="action-link" onClick={() => window.open(`https://${videoData.url}`)}>
                  <img src="/images/btn_download.png" className="action-icon" />
                  <span>DOWNLOAD VIDEO</span>
                </button>
                <button className="action-link" onClick={() => setStep('home')}>
                  <img src="/images/btn_reset.png" className="action-icon" />
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
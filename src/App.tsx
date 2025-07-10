import React, { useState, useRef } from "react";
import FormPage from "./pages/FormPage/FormPage";
const logo = "/assets/logo.png";
const musicFile = "/assets/music/music.mp3";
import styles from "./pages/FormPage/FormPage.module.scss";

function MusicController({
  playing,
  show,
  className,
}: {
  playing: boolean;
  show: boolean;
  className?: string;
}) {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.muted = muted;
      if (playing) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, muted]);

  if (!show) return null;

  return (
    <div
      className={styles.musicControllerBtn + (className ? " " + className : "")}
    >
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Включить звук" : "Выключить звук"}
        className={styles.musicControllerBtn}
      >
        {muted ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              display: "block",
              margin: "auto",
              filter:
                "drop-shadow(0 0 4px #00fff7) drop-shadow(0 0 8px #ff00ea)",
            }}
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 9v6h4l5 5V4l-5 5H9z" fill="#fff" fillOpacity="0.7" />
            <line
              x1="1"
              y1="1"
              x2="23"
              y2="23"
              stroke="#ff00ea"
              strokeWidth="2.5"
            />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              display: "block",
              margin: "auto",
              filter:
                "drop-shadow(0 0 4px #00fff7) drop-shadow(0 0 8px #ff00ea)",
            }}
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 9v6h4l5 5V4l-5 5H9z" fill="#fff" fillOpacity="0.7" />
            <path d="M19 5v14" stroke="#00fff7" strokeWidth="2" />
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src={musicFile}
        autoPlay={playing}
        loop
        style={{ display: "none" }}
      />
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div
      style={{
        minBlockSize: "100vh",
        inlineSize: "100vw",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 3000,
      }}
    >
      <h1
        style={{
          color: "#fff",
          fontSize: 28,
          textAlign: "center",
          textShadow: "0 0 16px #00fff7, 0 0 32px #ff00ea",
          marginBottom: 24,
          fontFamily: "Panton, Inter, Arial",
          letterSpacing: 1.5,
        }}
      >
        Приступить к организации праздника
      </h1>
      <button
        onClick={onStart}
        style={{
          padding: "16px 48px",
          fontSize: 20,
          borderRadius: 16,
          border: "2px solid #00fff7",
          background: "rgba(10,10,20,0.7)",
          color: "#fff",
          fontWeight: 700,
          boxShadow: "0 0 24px 4px #00fff7, 0 0 32px 8px #ff00ea",
          cursor: "pointer",
          textShadow: "0 0 8px #00fff7, 0 0 16px #ff00ea",
          transition: "box-shadow 0.3s, background 0.3s",
        }}
      >
        Старт
      </button>
    </div>
  );
}

function SplashScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 4000,
      }}
    >
      <img
        src={logo}
        alt="Pushka"
        style={{
          width: 200,
          filter: "drop-shadow(0 0 0px #00fff7) drop-shadow(0 0 0px #ff00ea)",
          animation: "glowPulseLogoSplash 1.2s infinite alternate",
        }}
      />
      <style>{`
        @keyframes glowPulseLogoSplash {
          0% { filter: drop-shadow(0 0 0px #00fff7) drop-shadow(0 0 0px #ff00ea); }
          100% { filter: drop-shadow(0 0 32px #00fff7) drop-shadow(0 0 24px #ff00ea); }
        }
      `}</style>
    </div>
  );
}

const App: React.FC = () => {
  const [step, setStep] = useState<"welcome" | "splash" | "form">("welcome");
  const [musicStarted, setMusicStarted] = useState(false);

  const handleStart = () => {
    setStep("splash");
    setMusicStarted(true);
    setTimeout(() => {
      setStep("form");
    }, 2000);
  };

  return (
    <>
      {step === "welcome" && <WelcomeScreen onStart={handleStart} />}
      {step === "splash" && <SplashScreen />}
      <MusicController
        playing={musicStarted && step !== "welcome"}
        show={step !== "welcome"}
      />
      {step === "form" && <FormPage />}
    </>
  );
};

export default App;

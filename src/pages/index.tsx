"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/Timer.module.css";

export default function Home() {
  const [inputMinutes, setInputMinutes] = useState("");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // countdown timer
  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;
    const interval = setInterval(() => setSecondsLeft((s) => (s !== null ? s - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  // real-time clock updater
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  const minutes = secondsLeft !== null ? Math.floor(secondsLeft / 60) : 0;
  const seconds = secondsLeft !== null ? secondsLeft % 60 : 0;

  const handleStart = () => {
    const mins = parseInt(inputMinutes, 10);
    if (isNaN(mins) || mins <= 0) {
      alert("Please enter a positive number of minutes.");
      return;
    }
    setSecondsLeft(mins * 60);
  };

  return (
    <div className={styles.container}>
      <img
        src="/churchLogo.png"
        alt="Church Logo"
        style={{
          display: "block",
          margin: "0 auto 0 auto",
          maxWidth: "450px",
          height: "auto",
        }}
      />
      {!secondsLeft && (
        <>
          <h1 className={styles.title}>Enter countdown minutes to start</h1>
          <input
            type="number"
            min="1"
            value={inputMinutes}
            onChange={(e) => setInputMinutes(e.target.value)}
            placeholder="Minutes"
            style={{
              fontSize: "1.2rem",
              padding: "0.5rem",
              width: "150px",
              textAlign: "center",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "0rem",
            }}
          />
          <br />
            <button
            onClick={handleStart}
            style={{
              fontSize: "1rem",
              padding: "0.5rem 1.5rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ffffff",
              color: "black",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#17365f";
              (e.currentTarget as HTMLButtonElement).style.color = "white";
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.color = "black";
            }}
            >
            Start Timer
            </button>
        </>
      )}

      {secondsLeft !== null && secondsLeft > 0 && (
        <>
          <h1 className={styles.title}>
            Sabbath School Class will end at <strong>9:50</strong>
          </h1>
          <div className={styles.timer}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </div>
          <div style={{ marginTop: "1rem", fontSize: "2rem", color: "#ccc" }}>
            Current Time: {formattedTime}
          </div>
        </>
      )}
    </div>
  );
}

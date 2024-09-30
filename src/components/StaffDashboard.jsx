import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function StaffDashboard() {
  const cabinData = [
    { cabinName: "Singapore", occupant: "Anant Mishra" },
    { cabinName: "Sydney", occupant: "Limbraj Nikad" },
    { cabinName: "New Delhi", occupant: "Yogesh Desai" },
    { cabinName: "Washington D.C", occupant: "Conference Room" },
    { cabinName: "Moscow", occupant: "Ajit Panwalkar" },
    { cabinName: "Tokyo", occupant: "Conference Room" },
    { cabinName: "Paris", occupant: "Jyoti Desai" },
    { cabinName: "Dubai", occupant: "Conference Room" },
    { cabinName: "London", occupant: "Milind Pathak" },
    { cabinName: "Berlin", occupant: "Conference Room" },
    { cabinName: "Rome", occupant: "None" },
  ];

  const [blinkingCabins, setBlinkingCabins] = useState({});
  const [audioInterval, setAudioInterval] = useState(null);
  const audioRef = useRef(null); // Reference for the notification sound
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the Socket.IO server using the global `io` object from CDN
    socketRef.current = window.io("http://localhost:7181", {
      transports: ["websocket"],
    });

    // Listen for assistance requests
    socketRef.current.on("new-assistance-request", (data) => {
      setBlinkingCabins((prev) => ({ ...prev, [data.cabinName]: true }));

      // Play the notification sound every 5 seconds
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        const interval = setInterval(() => {
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }, 5000);
        setAudioInterval(interval); // Store interval ID to clear it later
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleStopBlinking = (cabinName) => {
    // Stop blinking and sound when the button is clicked
    setBlinkingCabins((prev) => ({ ...prev, [cabinName]: false }));

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (audioInterval) {
      clearInterval(audioInterval); // Clear the interval to stop sound repetition
      setAudioInterval(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Audio element for notification sound */}
      <audio
        ref={audioRef}
        src="/mixkit-bell-notification-933.wav"
        preload="auto"
      />

      <div className="flex flex-col items-center justify-center p-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-24 w-full max-w-4xl">
          {cabinData.map(({ cabinName, occupant }, index) => (
            <button
              key={index}
              onClick={() => handleStopBlinking(cabinName)}
              className={`p-6 w-56 h-32 text-white text-xl font-bold rounded-lg shadow-lg transition transform hover:scale-105 ${
                blinkingCabins[cabinName]
                  ? "bg-red-500 blinking" // Add blinking class if request is made
                  : "bg-green-500"
              } hover:shadow-xl`}
            >
              <div>{cabinName}</div>
              <div className="text-sm font-normal">{occupant}</div>
            </button>
          ))}
        </div>
      </div>
      <Footer />

      {/* Add blinking CSS animation */}
      <style>
        {`
          .blinking {
            animation: blink-animation 1s infinite;
          }

          @keyframes blink-animation {
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

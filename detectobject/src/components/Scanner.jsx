import React, { useEffect, useRef, useState } from "react";

const Scanner = ({ setPage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        // Enumerate all video input devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");

        // Try to find a back/rear camera
        let backCameraId = null;
        for (let device of videoDevices) {
          if (device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("rear")) {
            backCameraId = device.deviceId;
            break;
          }
        }

        // Get media stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: backCameraId
            ? { deviceId: { exact: backCameraId }, width: { ideal: 640 }, height: { ideal: 480 } }
            : { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        });

        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setLoading(false);
      } catch (err) {
        console.error("Camera error:", err);
        alert("Camera error: " + err.message);
      }
    }

    startCamera();
  }, []);

  // -----------------------------
  // CAPTURE + SEND SINGLE FRAME
  // -----------------------------
  const handleScan = async () => {
    setScanning(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw frame onto canvas
    ctx.drawImage(videoRef.current, 0, 0, 640, 480);

    // Convert to base64
    const imageData = canvas.toDataURL("image/png");

    try {
      const res = await fetch("http://127.0.0.1:5001/detect_frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame: imageData }),
      });

      const data = await res.json();
      console.log("Detected:", data.detected);

      // Redirect based on detection
      if (data.detected === 0) setPage("capacitor");
      if (data.detected === 1) setPage("resistor");
      if (data.detected === 2) setPage("transducer");
      if (data.detected === -1) alert("No object detected. Try again.");
    } catch (err) {
      console.error("Error:", err);
      alert("Error sending frame to backend");
    }

    setScanning(false);
  };

  return (
    <div className="scanner-container">
      <h1>Scanner</h1>

      {loading && <p>Loading camera...</p>}

      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ borderRadius: "10px", marginBottom: "20px" }}
      ></video>

      {/* Invisible canvas */}
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      ></canvas>

      {/* SCAN BUTTON */}
      <button
        onClick={handleScan}
        disabled={scanning}
        style={{
          padding: "12px 25px",
          fontSize: "18px",
          borderRadius: "10px",
          cursor: "pointer",
          background: scanning ? "#777" : "#007bff",
          color: "white",
          border: "none",
        }}
      >
        {scanning ? "Scanning..." : "Scan Me"}
      </button>
    </div>
  );
};

export default Scanner;


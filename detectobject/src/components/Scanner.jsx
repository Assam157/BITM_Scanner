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

        let selectedCameraId = null;

        // First, try to find a rear/back camera
        for (let device of videoDevices) {
          const label = device.label.toLowerCase();
          if (label.includes("back") || label.includes("rear")) {
            selectedCameraId = device.deviceId;
            break;
          }
        }

        // If no rear camera found, pick the first device that doesn't mention "front"
        if (!selectedCameraId) {
          const nonFront = videoDevices.find((d) => !d.label.toLowerCase().includes("front"));
          selectedCameraId = nonFront ? nonFront.deviceId : null;
        }

        // If still nothing, fallback to environment facing mode
        const videoConstraints = selectedCameraId
          ? { deviceId: { exact: selectedCameraId }, width: { ideal: 640 }, height: { ideal: 480 } }
          : { facingMode: { exact: "environment" }, width: { ideal: 640 }, height: { ideal: 480 } };

        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
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
      else if (data.detected === 1) setPage("resistor");
      else if (data.detected === 2) setPage("transducer");
      else if (data.detected === -1) alert("No object detected. Try again.");
    } catch (err) {
      console.error("Error:", err);
      alert("Error sending frame to backend");
    }

    setScanning(false);
  };

  return (
    <div className="scanner-container" style={{ textAlign: "center", padding: "20px" }}>
      <h1>Scanner</h1>

      {loading && <p>Loading camera...</p>}

      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ borderRadius: "10px", marginBottom: "20px" }}
      ></video>

      {/* Invisible canvas */}
      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }}></canvas>

      {/* SCAN BUTTON */}
      <button
        onClick={handleScan}
        disabled={scanning}
        style={{
          padding: "12px 25px",
          fontSize: "18px",
          borderRadius: "10px",
          cursor: scanning ? "not-allowed" : "pointer",
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


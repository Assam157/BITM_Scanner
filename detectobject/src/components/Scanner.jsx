import React, { useEffect, useRef, useState } from "react";

const Scanner = ({ setPage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  // =========================
  // Start camera
  // =========================
  useEffect(() => {
    async function startCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === "videoinput");

        let selectedCameraId = null;

        // Prefer rear/back camera on phones
        for (let device of videoDevices) {
          if (device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("rear")) {
            selectedCameraId = device.deviceId;
            break;
          }
        }

        if (!selectedCameraId) {
          const nonFront = videoDevices.find(d => !d.label.toLowerCase().includes("front"));
          selectedCameraId = nonFront ? nonFront.deviceId : null;
        }

        const constraints = selectedCameraId
          ? { video: { deviceId: { exact: selectedCameraId }, width: 640, height: 480 } }
          : { video: { facingMode: "environment", width: 640, height: 480 } };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setLoading(false);
        };
      } catch (err) {
        console.error("Camera error:", err);
        alert("Camera error: " + err.message);
      }
    }

    startCamera();
  }, []);

  // =========================
  // Process image from camera/upload
  // =========================
  const processImage = async (base64Image) => {
    try {
      const res = await fetch("https://bitm-scanner-backend.onrender.com/detect_frame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frame: base64Image }),
      });

      if (!res.ok) {
        alert("Backend error: " + res.status);
        setScanning(false);
        return;
      }

      const data = await res.json();

      if (data.detected === -1 || data.detected == null) {
        alert("No component detected. Try again.");
        setScanning(false);
        return;
      }

      // =========================
      // Map detected value to page string (match App.js)
      // =========================
      switch (data.detected) {
        case 0: setPage("ceramic"); break;
        case 1: setPage("diode"); break;
        case 2: setPage("electrolytic"); break;
        case 3: setPage("polyester"); break; // optional page
        case 4: setPage("resistor"); break;
        case 5: setPage("transistor"); break;
        default: alert("Unknown detection result: " + data.detected);
      }

      setScanning(false);
    } catch (err) {
      console.error(err);
      alert("Unexpected error while processing image");
      setScanning(false);
    }
  };

  // =========================
  // Scan camera frame
  // =========================
  const handleScan = async () => {
    setScanning(true);

    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      alert("Camera not ready yet.");
      setScanning(false);
      return;
    }

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(video, 0, 0, 640, 480);
      const imageData = canvas.toDataURL("image/png");

      await processImage(imageData);
    } catch (err) {
      console.error(err);
      alert("Unexpected scanning error");
      setScanning(false);
    }
  };

  // =========================
  // Upload file
  // =========================
  const handleUpload = (event) => {
    setScanning(true);
    const file = event.target.files[0];
    if (!file) {
      setScanning(false);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await processImage(reader.result);
      } catch (err) {
        console.error(err);
        setScanning(false);
        alert("Error processing uploaded image");
      }
    };
    reader.readAsDataURL(file);
  };

  // =========================
  // Render
  // =========================
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Scanner</h1>
      {loading && <p>Loading camera...</p>}

      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ borderRadius: "10px", marginBottom: "20px" }}
      />

      <canvas ref={canvasRef} width="640" height="480" style={{ display: "none" }} />

      {/* Scan Button */}
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
          marginRight: "10px",
        }}
      >
        {scanning ? "Scanning..." : "Scan Camera"}
      </button>

      {/* Upload Button */}
      <label
        style={{
          padding: "12px 25px",
          fontSize: "18px",
          borderRadius: "10px",
          background: "#28a745",
          color: "white",
          cursor: scanning ? "not-allowed" : "pointer",
        }}
      >
        Upload Picture
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
          disabled={scanning}
        />
      </label>
    </div>
  );
};

export default Scanner;


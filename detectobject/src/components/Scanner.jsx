import React, { useEffect, useRef, useState } from "react";

const Scanner = ({ setPage }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");

        let selectedCameraId = null;

        for (let device of videoDevices) {
          const label = device.label.toLowerCase();
          if (label.includes("back") || label.includes("rear")) {
            selectedCameraId = device.deviceId;
            break;
          }
        }

        if (!selectedCameraId) {
          const nonFront = videoDevices.find(
            (d) => !d.label.toLowerCase().includes("front")
          );
          selectedCameraId = nonFront ? nonFront.deviceId : null;
        }

        const videoConstraints = selectedCameraId
          ? {
              deviceId: { exact: selectedCameraId },
              width: { ideal: 640 },
              height: { ideal: 480 },
            }
          : {
              facingMode: "environment",
              width: { ideal: 640 },
              height: { ideal: 480 },
            };

        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
        });

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

  const handleScan = async () => {
    setScanning(true);

    try {
      const video = videoRef.current;

      // ❗ FIX: Prevent throwing errors before finally block
      if (!video || video.readyState < 2) {
        alert("Camera not ready yet. Please wait 1–2 seconds.");
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(video, 0, 0, 640, 480);
      const imageData = canvas.toDataURL("image/png");

      const res = await fetch(
        "https://bitm-scanner-backend.onrender.com/detect_frame",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ frame: imageData }),
        }
      );

      if (!res.ok) {
        alert("Backend error: " + res.status);
        return;
      }

      const data = await res.json();
      console.log("Detected:", data.detected);

      // ❗ FIX: NO THROW — just handle gracefully
      if (data.detected === -1) {
        alert("No object detected. Try again.");
        return;
      }

      if (data.detected === 0) setPage("capacitor");
      else if (data.detected === 1) setPage("resistor");
      else if (data.detected === 2) setPage("transducer");
      else {
        alert("Unknown detection result.");
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected scanning error");
    } finally {
      // ALWAYS runs → scanning NEVER freezes
      setScanning(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Scanner</h1>

      {loading && <p>Loading camera...</p>}

      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ borderRadius: "10px", marginBottom: "20px" }}
      ></video>

      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      ></canvas>

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


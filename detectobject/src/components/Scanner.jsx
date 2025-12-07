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

  // ==========================
  // FUNCTION TO SEND BASE64 TO BACKEND
  // ==========================
  const processImage = async (base64Image) => {
    try {
      const res = await fetch(
        "https://bitm-scanner-backend.onrender.com/detect_frame",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ frame: base64Image }),
        }
      );

      if (!res.ok) {
        alert("Backend error: " + res.status);
        return;
      }

      const data = await res.json();
      console.log("Detected:", data.detected);

      if (data.detected === -1) {
        alert("No object detected. Try again.");
        return;
      }

      if (data.detected === 0) setPage("capacitor");
      else if (data.detected === 1) setPage("resistor");
      else if (data.detected === 2) setPage("transducer");
      else alert("Unknown detection result.");
    } catch (err) {
      console.error(err);
      alert("Unexpected error while processing image");
    }
  };

  // ==========================
  // CAMERA SCAN BUTTON
  // ==========================
  const handleScan = async () => {
    setScanning(true);

    try {
      const video = videoRef.current;

      if (!video || video.readyState < 2) {
        alert("Camera not ready yet. Please wait 1–2 seconds.");
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(video, 0, 0, 640, 480);

      const imageData = canvas.toDataURL("image/png");

      await processImage(imageData);
    } catch (err) {
      console.error(err);
      alert("Unexpected scanning error");
    } finally {
      setScanning(false);
    }
  };

  // ==========================
  // UPLOAD PICTURE BUTTON
  // ==========================
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result; // full base64 image string
      processImage(base64Image); // send to backend
    };

    reader.readAsDataURL(file);
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

      {/* CAMERA SCAN BUTTON */}
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

      {/* UPLOAD BUTTON */}
      <label
        style={{
          padding: "12px 25px",
          fontSize: "18px",
          borderRadius: "10px",
          background: "#28a745",
          color: "white",
          cursor: "pointer",
        }}
      >
        Upload Picture
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </label>
    </div>
  );
};

export default Scanner;

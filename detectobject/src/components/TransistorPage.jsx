import React from "react";

const Transistor = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Transistor</h1>

      {/* Image of a transistor */}
      <img
        src="/transistor.jpg"
        alt="Transistor"
        style={{
          width: "300px",
          height: "auto",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "2px solid #007bff",
        }}
      />

      {/* Embedded YouTube Video */}
      <div style={{ marginTop: "20px" }}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/J4oO7PT_nzQ?si=D9LetFqi3mGGpHD7"
          title="Transistor Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "10px" }}
        ></iframe>
      </div>
    </div>
  );
};

export default Transistor;



import React from "react";

function NoDetectionPage({ setPage }) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>No Component Detected</h2>
      <p>Please try scanning again.</p>

      <button 
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          cursor: "pointer",
          fontSize: "16px"
        }}
        onClick={() => setPage("scanner")}
      >
        Back to Scanner
      </button>
    </div>
  );
}

export default NoDetectionPage;

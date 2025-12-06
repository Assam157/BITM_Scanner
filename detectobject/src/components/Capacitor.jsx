import React from "react";

const Capacitor = () => {
  return (
    <div className="transducer-container">
      <h1 className="transducer-title">Capacitor</h1>

      <p className="transducer-description">
        A capacitor is a passive electronic component that stores electrical
        energy in an electric field. It is commonly used in power supplies,
        filters, timing circuits, and various electronic devices. Capacitors are
        essential for stabilizing voltage and managing energy flow in circuits.
      </p>

      <h2 className="transducer-subtitle">Key Points About Capacitors</h2>
      <ul className="transducer-list">
        <li>Stores energy in the form of an electric field.</li>
        <li>Blocks direct current (DC) and allows alternating current (AC).</li>
        <li>Measured in Farads (F), ranging from pF to mF.</li>
        <li>Used for filtering, coupling, smoothing, and timing applications.</li>
        <li>Common types: Ceramic, Electrolytic, Film, Tantalum.</li>
      </ul>

      <h2 className="transducer-subtitle">Example Video</h2>

        <iframe
          src="https://www.youtube.com/embed/NPM3wSb7veU?si=5e-Gq9272G4POx6a"
          title="Capacitor Example Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>       
    </div>
  );
};

export default Capacitor;

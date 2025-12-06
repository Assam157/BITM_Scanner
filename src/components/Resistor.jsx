import React from "react";

const Resistor = () => {
  return (
    <div className="transducer-container">
      <h1 className="transducer-title">Resistor</h1>
      <p className="transducer-description">
        A resistor is a passive electronic component used to limit or regulate 
        the flow of current in a circuit. It is one of the most widely used 
        components in electronics.
      </p>

      <h2 className="transducer-subtitle">Key Points About Resistors</h2>
      <ul className="transducer-list">
        <li>Limits current flow</li>
        <li>Measured in Ohms (Ω)</li>
        <li>Used in voltage dividing circuits</li>
        <li>Common types: Carbon film, Metal film, Wire-wound</li>
        <li>Dissipates energy in heat form</li>
      </ul>

      {/* Example Video Section */}
      <h2 className="transducer-subtitle">Video Section</h2>
      <div className="video-section">
        <h2 className="video-title">Resistor Example Video</h2>

        <div className="video-wrapper">
          <iframe
            className="youtube-video"
            src="https://www.youtube.com/embed/x6jajfprWZo?si=mHlwkUFerZzromkj"
            title="Example Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Resistor;

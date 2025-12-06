import React from "react";

const Transducer = () => {
  return (
    <div className="transducer-container">
      <h1 className="transducer-title">Transducer</h1>

      <p className="transducer-description">
        A transducer is a device that converts one form of energy into another.
        They play a crucial role in measurement, control systems, automation,
        robotics, and medical equipment. Transducers help bridge the gap between
        the physical world and electronic systems.
      </p>

      <h2 className="transducer-subtitle">Key Points About Transducers</h2>
      <ul className="transducer-list">
        <li>Converts physical quantities into electrical signals.</li>
        <li>Used in microphones, thermocouples, strain gauges, and sensors.</li>
        <li>Can be classified into active and passive transducers.</li>
        <li>Used for measurement, detection, and automation systems.</li>
        <li>Outputs may be analog or digital depending on the sensor type.</li>
      </ul>

      <h2 className="transducer-subtitle">Example Video</h2>

 
        <iframe
          src="https://www.youtube.com/embed/la4G7Sj4oZY?si=XEsyc3l0wdm8kthZ"
          title="Transducer Example Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
    </div>
  );
};

export default Transducer;

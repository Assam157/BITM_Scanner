import React from "react";

const ResistorPage = ({ setPage }) => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Resistor</h1>

      <img
        src="/resistor.jpg"
        alt="Resistor"
        className="mx-auto w-64 rounded-lg shadow-md mb-6"
      />

      <div className="flex justify-center mb-6">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/L5mWvZB1T6I"
          title="Resistor Basic Explanation"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>

      <button
        onClick={() => setPage("scanner")}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Back to Scanner
      </button>
    </div>
  );
};

export default ResistorPage;

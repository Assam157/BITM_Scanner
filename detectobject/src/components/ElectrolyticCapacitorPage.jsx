import React from "react";

const ElectrolyticCapacitorPage = ({ setPage }) => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Electrolytic Capacitor</h1>

      <img
        src="https://t3.ftcdn.net/jpg/02/08/06/94/360_F_208069424_2a8ClzsJ5jHzpf2bNVEoAILSNrNxPM1I.jpg"
        alt="Electrolytic Capacitor"
        className="mx-auto w-64 rounded-lg shadow-md mb-6"
      />

      <div className="flex justify-center mb-6">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/MAP-VA1m-A4?si=hQAzW26tY09orb2z"
          title="Electrolytic Capacitor Tutorial"
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

export default ElectrolyticCapacitorPage;


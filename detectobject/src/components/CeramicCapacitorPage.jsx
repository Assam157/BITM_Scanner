import React from "react";

const CeramicCapacitorPage = ({ setPage }) => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Ceramic Capacitor</h1>

      <img
        src="/ceramic_capacitor.jpg"
        alt="Ceramic Capacitor"
        className="mx-auto w-64 rounded-lg shadow-md mb-6"
      />

      <div className="flex justify-center mb-6">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/0wXwZ6uYdW4"
          title="Ceramic Capacitor Tutorial"
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

export default CeramicCapacitorPage;

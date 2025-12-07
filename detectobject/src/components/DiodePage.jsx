import React from "react";

const DiodePage = ({ setPage }) => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Diode</h1>

      <img
        src="/diode.jpg"
        alt="Diode"
        className="mx-auto w-64 rounded-lg shadow-md mb-6"
      />

      <div className="flex justify-center mb-6">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Fwj_d3uO5g8?si=xgzD48ZTDVfB2MDl"
          title="Diode Explained"
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

export default DiodePage;


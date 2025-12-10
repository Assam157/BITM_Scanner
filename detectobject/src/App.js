import React, { useState } from "react";

// Import your pages/components
import Scanner from "./components/Scanner";
import CeramicCapacitorPage from "./components/CeramicCapacitorPage";
import ElectrolyticCapacitorPage from "./components/ElectrolyticCapacitorPage";
import DiodePage from "./components/DiodePage";
import ResistorPage from "./components/ResistorPage.jsx";
import TransistorPage from "./components/TransistorPage";
import NoDetectionPage from "./components/NoDetectionPage";

import "./App.css";

function App() {
  const [page, setPage] = useState("scanner"); // default page

  return (
    <div className="App">

      {/* Conditional rendering of pages */}
      {page === "scanner" && <Scanner setPage={setPage} />}
      {page === "ceramic" && <CeramicCapacitorPage setPage={setPage} />}
      {page === "electrolytic" && <ElectrolyticCapacitorPage setPage={setPage} />}
      {page === "diode" && <DiodePage setPage={setPage} />}
      {page === "resistor" && <ResistorPage setPage={setPage} />}
      {page === "transistor" && <TransistorPage setPage={setPage} />}
      {page === "" && <NoDetectionPage setPage={setPage} />}

      {/* Optional Manual Navigation Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage("scanner")}>Scanner</button>
        <button onClick={() => setPage("ceramic")}>Ceramic Capacitor</button>
        <button onClick={() => setPage("electrolytic")}>Electrolytic Capacitor</button>
        <button onClick={() => setPage("diode")}>Diode</button>
        <button onClick={() => setPage("resistor")}>Resistor</button>
        <button onClick={() => setPage("transistor")}>Transistor</button>
      </div>

    </div>
  );
}

export default App;

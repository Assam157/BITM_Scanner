import React, { useState } from "react";
import Scanner from "./components/Scanner";
import Transducer from "./components/Transducer";
import Capacitor from "./components/Capacitor";
import Resistor from "./components/Resistor";
import "./App.css";

function App() {
  const [page, setPage] = useState("scanner");

  return (
    <div className="App">

      {/* Page Selectors */}
      {page === "scanner" && <Scanner setPage={setPage} />}
      {page === "transducer" && <Transducer />}
      {page === "capacitor" && <Capacitor />}
      {page === "resistor" && <Resistor />}

      {/* Manual Navigation Buttons (optional) */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage("scanner")}>Scanner</button>
        <button onClick={() => setPage("transducer")}>Transducer</button>
        <button onClick={() => setPage("capacitor")}>Capacitor</button>
        <button onClick={() => setPage("resistor")}>Resistor</button>
      </div>

    </div>
  );
}

export default App;

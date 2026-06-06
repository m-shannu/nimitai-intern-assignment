import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [transcript, setTranscript] = useState("");
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(false);

  const analyseTranscript = async () => {
    if (!transcript.trim()) {
      alert("Please enter a transcript");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/analyse",
        {
          transcript,
        }
      );

      setSignals(response.data.signals || []);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>AI Meeting Signal Detector</h1>

      <textarea
        rows="10"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Paste meeting transcript..."
      />

      <button onClick={analyseTranscript}>
        {loading ? "Analysing..." : "Analyse"}
      </button>

      <div className="cards">
        {signals.map((signal, index) => (
          <div className="card" key={index}>
            <h3>{signal.type}</h3>

            <p>
              <strong>Quote:</strong>
              <br />
              {signal.quote}
            </p>

            <p>
              <strong>Tip:</strong>
              <br />
              {signal.tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
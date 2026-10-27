
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Counter App</h1>
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(c => c + 1)}>
        Increase
      </button>

      <button onClick={() => setCount(c => c - 1)}>
        Decrease
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

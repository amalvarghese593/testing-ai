import React, { useState, ChangeEvent } from "react";
import "./App.css";

function App(): React.JSX.Element {
  const [inputColor, setInputColor] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("#282c34");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputColor(e.target.value);
  };

  const handleSubmit = (): void => {
    if (inputColor.trim()) {
      setBgColor(inputColor.trim());
    }
  };

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <div className="color-picker-container">
        <h1>Background Color Changer</h1>
        <p>
          Current color: <code>{bgColor}</code>
        </p>
        <div className="input-row">
          <input
            type="text"
            value={inputColor}
            onChange={handleChange}
            placeholder="e.g. #ff6347 or tomato"
            className="color-input"
          />
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

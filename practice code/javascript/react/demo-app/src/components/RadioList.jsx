import React, { useState } from "react";
import "./radio-list.css";

const RadioList = () => {
  const [job, setJob] = useState("");
  //   const [job, setJob] = useState("tester");

  const handleChange = (e) => {
    setJob(e.target.value);
  };

  return (
    <div id="radio-cntr">
      <span>Select Job</span>
      <div className="radio-field">
        <label htmlFor="dev">Dev</label>
        <input
          type="radio"
          name="job"
          id="dev"
          value="dev"
          onChange={handleChange}
          //   checked={job === "dev"}
        />
      </div>

      <div className="radio-field">
        <label htmlFor="tester">Tester</label>
        <input
          type="radio"
          name="job"
          id="tester"
          value="tester"
          onChange={handleChange}
          //   checked={job === "tester"}
        />
      </div>
    </div>
  );
};

export default RadioList;

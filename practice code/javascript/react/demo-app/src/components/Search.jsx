import React, { useCallback, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const Search = () => {
  const [data, setData] = useState("");

  const cb = useCallback(
    (value) => {
      const url = "http://localhost:3010/api/v1/search";
      console.log("api call", value);
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          searchTerm: value,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log({ res });
          setData(res.message);
        })
        .catch((err) => console.log({ err }));
    },
    [setData],
  );

  const { searchTerm, handleChange } = useDebounce(cb, 3000);

  return (
    <div>
      <input
        type="text"
        name="search"
        id="search"
        value={searchTerm}
        onChange={handleChange}
      />
      <div>{data}</div>
    </div>
  );
};

export default Search;

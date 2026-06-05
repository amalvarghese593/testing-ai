import { useState, useEffect, useRef } from "react";

const useDebounce = (cb, delay = 400) => {
  const [searchTerm, setSearchTerm] = useState("");

  const timerRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      cb(value);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { searchTerm, handleChange };
};

export default useDebounce;

import React, { useEffect, useReducer } from "react";

const CompReducer = () => {
  const countReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "INCREMENT":
        return { ...state, count: state.count + (payload ?? 1) };
      case "DECREMENT":
        return { ...state, count: state.count - (payload ?? 1) };
      default:
        return state;
    }
  };
  const intialState = { count: 0, isAdmin: true };
  const [state, dispatch] = useReducer(countReducer, intialState);
  //   throw new Error("from CompReducer");

  //   useEffect(() => {
  //     const timerId = setTimeout(() => {
  //       throw new Error("[CompReducer]: setTimeout");
  //     }, 3000);

  //     return () => clearTimeout(timerId);
  //   }, []);

  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button
        onClick={() => {
          //   throw new Error("from onClick [CompReducer]");
          dispatch({ type: "INCREMENT", payload: 5 });
        }}
      >
        Add
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT", payload: 5 })}>
        Decrement
      </button>
    </div>
  );
};

export default CompReducer;

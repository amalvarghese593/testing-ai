import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log("Error caught by getDerivedStateFromError: ", error);
    // throw new Error("from getDerivedStateFromError in ErrorBoundary");

    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error caught by componentDidCatch: ", error, info);
    // throw new Error("from componentDidCatch in ErrorBoundary");
  }

  render() {
    if (this.state.hasError) {
      return <h1>Error occured</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

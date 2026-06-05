import "./App.css";
import CompReducer from "./components/CompReducer";
import ErrorBoundary from "./components/ErrorBoundary";
import Form from "./components/Form";
import Search from "./components/Search";

function App() {
  return (
    <ErrorBoundary>
      <CompReducer />
      <div className="App">
        <Search />
        <Form />
      </div>
    </ErrorBoundary>
  );
}

export default App;

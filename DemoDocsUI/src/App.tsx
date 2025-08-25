// src/App.tsx
import React from "react";
import DocumentsList from "./components/DocumentsList";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Customer Documents</h1>
      </header>
      <main>
        <DocumentsList />
      </main>
    </div>
  );
}

export default App;

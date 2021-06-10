import React from "react";
import Links from "./components/Links";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>~nav bar~</h1>
      </header>
      <main>
        <Links />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;

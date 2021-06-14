import React from "react";
import Links from "./components/Links";
import NavBar from "./components/NavBar";
const App = () => {
  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
      <main style={{ marginTop: "100px" }}>
        <Links />
      </main>
      <footer></footer>
    </div>
  );
};

export default App;

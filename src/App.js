import React from "react";
import AddLink from "./components/AddLink";
import Links from "./components/Links";
import Tags from "./components/Tags";
import NavBar from "./components/NavBar"
const App = () => {
  return (
    <div className='App'>
      <header>
        <NavBar />
      </header>
      <main style={{ marginTop: "100px" }}>
        <AddLink />
        <Links />
      </main>
      <footer>
        {/* <Tags /> */}
      </footer>
    </div>
  );
};

export default App;

import React from "react";
import Links from "./components/Links";
import Tags from "./components/Tags";

const App = () => {
  return (
    <div className='App'>
      <header>
        <h1>~nav bar~</h1>
      </header>
      <main>
        <Links />
      </main>
      <footer>
        {/* <Tags /> */}
      </footer>
    </div>
  );
};

export default App;

import "./index.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import { MovieContext } from "./context/movieContext";

import Header from "./components/UI/Header/Header";

const App = () => {
  const [title, setTitle] = useState<string>("");

  const value: {
    title: string;
    setTitle: (title: string) => void;
   // value?: any;
  } = {
    title: title,
    setTitle: setTitle
  };

  return (
    <MovieContext.Provider value={value}>
      <>
        <div data-testid="header-div" className="App">
          <Header />
        </div>
        <Routes>
          <Route path="/*" element={<Home title={title} />} />
        </Routes>
        <Footer />
      </>
    </MovieContext.Provider>
  );
};

export default App;
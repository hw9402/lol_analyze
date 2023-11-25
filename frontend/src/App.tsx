import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import GlobalStyle from "./styles/global";
import Info from "./pages/info";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
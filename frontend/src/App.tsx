import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import GlobalStyle from "./styles/global";
import Info from "./pages/info";
import Chart from "./components/info/Chart";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<Info />} />
          <Route path="/:name/:index" element={<Chart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
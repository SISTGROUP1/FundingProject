import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/main/Header";
import { Footer } from "./components/main/Footer";
import { Home } from "./components/main/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

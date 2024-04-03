import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/main/Header";
import { Footer } from "./components/main/Footer";
import { Home } from "./components/main/Home";
import { FundingDetail } from "./components/funding/FundingDetail";
import { BoardList } from "./components/board/BoardList";
import BoardDetail from "./components/board/BoardDetail";
import { FundingSearch } from "./components/funding/FundingSearch";
import { FundingFund } from "./components/funding/FundingFund";
import { BoardInsert } from "./components/board/BoardInsert";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/funding/search" element={<FundingSearch />} />
        <Route path="/funding/detail/:fno" element={<FundingDetail />} />
        <Route path="/funding/fund/:fno" element={<FundingFund />} />
        <Route path="/board/list" element={<BoardList />} />
        <Route path="/board/detail/:no" element={<BoardDetail />} />
        <Route path="/board/insert" element={<BoardInsert />} />
        <Route path="/board/detail/:no" element={<BoardDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

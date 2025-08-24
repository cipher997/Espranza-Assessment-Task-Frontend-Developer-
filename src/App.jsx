import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import Footer from "./components/Footer/Footer";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
        <Footer/>
    </Router>
  )
}

export default App

import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Frontend/Common/Navbar/Navbar";
import Footer from "./Frontend/Common/Footer/Footer";
import "./App.css";
import Support from "./Frontend/Common/Support/Support";

// Lazy load components
const Home = lazy(() => import("./Frontend/Components/Home/Home"));
const Market = lazy(() => import("./Frontend/Components/Market/Market"));
const Portfolio = lazy(() =>
  import("./Frontend/Components/Portfolio/Portfolio")
);
const DEXPage = lazy(() => import("./Frontend/Components/Dex/dex"));
const Auth = lazy(() => import("./Auth/Login/Auth"));
const UserDashboard = lazy(() =>
  import("./Backend/Dashboard/Users/UserDashboard")
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        loggedInUser={loggedInUser}
        onLogout={handleLogout}
      />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/dex" element={<DEXPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route
            path="/auth"
            element={<Auth setLoggedInUser={handleLogin} />}
          />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;

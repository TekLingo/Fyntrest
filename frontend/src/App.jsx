import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import Router components

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CoursePage from "./pages/courses/coursePage";
import Money from "./pages/courses/understandingMoney";

export default function App() {
  return (
    // <Router>
    //   <Routes>
    //     {/* Define routes for different pages */}
    //     <Route path="/" element={<Home />} />
    //     <Route path="/signup" element={<Signup />} />
    //     {/* Dynamic route for course page */}
    //     <Route path="/course/:slug" element={<CoursePage />} />
    //   </Routes>
    // </Router>
      <>
      <Money/>
      </>
  );
}

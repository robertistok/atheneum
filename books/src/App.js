import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Mint from "./Mint";
import Main from "./Main";
import Explore from "./Explore";

const routes = [
  { path: '/', component: Main },
  { path: '/mint', component: Mint },
  { path: '/explore', component: Explore },
];

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;

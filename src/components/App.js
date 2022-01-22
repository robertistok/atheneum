import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Mint from "./Mint";
import { Main } from "./Main";
import { Explore } from "./Explore";
import { Layout } from "./Layout";

const routes = [
  { path: "/", component: Main },
  { path: "/mint", component: Mint },
  { path: "/explore", component: Explore },
];

const App = () => {
  return (
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  );
};

export default App;

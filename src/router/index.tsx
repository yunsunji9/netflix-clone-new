import { Route, Routes } from "react-router-dom";

import GeneralLayout from "../layout/GeneralLayout";
import Main from "../pages/Main";
import Search from "../pages/Search";
import Tv from "../pages/Tv";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<GeneralLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/movies/:subCategory/:movieId" element={<Main />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tvs/:subCategory/:tvId" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:searchId" element={<Search />} />
      </Route>
    </Routes>
  );
};

export default Router;

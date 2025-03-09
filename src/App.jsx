import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Error from "./pages/Error";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Comments from "./pages/Comments";

import MainLayout from "./layers/MainLayout";

import Products from "./components/Products";

function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/:id"
          element={
            <MainLayout>
              <Details />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />

        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <Details />
            </MainLayout>
          }
        />

        <Route
          path="/sign-in"
          element={
            <MainLayout>
              <SignIn />
            </MainLayout>
          }
        />

        <Route
          path="/favorites"
          element={
            <MainLayout>
              <Favorites />
            </MainLayout>
          }
        />

        <Route
          path="/shop"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        <Route
          path="/products/:id/comments"
          element={
            <MainLayout>
              <Comments />
            </MainLayout>
          }
        />

        <Route
          path="*"
          element={
            <MainLayout>
              <Error />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;

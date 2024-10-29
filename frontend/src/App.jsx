import React from "react";

import CalendarPageContainer from "./pages/calendar/container/CalendarPageContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SigninPageContainer from "./pages/signin/container/SigninPageContainer";
import SignupPageContainer from "./pages/signup/container/SignupPageContainer";
import AuthLayout from "./components/AuthLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <CalendarPageContainer />
            </AuthLayout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <AuthLayout authentication={false}>
              <SigninPageContainer />
            </AuthLayout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthLayout authentication={false}>
              <SignupPageContainer />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

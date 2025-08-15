import * as React from "react";
import { store } from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Login } from "./pages/Login";
import { VerifyEmail } from "./pages/VerifyEmail";
import { ResetComplete } from "./pages/ResetComplete";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import PrivateRoute from "./components/Auth/PrivateRoute";
import { Homepage } from "./components/Dashboard/Homepage";
import { CreatePost } from "./pages/createPost";
import { Feed } from "./pages/Feed";
import ProfileSettings from "./components/Dashboard/ProfileSettings";
import MyProfile from "./components/Dashboard/MyProfile";
// import Friends from './components/Dashboard/Friends';
import socket from "./socket";
import { Explore } from "./components/Explore";
import { ForgotPassword } from "./pages/forgotPassword";

const io = socket;

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/changepassword" element={<changePassword />} />
            <Route path="/resetcomplete" element={<ResetComplete />} />

            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<Homepage />} />

              <Route path="myprofile" element={<MyProfile />} />
              <Route path="profilesettings" element={<ProfileSettings />} />
              <Route path="friends" element={<Explore />} />
              <Route path="posts" element={<Feed />} />
              <Route path="createPost" element={<CreatePost />} />
              {/* <Route path="saved" element={<Saved/>} /> */}
              {/* <Route path="friends" element={<Friends/>} /> */}
              {/* <Route path="settings" element={<Settings/>} /> */}
              {/* <Route path="community" element={<Community/>} /> */}
            </Route>
          </Routes>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export { socket };
export default App;

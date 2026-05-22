import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";

import Community from "./Pages/Community";
import Profile from "./Pages/Profile";
import CommunityDetails from "./Pages/CommunityDetails";
import SavedPosts from "./Pages/SavedPosts";

import Register from "./Pages/Register";
import Login from "./Pages/Login";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />

        {/* COMMUNITY DETAILS */}

        <Route
          path="/community/:id"
          element={
            <ProtectedRoute>
              <CommunityDetails />
            </ProtectedRoute>
          }
        />

        {/* SAVED POSTS */}

        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedPosts />
            </ProtectedRoute>
          }
        />

        {/* AUTH */}

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
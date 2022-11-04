import {
  Errorpage,
  Landing,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  SuccessPage,
  ProtectedRoute,
} from "./pages";
import {
  SharedLayout,
  Stats,
  AllJobs,
  AddJob,
  Profile,
} from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <ToastContainer position="top-center" hideProgressBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />{" "}
          <Route path="add-job" element={<AddJob />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="landing" element={<Landing />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="verify-password" element={<ResetPassword />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Router>
  );
}

export default App;

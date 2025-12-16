import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import Home from "./pages/Home.jsx";
import MyJobPosts from "./pages/MyJobPosts.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AllJobs from "./pages/AllJobs.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import MyJobs from "./pages/MyJobs.jsx";
import ReviewsAndRatings from "./pages/ReviewsAndRatings.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/home/:role",
        element: <Home />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "browse-jobs",
            element: <AllJobs />,
          },
          {
            path: "my-jobs",
            element: <MyJobs />,
          },
          {
            path: "my-job-posts",
            element: (
              <ProtectedRoute>
                <MyJobPosts />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
          },
          {
            path: "payments",
            element: <TransactionHistory />,
          },
          {
            path: "reviews",
            element: <ReviewsAndRatings />,
          },
          {
            path: "jobs/:id",
            element: <JobDetails />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  </StrictMode>
);

import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  const isAuthPage = ["/login", "/", "/register"].includes(location.pathname);

  useEffect(() => {
    const stopAll = (e) => {
      // Stop all global key-driven navigation
      e.stopPropagation();
    };
    document.addEventListener("keydown", stopAll, true);
    return () => document.removeEventListener("keydown", stopAll, true);
  }, []);

  // Auto redirect from "/" → dashboard
  if (isAuthPage && user) {
    return <Navigate to={`/home/${user.role}`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  const isAuthPage = ["/login", "/", "/register"].includes(location.pathname);

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

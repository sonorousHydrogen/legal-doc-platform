import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-2xl font-black text-blue-600">
          ClearForms
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link to="/">Home</Link>
          <Link to="/pricing">Pricing</Link>

          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>

              {role === "admin" && <Link to="/admin">Admin</Link>}

              <button
                onClick={handleLogout}
                className="rounded-lg bg-slate-900 px-4 py-2 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Start Now
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
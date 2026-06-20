import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

     localStorage.setItem("token", res.data.token);
localStorage.setItem("role", res.data.user.role);

navigate("/dashboard");

    }catch (error) {
  if (axios.isAxiosError(error)) {
    alert(error.response?.data?.message || "Registration failed");
  } else {
    alert("Registration failed");
  }
}
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
          <p className="text-sm font-bold tracking-widest text-blue-600">
            CREATE ACCOUNT
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Start your document preparation
          </h1>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white">
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
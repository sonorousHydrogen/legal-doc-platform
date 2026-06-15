import { useEffect, useState } from "react";
import axios from "axios";

interface Stats {
  totalUsers: number;
  totalQuestionnaires: number;
  adminUsers: number;
  regularUsers: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Questionnaire {
  _id: string;
  fullName: string;
  documentType: string;
  details: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [questionnaireSearch, setQuestionnaireSearch] = useState("");
  const handleDeleteQuestionnaire = async (id: string) => {
  const token = localStorage.getItem("token");

  if (!confirm("Delete this questionnaire?")) {
    return;
  }

  try {
    await axios.delete(
      `http://localhost:5000/api/questionnaire/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setQuestionnaires(
      questionnaires.filter((item) => item._id !== id)
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alert(
        error.response?.data?.message ||
          "Failed to delete questionnaire"
      );
    } else {
      alert("Failed to delete questionnaire");
    }
  }
};


  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      try {
        const statsRes = await axios.get("http://localhost:5000/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersRes = await axios.get("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const questionnairesRes = await axios.get(
  "http://localhost:5000/api/admin/questionnaires",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        setStats(statsRes.data);
        setUsers(usersRes.data);

        setQuestionnaires(questionnairesRes.data);

      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || "Admin access failed");
        } else {
          alert("Admin access failed");
        }
      }
    };

    fetchAdminData();
  }, []);

  const filteredUsers = users.filter((user) =>
  `${user.name} ${user.email} ${user.role}`
    .toLowerCase()
    .includes(userSearch.toLowerCase())
);

const filteredQuestionnaires = questionnaires.filter((item) =>
  `${item.fullName} ${item.documentType} ${item.details} ${item.user?.email}`
    .toLowerCase()
    .includes(questionnaireSearch.toLowerCase())
);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-bold tracking-widest text-blue-600">
          ADMIN PANEL
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
  <div className="rounded-3xl border bg-white p-8 shadow-sm">
    <p className="text-slate-600">Total Users</p>
    <h2 className="mt-2 text-4xl font-black text-slate-900">
      {stats?.totalUsers ?? 0}
    </h2>
  </div>

  <div className="rounded-3xl border bg-white p-8 shadow-sm">
    <p className="text-slate-600">Total Documents</p>
    <h2 className="mt-2 text-4xl font-black text-slate-900">
      {stats?.totalQuestionnaires ?? 0}
    </h2>
  </div>

  <div className="rounded-3xl border bg-white p-8 shadow-sm">
    <p className="text-slate-600">Admin Users</p>
    <h2 className="mt-2 text-4xl font-black text-blue-600">
      {stats?.adminUsers ?? 0}
    </h2>
  </div>

  <div className="rounded-3xl border bg-white p-8 shadow-sm">
    <p className="text-slate-600">Regular Users</p>
    <h2 className="mt-2 text-4xl font-black text-slate-900">
      {stats?.regularUsers ?? 0}
    </h2>
  </div>
</div>

        <div className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Users</h2>

<input
  type="text"
  placeholder="Search users by name, email, or role..."
  value={userSearch}
  onChange={(e) => setUserSearch(e.target.value)}
  className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
/>

          <div className="mt-6 space-y-4">
          {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="rounded-2xl border bg-slate-50 p-5"
              >
                <p className="font-bold text-slate-900">{user.name}</p>
                <p className="text-slate-600">{user.email}</p>
                <p className="mt-2 text-sm text-blue-600">
                  Role: {user.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">
  <h2 className="text-2xl font-bold text-slate-900">
    All Questionnaires
  </h2>

<input
  type="text"
  placeholder="Search questionnaires by name, type, details, or email..."
  value={questionnaireSearch}
  onChange={(e) => setQuestionnaireSearch(e.target.value)}
  className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
/>

  <div className="mt-6 space-y-4">
   {filteredQuestionnaires.map((item) => (
      <div
        key={item._id}
        className="rounded-2xl border bg-slate-50 p-5"
      >
        <p className="font-bold text-slate-900">
          {item.documentType}
        </p>

        <p className="text-slate-600">
          Name: {item.fullName}
        </p>

        <p className="text-slate-500">
          Created by: {item.user?.email}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {item.details}
        </p>

        <button
  onClick={() => handleDeleteQuestionnaire(item._id)}
  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
>
  Delete Questionnaire
</button>

      </div>
    ))}
  </div>
</div>

<div className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">
  <h2 className="text-2xl font-bold text-slate-900">
    Recent Activity
  </h2>

  <div className="mt-6 space-y-4">
    {questionnaires.slice(0, 5).map((item) => (
      <div
        key={item._id}
        className="rounded-2xl border bg-slate-50 p-5"
      >
        <p className="font-semibold text-slate-900">
          {item.documentType} created
        </p>

        <p className="text-sm text-slate-600">
          By {item.user?.email}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
</div>

      </section>
    </main>
  );


}

export default AdminDashboard;
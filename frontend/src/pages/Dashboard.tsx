import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Questionnaire {
  _id: string;
  fullName: string;
  documentType: string;
  details: string;
  createdAt: string;
}

function Dashboard() {
  const [documents, setDocuments] = useState<Questionnaire[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:5000/api/questionnaire/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDocuments(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || "Failed to load dashboard");
        } else {
          alert("Failed to load dashboard");
        }
      }
    };

    fetchDocuments();
  }, []);

  const latestDocument = documents[0];

  const deleteDocument = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!confirm("Delete this document?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/questionnaire/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to delete document");
      } else {
        alert("Failed to delete document");
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-bold tracking-widest text-blue-600">
          DASHBOARD
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Welcome back
        </h1>

        <p className="mt-3 text-slate-600">
          Manage your questionnaires, documents, and account.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <p className="text-slate-600">Total Documents</p>
            <h2 className="mt-2 text-4xl font-black text-slate-900">
              {documents.length}
            </h2>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <p className="text-slate-600">Latest Document</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {latestDocument ? latestDocument.documentType : "None yet"}
            </h2>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <p className="text-slate-600">Account</p>
            <Link
              to="/profile"
              className="mt-4 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white"
            >
              View Profile
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Questionnaire
            </h2>
            <p className="mt-3 text-slate-600">
              Create a new document questionnaire.
            </p>

            <Link
              to="/questionnaire"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Start New
            </Link>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Documents
            </h2>
            <p className="mt-3 text-slate-600">
              View, edit, preview, or download your documents.
            </p>

            <Link
              to="/documents"
              className="mt-6 inline-block rounded-lg border border-slate-300 px-5 py-3 font-semibold"
            >
              View Documents
            </Link>
          </div>

          {localStorage.getItem("role") === "admin" && (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Admin Panel
              </h2>
              <p className="mt-3 text-slate-600">
                Admin users can manage platform data.
              </p>

              <Link
                to="/admin"
                className="mt-6 inline-block rounded-lg border border-slate-300 px-5 py-3 font-semibold"
              >
                Open Admin
              </Link>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Documents
              </h2>
              <p className="mt-1 text-slate-600">
                Your latest saved questionnaire submissions.
              </p>
            </div>

            <Link
              to="/questionnaire"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
            >
              New Document
            </Link>
          </div>

          {documents.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 p-5 text-slate-500">
              No documents yet. Start your first questionnaire.
            </p>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {doc.documentType}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {doc.fullName}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(doc.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/preview/${doc._id}`}
                      className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                    >
                      Preview
                    </Link>

                    <Link
                      to={`/documents/${doc._id}/edit`}
                      className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteDocument(doc._id)}
                      className="rounded-lg bg-red-50 px-3 py-1 text-sm font-semibold text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
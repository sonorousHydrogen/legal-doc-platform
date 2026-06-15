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

function Documents() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);

  useEffect(() => {
    const fetchQuestionnaires = async () => {
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

        setQuestionnaires(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || "Failed to load documents");
        } else {
          alert("Failed to load documents");
        }
      }
    };

    fetchQuestionnaires();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/questionnaire/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestionnaires(questionnaires.filter((item) => item._id !== id));
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
          DOCUMENTS
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Your saved questionnaires
        </h1>

        <div className="mt-10 space-y-6">
          {questionnaires.length === 0 ? (
            <div className="rounded-3xl border bg-white p-8 text-slate-600">
              No saved questionnaires yet.
            </div>
          ) : (
            questionnaires.map((item) => (
              <div
                key={item._id}
                className="rounded-3xl border bg-white p-8 shadow-sm"
              >
                <h2 className="text-xl font-bold text-slate-900">
                  {item.documentType}
                </h2>

                <p className="mt-2 text-slate-600">Name: {item.fullName}</p>

                <p className="mt-2 text-slate-600">
                  Details: {item.details}
                </p>

                <p className="mt-4 text-sm text-slate-400">
                  Saved on: {new Date(item.createdAt).toLocaleString()}
                </p>

                <Link
                  to={`/preview/${item._id}`}
                  className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Preview Document
                </Link>

                <Link
  to={`/documents/${item._id}/edit`}
  className="ml-3 mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
>
  Edit
</Link>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="ml-3 mt-6 inline-block rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default Documents;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditDocument() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `http://localhost:5000/api/questionnaire/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFullName(res.data.fullName);
        setDocumentType(res.data.documentType);
        setDetails(res.data.details);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data?.message || "Failed to load document");
        } else {
          alert("Failed to load document");
        }
      }
    };

    fetchDocument();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/questionnaire/${id}`,
        {
          fullName,
          documentType,
          details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Document updated successfully");
      navigate("/documents");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to update document");
      } else {
        alert("Failed to update document");
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-bold tracking-widest text-blue-600">
          EDIT DOCUMENT
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Update your questionnaire
        </h1>

        <form
          onSubmit={handleUpdate}
          className="mt-10 space-y-6 rounded-3xl border bg-white p-8 shadow-sm"
        >
          <div>
            <label className="text-sm font-bold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
            >
              <option value="">Select document type</option>
              <option value="Agreement">Agreement</option>
              <option value="Application">Application</option>
              <option value="Notice">Notice</option>
              <option value="Form Draft">Form Draft</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">
              Additional Details
            </label>
            <textarea
              rows={6}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Update Document
          </button>
        </form>
      </section>
    </main>
  );
}

export default EditDocument;
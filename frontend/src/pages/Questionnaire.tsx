import { useState } from "react";
import axios from "axios";
import "./Questionnaire.css";

type QuestionnaireItem = {
  _id: string;
  fullName: string;
  documentType: string;
  details: string;
  createdAt?: string;
};

function Questionnaire() {
  const [fullName, setFullName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [questionnaires, setQuestionnaires] = useState<QuestionnaireItem[]>([]);

  const fetchQuestionnaires = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:5000/api/questionnaire",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestionnaires(response.data);
    } catch (error) {
      console.error("Failed to fetch questionnaires", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!fullName || !documentType || !details) {
      setStatus("Please complete all fields before saving.");
      return;
    }

    setIsSaving(true);

    try {
      await axios.post(
        "http://localhost:5000/api/questionnaire",
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

      setStatus("Questionnaire saved successfully");
      fetchQuestionnaires();

      setFullName("");
      setDocumentType("");
      setDetails("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStatus(
          error.response?.data?.message || "Failed to save questionnaire"
        );
      } else {
        setStatus("Failed to save questionnaire");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="mx-auto max-w-4xl px-6 py-16">
        {/* Progress bar / indicator */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-600">
            <span>Step 1 of 3</span>
            <span>Document Details</span>
          </div>

          <div className="h-2 w-full rounded-full bg-slate-200">
            <div className="h-2 w-1/3 rounded-full bg-blue-600"></div>
          </div>
        </div>

        {/* Page header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Legal Document Platform
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-900">
            Start Your Document Request
          </h1>

          <p className="mt-4 max-w-2xl text-slate-600">
            Provide the information required for your legal document. Your
            responses are securely stored and can be reviewed later.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-lg">
          <form onSubmit={handleSave} className="space-y-8">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full legal name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Document Type Cards */}
            <div>
              <label className="mb-4 block text-sm font-semibold text-slate-700">
                Select Document Type
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                {["Agreement", "Application", "Notice", "Form Draft"].map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setDocumentType(type)}
                      className={`rounded-xl border p-5 text-left transition ${
                        documentType === type
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-800 hover:border-slate-400"
                      }`}
                    >
                      <h3 className="font-semibold">{type}</h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Create a {type.toLowerCase()} document request.
                      </p>
                    </button>
                  )
                )}
              </div>
            </div>

{documentType && (
  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
    <p className="text-sm font-medium text-blue-600">
      Selected Document
    </p>

    <h3 className="mt-1 text-xl font-bold text-slate-900">
      {documentType}
    </h3>

    <p className="mt-2 text-sm text-slate-600">
      Your questionnaire will be prepared as a{" "}
      {documentType.toLowerCase()} request.
    </p>
  </div>
)}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Additional Details
              </label>

              <textarea
                rows={6}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe your requirements, parties involved, dates, purpose, or any other relevant information..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none"
              />

              <div className="mt-2 text-right text-sm text-slate-500">
                {details.length} characters
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">
                Before you submit
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Ensure names are spelled correctly.</li>
                <li>• Include important dates and locations.</li>
                <li>• Provide enough detail for document drafting.</li>
              </ul>
            </div>

            <div className="flex gap-4">

                {/* save/clear*/}
  <button
    type="submit"
    disabled={isSaving}
    className="flex-1 rounded-xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
  >
    {isSaving ? "Saving..." : "Save Progress"}
  </button>

  <button
    type="button"
    onClick={() => {
      setFullName("");
      setDocumentType("");
      setDetails("");
      setStatus("");
    }}
    className="rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 hover:bg-slate-100"
  >
    Clear
  </button>
</div>

            {/* Status red / green */}
            {status && (
              <div
                className={`rounded-xl border p-3 text-center text-sm font-medium ${
                  status.includes("successfully")
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {status}
              </div>
            )}
          </form>
        </div>

        {/* Recent Submissions */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Submissions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your latest saved document requests.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              {questionnaires.length} drafts
            </span>
          </div>

          <div className="space-y-4">
            {questionnaires.length === 0 ? (
              <p className="text-sm text-slate-500">
                No submissions yet.
              </p>
            ) : (
              questionnaires.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.documentType}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {item.fullName}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    Draft
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Questionnaire;
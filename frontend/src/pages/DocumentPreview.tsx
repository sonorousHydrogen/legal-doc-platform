import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

interface Questionnaire {
  _id: string;
  fullName: string;
  documentType: string;
  details: string;
  createdAt: string;
}

function DocumentPreview() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestionnaire = async () => {
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

        setQuestionnaire(res.data);
      } catch (error) {
  if (axios.isAxiosError(error)) {
    setError(
      error.response?.data?.message ||
      "Failed to load document"
    );
  } else {
    setError("Failed to load document");
  }
}
    };

    fetchQuestionnaire();
  }, [id]);

  const downloadPDF = () => {
    if (!questionnaire) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(questionnaire.documentType, 20, 25);

    doc.setFontSize(12);
    doc.text(`Prepared for: ${questionnaire.fullName}`, 20, 45);

    doc.text("Details:", 20, 65);
    doc.text(questionnaire.details, 20, 75, { maxWidth: 170 });

    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 130);

    doc.text(
      "Disclaimer: This is a generated document draft and does not constitute legal advice.",
      20,
      150,
      { maxWidth: 170 }
    );

    doc.save(`${questionnaire.documentType}.pdf`);
  };

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 p-10">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!questionnaire) {
    return (
      <main className="min-h-screen bg-slate-50 p-10">
        <p>Loading document...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-xl bg-white p-12 shadow-sm">
        <h1 className="text-center text-3xl font-bold uppercase">
          {questionnaire.documentType}
        </h1>

        <p className="mt-10">
          This document draft is prepared for{" "}
          <strong>{questionnaire.fullName}</strong>.
        </p>

        <p className="mt-6 leading-8">{questionnaire.details}</p>

        <p className="mt-10 text-sm text-slate-500">
          Generated on: {new Date().toLocaleString()}
        </p>

        <div className="mt-10 border-t pt-6 text-sm text-slate-500">
          Disclaimer: This is a generated document draft and does not constitute
          legal advice.
        </div>

        <button
          onClick={downloadPDF}
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Download PDF
        </button>
      </section>
    </main>
  );
}

export default DocumentPreview;
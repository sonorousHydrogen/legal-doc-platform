import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Create your account",
    text: "Start with a secure account so your progress can be saved.",
  },
  {
    number: "02",
    title: "Answer guided questions",
    text: "Complete simple step-by-step questions instead of confusing forms.",
  },
  {
    number: "03",
    title: "Review your answers",
    text: "Check your information before generating your document draft.",
  },
  {
    number: "04",
    title: "Download documents",
    text: "Generate organized documents from your completed questionnaire.",
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-bold tracking-widest text-blue-600">


            ONLINE DOCUMENT PREPARATION
          </p>

          <h1 className="text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
            Prepare documents online without the confusion.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            ClearForms guides users through simple questions, saves their
            progress, and helps generate organized document drafts from one
            secure dashboard.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Now
            </Link>

            <Link
              to="/pricing"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-xl">
          <div className="rounded-2xl bg-slate-100 p-6">
            <div className="mb-6 h-4 w-32 rounded bg-blue-600"></div>

            <div className="space-y-4">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-800">
                  Step 1: Personal Information
                </p>
                <div className="mt-3 h-3 w-full rounded bg-slate-200"></div>
                <div className="mt-2 h-3 w-2/3 rounded bg-slate-200"></div>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-sm font-bold text-slate-800">
                  Step 2: Document Details
                </p>
                <div className="mt-3 h-3 w-full rounded bg-slate-200"></div>
                <div className="mt-2 h-3 w-3/4 rounded bg-slate-200"></div>
              </div>

              <div className="rounded-xl bg-blue-600 p-4 text-white shadow-sm">
                <p className="text-sm font-bold">Ready to generate</p>
                <p className="mt-1 text-sm text-blue-100">
                  Your answers are saved securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-widest text-blue-600">


              HOW IT WORKS
            </p>
            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              A simple process from start to finish.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-black text-blue-600">
                  {step.number}
                </p>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
  <div className="mx-auto max-w-6xl px-6 py-24">
    <div className="text-center">
      <p className="text-sm font-bold tracking-widest text-blue-600">


        FEATURES
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        Everything you need in one place.
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-slate-600">
        Designed to make document preparation simple, organized, and secure.
      </p>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h3 className="text-xl font-bold">Secure Accounts</h3>
        <p className="mt-3 text-slate-600">
          Create an account and keep all your information in one place.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h3 className="text-xl font-bold">Saved Progress</h3>
        <p className="mt-3 text-slate-600">
          Stop anytime and continue later without losing your work.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h3 className="text-xl font-bold">Guided Workflow</h3>
        <p className="mt-3 text-slate-600">
          Step-by-step questions make complex forms easier to complete.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h3 className="text-xl font-bold">Document Generation</h3>
        <p className="mt-3 text-slate-600">
          Generate organized documents based on your answers.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h3 className="text-xl font-bold">Private Dashboard</h3>
        <p className="mt-3 text-slate-600">
          Manage questionnaires and documents from a single dashboard.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <h3 className="text-xl font-bold">Mobile Friendly</h3>
        <p className="mt-3 text-slate-600">
          Complete forms from desktop, tablet, or mobile devices.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="bg-white">
  <div className="mx-auto max-w-6xl px-6 py-24">
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div>
        <p className="text-sm font-bold tracking-widest text-blue-600">


          SIMPLE PRICING
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900">
          One clear package to get started.
        </h2>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          Users can create an account, complete the questionnaire, save their
          progress, and generate document drafts from their dashboard.
        </p>

        <Link
          to="/pricing"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          View Full Pricing
        </Link>
      </div>

      <div className="rounded-3xl border bg-slate-50 p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900">
          Standard Package
        </h3>

        <p className="mt-4 text-5xl font-black text-blue-600">₹2,999</p>

        <ul className="mt-6 space-y-3 text-slate-600">
          <li>✓ Account access</li>
          <li>✓ Guided questionnaire</li>
          <li>✓ Saved progress</li>
          <li>✓ Document generation</li>
          <li>✓ Dashboard access</li>
        </ul>

        <Link
          to="/register"
          className="mt-8 block rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
        >
          Start Now
        </Link>
      </div>
    </div>
  </div>
</section>

<section className="bg-slate-50">
  <div className="mx-auto max-w-4xl px-6 py-24">
    <div className="text-center">
      <p className="text-sm font-bold tracking-widest text-blue-600">
        FREQUENTLY ASKED QUESTIONS
      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        Common questions.
      </h2>
    </div>

    <div className="mt-12 space-y-4">
      <div className="rounded-2xl border bg-white p-6">
        <h3 className="font-bold text-slate-900">
          Do I need an account?
        </h3>

        <p className="mt-3 text-slate-600">
          Yes. Creating an account allows you to save your progress and access
          your dashboard later.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <h3 className="font-bold text-slate-900">
          Can I continue later?
        </h3>

        <p className="mt-3 text-slate-600">
          Yes. Your answers are saved so you can return and continue at any
          time.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <h3 className="font-bold text-slate-900">
          Can I download my documents?
        </h3>

        <p className="mt-3 text-slate-600">
          Yes. Once completed, documents can be generated and downloaded.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <h3 className="font-bold text-slate-900">
          Is my information private?
        </h3>

        <p className="mt-3 text-slate-600">
          User information is stored securely and is accessible only through
          the account dashboard.
        </p>
      </div>
    </div>
  </div>
</section>

<footer className="border-t bg-white">
  <div className="mx-auto max-w-6xl px-6 py-12">
    <div className="grid gap-10 md:grid-cols-3">
      <div>
        <h3 className="text-xl font-black text-blue-600">
          ClearForms
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          A modern platform for guided document preparation and account-based
          workflows.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-slate-900">Pages</h4>

        <ul className="mt-4 space-y-2 text-slate-600">
          <li>Home</li>
          <li>Pricing</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold text-slate-900">Legal</h4>

        <ul className="mt-4 space-y-2 text-slate-600">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Disclaimer</li>
        </ul>
      </div>
    </div>

    <div className="mt-10 border-t pt-6 text-sm text-slate-500">
      © 2026 ClearForms. All rights reserved.
    </div>
  </div>
</footer>


    </main>
  );
}

export default Home;
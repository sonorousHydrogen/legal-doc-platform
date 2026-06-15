import { Link } from "react-router-dom";

function Pricing() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-widest text-blue-600">
            PRICING
          </p>

          <h1 className="mt-3 text-5xl font-bold text-slate-900">
            Simple pricing for document preparation.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Start with one clear package. No confusing setup process.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Basic</h2>
            <p className="mt-4 text-4xl font-black text-blue-600">₹999</p>
            <p className="mt-3 text-slate-600">
              For users who only need guided form access.
            </p>

            <ul className="mt-6 space-y-3 text-slate-600">
              <li>✓ Account access</li>
              <li>✓ Basic questionnaire</li>
              <li>✓ Save progress</li>
            </ul>

            <Link
              to="/register"
              className="mt-8 block rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800 hover:bg-slate-100"
            >
              Choose Basic
            </Link>
          </div>

          <div className="rounded-3xl border-2 border-blue-600 bg-white p-8 shadow-xl">
            <p className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-600">
              Recommended
            </p>

            <h2 className="text-2xl font-bold text-slate-900">Standard</h2>
            <p className="mt-4 text-4xl font-black text-blue-600">₹2,999</p>
            <p className="mt-3 text-slate-600">
              Best for full document preparation workflow.
            </p>

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
              Choose Standard
            </Link>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Premium</h2>
            <p className="mt-4 text-4xl font-black text-blue-600">₹4,999</p>
            <p className="mt-3 text-slate-600">
              For users who need extra document management features.
            </p>

            <ul className="mt-6 space-y-3 text-slate-600">
              <li>✓ Everything in Standard</li>
              <li>✓ Multiple document drafts</li>
              <li>✓ Priority support</li>
              <li>✓ Document history</li>
            </ul>

            <Link
              to="/register"
              className="mt-8 block rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800 hover:bg-slate-100"
            >
              Choose Premium
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Pricing;
import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-white to-blue-50 text-gray-800">
      CalcQuest
      <nav className="w-full flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 w-3 h-3 rounded-full"></div>
          <h2 className="font-bold text-xl text-gray-800"></h2>
        </div>
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <a href="#">About</a>
          <a href="#">Help</a>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
            Login
          </button>
        </div>
      </nav>
      <section className="flex flex-col md:flex-row items-center justify-between w-10/12 mt-10">
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
            Unleash Your <br /> Calculus Genius
          </h1>
          <p className="text-lg mb-8 text-gray-700">
            Your personal AI-powered calculus gym. Generate endless questions,
            get instant scores, and master calculus like never before.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link
              href="/exam" 
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Start New Calculus Exam
            </Link>
            <button className="border-2 border-purple-600 text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
              Review Past Performance
            </button>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <img
            src="/brain.png"
            alt="CalcQuest illustration"
            className="rounded-xl shadow-lg w-72"
          />
        </div>
      </section>
      <section className="mt-24 w-10/12 text-center">
        <h2 className="text-3xl font-bold mb-4">Core Functionalities</h2>
        <p className="text-gray-600 mb-10">
          Everything you need to conquer calculus, all in one dynamic platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-pink-600">
              Calculus Question Generation
            </h3>
            <p className="text-gray-600">
              Generate infinite problems from basic limits to complex integrals.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-purple-600">
              Detailed Score Reporting
            </h3>
            <p className="text-gray-600">
              Instant feedback and performance analysis after every session.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">
              Performance Analysis
            </h3>
            <p className="text-gray-600">
              Track progress over time and find weak spots quickly.
            </p>
          </div>
        </div>
      </section>
      <div>working container</div>
      <footer className="mt-20 mb-6 text-center text-sm text-gray-500 space-x-6">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
        <div className="mt-3">
          <span>© 2025 CalcQuest. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}

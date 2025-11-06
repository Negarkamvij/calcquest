// app/exam/page.js

"use client";
import { useState, useEffect } from "react";
// FIX: Corrected import path (assuming components is in the project root)
import LatexRenderer from "../../components/LatexRenderer"; 

export default function Exam() {
  const [submitted, setSubmitted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [questions, setQuestions] = useState([]);

  // ✅ Load questions from API (Unchanged fetch logic)
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: "calculus" }),
        });
        const data = await res.json();
        
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          setQuestions(data.questions);
        } else {
          console.error("Invalid or empty questions data:", data); 
        }
      } catch (error) {
        console.error("Error loading questions:", error);
      }
    }
    loadQuestions();
  }, []);

  // ✅ Move to next question and check answer
  function handleNext() {
    // Compare answer against the 'solution' field
    if (
      Array.isArray(questions) &&
      questions.length > 0 &&
      answer.trim().toLowerCase() ===
        questions[questionIndex].solution.toLowerCase()
    ) {
      setScore((prevScore) => prevScore + 1);
    }
    setAnswer("");
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setSubmitted(true);
    }
  }

  // ✅ Submit manually (includes scoring final question)
  function handleSubmit() {
    if (
        Array.isArray(questions) &&
        questions.length > 0 &&
        answer.trim().toLowerCase() ===
          questions[questionIndex].solution.toLowerCase()
      ) {
        setScore((prevScore) => prevScore + 1);
    }
    setSubmitted(true);
  }

  // ✅ Retake resets everything
  function handleRetake() {
    setSubmitted(false);
    setScore(0);
    setQuestionIndex(0);
    setAnswer("");
    setTimeLeft(300); // Reset timer
  }

  // ✅ Timer countdown (Unchanged logic)
  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted]);

  // ✅ Calculated variables
  const hasQuestions = Array.isArray(questions) && questions.length > 0;
  const progress = hasQuestions
    ? ((questionIndex + 1) / questions.length) * 100
    : 0;

  // ✅ Feedback messages (Unchanged logic)
  let feedbackMessage = "";
  if (Array.isArray(questions) && questions.length > 0 && submitted) {
    if (score === questions.length) {
      feedbackMessage = "🌟 Perfect Score! You’re a Calculus Genius!";
    } else if (score >= questions.length * 0.7) {
      feedbackMessage = "🎯 Excellent Work! You really know your stuff!";
    } else if (score >= questions.length * 0.4) {
      feedbackMessage = "👍 Nice effort! Keep practicing to improve!";
    } else {
      feedbackMessage = "💪 Don’t give up! Try again to get a higher score!";
    }
  }

  // ✅ Loading screen
  if (!hasQuestions) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading Questions...
      </div>
    );
  }

  // ✅ Main render
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 text-gray-800">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        Exam in progress
      </h1>

      {/* Timer Display */}
      <p className="text-gray-600 mb-6">
        Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>

      {/* Progress Bar */}
      <div className="w-11/12 md:w-2/3 bg-gray-200 rounded-full h-3 mb-8">
        <div
          className="bg-purple-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Display: USES LATEX RENDERER */}
      <div className="bg-white shadow-md rounded-xl p-6 w-11/12 md:w-2/3 text-center">
        <div className="text-lg text-gray-700">
          Question {questionIndex + 1}: 
          {/* RENDER THE QUESTION TEXT THROUGH THE LATEX COMPONENT */}
          <LatexRenderer text={questions[questionIndex]?.question || ""} />
        </div>
      </div>

      {/* Answer Input */}
      <input
        type="text"
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="mt-6 w-11/12 md:w-2/3 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        disabled={submitted} // Disable input after submission
      />

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleNext}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 transition disabled:opacity-50"
          disabled={submitted}
        >
          {questionIndex < questions.length - 1 ? "Next Question" : "Finish"}
        </button>
        <button
          onClick={handleSubmit}
          className="border-2 border-purple-600 text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition disabled:opacity-50"
          disabled={submitted}
        >
          Submit Exam
        </button>
      </div>

      {/* Progress Info */}
      <div className="mt-10 text-gray-600 text-sm">
        <p>
          Question {questionIndex + 1} of {questions.length} | Score: {score}
        </p>
      </div>

      {/* Submitted Feedback */}
      {submitted && (
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">
            Exam Completed!
          </h2>
          <div className="bg-purple-100 text-purple-800 rounded-xl p-6 shadow-md block mx-auto w-fit">
            <p className="text-gray-600 mt-2">
              Your Score: {score}/{questions.length}
            </p>
            <p className="text-lg mt-2">{feedbackMessage}</p>
          </div>

          <button
            onClick={handleRetake}
            className="mt-3 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 shadow-md transition"
          >
            Retake Exam
          </button>
        </div>
      )}
    </main>
  );
}
"use client";
import React from "react";

export default function QuizQuestionCard() {
  const profileName = "Abdul Kashif";
  const initials = React.useMemo(
    () =>
      profileName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase())
        .join("") || "U",
    [profileName]
  );

  const quiz = React.useMemo(
    () => [
      {
        question: "She gave me a beautiful _____.",
        options: ["Sing", "Gift", "Happy", "Run"],
        correctIndex: 1,
        explanation: {
          title: "Explanation:",
          body:
            'In this sentence, we need a noun that fits after the adjective "beautiful."',
          bullets: [
            '"Gift" is a concrete noun—something you can see or touch and it fits perfectly: “She gave me a beautiful gift.”',
            '"Sing" is a verb.',
            '"Happy" is an adjective.',
            "'Run' is usually a verb (though it can also be a noun, but it doesn't fit this context well).",
          ],
        },
      },
      {
        question: "They ____ to the market every Sunday.",
        options: ["go", "goes", "went", "gone"],
        correctIndex: 0,
        explanation: {
          title: "Explanation:",
          body: "With plural subject 'they', the present simple form is 'go'.",
          bullets: ["'goes' is for he/she/it", "'went' is past tense", "'gone' is past participle"],
        },
      },
       {
        question: "They ____ to the market every Sunday.",
        options: ["go", "goes", "went", "gone"],
        correctIndex: 0,
        explanation: {
          title: "Explanation:",
          body: "With plural subject 'they', the present simple form is 'go'.",
          bullets: ["'goes' is for he/she/it", "'went' is past tense", "'gone' is past participle"],
        },
      },
    ],
    []
  );

  const POINTS_CORRECT = 4;
  const PENALTY_INCORRECT = 1;

  const [currentQ, setCurrentQ] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [wrongIndices, setWrongIndices] = React.useState([]);
  const [showExplanation, setShowExplanation] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [incorrectCount, setIncorrectCount] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [isCorrectlyAnswered, setIsCorrectlyAnswered] = React.useState(false);

  const totalQuestions = quiz.length;
  const questionNo = currentQ + 1;
  const q = quiz[currentQ];

  React.useEffect(() => {
    setSelectedIndex(null);
    setWrongIndices([]);
    setShowExplanation(false);
    setIsCorrectlyAnswered(false);
  }, [currentQ]);

  const handleSelect = (idx) => {
    if (isCorrectlyAnswered) return;
    setSelectedIndex(idx);

    const isCorrect = idx === q.correctIndex;
    if (isCorrect) {
      setIsCorrectlyAnswered(true);
      setShowExplanation(true);
      setCorrectCount((c) => c + 1);
      setScore((s) => s + POINTS_CORRECT);
    } else {
      setWrongIndices((arr) => (arr.includes(idx) ? arr : [...arr, idx]));
      setIncorrectCount((c) => c + 1);
      setScore((s) => s - PENALTY_INCORRECT);
    }
  };

  const goNext = () => {
    if (!isCorrectlyAnswered) return;
    setCurrentQ((i) => (i + 1 < totalQuestions ? i + 1 : i));
  };

  const onReport = () => console.log("Report a Problem clicked");
  const onViewSolution = () => setShowExplanation(true);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-700 font-medium">Marking scheme:</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
            <span className="font-semibold">For correct</span>
            <span className="rounded-full bg-emerald-100 px-1.5 leading-5 text-xs font-bold">+{POINTS_CORRECT}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-rose-700">
            <span className="font-semibold">Negative Marking</span>
            <span className="rounded-full bg-rose-100 px-1.5 leading-5 text-xs font-bold">-{PENALTY_INCORRECT}</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
              {initials}
            </div>
            <span className="text-gray-800 font-medium">{profileName}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="text-gray-900 font-medium">
              <span className="text-gray-900">Q-NO:{questionNo}:</span>{" "}
              {q.question}
            </p>
            <span className="text-xs text-gray-500 tabular-nums">
              {String(questionNo).padStart(2, "0")}/{String(totalQuestions).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {q.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const selected = idx === selectedIndex;
              const isCorrect = idx === q.correctIndex;
              const wasTriedWrong = wrongIndices.includes(idx);

              return (
                <label
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`flex items-start gap-3 rounded-lg px-2 py-1 cursor-pointer ${
                    wasTriedWrong && !isCorrect
                      ? "bg-red-100 border-l-4 border-red-600"
                      : selected
                      ? "bg-gray-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={`answer-${currentQ}`}
                    disabled={isCorrectlyAnswered}
                    checked={selected}
                    readOnly
                    className="mt-1 h-4 w-4 border-gray-300 text-[#7d287e] focus:ring-[#7d287e]"
                  />
                  <div className="flex-1">
                    <span className={`text-gray-700 ${selected ? "font-medium" : ""}`}>
                      <span className="font-medium mr-1">{letter}.</span> {opt}
                    </span>
                    {showExplanation && isCorrect && (
                      <div className="mt-3 rounded-md border border-[#155724]/30 bg-[#155724]/10">
                        <div className="border-l-4 border-[#155724] p-4">
                          <p className="font-semibold mb-1 text-[#155724]">
                            {q.explanation.title || "Explanation:"}
                          </p>
                          {q.explanation.body && (
                            <p className="text-sm mb-2 text-[#155724]">{q.explanation.body}</p>
                          )}
                          {Array.isArray(q.explanation.bullets) && q.explanation.bullets.length > 0 && (
                            <ul className="list-disc pl-5 text-sm space-y-1 text-[#155724]">
                              {q.explanation.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              );
            })}
          </div>

          <div className="mt-5">
            <button
              type="button"
              onClick={onReport}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Report a Problem
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="mr-4 text-green-600">Correct: <span className="font-semibold">{correctCount}</span></span>
              <span className="mr-4 text-red-400">Incorrect: <span className="font-semibold">{incorrectCount}</span></span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onViewSolution}
                disabled={!isCorrectlyAnswered}
                className="inline-flex items-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none hover:bg-gray-100 disabled:opacity-50"
              >
                View Solution
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!isCorrectlyAnswered || currentQ + 1 >= totalQuestions}
                className="inline-flex items-center rounded-md bg-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
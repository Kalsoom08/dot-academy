"use client";
import React, { useEffect, useMemo, useState } from "react";
import TestResultPopup from "./testResult";
import Image from "next/image";
import Logo from "../../../public/NavBar/logo.png";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizQuestionCard() {
  const profileName = "Abdul Kashif";

  const initials = useMemo(
    () =>
      profileName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase())
        .join("") || "U",
    [profileName]
  );

  const quiz = useMemo(
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
          bullets: [
            "'goes' is for he/she/it",
            "'went' is past tense",
            "'gone' is past participle",
          ],
        },
      },
    ],
    []
  );

  const POINTS_CORRECT = 4;
  const PENALTY_INCORRECT = 1;

  const [state, setState] = useState({
    currentQ: 0,
    selectedIndex: null,
    wrongIndices: [],
    showExplanation: false,
    correctCount: 0,
    incorrectCount: 0,
    score: 0,
    isCorrectlyAnswered: false,
    showResultPopup: false,
  });

  const totalQuestions = quiz.length;
  const questionNo = state.currentQ + 1;
  const q = quiz[state.currentQ];

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      selectedIndex: null,
      wrongIndices: [],
      showExplanation: false,
      isCorrectlyAnswered: false,
    }));
  }, [state.currentQ]);

  const handleSelect = (idx) => {
    if (state.isCorrectlyAnswered) return;
    const isCorrect = idx === q.correctIndex;

    if (isCorrect) {
      setState((prev) => ({
        ...prev,
        selectedIndex: idx,
        isCorrectlyAnswered: true,
        showExplanation: true,
        correctCount: prev.correctCount + 1,
        score: prev.score + POINTS_CORRECT,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        selectedIndex: idx,
        wrongIndices: prev.wrongIndices.includes(idx)
          ? prev.wrongIndices
          : [...prev.wrongIndices, idx],
        incorrectCount: prev.incorrectCount + 1,
        score: prev.score - PENALTY_INCORRECT,
      }));
    }
  };

  const goNext = () => {
    if (state.currentQ + 1 < totalQuestions) {
      setState((prev) => ({
        ...prev,
        currentQ: prev.currentQ + 1,
        selectedIndex: null,
        wrongIndices: [],
        showExplanation: false,
        isCorrectlyAnswered: false,
      }));
    } else {
      setState((prev) => ({ ...prev, showResultPopup: true }));
    }
  };

  const onViewSolution = () =>
    setState((prev) => ({ ...prev, showExplanation: true }));

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 bg-[#F2F2F2] flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-10">
          <Image src={Logo} height={80} width={80} alt="Logo" />
          <h1 className="font-bold text-center sm:text-left text-lg sm:text-xl">
            Test : The Noun Word
          </h1>
        </div>

        {/* Marking scheme */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700 font-medium sm:block">
              Marking scheme:
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                <span className="font-semibold">For correct</span>
                <span className="rounded-full bg-emerald-100 px-1.5 leading-5 text-xs font-bold">
                  +{POINTS_CORRECT}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-rose-700">
                <span className="font-semibold">Negative Marking</span>
                <span className="rounded-full bg-rose-100 px-1.5 leading-5 text-xs font-bold">
                  -{PENALTY_INCORRECT}
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
              {initials}
            </div>
            <span className="text-gray-800 font-medium">{profileName}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentQ}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <p className="text-gray-900 font-medium break-words">
                  <span className="text-gray-900">Q-NO:{questionNo}:</span>{" "}
                  {q.question}
                </p>
                <span className="text-xs text-gray-500 tabular-nums self-end sm:self-auto">
                  {String(questionNo).padStart(2, "0")}/
                  {String(totalQuestions).padStart(2, "0")}
                </span>
              </div>

              {/* Options */}
              <div className="mt-5 space-y-3">
                {q.options.map((opt, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  const selected = idx === state.selectedIndex;
                  const isCorrect = idx === q.correctIndex;
                  const wasTriedWrong = state.wrongIndices.includes(idx);

                  return (
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`flex items-start gap-3 rounded-lg px-3 py-2 cursor-pointer transition-all
                        ${
                          wasTriedWrong && !isCorrect
                            ? "bg-red-100 border-l-4 border-red-600"
                            : selected
                            ? "bg-gray-50"
                            : "hover:bg-gray-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name={`answer-${state.currentQ}`}
                        disabled={state.isCorrectlyAnswered}
                        checked={selected}
                        readOnly
                        className="mt-1 h-4 w-4 border-gray-300 text-[#7d287e] focus:ring-[#7d287e]"
                      />
                      <div className="flex-1 break-words">
                        <span
                          className={`text-gray-700 ${
                            selected ? "font-medium" : ""
                          }`}
                        >
                          <span className="font-medium mr-1">{letter}.</span>{" "}
                          {opt}
                        </span>

                        {/* Explanation Animation */}
                        <AnimatePresence>
                          {state.showExplanation && isCorrect && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 rounded-md border border-[#155724]/30 bg-[#155724]/10 overflow-hidden"
                            >
                              <div className="border-l-4 border-[#155724] p-3">
                                <p className="font-semibold mb-1 text-[#155724]">
                                  {q.explanation.title || "Explanation:"}
                                </p>
                                {q.explanation.body && (
                                  <p className="text-sm mb-2 text-[#155724]">
                                    {q.explanation.body}
                                  </p>
                                )}
                                {Array.isArray(q.explanation.bullets) &&
                                  q.explanation.bullets.length > 0 && (
                                    <ul className="list-disc pl-5 text-sm space-y-1 text-[#155724]">
                                      {q.explanation.bullets.map((b, i) => (
                                        <li key={i}>{b}</li>
                                      ))}
                                    </ul>
                                  )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.label>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-700 flex flex-wrap gap-4">
                  <span className="text-green-600">
                    Correct:{" "}
                    <span className="font-semibold">{state.correctCount}</span>
                  </span>
                  <span className="text-red-400">
                    Incorrect:{" "}
                    <span className="font-semibold">{state.incorrectCount}</span>
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onViewSolution}
                    disabled={!state.isCorrectlyAnswered}
                    className="inline-flex items-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    View Solution
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center rounded-md bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
                  >
                    {state.currentQ + 1 < totalQuestions
                      ? "Next Question"
                      : "Finish"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Popup Animation */}
      <AnimatePresence>
        {state.showResultPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TestResultPopup
              isVisible={state.showResultPopup}
              onClose={() =>
                setState((prev) => ({ ...prev, showResultPopup: false }))
              }
              playerName={profileName}
              testData={{
                totalScore: `${state.score}/${totalQuestions * POINTS_CORRECT}`,
                correct: state.correctCount,
                incorrect: state.incorrectCount,
                unattempted:
                  totalQuestions - state.correctCount - state.incorrectCount,
                rank: "19848/192290",
                percentile: "1.03%",
                accuracy: `${(
                  (state.correctCount / totalQuestions) *
                  100
                ).toFixed(2)}%`,
                timeTaken: "01hr 45m 20s",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

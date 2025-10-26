'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiCheck, FiX, FiHelpCircle, FiAlertCircle } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { submitQuizAttempt } from '../../../../../slices/courseSlice';
import QuizResultsPopup from './QuizResultsPopup';

const MCQQuizPopup = ({ isVisible, onClose, lesson, courseId, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [showResultsPopup, setShowResultsPopup] = useState(false);

  const dispatch = useDispatch();
  
  const questions = Array.isArray(lesson?.mcqs) ? lesson.mcqs : [];
  const lessonTitle = lesson?.title || 'Quiz';
  const totalQuestions = questions.length;
  const lessonId = lesson?._id;

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !quizCompleted && totalQuestions > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !quizCompleted && totalQuestions > 0) {
      handleSubmitQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, quizCompleted, totalQuestions]);

  useEffect(() => {
    if (lesson && isVisible) {
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setAnsweredQuestions({});
      setTimeLeft(1800);
      setQuizStarted(false);
      setQuizCompleted(false);
      setResults(null);
      setError(null);
      setShowResultsPopup(false);
    }
  }, [lesson, isVisible]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    const newSelectedAnswers = {
      ...selectedAnswers,
      [questionIndex]: answer
    };
    setSelectedAnswers(newSelectedAnswers);
    
    // Mark question as answered
    setAnsweredQuestions(prev => ({
      ...prev,
      [questionIndex]: true
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (totalQuestions === 0) {
      setError('No questions available for this quiz.');
      return;
    }

    const answers = Object.entries(selectedAnswers).map(([questionIndex, answer]) => ({
      questionIndex: parseInt(questionIndex),
      answer: answer
    }));

    try {
      console.log('Submitting quiz with answers:', answers);
      const result = await dispatch(submitQuizAttempt({
        courseId,
        lessonId: lessonId,
        answers
      })).unwrap();

      console.log('Quiz submission result:', result);
      const finalResults = result.data || calculateClientResults();
      setResults(finalResults);
      setQuizCompleted(true);
      setShowResultsPopup(true);
      
      // Call the parent callback
      if (onQuizComplete) {
        onQuizComplete(finalResults);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Fallback: Calculate results client-side if backend fails
      const clientResults = calculateClientResults();
      setResults(clientResults);
      setQuizCompleted(true);
      setShowResultsPopup(true);
      
      if (onQuizComplete) {
        onQuizComplete(clientResults);
      }
    }
  };

  const calculateClientResults = () => {
    let correctCount = 0;
    const detail = [];

    questions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) correctCount++;
      
      detail.push({
        questionIndex: index,
        correctAnswer: question.correctAnswer,
        userAnswer: userAnswer || null,
        isCorrect
      });
    });

    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return {
      score,
      correctCount,
      total: totalQuestions,
      detail
    };
  };

  const handleStartQuiz = () => {
    if (totalQuestions === 0) {
      setError('No questions available for this quiz.');
      return;
    }
    setQuizStarted(true);
    setError(null);
  };

  const handleCloseResults = () => {
    setShowResultsPopup(false);
    setQuizCompleted(false);
    setResults(null);
    onClose();
  };

  const currentQ = questions[currentQuestion] || {};
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;
  const isCurrentQuestionAnswered = answeredQuestions[currentQuestion];
  const userAnswer = selectedAnswers[currentQuestion];

  const validOptions = currentQ.options ? 
    Object.entries(currentQ.options)
      .filter(([key]) => ['A', 'B', 'C', 'D'].includes(key))
      .filter(([_, value]) => value && value.toString().trim() !== '')
    : [];

  // Show results popup if quiz is completed and results are available
  if (showResultsPopup && results) {
    console.log('Rendering QuizResultsPopup with results:', results);
    return (
      <QuizResultsPopup
        isVisible={showResultsPopup}
        onClose={handleCloseResults}
        results={results}
        lessonTitle={lessonTitle}
        totalQuestions={totalQuestions}
      />
    );
  }

  // If not visible, don't show anything
  if (!isVisible) return null;

  if (totalQuestions === 0) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Questions Available</h2>
            <p className="text-gray-600 mb-6">
              This quiz doesn't have any questions yet. Please check back later.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#7c287d] text-white rounded-lg font-medium hover:bg-[#6b1f6b] transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!quizStarted) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="bg-gradient-to-r from-[#7c287d] to-[#9c3b9d] p-6 text-white">
              <h2 className="text-2xl font-bold">{lessonTitle}</h2>
              <p className="text-purple-100 mt-2">Multiple Choice Questions</p>
            </div>

            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">{totalQuestions}</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">30:00</div>
                  <div className="text-sm text-gray-600">Time Limit</div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FiHelpCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Instructions</h4>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• Each question has 4 options</li>
                      <li>• Select the correct answer</li>
                      <li>• You can navigate between questions</li>
                      <li>• Timer will start when you begin</li>
                      <li>• Explanation will show automatically after answering</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartQuiz}
                  className="flex-1 px-6 py-3 bg-[#7c287d] text-white rounded-lg font-medium hover:bg-[#6b1f6b] transition-colors shadow-lg"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7c287d] to-[#9c3b9d] p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{lessonTitle}</h2>
                <p className="text-purple-100 text-sm">
                  Question {currentQuestion + 1} of {totalQuestions}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-purple-800/30 px-3 py-1 rounded-full">
                  <FiClock className="w-4 h-4" />
                  <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-800/30 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-purple-800/30 rounded-full h-2 mt-3">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                {/* Question */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {currentQ.question || 'Question not available'}
                  </h3>
                  
                  {/* Options */}
                  <div className="space-y-3">
                    {validOptions.length > 0 ? (
                      validOptions.map(([key, value]) => {
                        const isSelected = userAnswer === key;
                        
                        return (
                          <motion.button
                            key={key}
                            whileHover={{ scale: isCurrentQuestionAnswered ? 1 : 1.02 }}
                            whileTap={{ scale: isCurrentQuestionAnswered ? 1 : 0.98 }}
                            onClick={() => !isCurrentQuestionAnswered && handleAnswerSelect(currentQuestion, key)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-[#7c287d] bg-purple-50 text-purple-700'
                                : 'border-gray-200 bg-white hover:border-purple-300'
                            } ${isCurrentQuestionAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                            disabled={isCurrentQuestionAnswered}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#7c287d] bg-[#7c287d] text-white'
                                  : 'border-gray-300 text-gray-600'
                              }`}>
                                {isSelected ? (
                                  <FiCheck className="w-3 h-3" />
                                ) : (
                                  <span className="text-xs font-bold">{key}</span>
                                )}
                              </div>
                              <span className="font-medium">{key}.</span>
                              <span className="flex-1">{value || 'Option not available'}</span>
                            </div>
                          </motion.button>
                        );
                      })
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No options available for this question.
                      </div>
                    )}
                  </div>

                  {/* Explanation - Always show when question is answered */}
                  {isCurrentQuestionAnswered && currentQ.explanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <FiHelpCircle className="w-4 h-4 text-blue-600" />
                        <h4 className="font-semibold text-blue-800">Explanation</h4>
                      </div>
                      <p className="text-blue-700 text-sm">{currentQ.explanation}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                className="px-6 py-2 bg-[#7c287d] text-white rounded-lg font-medium hover:bg-[#6b1f6b] transition-colors"
              >
                {currentQuestion === totalQuestions - 1 ? 'Submit Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MCQQuizPopup;
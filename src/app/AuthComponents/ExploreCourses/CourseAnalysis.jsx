'use client';
import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { 
  MdCancel,
  MdLibraryBooks,
  MdAssessment,
  MdQuestionAnswer,
  MdAccessTime,
  MdTrendingUp,
  MdEmojiEvents,
  MdBarChart,
  MdSchedule,
  MdPerson
} from "react-icons/md"; 
import { 
  FiCheck, 
  FiX, 
  FiClock, 
  FiAward, 
  FiTarget, 
  FiTrendingUp, 
  FiBarChart2, 
  FiBookOpen, 
  FiActivity,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import { motion } from 'framer-motion';

function CourseAnalysis({ onClose, itemData, userProgress }) { 
  const [progress, setProgress] = useState(0);
  const [courseStats, setCourseStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (itemData && userProgress) {
      calculateCourseStats();
    }
  }, [itemData, userProgress]);

  const calculateCourseStats = () => {
    if (!userProgress || !itemData) {
      setProgress(0);
      setCourseStats(getDefaultStats());
      return;
    }

    // Calculate total lessons from course structure
    const totalLessons = calculateTotalLessons(itemData);
    const completedLessons = userProgress.completedLessons?.length || 0;
    
    // Calculate progress percentage
    const progressPercentage = totalLessons > 0 ? 
      Math.round((completedLessons / totalLessons) * 100) : 0;
    setProgress(progressPercentage);

    // Calculate quiz statistics
    const quizAttempts = userProgress.quizAttempts || [];
    const totalQuizAttempts = quizAttempts.length;
    
    // Calculate total test questions attempted
    const totalQuestionsAttempted = quizAttempts.reduce((total, attempt) => 
      total + (attempt.total || 0), 0);
    
    // Calculate correct/incorrect answers
    const totalCorrect = quizAttempts.reduce((total, attempt) => 
      total + (attempt.correctCount || 0), 0);
    const totalIncorrect = totalQuestionsAttempted - totalCorrect;
    
    // Calculate total time spent
    const totalTimeSpent = userProgress.totalTimeSpent || 0;
    
    // Calculate average accuracy
    const averageAccuracy = totalQuestionsAttempted > 0 ? 
      Math.round((totalCorrect / totalQuestionsAttempted) * 100) : 0;

    // Calculate average score across all quiz attempts
    const averageScore = totalQuizAttempts > 0 ? 
      Math.round(quizAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / totalQuizAttempts) : 0;

    // Calculate time per question
    const avgTimePerQuestion = totalQuestionsAttempted > 0 ? 
      Math.round(totalTimeSpent / totalQuestionsAttempted) : 0;

    const stats = {
      contentViewed: `${completedLessons}/${totalLessons}`,
      testAttempted: `${totalQuizAttempts}/${countQuizzes(itemData)}`,
      totalTestQuestions: `${totalQuestionsAttempted}/${countTotalQuizQuestions(itemData)}`,
      totalTimeOnTest: formatTime(totalTimeSpent),
      correctIncorrect: `${totalCorrect}/${totalIncorrect}`,
      avgTimePerQuestion: formatTime(avgTimePerQuestion),
      averageRank: calculateRank(averageScore),
      averagePercentile: calculatePercentile(averageScore),
      averageAccuracy: `${averageAccuracy}%`,
      averageScore: `${averageScore}%`,
      totalStudyTime: formatTime(totalTimeSpent),
      lastAccessed: userProgress.lastAccessed ? new Date(userProgress.lastAccessed).toLocaleDateString() : 'Never'
    };

    setCourseStats(stats);
  };

  const getDefaultStats = () => ({
    contentViewed: '0/0',
    testAttempted: '0/0',
    totalTestQuestions: '0/0',
    totalTimeOnTest: '0s',
    correctIncorrect: '0/0',
    avgTimePerQuestion: '0s',
    averageRank: '0',
    averagePercentile: '0',
    averageAccuracy: '0%',
    averageScore: '0%',
    totalStudyTime: '0s',
    lastAccessed: 'Never'
  });

  // Helper functions to calculate course metrics
  const calculateTotalLessons = (course) => {
    if (!course) return 0;
    let total = 0;
    if (Array.isArray(course.sections)) {
      course.sections.forEach(section => {
        total += (section.lessons || []).length;
      });
    }
    return total;
  };

  const countQuizzes = (course) => {
    if (!course) return 0;
    let quizCount = 0;
    if (Array.isArray(course.sections)) {
      course.sections.forEach(section => {
        (section.lessons || []).forEach(lesson => {
          if (lesson.type === 'mcq') {
            quizCount++;
          }
        });
      });
    }
    return quizCount;
  };

  const countTotalQuizQuestions = (course) => {
    if (!course) return 0;
    let totalQuestions = 0;
    if (Array.isArray(course.sections)) {
      course.sections.forEach(section => {
        (section.lessons || []).forEach(lesson => {
          if (lesson.type === 'mcq' && Array.isArray(lesson.mcqs)) {
            totalQuestions += lesson.mcqs.length;
          }
        });
      });
    }
    return totalQuestions;
  };

  const calculateRank = (averageScore) => {
    if (averageScore >= 90) return 'Top 10%';
    if (averageScore >= 80) return 'Top 25%';
    if (averageScore >= 70) return 'Top 50%';
    if (averageScore >= 60) return 'Top 75%';
    return 'Needs Improvement';
  };

  const calculatePercentile = (averageScore) => {
    return Math.min(100, Math.max(0, Math.round(averageScore * 1.1))) + '%';
  };

  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return '0s';
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    if (minutes < 60) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-purple-600'; // 75% will fall in this range
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-purple-100'; // 75% will fall in this range
    if (percentage >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const overviewCards = [
    {
      icon: MdLibraryBooks,
      title: 'Content Progress',
      value: courseStats?.contentViewed || '0/0',
      description: 'Lessons Completed',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FiAward,
      title: 'Average Score',
      value: courseStats?.averageScore || '0%',
      description: 'Across All Quizzes',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: MdAccessTime,
      title: 'Total Study Time',
      value: courseStats?.totalStudyTime || '0s',
      description: 'Time Spent Learning',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FiTarget,
      title: 'Accuracy',
      value: courseStats?.averageAccuracy || '0%',
      description: 'Question Accuracy',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const detailedStats = [
    { icon: MdLibraryBooks, title: 'Content Viewed', outOf: courseStats?.contentViewed || '0/0' },
    { icon: MdAssessment, title: 'Test Attempted', outOf: courseStats?.testAttempted || '0/0' },
    { icon: MdQuestionAnswer, title: 'Total Test Questions', outOf: courseStats?.totalTestQuestions || '0/0' },
    { icon: MdAccessTime, title: 'Total Time on Test', outOf: courseStats?.totalTimeOnTest || '0s' },
    { icon: FiCheckCircle, title: 'Correct: Incorrect Questions', outOf: courseStats?.correctIncorrect || '0/0' },
    { icon: MdSchedule, title: 'Average Time per Question', outOf: courseStats?.avgTimePerQuestion || '0s' },
    { icon: MdEmojiEvents, title: 'Average Rank', outOf: courseStats?.averageRank || '0' },
    { icon: MdBarChart, title: 'Average Percentile', outOf: courseStats?.averagePercentile || '0' },
    { icon: MdTrendingUp, title: 'Average Accuracy', outOf: courseStats?.averageAccuracy || '0%' }
  ];

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7c287d] to-[#9c3b9d] p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className='text-2xl font-bold'>Course Progress Analysis</h1>
              <p className='text-purple-100 mt-1'>{itemData?.name || 'Course'}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <MdCancel size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-white text-[#7c287d]' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'detailed' 
                  ? 'bg-white text-[#7c287d]' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Detailed Analysis
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              {/* Progress Display - Simplified without circle */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center">
                  <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <div className="text-center">
                      <span className={`text-5xl font-bold ${getProgressColor(progress)}`}>
                        {progress}%
                      </span>
                      <div className="text-lg text-gray-500 mt-2">Complete</div>
                      <div className={`mt-4 px-4 py-2 rounded-lg ${getProgressBgColor(progress)} ${getProgressColor(progress)} font-medium`}>
                        {progress >= 80 ? 'Excellent' : 
                         progress >= 60 ? 'Great Progress' : 
                         progress >= 40 ? 'Good Start' : 'Keep Going'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Progress Summary</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Course Completion</span>
                        <span className="font-semibold">{progress}%</span>
                      </div>
                      {/* Removed the progress line bar */}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-bold text-purple-600">{userProgress?.completedLessons?.length || 0}</div>
                        <div className="text-purple-600">Lessons Done</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-green-600">{userProgress?.quizAttempts?.length || 0}</div>
                        <div className="text-green-600">Quiz Attempts</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Last accessed: {courseStats?.lastAccessed || 'Never'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {overviewCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${card.bgColor} rounded-xl p-4 border transition-all hover:shadow-md`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${card.bgColor}`}>
                        <card.icon className={`w-5 h-5 ${card.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-bold text-gray-800">{card.value}</div>
                        <div className="text-sm text-gray-600">{card.title}</div>
                        <div className="text-xs text-gray-500">{card.description}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            /* Detailed Analysis Tab */
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Detailed Performance Metrics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {detailedStats.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{item.title}</p>
                      <p className="text-lg font-bold text-gray-900">{item.outOf}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quiz Performance */}
              {userProgress?.quizAttempts && userProgress.quizAttempts.length > 0 && (
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiTrendingUp className="w-5 h-5 text-purple-600" />
                    Recent Quiz Performance
                  </h4>
                  <div className="space-y-3">
                    {userProgress.quizAttempts.slice(-5).reverse().map((attempt, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            attempt.score >= 80 ? 'bg-green-100 text-green-600' :
                            attempt.score >= 60 ? 'bg-purple-100 text-purple-600' :
                            attempt.score >= 40 ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            <FiAward className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-800">
                              Score: {attempt.score}%
                            </div>
                            <div className="text-xs text-gray-500">
                              {attempt.correctCount}/{attempt.total} correct • {formatTime(attempt.timeSpent)}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(attempt.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Track your learning journey and improve your performance
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#7c287d] text-white rounded-lg font-medium hover:bg-[#6b1f6b] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CourseAnalysis;
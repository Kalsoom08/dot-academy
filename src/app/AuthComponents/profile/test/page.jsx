'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../../../components/AuthSiderbar';
import Header from '../../../../components/AuthHeader';
import Footer from '../../../../components/AuthFooter';
import { fetchProfileData } from '../../../../../slices/profileSlice';
import { useRouter } from 'next/navigation';

const AttemptedTestPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { quizAttempts, unattemptedTests, loading } = useSelector((s) => s.profile);
  const authUser = useSelector((s) => s.auth?.user);
  const userId = (authUser && authUser._id) || (typeof window !== "undefined" ? localStorage.getItem("userId") : null);

  useEffect(() => {
    if (userId) dispatch(fetchProfileData(userId));
  }, [dispatch, userId]);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={false} onClose={() => {}} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header onMenuClick={() => {}} />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-4">Your Tests</h1>

              {loading ? (
                <p>Loading...</p>
              ) : quizAttempts && quizAttempts.length > 0 ? (
                <>
                  <h2 className="text-lg font-semibold mb-3">Attempted Tests</h2>
                  <ul className="space-y-3">
                    {quizAttempts.map((qa) => (
                      <li key={qa._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                        <div>
                          <div className="font-medium">{qa.lesson?.title || 'Untitled Test'}</div>
                          <div className="text-sm text-gray-500">Course: {qa.course?.name || '—'}</div>
                          <div className="text-sm text-gray-500">Score: {qa.score ?? 'N/A'}</div>
                        </div>
                        <div>
                          <button className="px-3 py-1 bg-gray-800 text-white rounded" onClick={() => router.push(`/test/result/${qa._id}`)}>
                            View Result
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-3">Unattempted Tests</h2>
                  {unattemptedTests && unattemptedTests.length > 0 ? (
                    <ul className="space-y-3">
                      {unattemptedTests.map((t) => (
                        <li key={t._id} className="p-4 bg-white rounded shadow flex justify-between items-center">
                          <div>
                            <div className="font-medium">{t.title || 'Untitled Test'}</div>
                            <div className="text-sm text-gray-500">Course: {t.section?.course?.name || '—'}</div>
                          </div>
                          <div>
                            <button className="px-3 py-1 bg-[#7C287D] text-white rounded" onClick={() => router.push(`/test/start/${t._id}`)}>
                              Start Test
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 bg-white rounded text-center">
                      <p className="text-gray-600 mb-4">No tests available to attempt.</p>
                      <button className="px-4 py-2 bg-black text-white rounded" onClick={() => router.push('/courses')}>
                        Browse Courses
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AttemptedTestPage;

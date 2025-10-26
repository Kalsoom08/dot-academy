'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FiCheck, FiTrash2, FiX, FiSearch } from 'react-icons/fi';
import ExamModal from '../home/modal'; 
import {
  getMyExams as apiGetMyExams,
  getMainCategories as apiGetMainCategories,
  addExam as apiAddExam,
  setCurrentExam as apiSetCurrentExam,
  removeExam as apiRemoveExam,
} from '../../../../APIs/changeExamAPI'; 

const SelectExamModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const [myExams, setMyExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentExamId, setCurrentExamId] = useState(null);

 
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    Promise.all([apiGetMyExams(), apiGetMainCategories()])
      .then(([prefsRes, catsRes]) => {
        const prefs = prefsRes || {};
        setMyExams(prefs.myExams || []);
        setCurrentExamId(prefs.currentExam?._id || null);
        setCategories(catsRes || []);
      })
      .catch((err) => {
        console.error('Failed to load exams/categories', err);
        toast.error('Failed to load exam data');
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  const openConfirm = (type, item) => {
    setSelected({ type, item });
    setConfirmOpen(true);
  };

 
  const handleProceed = async () => {
    if (!selected) {
      toast.warn('Please select an exam');
      return;
    }

    setLoading(true);
    try {
      if (selected.type === 'myExam') {
        await apiSetCurrentExam(selected.item._id);
      } else {
        await apiAddExam(selected.item._id);
        await apiSetCurrentExam(selected.item._id);
      }

      toast.success(`"${selected.item.name}" set as current exam`);
      onClose?.();
      router.push('/AuthComponents/ExploreCourses');
    } catch (err) {
      console.error(err);
      toast.error('Could not set exam. Please try again.');
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setSelected(null);
    }
  };

 
  const handleRemoveExam = async (examId) => {
    setLoading(true);
    try {
      await apiRemoveExam(examId);
      const prefs = await apiGetMyExams();
      setMyExams(prefs.myExams || []);
      setCurrentExamId(prefs.currentExam?._id || null);
      toast.success('Exam removed successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove exam');
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMyExams = myExams.filter(me =>
    (me.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
         <motion.div
          className="bg-white rounded-2xl border border-gray-100 w-full max-w-lg mx-auto p-6 relative shadow-xl max-h-[80vh] overflow-y-auto custom-scroll"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
        >

             
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Change Exam</h2>
                <button
                  onClick={() => { setSelected(null); onClose?.(); }}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Select or remove an exam to update your current one
              </p>

            
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  className="border border-gray-300 rounded-full w-full p-2 pl-10 focus:ring-2 focus:ring-purple-500 outline-none"
                  type="search"
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              
              <section>
                <h3 className="font-semibold mb-3 text-gray-800">Your Exams</h3>
                {loading && !myExams.length ? (
                  <div className="text-center text-gray-500 py-4">Loading...</div>
                ) : filteredMyExams.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredMyExams.map((ex) => (
                      <motion.div
                        key={ex._id}
                        className={`group relative p-4 border rounded-xl flex items-center justify-between shadow-sm transition-all duration-200 ${
                          currentExamId === ex._id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          {ex.image && (
                            <img
                              src={ex.image}
                              alt={ex.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <span className="font-medium text-gray-800 truncate max-w-[120px]">
                            {ex.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={() => openConfirm('myExam', ex)}
                            className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                            title="Set as current exam"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveExam(ex._id)}
                            className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                            title="Remove exam"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {currentExamId === ex._id && (
                          <span className="absolute top-2 right-3 text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full shadow">
                            Current
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 text-center py-4">
                    No saved exams yet.
                  </div>
                )}
              </section>

            
              <section className="mt-5">
                <h3 className="font-semibold mb-3 text-gray-800">All Exams</h3>
                {loading && !categories.length ? (
                  <div className="text-center text-gray-500 py-4">Loading...</div>
                ) : filteredCategories.length ? (
                  <div className="grid grid-cols-2 gap-2">
                    {filteredCategories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => openConfirm('category', cat)}
                        className="p-3 border border-gray-200 rounded-xl flex items-center justify-between hover:shadow-md hover:border-purple-300 transition"
                      >
                        <span className="font-medium text-gray-800">{cat.name}</span>
                        <FiCheck className="text-purple-600" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400 text-center py-4">
                    No categories found.
                  </div>
                )}
              </section>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

   
      <AnimatePresence>
        {confirmOpen && selected && (
          <ExamModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold mb-2">Confirm Selection</h3>
              <p className="text-gray-600 mb-4">
                Make <strong>{selected.item.name}</strong> your current exam?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setConfirmOpen(false); setSelected(null); }}
                  className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceed}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  disabled={loading}
                >
                  {loading ? 'Working...' : 'Yes, proceed'}
                </button>
              </div>
            </div>
          </ExamModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default SelectExamModal;

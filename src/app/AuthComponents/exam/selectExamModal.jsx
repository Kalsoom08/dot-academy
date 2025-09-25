import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExamModal from '../home/modal'; 
import { useRouter } from 'next/navigation';

import {
  getMyExams as apiGetMyExams,
  getMainCategories as apiGetMainCategories,
  addExam as apiAddExam,
  setCurrentExam as apiSetCurrentExam
} from '../../../../APIs/changeExamAPI'; 

const SelectExamModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  const [myExams, setMyExams] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null); 
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    Promise.all([apiGetMyExams(), apiGetMainCategories()])
      .then(([prefsRes, catsRes]) => {
        const prefs = prefsRes || {};
        setMyExams(prefs.myExams || []);
        setCategories(catsRes || []);
      })
      .catch((err) => {
        console.error('Failed to load exams/categories', err);
        alert('Failed to load exam data');
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  const openConfirm = (type, item) => {
    setSelected({ type, item });
    setConfirmOpen(true);
  };

  const handleProceed = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      if (selected.type === 'myExam') {
        await apiSetCurrentExam(selected.item._id);
      } else {
        await apiAddExam(selected.item._id);
        await apiSetCurrentExam(selected.item._id);
      }

      const slug = selected.item.slug || selected.item.name?.toLowerCase().replace(/\s+/g, '-');
      onClose?.();
      router.push(`/AuthComponents/ExploreCourses/${slug}`);
    } catch (err) {
      console.error(err);
      alert('Could not set exam. Please try again.');
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setSelected(null);
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[1px] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="bg-white rounded-lg border border-[#f8f4f4] w-full max-w-lg mx-auto p-6 relative"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
            >
              <h2 className="text-xl font-bold text-center mb-2">Change Exam</h2>
              <p className="text-center text-sm text-gray-500 mb-4">Select an exam to make it your current exam</p>

              <div className="relative mb-4">
                <input
                  className="border border-[#282828] rounded-full w-full p-2 pl-4"
                  type="search"
                  placeholder="Search exams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-4 max-h-[55vh] overflow-auto">
                <section>
                  <h3 className="font-semibold mb-2">Your Exams</h3>
                  {loading && !myExams.length ? (
                    <div>Loading...</div>
                  ) : filteredMyExams.length ? (
                    <div className="grid grid-cols-2 gap-2">
                      {filteredMyExams.map((ex) => (
                        <button
                          key={ex._id}
                          onClick={() => openConfirm('myExam', ex)}
                          className="p-3 border rounded-lg flex items-center justify-between hover:shadow-sm"
                        >
                          <span>{ex.name}</span>
                          <span className="text-xs text-gray-400">Use</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">No saved exams yet</div>
                  )}
                </section>

                <section>
                  <h3 className="font-semibold mb-2">All Exams</h3>
                  {loading && !categories.length ? (
                    <div>Loading...</div>
                  ) : filteredCategories.length ? (
                    <div className="grid grid-cols-2 gap-2">
                      {filteredCategories.map((cat) => (
                        <button
                          key={cat._id}
                          onClick={() => openConfirm('category', cat)}
                          className="p-3 border rounded-lg flex items-center justify-between hover:shadow-sm"
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-gray-400">Select</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">No categories found</div>
                  )}
                </section>
              </div>

              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold p-2"
                onClick={() => { setSelected(null); onClose?.(); }}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmOpen && selected && (
          <ExamModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Confirm</h3>
              <p className="mb-4">Make <strong>{selected.item.name}</strong> your current exam?</p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setConfirmOpen(false); setSelected(null); }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceed}
                  className="px-4 py-2 bg-[#7C287D] text-white rounded"
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

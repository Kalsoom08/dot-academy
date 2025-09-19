'use client';
import { RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, markAsRead } from "../../../../slices/notificationSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotificationsModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isModalOpen, items, loadingList } = useSelector((s) => s.notifications);

  const handleClick = (id) => {
    dispatch(markAsRead(id));   
    dispatch(toggleModal());  
    router.push(`/AuthComponents/notifications/${id}`);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[2px] p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md sm:max-w-lg mx-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ duration: 0.3 }}>
            <button onClick={() => dispatch(toggleModal())} className="absolute top-3 right-3 ...">
              <RxCross2 size={16} />
            </button>

            <h2 className="text-center text-2xl font-bold mt-4 mb-4 text-gray-800">Notifications</h2>

            {loadingList ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : items.length === 0 ? (
              <p className="text-center text-gray-500">No notifications available.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((n) => (
                  <div key={n._id}
                       onClick={() => handleClick(n._id)}
                       className={`flex gap-4 p-3 border rounded-xl cursor-pointer transition
                        ${!n.read ? "bg-purple-50 border-purple-300" : ""}`}>
                    <Image src={n.thumbnail} alt={n.title} width={60} height={60}
                      className="rounded-lg object-cover" />
                    <div>
                      <h3 className="font-semibold">{n.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{n.description}</p>
                      <p className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsModal;

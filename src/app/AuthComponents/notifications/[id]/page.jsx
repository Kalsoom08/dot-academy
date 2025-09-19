'use client';
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationById } from "../../../../../slices/notificationSlice";
import Image from "next/image";

const NotificationDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.notifications);

  const notification = items.find((n) => n._id === id);

  useEffect(() => {
    if (!notification) {
      dispatch(fetchNotificationById(id));
    }
  }, [id, notification, dispatch]);

  if (loading && !notification) return <p className="text-center">Loading...</p>;
  if (!notification) return <p className="text-center">Notification not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        ← Back
      </button>

      {notification.thumbnail && (
        <Image
          src={notification.thumbnail}
          alt={notification.title}
          width={600}
          height={400}
          className="rounded-lg mb-4 object-cover"
        />
      )}

      <h1 className="text-2xl font-bold">{notification.title}</h1>
      <p className="text-gray-600 mt-2">{notification.description}</p>
      <p className="text-xs text-gray-400 mt-4">
        {new Date(notification.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default NotificationDetail;

'use client';

import { FaBell } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, fetchNotifications } from "../../slices/notificationSlice";
import NotificationsModal from "../app/AuthComponents/notifications/notificationModal"; 

export default function Header({ onMenuClick }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const unreadCount = useSelector((s) => s.notifications.unreadCount); 

  const handleNotificationClick = () => {
    dispatch(fetchNotifications());
    dispatch(toggleModal());
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap items-center justify-center md:justify-between bg-[#00A1FF7D] px-4 py-2 text-sm">
        <div className="flex items-center gap-2 text-black">
          <RiDiscountPercentFill size={20} />
          <span>
            Start your free trial now and get <strong className="ml-1">40% off</strong>
          </span>
        </div>
        <button className="ml-4 mt-2 md:mt-0 px-3 py-1 border rounded font-medium hover:bg-gray-100 transition-colors">
          Buy Now
        </button>
      </div>

      <div className="flex justify-between items-center px-4 py-3 ">
        <div className="md:hidden">
          <button onClick={onMenuClick}>
            <FiMenu className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <div className="flex-1 hidden md:block" />

        <div className="flex items-center gap-4">
          <button className=" text-white px-3 py-1 rounded text-sm bg-black hover:bg-gray-700 transition-colors">
            Upgrade
          </button>
          <div className="flex items-center gap-2">
          <div
  className="relative border border-gray-300 p-2 rounded-full hover:bg-gray-100 cursor-pointer"
  onClick={handleNotificationClick}
>
  <FaBell className="w-4 h-4 text-gray-600" />
  
  {/* {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full px-1">
      {unreadCount}
    </span>
  )} */}
        </div>

            <div className="border border-gray-300 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
              <CiSearch
                className="w-4 h-4 text-gray-600"
                onClick={() => router.push('/AuthComponents/ExploreCourses/SearchCourses')}
              />
            </div>
          </div>
        </div>
      </div>

      <NotificationsModal />
    </div>
  );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchCurrentUser } from '../../slices/authSlice';
// import { openLoginModal } from '../../slices/uiSlice';

// export default function ProtectedWrapper({ children }) {
//   const dispatch = useDispatch();
//   const { user, token, status } = useSelector((state) => state.auth);

//   const [checkedAuth, setCheckedAuth] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (!user && token) {
//         try {
//           await dispatch(fetchCurrentUser()).unwrap();
//         } catch {
//           dispatch(openLoginModal(window.location.pathname));
//         }
//       } else if (!user && !token) {
//         dispatch(openLoginModal(window.location.pathname));
//       }
//       setCheckedAuth(true);
//     };

//     checkAuth();
//   }, [user, token, dispatch]);

//   if (!checkedAuth || status === 'loading') {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!user) {
//     return null;
//   }

//   return <>{children}</>;
// }

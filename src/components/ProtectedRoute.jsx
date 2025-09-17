// 'use client';

// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { openLoginModal } from '../../slices/uiSlice';
// import { fetchCurrentUser } from '../../slices/authSlice';

// const Protected = (WrappedComponent) => {
//   return function ProtectedComponent(props) {
//     const dispatch = useDispatch();

//     const { isLoggedIn, loading } = useSelector((state) => state.auth);

//     useEffect(() => {
//       if (!isLoggedIn && !loading) {
//         // try fetching current user from API or token
//         dispatch(fetchCurrentUser())
//           .unwrap()
//           .catch(() => {
//             // open login modal if not logged in
//             dispatch(openLoginModal(window.location.pathname));
//           });
//       }
//     }, [isLoggedIn, loading, dispatch]);

//     if (loading) {
//       return <div>Loading...</div>; // optional loader
//     }

//     if (!isLoggedIn) {
//       return null; // block protected content until login
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default Protected;

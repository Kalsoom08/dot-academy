'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourseDetails, getCourseEnrollmentInfo } from '../../../../slices/courseSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentModal from './PaymentModal';
import LoadingSpinner from '@/components/LoadingSpinner';

const PackageCard = ({
  duration,
  validity,
  originalPrice,
  currentPrice,
  saveText,
  bestValue,
  isSelected,
  onSelect,
  index
}) => {
  return (
    <motion.div
      className={`relative p-1 rounded-xl border-2 cursor-pointer transition duration-200 ease-in-out
        ${isSelected ? 'border-[#7D287E] bg-purple-50' : 'border-[#a558a671] hover:border-gray-300'}
      `}
      onClick={onSelect}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {bestValue && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -top-3 left-4 bg-yellow-400 text-[#7D287E] text-xs font-semibold px-3 py-1 rounded-full uppercase shadow"
        >
          Best Value
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4
              ${isSelected ? 'bg-[#7D287E] border-[#7D287E]' : 'bg-white border-[#7D287E]'}
            `}
          >
            {isSelected && <FaCheckCircle className="text-white text-base" />}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">For {duration}</p>
            <p className="text-sm text-gray-500">Valid Till {validity}</p>
          </div>
        </div>

        <div className="text-right">
          {originalPrice && (
            <p className="text-sm text-gray-400 line-through">Rs. {originalPrice}</p>
          )}
          <p className="text-xl font-bold text-[#7D287E]">Rs. {currentPrice}</p>
          {saveText && (
            <p className="text-xs text-blue-500 mt-1">{saveText}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingPlan() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const courseId = searchParams.get('courseId');
  const courseName = searchParams.get('courseName') || 'Premium Course';
  const isRejected = searchParams.get('rejected') === 'true';
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('3_month');
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseDuration, setCourseDuration] = useState(3);

  const { currentCourse, loading, enrollmentInfo } = useSelector((state) => state.courses);

  // Fetch course details and enrollment info
  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetails(courseId));
      dispatch(getCourseEnrollmentInfo(courseId));
    }
  }, [courseId, dispatch]);

  // Set course price and duration when course details are loaded
  useEffect(() => {
    if (currentCourse) {
      const price = currentCourse.effectivePrice ?? currentCourse.basePrice ?? currentCourse.price ?? 0;
      setCoursePrice(price);
      
      if (currentCourse.duration) {
        const durationMatch = currentCourse.duration.match(/(\d+)/);
        if (durationMatch) {
          setCourseDuration(parseInt(durationMatch[1]));
        }
      }
    }
  }, [currentCourse]);

  // Show rejection message if applicable
  useEffect(() => {
    if (isRejected) {
      toast.warning('Your previous payment was rejected. Please try again with a different payment method.');
    }
  }, [isRejected]);

  const calculateMonthlyPrice = (months) => {
    if (coursePrice === 0 || courseDuration === 0) return 0;
    const pricePerMonth = coursePrice / courseDuration;
    return Math.round(pricePerMonth * months);
  };

  const packages = [
    {
      id: '1_month',
      duration: '1 month',
      validity: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalPrice: calculateMonthlyPrice(1),
      currentPrice: calculateMonthlyPrice(1),
      saveText: null,
    },
    {
      id: '3_month',
      duration: '3 months',
      validity: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalPrice: calculateMonthlyPrice(3),
      currentPrice: calculateMonthlyPrice(3),
      saveText: null,
    },
    {
      id: '6_month',
      duration: '6 months',
      validity: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalPrice: calculateMonthlyPrice(6),
      currentPrice: calculateMonthlyPrice(6),
      saveText: 'Best Value',
      bestValue: true,
    },
    {
      id: '1_year',
      duration: '1 year',
      validity: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalPrice: calculateMonthlyPrice(12),
      currentPrice: calculateMonthlyPrice(12),
      saveText: 'Longest Access',
    },
  ];

  const handleBuyNow = () => {
    if (!courseId) {
      toast.error('Course information not found. Please select a course again.');
      return;
    }
    
    if (coursePrice === 0) {
      toast.error('Course price information is not available. Please try again.');
      return;
    }

    // Check if user has pending payment
    if (enrollmentInfo?.pendingPayment) {
      toast.info('You have a pending payment for this course. Please wait for admin approval.');
      return;
    }

    const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage);
    setSelectedAmount(selectedPackageData?.currentPrice || calculateMonthlyPrice(3));
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    toast.success('Payment submitted successfully! Please wait for admin approval.');
    setShowPaymentModal(false);
    // Refresh enrollment info to check status
    dispatch(getCourseEnrollmentInfo(courseId));
  };

  const handleClose = () => {
    router.push('/AuthComponents/ExploreCourses');
  };

  const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage);
  const isDisabled = !courseId || coursePrice === 0 || enrollmentInfo?.pendingPayment;

  // Show loading while fetching course details
  if (loading && courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D287E]"></div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-gray/20 backdrop-blur-[1px] z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Pricing Plan Modal */}
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-purple-100 relative"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={20} />
            </motion.button>

            {/* Content */}
            <div className="p-6">
              <motion.h1
                className="text-center text-2xl md:text-3xl font-bold text-[#7D287E] mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {courseName}
              </motion.h1>
              
              {/* Course Price Info */}
              {coursePrice > 0 && (
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-gray-600">
                    Full Course: <span className="font-semibold">Rs. {coursePrice}</span> for {courseDuration} months
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    (Rs. {Math.round(coursePrice / courseDuration)} per month)
                  </p>
                </motion.div>
              )}

              <motion.p
                className="text-center text-gray-600 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Choose your subscription duration
              </motion.p>

              <div className="space-y-4">
                <AnimatePresence>
                  {packages.map((pkg, index) => (
                    <PackageCard
                      key={pkg.id}
                      {...pkg}
                      index={index}
                      isSelected={selectedPackage === pkg.id}
                      onSelect={() => setSelectedPackage(pkg.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                  whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                  className="w-full bg-[#7D287E] hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-full text-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleBuyNow}
                  disabled={isDisabled || loading}
                >
                  {loading ? (
                    'Loading...'
                  ) : coursePrice === 0 ? (
                    'Loading Course Info...'
                  ) : (
                    `Buy Now - Rs. ${selectedPackageData?.currentPrice || calculateMonthlyPrice(3)}`
                  )}
                </motion.button>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-purple-800 text-center">
                  <strong>Note:</strong> All subscriptions include full access to course materials, 
                  assessments, and support for the selected duration.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        courseId={courseId}
        courseName={courseName}
        amount={selectedAmount}
        packageType={selectedPackage}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}
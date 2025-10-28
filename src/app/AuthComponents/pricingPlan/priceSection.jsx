'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaStar, FaCrown, FaRocket, FaGem } from 'react-icons/fa';
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
  index,
  icon: Icon
}) => {
  return (
    <motion.div
      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ease-out
        ${isSelected 
          ? 'bg-gradient-to-br from-[#7D287E] to-[#9D4B9E] text-white shadow-2xl shadow-purple-500/30' 
          : 'bg-white text-gray-800 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg'
        }
      `}
      onClick={onSelect}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Premium Badge */}
      {bestValue && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-[#7D287E] text-xs font-bold px-4 py-2 rounded-full uppercase shadow-lg"
        >
          <FaCrown className="inline mr-1" />
          Most Popular
        </motion.div>
      )}

      {/* Package Icon */}
      <motion.div
        className={`flex justify-center mb-4 ${isSelected ? 'text-white' : 'text-[#7D287E]'}`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={32} />
      </motion.div>

      {/* Package Content */}
      <div className="text-center">
        <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
          {duration}
        </h3>
        
        <div className="mb-4">
          {originalPrice && originalPrice > currentPrice && (
            <motion.p 
              className={`text-sm ${isSelected ? 'text-purple-200' : 'text-gray-500'} line-through`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Rs. {originalPrice}
            </motion.p>
          )}
          <motion.p 
            className={`text-3xl font-bold ${isSelected ? 'text-white' : 'text-[#7D287E]'}`}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Rs. {currentPrice}
          </motion.p>
          {saveText && (
            <motion.p 
              className={`text-sm font-semibold mt-1 ${isSelected ? 'text-yellow-300' : 'text-blue-500'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {saveText}
            </motion.p>
          )}
        </div>

        {/* Validity */}
        <p className={`text-sm ${isSelected ? 'text-purple-200' : 'text-gray-600'} mb-4`}>
          Valid till {validity}
        </p>

        {/* Selection Indicator */}
        <motion.div
          className={`flex items-center justify-center ${
            isSelected ? 'text-white' : 'text-gray-400'
          }`}
          animate={{ scale: isSelected ? 1.1 : 1 }}
        >
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2
              ${isSelected ? 'bg-white border-white text-[#7D287E]' : 'border-gray-400'}
            `}
          >
            {isSelected && <FaCheckCircle className="text-[#7D287E] text-xs" />}
          </div>
          <span className="text-sm font-medium">
            {isSelected ? 'Selected' : 'Select Plan'}
          </span>
        </motion.div>
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
      duration: '1 Month',
      validity: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalPrice: calculateMonthlyPrice(1),
      currentPrice: calculateMonthlyPrice(1),
      saveText: null,
      icon: FaStar
    },
    {
      id: '3_month',
      duration: '3 Months',
      validity: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalPrice: calculateMonthlyPrice(3),
      currentPrice: calculateMonthlyPrice(3),
      saveText: 'Good Deal',
      icon: FaRocket
    },
    {
      id: '6_month',
      duration: '6 Months',
      validity: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalPrice: calculateMonthlyPrice(6),
      currentPrice: calculateMonthlyPrice(6),
      saveText: 'Best Value',
      bestValue: true,
      icon: FaCrown
    },
    {
      id: '1_year',
      duration: '1 Year',
      validity: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      originalPrice: calculateMonthlyPrice(12),
      currentPrice: calculateMonthlyPrice(12),
      saveText: 'Ultimate Savings',
      icon: FaGem
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
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background Decorative Elements */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="absolute -top-24 -right-24 w-48 h-48 bg-purple-300/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-24 -left-24 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </motion.div>

          {/* Pricing Plan Modal */}
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-purple-200"
            initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50, rotateX: -10 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.6
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={20} />
            </motion.button>

            {/* Content */}
            <div className="p-8">
              {/* Header Section */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7D287E] to-[#9D4B9E] bg-clip-text text-transparent mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Choose Your Plan
                </motion.h1>
                
                <motion.p
                  className="text-lg text-gray-600 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  For {courseName}
                </motion.p>

                {/* Course Price Info */}
                {coursePrice > 0 && (
                  <motion.div
                    className="inline-block bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 rounded-2xl border border-purple-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <p className="text-gray-700 font-semibold">
                      Full Course: <span className="text-[#7D287E]">Rs. {coursePrice}</span> for {courseDuration} months
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      (Rs. {Math.round(coursePrice / courseDuration)} per month)
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Packages Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
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
              </motion.div>

              {/* Action Section */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.button
                  whileHover={{ 
                    scale: isDisabled ? 1 : 1.05,
                    boxShadow: isDisabled ? 'none' : '0 20px 40px rgba(125, 40, 126, 0.3)'
                  }}
                  whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                  className="relative bg-gradient-to-r from-[#7D287E] to-[#9D4B9E] hover:from-[#6A216B] hover:to-[#8A3A8B] text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                  onClick={handleBuyNow}
                  disabled={isDisabled || loading}
                >
                  {/* Animated background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    initial={false}
                  />
                  
                  {loading ? (
                    'Loading...'
                  ) : coursePrice === 0 ? (
                    'Loading Course Info...'
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center justify-center">
                        Get Started - Rs. {selectedPackageData?.currentPrice || calculateMonthlyPrice(3)}
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </>
                  )}
                </motion.button>

                {/* Additional Info */}
                <motion.div
                  className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-sm text-purple-800 text-center font-medium">
                    <span className="text-[#7D287E] font-bold">✨ All Access Included:</span> Full course materials, 
                    assessments, certificate, and premium support for your selected duration.
                  </p>
                </motion.div>
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
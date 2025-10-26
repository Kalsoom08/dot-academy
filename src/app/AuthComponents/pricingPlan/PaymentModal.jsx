'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUpload, FaCheck, FaMoneyBillWave, FaUniversity, FaCopy, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { submitPayment, getCoursePaymentInfo } from '../../../../slices/paymentSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '@/components/LoadingSpinner';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  courseId, 
  courseName, 
  amount,
  onPaymentSuccess,
  onEnrollmentSuccess 
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading: paymentLoading, paymentInfo } = useSelector((state) => state.payment);
  
  const [selectedMethod, setSelectedMethod] = useState('easypaisa');
  const [screenshot, setScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [formData, setFormData] = useState({
    amount: amount || 0,
    paymentMethod: 'easypaisa',
    // EasyPaisa fields
    easypaisaNumber: '',
    transactionId: '',
    // Bank transfer fields
    bankName: '',
    accountNumber: '',
    accountTitle: '',
    transactionReference: '',
    transferDate: ''
  });

  // Fetch course payment info when modal opens
  useEffect(() => {
    if (isOpen && courseId) {
      dispatch(getCoursePaymentInfo(courseId));
      resetForm();
    }
  }, [isOpen, courseId, amount, dispatch]);

  const resetForm = () => {
    setFormData({
      amount: amount || 0,
      paymentMethod: 'easypaisa',
      easypaisaNumber: '',
      transactionId: '',
      bankName: '',
      accountNumber: '',
      accountTitle: '',
      transactionReference: '',
      transferDate: ''
    });
    setScreenshot(null);
    setPreviewUrl('');
    setCopiedField('');
    setSelectedMethod('easypaisa');
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied to clipboard!`, {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, WebP, GIF, AVIF)', {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size should be less than 10MB', {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }

      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
      
      toast.success('Screenshot uploaded successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
    
    if (method === 'easypaisa') {
      toast.info('EasyPaisa Instructions: Send payment and upload transaction screenshot', {
        position: "top-right",
        autoClose: 4000,
      });
    } else {
      toast.info('Bank Transfer Instructions: Transfer to bank account and upload transaction proof', {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  const validateForm = () => {
    if (!screenshot) {
      toast.error('Please upload payment screenshot', {
        position: "top-right",
        autoClose: 5000,
      });
      return false;
    }

    if (selectedMethod === 'easypaisa') {
      if (!formData.easypaisaNumber.trim()) {
        toast.error('Please enter your EasyPaisa number', {
          position: "top-right",
          autoClose: 5000,
        });
        return false;
      }
      if (!formData.transactionId.trim()) {
        toast.error('Please enter transaction ID', {
          position: "top-right",
          autoClose: 5000,
        });
        return false;
      }
    } else if (selectedMethod === 'bank-transfer') {
      if (!formData.bankName.trim()) {
        toast.error('Please enter bank name', {
          position: "top-right",
          autoClose: 5000,
        });
        return false;
      }
      if (!formData.accountNumber.trim()) {
        toast.error('Please enter account number', {
          position: "top-right",
          autoClose: 5000,
        });
        return false;
      }
      if (!formData.accountTitle.trim()) {
        toast.error('Please enter account title', {
          position: "top-right",
          autoClose: 5000,
        });
        return false;
      }
      if (!formData.transactionReference.trim()) {
        toast.error('Please enter transaction reference', {
          position: "top-right",
          autoClose: 5000,
        });
        return false;
      }
      if (!formData.transferDate) {
        toast.error('Please select transfer date', {
          position: "top-right",
          autoClose: 5000,
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const submissionData = new FormData();
      submissionData.append('amount', formData.amount);
      submissionData.append('paymentMethod', formData.paymentMethod);
      
      if (formData.paymentMethod === 'easypaisa') {
        submissionData.append('easypaisaNumber', formData.easypaisaNumber);
        submissionData.append('transactionId', formData.transactionId);
      } else if (formData.paymentMethod === 'bank-transfer') {
        submissionData.append('bankName', formData.bankName);
        submissionData.append('accountNumber', formData.accountNumber);
        submissionData.append('accountTitle', formData.accountTitle);
        submissionData.append('transactionReference', formData.transactionReference);
        submissionData.append('transferDate', formData.transferDate);
      }
      
      submissionData.append('screenshot', screenshot);

      const loadingToast = toast.loading('Submitting payment proof...', {
        position: "top-right",
      });

      const result = await dispatch(submitPayment({ 
        courseId, 
        data: submissionData 
      })).unwrap();
      
      toast.dismiss(loadingToast);
      
      if (result.success) {
        toast.success('Payment proof submitted successfully! Our team will verify it within 24 hours.', {
          position: "top-right",
          autoClose: 6000,
        });
        
        toast.success(`${selectedMethod === 'easypaisa' ? 'EasyPaisa' : 'Bank Transfer'} payment submitted for verification!`, {
          position: "top-right",
          autoClose: 5000,
        });

        setTimeout(() => {
          toast.info('You will receive an email notification once your payment is approved.', {
            position: "top-right",
            autoClose: 6000,
          });
        }, 1000);

        resetForm();
        onPaymentSuccess();
      }
    } catch (error) {
      toast.dismiss();
      
      let errorMessage = 'Failed to submit payment proof';
      
      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      console.error('Payment submission error:', error);
      
      toast.error(`${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto border border-purple-100"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
              <h2 className="text-2xl font-bold text-purple-800">
                Complete Your Payment
              </h2>
              <motion.button
                onClick={handleClose}
                className="text-purple-500 hover:text-purple-700 transition-colors p-2 hover:bg-purple-50 rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={24} />
              </motion.button>
            </div>

            {/* Course Info */}
            <div className="p-6 border-b border-purple-100 bg-white">
              <h3 className="font-semibold text-gray-800 text-lg">{courseName}</h3>
              <p className="text-2xl font-bold text-purple-600 mt-2">Rs. {amount?.toLocaleString()}</p>
            </div>

            {/* Payment Method Selection */}
            <div className="p-6 border-b border-purple-100">
              <h3 className="font-semibold mb-4 text-gray-800 text-lg">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                {paymentInfo?.paymentMethods?.includes('easypaisa') && (
                  <motion.button
                    type="button"
                    onClick={() => handleMethodChange('easypaisa')}
                    className={`p-6 border-2 rounded-xl text-center transition-all duration-300 ${
                      selectedMethod === 'easypaisa'
                        ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                        : 'border-gray-300 text-gray-600 hover:border-purple-300 hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaMoneyBillWave className="mx-auto mb-3 text-3xl" />
                    <span className="font-semibold">EasyPaisa</span>
                    <p className="text-xs text-gray-500 mt-2">Instant Transfer</p>
                  </motion.button>
                )}
                
                {paymentInfo?.paymentMethods?.includes('bank-transfer') && (
                  <motion.button
                    type="button"
                    onClick={() => handleMethodChange('bank-transfer')}
                    className={`p-6 border-2 rounded-xl text-center transition-all duration-300 ${
                      selectedMethod === 'bank-transfer'
                        ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                        : 'border-gray-300 text-gray-600 hover:border-purple-300 hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaUniversity className="mx-auto mb-3 text-3xl" />
                    <span className="font-semibold">Bank Transfer</span>
                    <p className="text-xs text-gray-500 mt-2">Bank Account</p>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Payment Instructions */}
            {paymentInfo?.paymentInstructions && (
              <div className="p-4 bg-blue-50 border border-blue-200 mx-6 mt-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
                  <p className="text-sm text-blue-800">{paymentInfo.paymentInstructions}</p>
                </div>
              </div>
            )}

            {/* Payment Details */}
            {paymentInfo && (
              <div className="p-6 border-b border-purple-100 bg-purple-50">
                <h3 className="font-semibold mb-4 text-purple-800 text-lg">
                  {selectedMethod === 'easypaisa' ? 'EasyPaisa Payment Details' : 'Bank Account Details'}
                </h3>
                
                {selectedMethod === 'easypaisa' && paymentInfo.easypaisaDetails && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="p-4 bg-white rounded-lg border border-purple-200">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">EasyPaisa Number</p>
                            <p className="text-lg font-bold text-purple-700">{paymentInfo.easypaisaDetails.number}</p>
                          </div>
                          <motion.button
                            onClick={() => copyToClipboard(paymentInfo.easypaisaDetails.number, 'EasyPaisa Number')}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors ml-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copiedField === 'EasyPaisa Number' ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                          </motion.button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Account Title</p>
                            <p className="text-md font-semibold text-purple-700">{paymentInfo.easypaisaDetails.accountTitle}</p>
                          </div>
                          <motion.button
                            onClick={() => copyToClipboard(paymentInfo.easypaisaDetails.accountTitle, 'Account Title')}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors ml-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copiedField === 'Account Title' ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Instructions:</strong> Send payment of <strong>Rs. {amount?.toLocaleString()}</strong> to the EasyPaisa number above. After successful payment, upload the transaction screenshot and provide the transaction details below.
                      </p>
                    </div>
                  </motion.div>
                )}

                {selectedMethod === 'bank-transfer' && paymentInfo.bankAccounts && paymentInfo.bankAccounts.length > 0 && (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {paymentInfo.bankAccounts.map((account, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-700 mb-3">{account.bankName}</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">Account Title</p>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-purple-700 text-sm">{account.accountTitle}</p>
                              <motion.button
                                onClick={() => copyToClipboard(account.accountTitle, 'Account Title')}
                                className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {copiedField === 'Account Title' ? <FaCheckCircle className="text-green-500 text-sm" /> : <FaCopy className="text-sm" />}
                              </motion.button>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">Account Number</p>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-purple-700 text-sm">{account.accountNumber}</p>
                              <motion.button
                                onClick={() => copyToClipboard(account.accountNumber, 'Account Number')}
                                className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {copiedField === 'Account Number' ? <FaCheckCircle className="text-green-500 text-sm" /> : <FaCopy className="text-sm" />}
                              </motion.button>
                            </div>
                          </div>
                          
                          {account.iban && (
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-600">IBAN</p>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-purple-700 text-xs">{account.iban}</p>
                                <motion.button
                                  onClick={() => copyToClipboard(account.iban, 'IBAN')}
                                  className="p-1 text-purple-600 hover:bg-purple-100 rounded"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {copiedField === 'IBAN' ? <FaCheckCircle className="text-green-500 text-sm" /> : <FaCopy className="text-sm" />}
                                </motion.button>
                              </div>
                            </div>
                          )}
                          
                          {account.branchCode && (
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-600">Branch Code</p>
                              <p className="font-semibold text-purple-700 text-sm">{account.branchCode}</p>
                            </div>
                          )}
                          
                          {account.branchAddress && (
                            <div className="flex justify-between items-start">
                              <p className="text-sm text-gray-600">Branch Address</p>
                              <p className="font-semibold text-purple-700 text-sm text-right">{account.branchAddress}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Instructions:</strong> Transfer <strong>Rs. {amount?.toLocaleString()}</strong> to any of the above bank accounts. After successful transfer, upload the transaction proof and provide the transaction details below.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="font-semibold mb-4 text-gray-800 text-lg">Provide Payment Details</h3>

              {/* EasyPaisa Form */}
              {selectedMethod === 'easypaisa' && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your EasyPaisa Number *
                    </label>
                    <input
                      type="text"
                      name="easypaisaNumber"
                      value={formData.easypaisaNumber}
                      onChange={handleInputChange}
                      placeholder="Enter the EasyPaisa number you used for payment"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction ID *
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleInputChange}
                      placeholder="Enter transaction ID from EasyPaisa app/SMS"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Bank Transfer Form */}
              {selectedMethod === 'bank-transfer' && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Enter the bank name you transferred from"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Account Number *
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Your bank account number"
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Account Title *
                      </label>
                      <input
                        type="text"
                        name="accountTitle"
                        value={formData.accountTitle}
                        onChange={handleInputChange}
                        placeholder="Your bank account title"
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Reference Number *
                    </label>
                    <input
                      type="text"
                      name="transactionReference"
                      value={formData.transactionReference}
                      onChange={handleInputChange}
                      placeholder="Enter transaction reference number from bank slip"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transfer Date *
                    </label>
                    <input
                      type="date"
                      name="transferDate"
                      value={formData.transferDate}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Screenshot Upload */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Payment Proof Screenshot *
                </label>
                
                <motion.div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-300 bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="screenshot-upload"
                  />
                  
                  {!previewUrl ? (
                    <label htmlFor="screenshot-upload" className="cursor-pointer">
                      <FaUpload className="mx-auto text-gray-400 mb-3 text-4xl" />
                      <p className="text-lg text-gray-600 font-medium">
                        Click to upload payment screenshot
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Upload clear screenshot of transaction confirmation
                      </p>
                    </label>
                  ) : (
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <img
                        src={previewUrl}
                        alt="Payment screenshot preview"
                        className="mx-auto max-h-64 rounded-lg shadow-lg"
                      />
                      <motion.button
                        type="button"
                        onClick={() => {
                          setScreenshot(null);
                          setPreviewUrl('');
                        }}
                        className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTimes size={16} />
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Submit Buttons */}
              <div className="mt-8 flex gap-4">
                <motion.button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-4 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={paymentLoading}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg flex items-center justify-center gap-3"
                  whileHover={{ scale: paymentLoading ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {paymentLoading ? (
                    <>
                      <LoadingSpinner size="small" color="#ffffff" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      Submit Payment Proof
                    </>
                  )}
                </motion.button>
              </div>

              {/* Important Notice */}
              <motion.div
                className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-purple-800 text-center">
                  <strong>Important:</strong> After submitting payment proof, please wait for admin approval. 
                  This process usually takes 24-48 hours.
                </p>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
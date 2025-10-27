'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiDownload, 
  FiZoomIn, 
  FiZoomOut, 
  FiRotateCw, 
  FiMaximize,
  FiMinimize,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const PDFViewerPopup = ({ isVisible, onClose, lesson, courseId }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const pdfUrl = lesson?.pdfUrl;
  const lessonTitle = lesson?.title || 'PDF Document';

  if (!isVisible || !pdfUrl) return null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoomLevel(1);
    setRotation(0);
    setCurrentPage(1);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${lessonTitle}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`bg-white rounded-2xl shadow-2xl flex flex-col ${
              isFullscreen 
                ? 'w-full h-full max-h-full rounded-none' 
                : 'w-full max-w-6xl max-h-[90vh]'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#7c287d] to-[#9c3b9d] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">PDF</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold truncate max-w-md">{lessonTitle}</h2>
                  <p className="text-purple-100 text-sm">PDF Document</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Toolbar */}
                <div className="flex items-center gap-1 bg-purple-800/30 rounded-lg p-1">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.5}
                    className="p-2 rounded hover:bg-purple-700/50 transition-colors disabled:opacity-50"
                    title="Zoom Out"
                  >
                    <FiZoomOut className="w-4 h-4" />
                  </button>
                  
                  <span className="text-sm font-medium px-2 min-w-12 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                    className="p-2 rounded hover:bg-purple-700/50 transition-colors disabled:opacity-50"
                    title="Zoom In"
                  >
                    <FiZoomIn className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleRotate}
                    className="p-2 rounded hover:bg-purple-700/50 transition-colors"
                    title="Rotate"
                  >
                    <FiRotateCw className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="p-2 rounded hover:bg-purple-700/50 transition-colors"
                    title="Reset View"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <span className="text-xs font-bold">R</span>
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleDownload}
                  className="p-2 rounded hover:bg-purple-700/50 transition-colors"
                  title="Download PDF"
                >
                  <FiDownload className="w-4 h-4" />
                </button>

                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded hover:bg-purple-700/50 transition-colors"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <FiMinimize className="w-4 h-4" /> : <FiMaximize className="w-4 h-4" />}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded hover:bg-purple-700/50 transition-colors"
                  title="Close"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF Navigation */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded disabled:opacity-50 transition-colors"
                >
                  <FiChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <span className="text-sm text-gray-600">
                  Page <span className="font-semibold">{currentPage}</span>
                </span>
                
                <button
                  onClick={handleNextPage}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded transition-colors"
                >
                  Next
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-sm text-gray-500">
                PDF Viewer
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-auto bg-gray-100 p-4">
              <div className="flex justify-center items-start min-h-full">
                <motion.div
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                >
                  {/* PDF Embed */}
                  <iframe
                    src={`${pdfUrl}#view=fitH&page=${currentPage}`}
                    className="w-full h-[70vh] min-h-[500px] border-0"
                    title={lessonTitle}
                  />
                  
                  {/* Fallback for PDF display */}
                  <div className="p-4 text-center border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      Having trouble viewing the PDF? 
                    </p>
                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#7c287d] text-white rounded-lg hover:bg-[#6b1f6b] transition-colors text-sm"
                    >
                      <FiDownload className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{lessonTitle}</span>
                <span className="mx-2">•</span>
                <span>Page {currentPage}</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
                <span>Rotation: {rotation}°</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFViewerPopup;
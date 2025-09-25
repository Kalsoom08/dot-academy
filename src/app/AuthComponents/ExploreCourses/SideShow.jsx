'use client'
import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import course5 from '../../../../public/Courses/5.png'
import course from '../../../../public/Courses/4.png'
import { FiChevronRight } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses, fetchCourseDetails } from '../../../../slices/courseSlice'

// Fallback static data
const fallbackUpNext = [
  { id: undefined, image: course, title: "Noun & its Classifications (Part-2) - English Grammar", weight: 'Docs | 5 Pages', isFree: true },
  { id: undefined, image: course, title: "Worksheet: Noun & its classification", weight: 'Docs | 3 Pages', isFree: false },
]

// If your API returns relative image paths, set NEXT_PUBLIC_ASSETS_BASE_URL
const ASSETS_BASE = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || ''

function smallCaption(c) {
  if (c?.pages) return `Docs | ${c.pages} Pages`
  if (c?.duration) return `Duration | ${c.duration}`
  if (c?.level) return `Level | ${c.level}`
  return ''
}

function toAbsolute(url) {
  if (!url) return course5
  try { 
    new URL(url); 
    return url 
  } catch { /* relative */ }
  return ASSETS_BASE ? `${ASSETS_BASE.replace(/\/$/, '')}/${url.replace(/^\//, '')}` : url
}

function pickImageField(obj) {
  return obj?.image || obj?.thumbnail || obj?.imageUrl || obj?.thumbnailUrl || ''
}

function useUpNextCourses(all, currentCourseId) {
  return useMemo(() => {
    if (!Array.isArray(all) || all.length === 0) return fallbackUpNext
    const idx = currentCourseId ? all.findIndex((c) => c?._id === currentCourseId) : -1
    let picked = idx === -1 ? all.slice(0, 2) : [all[(idx + 1) % all.length], all[(idx + 2) % all.length]].filter(Boolean)
    if (picked.length < 2) return fallbackUpNext
    return picked.slice(0, 2).map((c) => ({
      id: c?._id,
      image: course,
      title: c?.name || c?.title || 'Untitled Course',
      weight: smallCaption(c) || 'Docs | N/A',
      isFree: (c?.priceType || '').toLowerCase() === 'free',
    }))
  }, [all, currentCourseId])
}

function SideShow({ currentCourseId }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const { courses = [], currentCourse, loading } = useSelector((s) => s.courses)

  // Fetch list (for Up Next)
  useEffect(() => {
    if (!courses || courses.length === 0) {
      dispatch(fetchCourses({ page: 1, limit: 12, sort: 'newest' }))
    }
  }, [dispatch, courses?.length])

  // Fetch current course details (for top card) - FIXED: Always fetch when currentCourseId changes
  useEffect(() => {
    if (currentCourseId) {
      dispatch(fetchCourseDetails(currentCourseId))
    }
  }, [dispatch, currentCourseId]) // Removed currentCourse?._id dependency

  const upNext = useUpNextCourses(courses, currentCourseId)

  // Get current course data - FIXED: Properly handle the current course
  const resolvedCurrentCourse = useMemo(() => {
    // If we have a fetched currentCourse and it matches the currentCourseId, use it
    if (currentCourse && currentCourse._id === currentCourseId) {
      return currentCourse
    }
    // Otherwise, try to find it in the courses list
    if (currentCourseId) {
      return courses.find((c) => c?._id === currentCourseId) || null
    }
    // If no currentCourseId, use the first course from the list
    return courses[0] || null
  }, [currentCourse, currentCourseId, courses])

  // Top card fields with proper fallbacks - FIXED
  const headerTitle = resolvedCurrentCourse?.name || resolvedCurrentCourse?.title || 'English Grammar Basic'
  
  // FIXED: Proper image handling
  const courseImage = pickImageField(resolvedCurrentCourse)
  const headerSrc = courseImage ? toAbsolute(courseImage) : course5
  
  const isFreeTop = (resolvedCurrentCourse?.priceType || '').toLowerCase() === 'free'
  const statusLabel = resolvedCurrentCourse ? (isFreeTop ? 'Free' : 'Premium') : null

  // FIXED: Calculate dynamic course stats
  const videosCount = resolvedCurrentCourse?.videos || resolvedCurrentCourse?.videoCount || resolvedCurrentCourse?.modules?.reduce((acc, module) => acc + (module.videos || 0), 0) || 20
  const docsCount = resolvedCurrentCourse?.documents || resolvedCurrentCourse?.docCount || resolvedCurrentCourse?.pages || resolvedCurrentCourse?.modules?.reduce((acc, module) => acc + (module.documents || 0), 0) || 138
  const testsCount = resolvedCurrentCourse?.tests || resolvedCurrentCourse?.testCount || resolvedCurrentCourse?.modules?.reduce((acc, module) => acc + (module.tests || 0), 0) || 18

  // FIXED: Proper redirect logic
  const handleGoToCourse = () => {
    if (!resolvedCurrentCourse) return
    
    if (isFreeTop) {
      router.push(`/AuthComponents/ExploreCourses/CourseDetail/${resolvedCurrentCourse._id}`)
    } else {
      router.push('/AuthComponents/pricingPlan')
    }
  }

  const handleUpNextClick = (id, isFree) => {
    if (!id) return
    if (isFree) {
      router.push(`/AuthComponents/ExploreCourses/CourseDetail/${id}`)
    } else {
      router.push('/AuthComponents/pricingPlan')
    }
  }

  const handlePricingPlanRedirect = () => router.push('/AuthComponents/pricingPlan')

  // Loading state
  if (loading && currentCourseId) {
    return (
      <div className="flex flex-col gap-6 p-6 lg:block hidden">
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="w-full h-40 bg-gray-200 rounded-md"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6 lg:block hidden">
      <div className="flex flex-col gap-3">
        {/* Dynamic Course Image - FIXED */}
        <div className="w-full h-40 relative rounded-md overflow-hidden">
          <Image 
            src={headerSrc} 
            alt={headerTitle}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to default image if dynamic image fails to load
              e.target.src = course5.src
            }}
          />
        </div>
        
        {/* Dynamic Course Title with Status - FIXED */}
        <h1 className="text-[18px] font-semibold flex items-center">
          {headerTitle}
          {statusLabel && (
            <span
              className={`ml-2 align-middle text-xs px-2 py-1 rounded ${
                isFreeTop ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
              }`}
            >
              {statusLabel}
            </span>
          )}
        </h1>

        {/* Dynamic Course Stats - FIXED */}
        <p className="text-gray-700 text-[12px]">
          {videosCount} videos | {docsCount} Docs | {testsCount} Tests
        </p>
        
        {/* Go to Course Button - FIXED */}
        <button
          className="border border-black text-black px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
          onClick={handleGoToCourse}
          disabled={!resolvedCurrentCourse}
        >
          Go to Course
        </button>
        
        {/* Pricing Plan Button */}
        <button
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          onClick={handlePricingPlanRedirect}
        >
          View Pricing Plans
        </button>
      </div>

      {/* Up Next Section */}
      <div className="flex flex-col gap-3 mt-4">
        <h2 className="text-[18px] font-bold">Up Next</h2>
        {upNext.map((item, index) => (
          <div
            key={index}
            className="border border-black p-4 rounded-md flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleUpNextClick(item.id, item.isFree)}
            role="button"
          >
            <div className="flex-1">
              <h3 className="text-[16px] font-bold">{item.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.isFree ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {item.isFree ? 'Free' : 'Premium'}
                </span>
                <p className="text-[12px] text-gray-600">{item.weight}</p>
              </div>
            </div>
            <FiChevronRight className="text-black text-xl" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideShow
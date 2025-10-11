export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import CourseVideoClient from './CourseVideo';

export default function CourseVideoPage() {
  return <CourseVideoClient />;
}

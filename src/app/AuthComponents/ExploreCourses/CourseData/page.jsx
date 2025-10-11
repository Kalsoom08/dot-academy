export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import CourseDataClient from './CourseData';

export default function CourseDataPage() {
  return <CourseDataClient />;
}

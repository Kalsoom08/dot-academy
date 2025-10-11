export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import WorkSheetDataClient from './WorkSheet';

export default function WorkSheetDataPage() {
  return <WorkSheetDataClient />;
}

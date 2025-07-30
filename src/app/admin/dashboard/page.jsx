import React from 'react'
import StatCard from './statCard';
import NewUser from './newUser';
import AllCourses from './allCourses';
import AllPurchases from './purchases';

const page = () => {
  return (
    <div>
      <StatCard/>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-6 items-center justify-center">
      <NewUser/>
      <AllCourses/>
      </div>
      <AllPurchases/>


    </div>
  )
}

export default page
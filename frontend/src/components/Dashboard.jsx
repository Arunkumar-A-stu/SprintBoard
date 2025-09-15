import { Car } from 'lucide-react'
import React from 'react'

export function Card( {data} ){
    return(
        <div className='flex flex-col gap-2 bg-gray-100 p-2 rounded shadow'>
          <h2>{data.title}</h2>
          <h2>{data.count}</h2>
        </div>
    )
}

  const data1 = {
    title:'total tasks',
    count:'4',
  }

    const data2 = {
    title:'total Project',
    count:'5'
  }

function Dashboard() {


  return (
    <>
    <div className='flex flex-col gap-4 w-full'>
      <h1>Dashboard</h1>
      <div className='flex gap-4'>
        <Card data={data1} />
        <Card data={data2} />
      </div>
      <div className='flex gap-4 h-full'>
        <div className='w-full bg-gray-200 items-center flex'>
          <h1>Pie</h1>
        </div>
        <div className='w-full bg-gray-200'>Graph</div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
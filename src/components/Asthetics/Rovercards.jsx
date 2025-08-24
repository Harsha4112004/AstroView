import React from 'react'
import { useNavigate } from 'react-router'

function Rovercards({title,nav,img}) {
    const navigate = useNavigate()
  return (
    <div className="card bg-base-100 w-96 shadow-sm hover:scale-105 transition-transform rounded-3xl">
  <figure>
    <img className='w-full h-64 object-cover'
      src={img}
      alt="Rovers" />
  </figure>
  <div className="card-body flex w-full flex-col h-fit items-center bg-[#1c1629]">
    <h2 className="card-title text-4xl mt-6 mb-6">{title}</h2>
    <div className="card-actions ">
      <button className="bg-[#9d85e6] font-bold text-black p-3 hover:bg-black hover:text-white rounded-4xl w-50 mb-8 " onClick={()=>{navigate(nav)}}>explore</button>
    </div>
  </div>
</div>
  )
}

export default Rovercards

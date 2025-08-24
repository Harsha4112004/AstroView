import React from 'react'

function Cards({ title, description, imageUrl }) {
  return (
    <div className="card bg-base-100 shadow-sm h-full flex flex-col rounded-3xl hover:scale-105 transition-transform">
      <figure>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </figure>
         <div className="card-body flex-grow flex flex-col justify-between bg-[#1c1629]">
          <h2 className="card-title mt-1 text-xl font-bold  p-2">{title}</h2>
          <p className='p-2 mb-2'>{description}</p>
        </div>
    </div>
  )
}

export default Cards

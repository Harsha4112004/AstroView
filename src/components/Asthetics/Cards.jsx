import React from 'react'

function Cards({ title, description, imageUrl }) {
  return (
    <div className="card bg-base-100 shadow-sm h-full flex flex-col rounded-3xl">
      <figure>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body flex-grow flex flex-col justify-between bg-[#1c1629]">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Cards

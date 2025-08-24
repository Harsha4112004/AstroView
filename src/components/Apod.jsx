import React, { useEffect } from 'react'

function Apod() {
  const [src, setSrc] = React.useState({});
  async function fetchApod() {
    await fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`)
      .then(response => response.json())
      .then(data => setSrc(data))
      .then(console.log("Data fetched successfully!"))
      .catch(error => console.error('Error fetching APOD:', error));
  }

  useEffect(() => {
    fetchApod();
  }, [])
   if (!src || !src.hdurl || !src.title || !src.explanation) {
        return <p className="flex w-full h-screen justify-center items-center font-bold text-4xl">Loading Info...</p>;
    }
  return (
    <div className='w-full h-full flex justify-center items-center text-gray-200 flex-col bg-transparent'>
      <div className='ml-10 mr-10 flex justify-center items-center text-gray-200 flex-col bg-transparent'>
        <h1 className='flex items-start w-full h-fit text-3xl m-4 mt-2 font-bold'>Astronomy Picture of the Day (APOD)</h1>
      <p className='text-l mb-15'>Every day, NASA shares a breathtaking image or photograph of our universe. It could be a planet, star, galaxy, or even a view of Earth from space. Each image comes with a short explanation written by professional astronomers to help us understand the beauty and science behind it.</p>

      <img src={src.hdurl} alt="apod" className='w-150' />
      <h1 className='font-bold mb-5 mt-2 text-xl'>{src.title}</h1>
      <h1 className='mt-5 text-xl font-bold w-full items-start'>About This Picture</h1>
      <p className='mt-5'>{src.explanation}</p>
      </div>
    </div>

  )
}

export default Apod
import React from 'react'
import Rovercards from '../Asthetics/Rovercards'

function Rover() {
  return (
    <div className='w-full h-full'>
      <h1 className='text-3xl ml-10 font-bold'>Mars Rovers</h1>
      <p className='ml-10 mr-10 mt-3'>For more than two decades, NASA has sent robotic explorers to Mars to unlock the secrets of the Red Planet. These rovers act like mobile laboratories, equipped with cameras, drills, and scientific instruments that allow them to study Mars up close. They search for evidence of ancient water, examine the planet’s geology, test the atmosphere, and look for clues about whether life might have ever existed there.
        From Spirit and Opportunity, which revealed Mars was once wetter than it is today, to Curiosity, which is still roaming Gale Crater to study ancient habitability, each rover has expanded our understanding of Mars in unique ways. Their discoveries are helping scientists prepare for the next big step — sending humans to explore the Martian surface.
      </p>
      <div className='flex flex-row items-center justify-center w-full h-full gap-10 mt-20 '>
        <Rovercards title={"CURIOSITY"} nav={"/mars_rover/curiosity"} img={"https://www.silicon.co.uk/wp-content/uploads/2013/04/Mars-curiosity-rover-NASA.jpg"} />
        <Rovercards title={"OPPORTUNITY"} nav={"/mars_rover/opportunity"} img={"https://i.extremetech.com/imagery/content-types/00tsAaPVjB55e08CLC2vqjr/hero-image.fill.size_1200x675.jpg"} />
        <Rovercards title={"SPIRIT"} nav={"/mars_rover/spirit"} img={"https://d2pn8kiwq2w21t.cloudfront.net/original_images/missionswebmer.jpg"} />
      </div>
    </div>
  )
}

export default Rover
```jsx
import React from 'react';
import Rovercards from '../Asthetics/Rovercards';

function Rover() {
  return (
    <div className="w-full h-full">
      <h1 className="text-3xl ml-10 font-bold">Mars Rovers</h1>

      <p className="ml-10 mr-10 mt-3">
        For more than two decades, NASA has sent robotic explorers to Mars to
        unlock the secrets of the Red Planet. These rovers act like mobile
        laboratories, equipped with cameras, drills, and scientific instruments
        that allow them to study Mars up close. They search for evidence of
        ancient water, examine the planet's geology, test the atmosphere, and
        look for clues about whether life might have ever existed there.

        From Spirit and Opportunity, which revealed Mars was once wetter than
        it is today, to Curiosity, which studies ancient habitability, each rover
        has expanded our understanding of Mars. Perseverance continues this
        mission by exploring Jezero Crater, searching for signs of ancient
        microbial life and collecting rock samples for possible future return
        to Earth.
      </p>

      <div className="flex flex-row flex-wrap items-center justify-center w-full gap-10 mt-20 mb-10 px-6">
        <Rovercards
          title="CURIOSITY"
          nav="/mars_rover/curiosity"
          img="https://www.silicon.co.uk/wp-content/uploads/2013/04/Mars-curiosity-rover-NASA.jpg"
        />

        <Rovercards
          title="PERSEVERANCE"
          nav="/mars_rover/perseverance"
          img="https://cdn.sanity.io/images/7p2whiua/production/eabd6f2fcaca421daca146f340493f9c1661f7e9-2048x1536.jpg"
        />

        <Rovercards
          title="OPPORTUNITY"
          nav="/mars_rover/opportunity"
          img="https://i.extremetech.com/imagery/content-types/00tsAaPVjB55e08CLC2vqjr/hero-image.fill.size_1200x675.jpg"
        />

        <Rovercards
          title="SPIRIT"
          nav="/mars_rover/spirit"
          img="https://d2pn8kiwq2w21t.cloudfront.net/original_images/missionswebmer.jpg"
        />

      </div>
    </div>
  );
}

export default Rover;
```

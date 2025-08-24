
import {PillNav} from '../Navbar'
function Header() {
  const logo = 'https://cdn-icons-png.flaticon.com/128/3049/3049498.png'
  return (
    <div className='flex w-full h-fit items-center justify-center mt-25'>
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Apod', href: '/apod' },
          { label: 'Earth', href: '/earth' },
          { label: 'Mars Rover', href: '/mars_rover' },
          { label: 'Asteroids', href: '/asteroid' },
          { label: 'Space Weather', href: '/space_weather' }
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#9d85e6"
        pillColor="#000000"
        hoveredPillTextColor="#000000"
        pillTextColor= "#ffffff"
      />
    </div>
  )
}

export default Header
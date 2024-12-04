import { Burger, Text, Popover } from '@mantine/core';
import PropTypes from 'prop-types';
import './components.css'

function Header({opened, toggle, points, streak, openPopover, setOpenPopover, pointsAdded, newsType, setPickingGamemode}) {

  return (
    <div className='headerContainer'>
        <Burger
        opened={opened}
        onClick={toggle}
        size="sm"
        />
        <Text fz={24} m="xs" onClick={() => setPickingGamemode(true)} className='websiteTitle'>Websites Through the Ages</Text>
        <div>
          <Text>Streak: {streak}</Text>
          <Popover 
            opened={openPopover} 
            onChange={setOpenPopover} 
            position="bottom"
            withArrow
            closeOnClickOutside={false}
            classNames={{dropdown: newsType, arrow: newsType}}
          >
            <Popover.Target>
                <Text>Points: {points}</Text>
              </Popover.Target>
              <Popover.Dropdown>{newsType === "goodNews" ? "+" + pointsAdded + " Points" : "Streak Reset :("}</Popover.Dropdown>
          </Popover>
        </div>
    </div>
  );
}

Header.propTypes = {
    opened: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    points: PropTypes.number.isRequired,
    streak: PropTypes.number.isRequired,
    openPopover: PropTypes.bool.isRequired,
    setOpenPopover: PropTypes.func.isRequired,
    pointsAdded: PropTypes.number.isRequired,
    newsType: PropTypes.string.isRequired,
    setPickingGamemode: PropTypes.func.isRequired,
}

export default Header;
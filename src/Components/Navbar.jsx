import { Button } from "@mantine/core";
import PropTypes from 'prop-types';

function Navbar({setPickingGamemode, setTitleText}) {

  return (
    <Button
        variant="gradient"
        gradient={{ from: 'blue', to: 'var(--mantine-color-teal-7)', deg: 135 }}
        onClick={() => {
            setPickingGamemode(true);
            setTitleText("Pick a mode!");
        }}
    >
        Restart
    </Button>
  );
}

Navbar.propTypes = {
    setPickingGamemode: PropTypes.func.isRequired,
    setTitleText: PropTypes.func.isRequired,
}

export default Navbar;
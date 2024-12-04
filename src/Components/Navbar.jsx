import { Button, Text } from "@mantine/core";
import PropTypes from 'prop-types';

function Navbar({setPickingGamemode, toggle}) {

  return (
    <>
      <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'var(--mantine-color-teal-7)', deg: 135 }}
          size="lg"
          onClick={() => {
              setPickingGamemode(true);
              toggle();
          }}
          className='gradientButton'
      >
          Restart
      </Button>
      <Text c="dimmed" fs="italic" size='lg' mt={20}>Made with &lt;3 by Rembi</Text>
    </>
  );
}

Navbar.propTypes = {
    setPickingGamemode: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
}

export default Navbar;
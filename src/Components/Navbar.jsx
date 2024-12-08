import { Button, Text } from "@mantine/core";
import PropTypes from 'prop-types';

function Navbar({setPickingGamemode, toggle, resetPoints}) {

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
          Home
      </Button>
      <Button
          variant="gradient"
          gradient={{ from: 'purple', to: 'pink', deg: 135 }}
          size="lg"
          onClick={() => {
              resetPoints();
          }}
          mt={20}
          className='gradientButton'
      >
          Reset Points
      </Button>
      <Text c="dimmed" fs="italic" size='lg' m={20}>Made with &lt;3 by Rembi<br />© 2024</Text>
      <Text c="dimmed" fs="italic" size='lg'>Sources used:<br />
          <a href="https://www.webdesignmuseum.org/all-websites" target="_blank">Gallery of Web Design History</a><br /><br />
          <a href="https://www.markhendriksen.com/the-best-old-websites/" target="_blank">50 Old Websites: A Nostalgic Journey from Our Digital Past</a><br /><br />
          <a href="https://dl.acm.org/doi/pdf/10.1145/3091478.3091503" target="_blank">A Deep Study into the History of
Web Design
</a><br />
      </Text>
    </>
  );
}

Navbar.propTypes = {
    setPickingGamemode: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    resetPoints: PropTypes.func.isRequired,
}

export default Navbar;
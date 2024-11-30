import { Modal, Image, Text } from "@mantine/core";
import PropTypes from 'prop-types';

function ImageInfo({src, opened, close}) {

  return (
    <Modal opened={opened} onClose={close} title="Image Info">
        <Text>This will have info soon!</Text>
    </Modal>
  );
}

ImageInfo.propTypes = {
    src: PropTypes.string.isRequired,
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default ImageInfo;
import { Modal, Image, Text } from "@mantine/core";
import PropTypes from 'prop-types';

function ImageInfo({src, brand, year, desc, opened, close}) {

  return (
    <Modal opened={opened} onClose={close } title={brand + " - " + year}>
        <a href={window.location.href + src.substring(2)} target="_blank">
        <Image
            radius="md"
            src={src}
            mah={400}
            mb={20}
            className={"limitedImage zoomImage"}
        />
        </a>
        <Text>{desc}</Text>
    </Modal>
  );
}

ImageInfo.propTypes = {
    src: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    opened: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
}

export default ImageInfo;
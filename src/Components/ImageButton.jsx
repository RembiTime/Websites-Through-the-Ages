import { UnstyledButton, Skeleton, Image } from '@mantine/core';
import PropTypes from 'prop-types';
import './components.css'

function ImageButton({buttonAction, buttonNum, imageLoaded, setImageLoaded, otherImageLoaded, src, imageState}) {

  return (
    <UnstyledButton
        onClick={() => buttonAction(buttonNum)}
        className='imageButton'
        w="100%"
    >
        <div className="overlayContainter">
            <div className="!!!!! So we're cheating now? !!!!!" />
            <Skeleton visible={!imageLoaded && !otherImageLoaded} mah={400} mih={200} w="100%" style={{"overflow": "hidden", "--image-radius": "var(--mantine-radius-md)"}} className={(imageState == 1 ? " correctImage" : "") + " " + (imageState == 2 ? " incorrectImage" : "")}>
                <Image
                    radius="md"
                    src={src}
                    onLoad={() => setImageLoaded(true)}
                    className={"limitedImage"}
                />
            </Skeleton>
            <div className={"!!!!! So we're cheating now? !!!!! overlay" + (imageState == 0 ? " hoverOverlay" : "") + (imageState == 1 ? " correctOverlay" : "") + " " + (imageState == 2 ? " incorrectOverlay" : "")} />
        </div>
    </UnstyledButton>
  );
}

ImageButton.propTypes = {
  buttonAction: PropTypes.func.isRequired,
  buttonNum: PropTypes.number.isRequired,
  imageLoaded: PropTypes.bool.isRequired,
  setImageLoaded: PropTypes.func.isRequired,
  otherImageLoaded: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  imageState: PropTypes.number.isRequired,
}

export default ImageButton;
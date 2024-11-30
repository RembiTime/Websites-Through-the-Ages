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
            <Skeleton visible={!imageLoaded && !otherImageLoaded} maw={500} mah={600} miw={300} mih={200} w="100%">
                <Image
                    radius="md"
                    src={src}
                    onLoad={() => setImageLoaded(true)}
                    maw={500}
                    mah={600}
                    className={"limitedImage" + (imageState == 1 ? " correctImage" : "") + " " + (imageState == 2 ? " incorrectImage" : "")}
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
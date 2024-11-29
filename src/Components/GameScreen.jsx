import {useState} from 'react';
import { Paper, SimpleGrid, Image, Title, Button, Skeleton, UnstyledButton } from '@mantine/core';
import { useMouse, useWindowScroll } from '@mantine/hooks';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';

import imagePaths from "../assets/image_paths.json"
import './components.css'

function GameScreen({pickingGamemode, setPickingGamemode, titleText, setTitleText}) {
    const [leftImageLoaded, setLeftImageLoaded] = useState(false);
    const [rightImageLoaded, setRightImageLoaded] = useState(false);
    const [leftImage, setLeftImage] = useState("");
    const [rightImage, setRightImage] = useState("");
    const [leftImageState, setLeftImageState] = useState(0); // 0 = playing, 1 = corrent, 2 = incorrect (same with below)
    const [rightImageState, setRightImageState] = useState(0); 
    const [enableImageHoverOverlay, setEnableImageHoverOverlay] = useState(true);
    const [confettiActive, setConfettiActive] = useState(false);
    const [gameResult, setGameResult] = useState(0); 

    const { x, y } = useMouse();
    const [scroll] = useWindowScroll();

    function selectMode(gamemode) {
        setLeftImageLoaded(false);
        setRightImageLoaded(false);
        setLeftImageState(0);
        setRightImageState(0);
        setGameResult(0);
        setEnableImageHoverOverlay(true);
        setPickingGamemode(false);
        setTitleText("Gamemode " + gamemode + ": Which is older?");

        let leftWebsite = Math.floor(Math.random() * imagePaths.length);
        let rightWebsite = leftWebsite;
        if (gamemode === 2) {
             while (leftWebsite === rightWebsite) {
                rightWebsite = Math.floor(Math.random() * imagePaths.length);
             }
        }
        
        let leftYear = Math.floor(Math.random() * imagePaths[leftWebsite]['children'].length);
        let rightYear = Math.floor(Math.random() * imagePaths[rightWebsite]['children'].length);
        while (imagePaths[leftWebsite]['children'][leftYear]['name'].slice(0, 4) === imagePaths[rightWebsite]['children'][rightYear]['name'].slice(0, 4)) {
            rightYear = Math.floor(Math.random() * imagePaths[rightWebsite]['children'].length);
        }

        setLeftImage("/images/" + imagePaths[leftWebsite]['name'] + "/" + imagePaths[leftWebsite]['children'][leftYear]['name']);
        setRightImage("/images/" + imagePaths[rightWebsite]['name'] + "/" + imagePaths[rightWebsite]['children'][rightYear]['name']);
    }

    function optionChosen(option) {
        if (gameResult === 0) {
            setEnableImageHoverOverlay(false);
            let leftYear = parseInt(leftImage.split("/")[3].substring(0, 4))
            let rightYear = parseInt(rightImage.split("/")[3].substring(0, 4))
            if (rightYear > leftYear && option === 1 || leftYear > rightYear && option === 2) {
                setGameResult(1);
                setTitleText("Correct! Now can you guess the year?")
                if (option === 1) {
                    setLeftImageState(1);
                    setRightImageState(2);
                } else {
                    setLeftImageState(2);
                    setRightImageState(1);
                }

                setConfettiActive(false);
                setTimeout(() => setConfettiActive(true), 0)
            } else {
                setGameResult(2);
                setTitleText("Nope! Try again!")
                if (option === 1) {
                    setLeftImageState(2);
                    setRightImageState(1);
                } else {
                    setLeftImageState(1);
                    setRightImageState(2);
                }
            }
        } else {
            // Open up info box
        }
    }

    function getNames(arr) { // Returns an array of strings with the name field of each object in an array of object
        const names = [];
        for (const obj of arr) {
            names.push(obj.name);
        }
        return names;
    }

  return (
    <Paper shadow="sm" radius="md" withBorder p="xl" pt="sm" m={40}>
        {confettiActive && <ConfettiExplosion 
            style={{position: "absolute", left: x + scroll.x, top: y + scroll.y}}
            onComplete={() => setConfettiActive(false)}
        />}
        <Title order={1} pb="md">
            {titleText}
        </Title>
        <SimpleGrid cols={2}>
            {pickingGamemode ?
            <>
                <Button
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'var(--mantine-color-teal-7)', deg: 135 }}
                    onClick={() => selectMode(1)}
                    size='xl'
                >
                    Same Website
                </Button>
                <Button
                    variant="gradient"
                    gradient={{ from: 'purple', to: 'pink', deg: 135 }}
                    onClick={() => selectMode(2)}
                    size='xl'
                >
                    Random
                </Button>
            </>
            : // else
            <>
                <UnstyledButton
                    onClick={() => optionChosen(1)}
                    className='imageButton'
                >
                    <div className="overlayContainter">
                        <div className="!!!!! So we're cheating now? !!!!!" />
                        <Skeleton visible={!leftImageLoaded && !rightImageLoaded} maw={500} mah={600} miw={300} mih={200}>
                            <Image
                                radius="md"
                                src={leftImage}
                                onLoad={() => setLeftImageLoaded(true)}
                                maw={500}
                                mah={600}
                                className={"limitedImage" + (leftImageState == 1 ? " correctImage" : "") + " " + (leftImageState == 2 ? " incorrectImage" : "")}
                            />
                        </Skeleton>
                        <div className={"!!!!! So we're cheating now? !!!!!  overlay" + (enableImageHoverOverlay ? " hoverOverlay" : "") + (leftImageState == 1 ? " correctOverlay" : "") + " " + (leftImageState == 2 ? " incorrectOverlay" : "")} />
                    </div>
                </UnstyledButton>
                <UnstyledButton
                    onClick={() => optionChosen(2)}
                    className='imageButton'
                >
                    <div className="overlayContainter">
                        <div className="!!!!! So we're cheating now? !!!!!" />
                        <Skeleton visible={!leftImageLoaded && !rightImageLoaded} maw={500} mah={600} miw={300} mih={200}>
                            <Image
                                radius="md"
                                src={rightImage}
                                onLoad={() => setRightImageLoaded(true)}
                                maw={500}
                                mah={600}
                                className={"limitedImage" + (rightImageState == 1 ? " correctImage" : "") + " " + (rightImageState == 2 ? " incorrectImage" : "")}
                            />
                        </Skeleton>
                        <div className={"!!!!! So we're cheating now? !!!!! overlay" + (enableImageHoverOverlay ? " hoverOverlay" : "") + (rightImageState == 1 ? " correctOverlay" : "") + " " + (rightImageState == 2 ? " incorrectOverlay" : "")} />
                    </div>
                </UnstyledButton>
            </>
            }
        </SimpleGrid>
    </Paper>
  );
}

GameScreen.propTypes = {
    pickingGamemode: PropTypes.bool.isRequired,
    setPickingGamemode: PropTypes.func.isRequired,
    titleText: PropTypes.string.isRequired,
    setTitleText: PropTypes.func.isRequired,
}

export default GameScreen;
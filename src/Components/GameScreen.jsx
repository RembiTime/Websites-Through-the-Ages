import { useState } from 'react';
import { Paper, SimpleGrid, Title, Button, Transition, Text } from '@mantine/core';
import { useMouse, useWindowScroll, useDisclosure } from '@mantine/hooks';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';
// import { useTransition } from '@react-spring/web'
import imagePaths from "../assets/image_paths.json"
import './components.css'
import YearGuesser from "./YearGuesser"
import ImageButton from "./ImageButton"
import ImageInfo from './ImageInfo';

function GameScreen({pickingGamemode, setPickingGamemode, titleText, setTitleText, points, updatePoints, notifyStreakReset, streak, setStreak}) {
    const [gamemode, setGamemode] = useState(0);
    const [leftImageLoaded, setLeftImageLoaded] = useState(false);
    const [rightImageLoaded, setRightImageLoaded] = useState(false);
    const [leftImage, setLeftImage] = useState("");
    const [rightImage, setRightImage] = useState("");
    const [leftYear, setLeftYear] = useState(0);
    const [rightYear, setRightYear] = useState(0);
    const [leftBrand, setLeftBrand] = useState("");
    const [rightBrand, setRightBrand] = useState("");
    const [leftDesc, setLeftDesc] = useState("");
    const [rightDesc, setRightDesc] = useState("");
    const [leftImageState, setLeftImageState] = useState(0); // 0 = playing, 1 = corrent, 2 = incorrect, 3 = done picking years/other (same with below)
    const [rightImageState, setRightImageState] = useState(0); 
    const [confettiActive, setConfettiActive] = useState(false);
    const [gameState, setGameState] = useState(0);
    const [leftInput, setLeftInput] = useState("");
    const [rightInput, setRightInput] = useState("");
    const [leftInfoOpened, { open: openLeftInfo, close: closeLeftInfo }] = useDisclosure(false);
    const [rightInfoOpened, { open: openRightInfo, close: closeRightInfo }] = useDisclosure(false);
    const [leftError, setLeftError] = useState("");
    const [rightError, setRightError] = useState("");
    const [leftResult, setLeftResult] = useState(""); // Can be 'perfectDate', 'goodDate', or 'badDate'
    const [rightResult, setRightResult] = useState("");

    const { x, y } = useMouse();
    const [scroll] = useWindowScroll();

    function selectMode(gamemode) {
        setGamemode(gamemode);
        setLeftImageState(0);
        setRightImageState(0);
        setGameState(0);
        setLeftInput("");
        setRightInput("");
        setLeftError("");
        setRightError("");
        setLeftResult("");
        setRightResult("");
        setPickingGamemode(false);
        let text = "Same Websites: "
        if (gamemode === 2) {
            text = "Different Websites: "
        }
        setTitleText(text + "Which is older?");

        let leftWebsite = Math.floor(Math.random() * imagePaths.length);
        let rightWebsite = leftWebsite;
        if (gamemode === 2) {
             while (leftWebsite === rightWebsite) {
                rightWebsite = Math.floor(Math.random() * imagePaths.length);
             }
        }
        
        let leftYear = Math.floor(Math.random() * imagePaths[leftWebsite]['children'].length);
        let rightYear = Math.floor(Math.random() * imagePaths[rightWebsite]['children'].length);
        while (imagePaths[leftWebsite]['children'][leftYear]['year'] === imagePaths[rightWebsite]['children'][rightYear]['year']) {
            rightYear = Math.floor(Math.random() * imagePaths[rightWebsite]['children'].length);
        }

        setLeftImageLoaded(false);
        setRightImageLoaded(false);
        setLeftImage("./images/" + imagePaths[leftWebsite]['children'][leftYear]['image']);
        setRightImage("./images/" + imagePaths[rightWebsite]['children'][rightYear]['image']);
        setLeftYear(imagePaths[leftWebsite]['children'][leftYear]['year']);
        setRightYear(imagePaths[rightWebsite]['children'][rightYear]['year']);
        setLeftBrand(imagePaths[leftWebsite]['name']);
        setRightBrand(imagePaths[rightWebsite]['name']);
        setLeftDesc(imagePaths[leftWebsite]['children'][leftYear]['desc']);
        setRightDesc(imagePaths[rightWebsite]['children'][rightYear]['desc']);
    }

    function optionChosen(option) {
        if (gameState === 0) {
            if (rightYear > leftYear && option === 1 || leftYear > rightYear && option === 2) {
                setGameState(1);
                setTitleText("Correct! Now can you guess the year?");
                updatePoints(points + 100);
                setStreak(streak + 1);
                if (option === 1) {
                    setLeftImageState(1);
                    setRightImageState(3);
                } else {
                    setLeftImageState(3);
                    setRightImageState(1);
                }

                setConfettiActive(false);
                setTimeout(() => setConfettiActive(true), 0)
            } else {
                setGameState(2);
                setTitleText("Nope! Try again!");
                if (streak > 0) {
                    notifyStreakReset();
                }
                setStreak(0);
                if (option === 1) {
                    setLeftImageState(2);
                    setRightImageState(1);
                } else {
                    setLeftImageState(1);
                    setRightImageState(2);
                }
            }
        } else if (gameState !== 1) {
            if (option === 1) {
                openLeftInfo();
            } else {
                openRightInfo();
            }
        }
    }

    function submitYears() {
        if (leftInput === "" || rightInput === "") {
            if (leftInput === "") {
                setLeftError("You must input a year!");
            } 
            if (rightInput === "") {
                setRightError("You must input a year!");
            }
            return;
        }
        
        setGameState(3);
        let gainedPoints = 0;
        if (leftInput == leftYear) {
            setLeftResult("perfectDate");
            gainedPoints += 100;
        } else if (leftInput - 1 == leftYear || leftInput + 1 == leftYear) {
            setLeftResult("goodDate");
            gainedPoints += 50;
        } else {
            setLeftResult("badDate");
        }
        if (rightInput == rightYear) {
            setRightResult("perfectDate");
            gainedPoints += 100;
        } else if (rightInput - 1 == rightYear || rightInput + 1 == rightYear) {
            setRightResult("goodDate");
            gainedPoints += 50;
        } else {
            setRightResult("badDate");
        }

        if (gainedPoints >= 200) {
            setTitleText("Absolutely perfect!");
            setConfettiActive(false);
            setTimeout(() => setConfettiActive(true), 0)
        } else if (gainedPoints >= 150) {
            setTitleText("So close!");
        } else if (gainedPoints >= 50) {
            setTitleText("Nice!");
        } else {
            setTitleText("A for Effort");
        }
        if (gainedPoints > 0) {
            updatePoints(points + gainedPoints);
        }
    }

    // function getNames(arr) { // Returns an array of strings with the name field of each object in an array of object
    //     const names = [];
    //     for (const obj of arr) {
    //         names.push(obj.name);
    //     }
    //     return names;
    // }

  return (
    <Paper shadow="sm" radius="md" withBorder p="xl" pt="sm" m="40px auto" style={{width: "fit-content"}}>
        {confettiActive && <ConfettiExplosion 
            style={{position: "absolute", left: x + scroll.x, top: y + scroll.y}}
            onComplete={() => setConfettiActive(false)}
        />}
        <Title order={1} pb="md">
            {titleText}
        </Title>
        <SimpleGrid cols={2}>
            {/* While picking gamemode: */}
            <Transition mounted={pickingGamemode} transition={'fade-down'} enterDelay={250}>
                {(transitionStyle) => (
                    <div style={transitionStyle}>
                        <Button
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'var(--mantine-color-teal-7)', deg: 135 }}
                            onClick={() => selectMode(1)}
                            size='xl'
                            className='gradientButton'
                            fullWidth
                        >
                            Same Website
                        </Button>
                    </div>
                )}
            </Transition>
            <Transition mounted={pickingGamemode} transition={'fade-down'} enterDelay={250}>
                {(transitionStyle) => (
                    <div style={transitionStyle}>
                        <Button
                            variant="gradient"
                            gradient={{ from: 'purple', to: 'pink', deg: 135 }}
                            onClick={() => selectMode(2)}
                            size='xl'
                            className='gradientButton'
                            fullWidth

                        >
                            Different Websites
                        </Button>
                    </div>
                )}
            </Transition>

            {/* While playing the game: */}
            <Transition mounted={!pickingGamemode} transition={'fade-down'} enterDelay={250}>
                {(transitionStyle) => (
                    <div style={transitionStyle}>
                        <ImageButton buttonAction={optionChosen} buttonNum={1} imageLoaded={leftImageLoaded} setImageLoaded={setLeftImageLoaded} otherImageLoaded={rightImageLoaded} src={leftImage} imageState={leftImageState} />
                        <Transition mounted={gameState === 3} transition={'fade-down'}>
                            {(transitionStyle) => (
                                <Title order={2} pb="sm" style={transitionStyle}>Actual: {leftYear}</Title>
                            )}
                        </Transition>
                        <Transition mounted={gameState === 1 || gameState === 3} transition={'fade-down'} exitDuration={0}>
                            {(transitionStyle) => (
                                <div style={transitionStyle}>
                                    <YearGuesser value={leftInput} setValue={setLeftInput} error={leftError} setError={setLeftError} result={leftResult} />
                                </div>
                            )}
                        </Transition>
                    </div>
                )}
            </Transition>
            <Transition mounted={!pickingGamemode} transition={'fade-down'} enterDelay={250}>
                {(transitionStyle) => (
                    <div style={transitionStyle}>
                        <ImageButton buttonAction={optionChosen} buttonNum={2} imageLoaded={rightImageLoaded} setImageLoaded={setRightImageLoaded} otherImageLoaded={leftImageLoaded} src={rightImage} imageState={rightImageState} />
                        <Transition mounted={gameState === 3} transition={'fade-down'}>
                            {(transitionStyle) => (
                                <Title order={2} pb="sm" style={transitionStyle}>Actual: {rightYear}</Title>
                            )}
                        </Transition>
                        <Transition mounted={gameState === 1 || gameState === 3} transition={'fade-down'} exitDuration={0}>
                            {(transitionStyle) => (
                                <div style={transitionStyle}>
                                    <YearGuesser value={rightInput} setValue={setRightInput} error={rightError} setError={setRightError} result={rightResult} />
                                </div>
                            )}
                        </Transition>
                    </div>
                )}
            </Transition>
        </SimpleGrid>
        
        <Transition mounted={gameState === 1 && !pickingGamemode} transition={'fade-down'}> 
            {(transitionStyle) => (
                <Button
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'var(--mantine-color-teal-7)', deg: 135 }}
                    size="lg"
                    style={transitionStyle}
                    mt={10}
                    onClick={() => submitYears()}
                    className='gradientButton'
                >Submit Years</Button>
            )}
        </Transition>

        <Transition mounted={gameState >= 2 && !pickingGamemode} transition={'fade-down'} enterDelay={250}> 
            {(transitionStyle) => (
                <div style={transitionStyle}>
                    <Button
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'var(--mantine-color-teal-7)', deg: 135 }}
                        size="lg"
                        m={10}
                        onClick={() => selectMode(gamemode)}
                        className='gradientButton'
                    >Play Again?</Button>
                    <Text c="dimmed" fs="italic" size='lg'>You can learn more about a website by clicking on it!</Text>
                </div>
            )}
        </Transition>
        
        {/* Popup Modals: */}
        <ImageInfo src={leftImage} brand={leftBrand} year={leftYear} desc={leftDesc} opened={leftInfoOpened} close={closeLeftInfo}/>
        <ImageInfo src={rightImage} brand={rightBrand} year={rightYear} desc={rightDesc} opened={rightInfoOpened} close={closeRightInfo}/>
    </Paper>
  );
}

GameScreen.propTypes = {
    pickingGamemode: PropTypes.bool.isRequired,
    setPickingGamemode: PropTypes.func.isRequired,
    titleText: PropTypes.string.isRequired,
    setTitleText: PropTypes.func.isRequired,
    points: PropTypes.number.isRequired,
    updatePoints: PropTypes.func.isRequired,
    notifyStreakReset: PropTypes.func.isRequired,
    streak: PropTypes.number.isRequired,
    setStreak: PropTypes.func.isRequired,
}

export default GameScreen;
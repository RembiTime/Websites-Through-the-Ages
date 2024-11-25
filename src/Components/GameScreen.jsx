import {useState} from 'react';
import { Paper, SimpleGrid, Image, Title, Button } from '@mantine/core';
import PropTypes from 'prop-types';

function GameScreen({pickingGamemode, setPickingGamemode, titleText, setTitleText}) {
    const [gamemode, setGamemode] = useState(0);

    function selectMode(gamemode) {
        setPickingGamemode(false);
        setGamemode(gamemode);
        setTitleText("This is where the gamemode " + gamemode + " would happen!")
    }

  return (
    <Paper shadow="sm" radius="md" withBorder p="xl" pt="sm" m="xl">
        <Title order={2} pb="sm">
            {titleText}
        </Title>
        <SimpleGrid cols={2}>
            {pickingGamemode ?
            <>
                <Button
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'var(--mantine-color-teal-7)', deg: 135 }}
                    onClick={() => selectMode(1)}
                >
                    ButtonLeft
                </Button>
                <Button
                    variant="gradient"
                    gradient={{ from: 'purple', to: 'pink', deg: 135 }}
                    onClick={() => selectMode(2)}
                >
                    ButtonRight
                </Button>
            </>
            : // else
            <>
                <div>
                    <Image
                        radius="md"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                    />
                </div>
                <div>
                    <Image
                        radius="md"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                    />
                </div>
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
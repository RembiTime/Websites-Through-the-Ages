import {useState} from 'react';
import { Paper, SimpleGrid, Image, Title, Button } from '@mantine/core';

function MainPage() {
    const [titleText, setTitleText] = useState("Pick an image!");
    const [pickingGamemode, setPickingGamemode] = useState(true);

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
                    gradient={{ from: 'blue', to: 'var(--mantine-color-teal-7)', deg: 90 }}
                >
                    ButtonLeft
                </Button>
                <Button
                    variant="gradient"
                    gradient={{ from: 'purple', to: 'pink', deg: 90 }}
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

export default MainPage;
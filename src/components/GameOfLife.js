import React from 'react';
import Photo from './img/Heart2.png'
import Overlay from './Overlay';

const GameOfLife = () => {
    return (
        <Overlay
            overlayId="GameOfLife"
            photo={Photo}
            liveProjLink={"https://conway-game-of-life.now.sh/"}
            sourceCodeLink={"https://github.com/prudentj/conway_game_of_life"}
            title={"Game Of Life"}
            description={<>Conway's Game of Life, a simulation made of very simple rules, exemplifies how very complex systems emerge from simple rule sets. <br /> <br/> Built for a Lambda School Computer Science build week, this project allowed me to practice writing a simple algorithm to meet an end goal. This is a desktop only application. </>}
            techs={<><strong>React</strong>&nbsp; · &nbsp;<strong>Styled Components</strong>&nbsp;</>}
        />
    )
}
export default GameOfLife
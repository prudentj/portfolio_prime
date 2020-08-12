import React from 'react';
import Photo from './img/zebra.jpg'
import Overlay from './Overlay';

const Market = () => {
    return (
        <Overlay
            overlayId="Market"
            photo={Photo}
            liveProjLink={"https://front-end-mu.now.sh/"}
            sourceCodeLink={"https://github.com/African-Market-Place-2/front-end"}
            title={"Africa Connected"}
            description={<> African Connected was a Lambda School build week project, where a team of developers in different stages of their Lambda School Education were tasked to build an application<br /><br />I served as the senior React developer on this application, in charge of state, API calls, and assisting the junior developer. It was my first chance of trying third party components, which I thoroughly enjoyed.</>}
            techs={<><strong>React</strong>&nbsp; · &nbsp;<strong>Context State Management</strong>&nbsp; · &nbsp;<strong>MaterialUI</strong></>}
        />
    )
}
export default Market

import React from 'react';
import Photo from './img/TechSortingHat.png'
import Overlay from './Overlay';
const SortingHat = () => {
    return (
        <Overlay
            overlayId="SortingHat"
            photo={Photo}
            photoAltText="Screenshot of our Sorting hat application in mobile"
            liveProjLink={"https://sorting-hat-eyub1vwuy-jakeprudent1.vercel.app"}
            sourceCodeLink={"https://github.com/Lambda-School-Labs/sorting-hat-fe"}
            title={"Sorting Hat"}
            description={<> Tech Sorting Hat is a questionnaire application for suggesting possible
                technology fields that the user might find interesting. < br /> <br />
Following an agile product cycle, over four weeks our team met all the objectives set out by our stakeholders.
Our team was comprised of several full stack engineers and  UX designers.
Serving primarily the teams primary frontend engineer, I assisted in the pixel perfect implementation of our UX Designer's vision.
I using responsive techniques I saw that the sight looked excellent on all screen sizes</>}
            techs={<> <strong>React</strong>&nbsp; · &nbsp; <strong>Redux</strong> &nbsp; · &nbsp; <strong>Express</strong> + <strong>Knex</strong> &nbsp; · &nbsp; <strong>NodeJS</strong> + <strong>Postgres</strong> &nbsp; · &nbsp; <strong>Jest</strong> &nbsp; · &nbsp; <strong>Cypress</strong> &nbsp; · &nbsp; <strong>Tailwind.css</strong> &nbsp; · &nbsp; <strong>AWS Amplify</strong></>}
        />
    )
}
export default SortingHat

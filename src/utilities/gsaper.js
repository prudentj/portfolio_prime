import { TweenMax, Power1 } from 'gsap'

//takes state and an image ref and makes the element go from hidden to visible

function gsaper(state, imageRef) {
    if (state) {
        TweenMax.to(imageRef, 0.8, {
            opacity: 1,
            ease: Power1.easeOut,
        });
    }
}
export default gsaper;
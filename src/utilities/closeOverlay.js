// Function that takes the element ID on the page and hides it setting width to zero

const closeOverlay = (elIdString) => {
    document.getElementById(elIdString).style.width = "0%";
    document.body.className = "overflow-x-hidden overflow-y-scroll";
}

export default closeOverlay;
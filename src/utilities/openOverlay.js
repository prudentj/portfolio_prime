// Function that takes the element ID on the page and hides it setting width to zero

function openOverlay(elIdString) {
    document.getElementById(elIdString).style.width = "100%";
    document.body.className = "overflow-hidden";
}

export default openOverlay;
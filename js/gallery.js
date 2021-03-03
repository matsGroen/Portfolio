const   viewPort = document.querySelector('.view-port'),
images = document.querySelector('.images-container'),
cardWidth = parseFloat(getComputedStyle(images.children[0]).width),
numberOfCardsByIndex = images.children.length - 1,
middleCardByIndex = Math.floor(numberOfCardsByIndex / 2),
navButtonsContainer = document.querySelector('.nav-buttons-container'),
buttonPrev = document.querySelector('#prev'),
buttonNext = document.querySelector('#next'),
selectionButtonsContainer = document.querySelector('.selection-buttons-container');
let     currentCard = middleCardByIndex;

for (let i = 0; i < images.children.length; i++){
    selectionButtonsContainer.innerHTML += `<div class="selection-button"></div>`;
}

// updateSelection();

/************ RESPONSIVE CODE *****************/
let     newWidth = 0.0,
imgWidthAsPercentage = 50,
navButtonsPlacementAsPercentage = 60;
imgWidthAsPercentage = window.innerWidth < 768 ? 100 : imgWidthAsPercentage;
navButtonsPlacementAsPercentage = window.innerWidth < 768 ? 100 : navButtonsPlacementAsPercentage;

newWidth =
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
(imgWidthAsPercentage / 100) * window.screen.width :
(imgWidthAsPercentage / 100) * window.innerWidth;

viewPort.style.width = `${newWidth}px`;
buttonPrev.style.width = `${(newWidth / 2) * 0.30}px`;
buttonNext.style.width = `${(newWidth / 2) * 0.30}px`;
navButtonsContainer.style.width = `${navButtonsPlacementAsPercentage}vw`;

selectionButtonsContainer.style.width = `${newWidth / 2}px`;
for (let i = 0; i < images.children.length; i++){
    selectionButtonsContainer.children[i].style.transitionDuration = '0.0s';
    selectionButtonsContainer.children[i].style.width = `${newWidth * 0.03}px`;
    selectionButtonsContainer.children[i].style.height = `${newWidth * 0.03}px`;
}

window.addEventListener('resize', () => {
imgWidthAsPercentage = 50;
navButtonsPlacementAsPercentage = 60;
imgWidthAsPercentage = window.innerWidth < 768 ? 100 : imgWidthAsPercentage;
navButtonsPlacementAsPercentage = window.innerWidth < 768 ? 100 : navButtonsPlacementAsPercentage;

newWidth =
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ?
(imgWidthAsPercentage / 100) * window.screen.width :
(imgWidthAsPercentage / 100) * window.innerWidth;

viewPort.style.width = `${newWidth}px`;
buttonPrev.style.width = `${(newWidth / 2) * 0.30}px`;
buttonNext.style.width = `${(newWidth / 2) * 0.30}px`;
navButtonsContainer.style.width = `${navButtonsPlacementAsPercentage}vw`;
selectionButtonsContainer.style.bottom = window.screen.width < 400 ? '20%' :  0;

selectionButtonsContainer.style.width = `${newWidth / 2}px`;
for (let i = 0; i < images.children.length; i++){
selectionButtonsContainer.children[i].style.transitionDuration = '0.0s';
selectionButtonsContainer.children[i].style.width = `${newWidth * 0.03}px`;
selectionButtonsContainer.children[i].style.height = `${newWidth * 0.03}px`;
}
orderCards();

let rightBoundary = parseFloat(images.children[numberOfCardsByIndex].style.left) + newWidth,
    leftBoundary = parseFloat(images.children[0].style.left) - newWidth;

for (let i = 0; i < images.children.length; i++) {
    lastPosition[i] = parseFloat(images.children[i].style.left);
}
});
/**********************************************/
function updateSelection() {
for (let i = 0; i < images.children.length; i++){
i === currentCard ? 
    selectionButtonsContainer.children[i].style.backgroundColor = '#16e0bd' : 
    selectionButtonsContainer.children[i].style.backgroundColor = '#303030';
}
}
function handleBoundaries() {
    if (lastPosition[0] <= leftBoundary){
        const endOfDeck = lastPosition[numberOfCardsByIndex] + newWidth;
        images.children[0].style.left = `${endOfDeck}px`;
        lastPosition[0] = endOfDeck;
        images.appendChild(images.children[0], images.children[numberOfCardsByIndex]);
        lastPosition.splice(numberOfCardsByIndex, 0, lastPosition.shift());
    }
    if (lastPosition[numberOfCardsByIndex] >= rightBoundary) {
        const beginningOfDeck = lastPosition[0] - newWidth;
        images.children[numberOfCardsByIndex].style.left = `${beginningOfDeck}px`;
        lastPosition[numberOfCardsByIndex] = beginningOfDeck;
        images.insertBefore(images.children[numberOfCardsByIndex], images.children[0]);
        lastPosition.splice(0, 0, lastPosition.pop());
    }
}       

function orderCards(){
    let counterRight = 1,
    counterLeft = middleCardByIndex;
    for (let i = 0; i < images.children.length; i++) {
        images.children[i].style.transitionDuration = '0.0s';
        if (i < middleCardByIndex) {
            images.children[i].style.left = `-${(counterLeft * newWidth) - (newWidth / 2)}px`;
            counterLeft--;
        } else if (i > middleCardByIndex) {
            images.children[i].style.left = `${(counterRight * newWidth) + (newWidth / 2)}px`;
            counterRight++;
        } else {
            images.children[i].style.left =`${newWidth / 2}px`;
        }
    }
}

orderCards();

const lastPosition = [];
let rightBoundary = parseFloat(images.children[numberOfCardsByIndex].style.left) + newWidth;
leftBoundary = parseFloat(images.children[0].style.left) - newWidth;

for (let i = 0; i < images.children.length; i++){
    lastPosition.push(parseFloat(images.children[i].style.left));
}

/***************BUTTON NAV*************/
let scrollInProgress = false;

buttonNext.addEventListener('click', () => {
if (scrollInProgress) return;
scrollInProgress = true;
    for (let i = 0; i < images.children.length; i++){
        const updatedPosition = lastPosition[i] - newWidth;
        images.children[i].style.left = `${updatedPosition}px`
        lastPosition[i] = updatedPosition;
    }
    currentCard = (currentCard === numberOfCardsByIndex) ? 0 : ++currentCard;
    updateSelection();
    handleBoundaries();
    setTimeout(() => {
        scrollInProgress = false;
        startAutoplay();
    }, 200);
});
buttonPrev.addEventListener('click', () => {
    if (scrollInProgress) return;
    scrollInProgress = true;
    for (let i = 0; i < images.children.length; i++){
        const updatedPosition = lastPosition[i] + newWidth;
        images.children[i].style.left = `${updatedPosition}px`;
        lastPosition[i] = updatedPosition;
    }
    currentCard = (currentCard === 0) ? numberOfCardsByIndex : --currentCard;
    updateSelection();
    handleBoundaries();
    setTimeout(() => {
        scrollInProgress = false;
        startAutoplay();
    }, 200);
});
/**************************************/

/***************SELECTION NAV**********/
selectionButtonsContainer.addEventListener('click', event => {
    if (event.target === selectionButtonsContainer) return;
    let newCard = null;
    for (let i = 0; i < images.children.length; i++){
        if (event.target == selectionButtonsContainer.children[i]) newCard = i;
    }
    for (let i = 0; i < images.children.length; i++) {
        const updatedPosition = lastPosition[i] + ((currentCard - newCard) * newWidth);
        images.children[i].style.left = `${updatedPosition}px`;
        lastPosition[i] = updatedPosition;
    }
    for(let i = 0; i < Math.abs(currentCard - newCard); i++){
        handleBoundaries();
    }
    currentCard = newCard;
    updateSelection();
    startAutoplay();
});
/**************************************/

/***************AUTOPLAY***************/
let autoplayTimeoutId = null,
autoplayIntervalId= null;

function startAutoplay() {
clearTimeout(autoplayTimeoutId);
clearInterval(autoplayIntervalId);

autoplayTimeoutId = setTimeout(() => {
autoplayIntervalId = setInterval(() => {
    for (let i = 0; i < images.children.length; i++){
        const updatedPosition = lastPosition[i] - newWidth;
        images.children[i].style.left = `${updatedPosition}px`
        lastPosition[i] = updatedPosition;
    }
    currentCard = (currentCard === numberOfCardsByIndex) ? 0 : ++currentCard;
    handleBoundaries();
    updateSelection();
    setTimeout(() => {
        scrollInProgress = false;
    }, 200); 
}, 1100);
}, 1500);
}
/**************************************/

selectionButtonsContainer.children[0].click();
startAutoplay();
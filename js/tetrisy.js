document.addEventListener('DOMContentLoaded', () => {

    const startButton = document.querySelector('button');
    const gameGrid = document.querySelector('.game-grid');
    const displaySquares = document.querySelectorAll('.previous-grid div');
    let squares = Array.from(gameGrid.querySelectorAll('div'));
    const width = 10;
    const height = 20;
    let currentPosition = 4;
    let timerId;

    /**
     * 
     * @param {*} e 
     */
    function control(e) {
        if (e.KeyCode === 39) {
            moveRight();
        } else if (e.KeyCode === 38) {
            rotate();
        } else if (e.KeyCode === 37) {
            moveLeft();
        } else if (e.KeyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    //The Shapes
    const lShape = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 * 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zShape = [
        [0, width, width + 1, width * 2 + 1],
        [width, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tShape = [
        [0, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oShape = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iShape = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width + 3],
        [width, width + 1, width + 2, width + 3],
    ];

    const theShapes = [lShape, zShape, oShape, iShape];

    //random selector
    let random = Math.floor(Math.random() * theShapes.length);
    let currentRotation = 0;
    let currentShape = theShapes[random][currentRotation];

    /**
     * 
     */
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('block')
            //   squares[currentPosition + index].style.backgroundImage = colors[random]
        })
    }


    /**
     * 
     */
    function undraw() {
        current.forEach(index => (
            squares[currentPosition + index].classList.remove('block')
        ))
    }

    //move down shape
    function moveDown() {
        undraw()
        currentPosition = currentPosition += width;
        draw();
        freeze();
    }

    /**
     * 
     */
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) {
            currentPosition += 1;
        }
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition -= 1;
        }
        draw();
    }

    /**
     * 
     */
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) {
            currentPosition -= 1;
        }
        if (current.some(index => squares[currentPosition + index].classList.contains('block2'))) {
            currentPosition += 1;
        }
    }

    /**
     * 
     */
    function rotate() {
        undraw()
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theShapes[random][currentRotation];
        draw();
    }

    //display previous shapes
    const displayWidth = 4;
    const displayIndex = 0;
    let nextRandom = 0;

    const smallShapes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], //L shape
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // Z shape
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //T shape
        [0, 1, displayWidth, displayWidth + 1], //O shape
        [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth + 3] //I shape
    ]

    /**
     * 
     */
    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('block')
        })
        smallShapes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block')
        })
    }

    /**
     * 
     */
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('block3')
            || squares[currentPosition + index + width].classList.contains('block2'))) {
            current.forEach(index => squares[index + currentPosition].classList.add('block2'));

            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theShapes.length);
            current = theShapes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }

    startButton.addEventListener('click', () => {
        if (timerid) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theShapes.length);
            displayShape();
        }
    })


})
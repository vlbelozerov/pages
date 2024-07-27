const grid = document.getElementById('grid');
let roomPoints = [];
let isDrawingRoom = false;

grid.addEventListener('click', (e) => {
    if (isDrawingRoom) {
        let x = e.offsetX;
        let y = e.offsetY;
        addRoomPoint(x, y);
        roomPoints.push({ x, y });
        if (roomPoints.length === 4) {
            drawRoom();
            isDrawingRoom = false;
            roomPoints = [];
        }
    }
});

document.getElementById('addRoom').addEventListener('click', () => {
    isDrawingRoom = true;
    clearRoomPoints();
});

document.getElementById('addFurniture').addEventListener('click', () => {
    let newFurniture = document.createElement('div');
    newFurniture.classList.add('furniture');
    newFurniture.style.left = '50px';
    newFurniture.style.top = '50px';
    newFurniture.style.width = '100px';
    newFurniture.style.height = '50px';
    grid.appendChild(newFurniture);
});

function addRoomPoint(x, y) {
    let point = document.createElement('div');
    point.classList.add('room-point');
    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
    grid.appendChild(point);
}

function drawRoom() {
    for (let i = 0; i < roomPoints.length; i++) {
        let startX = roomPoints[i].x;
        let startY = roomPoints[i].y;
        let endX = roomPoints[(i + 1) % roomPoints.length].x;
        let endY = roomPoints[(i + 1) % roomPoints.length].y;
        
        let line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.backgroundColor = 'black';

        let deltaX = endX - startX;
        let deltaY = endY - startY;
        let length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        line.style.width = `${length}px`;
        line.style.height = '2px';
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${Math.atan2(deltaY, deltaX) * 180 / Math.PI}deg)`;

        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        grid.appendChild(line);
    }
}

function clearRoomPoints() {
    const points = document.querySelectorAll('.room-point');
    points.forEach(point => point.remove());
}

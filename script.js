const grid = document.getElementById('grid');
let roomPoints = [];
let isDrawingRoom = false;
let distanceLabel = null;

grid.addEventListener('click', (e) => {
    if (isDrawingRoom) {
        let { x, y } = getSnappedPosition(e.offsetX, e.offsetY);
        addRoomPoint(x, y);
        roomPoints.push({ x, y });
        if (roomPoints.length === 4) {
            drawRoom();
            isDrawingRoom = false;
            roomPoints = [];
            if (distanceLabel) distanceLabel.remove();
        }
    }
});

grid.addEventListener('mousemove', (e) => {
    if (isDrawingRoom && roomPoints.length > 0) {
        let { x, y } = getSnappedPosition(e.offsetX, e.offsetY);
        showDistance(roomPoints[roomPoints.length - 1], { x, y });
    }
});

document.getElementById('addRoom').addEventListener('click', () => {
    isDrawingRoom = true;
    clearRoomPoints();
    if (distanceLabel) distanceLabel.remove();
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

function getSnappedPosition(x, y) {
    let gridSize = 10; // размер клетки 10px, что соответствует 0.1 метра
    let snappedX = Math.round(x / gridSize) * gridSize;
    let snappedY = Math.round(y / gridSize) * gridSize;
    return { x: snappedX, y: snappedY };
}

function showDistance(startPoint, currentPoint) {
    let deltaX = Math.abs(currentPoint.x - startPoint.x);
    let deltaY = Math.abs(currentPoint.y - startPoint.y);
    let distance = 0;

    if (deltaX > deltaY) {
        distance = deltaX / 100; // Перевод в метры, 1 пиксель = 0.01 метра
    } else {
        distance = deltaY / 100; // Перевод в метры, 1 пиксель = 0.01 метра
    }

    distance = distance.toFixed(2); // Округление до двух знаков после запятой

    if (!distanceLabel) {
        distanceLabel = document.createElement('div');
        distanceLabel.style.position = 'absolute';
        distanceLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
        distanceLabel.style.padding = '2px 5px';
        distanceLabel.style.border = '1px solid #000';
        distanceLabel.style.borderRadius = '5px';
        grid.appendChild(distanceLabel);
    }
    distanceLabel.textContent = `${distance} м`;
    distanceLabel.style.left = `${currentPoint.x + 10}px`;
    distanceLabel.style.top = `${currentPoint.y + 10}px`;
}

function clearRoomPoints() {
    const points = document.querySelectorAll('.room-point');
    points.forEach(point => point.remove());
    if (distanceLabel) distanceLabel.remove();
}

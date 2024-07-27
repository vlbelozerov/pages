const grid = document.getElementById('grid');
let rooms = [];
let furniture = [];
let isDrawingRoom = false;

grid.addEventListener('click', (e) => {
    if (isDrawingRoom) {
        let x = e.offsetX;
        let y = e.offsetY;
        rooms.push({ x, y });
        if (rooms.length === 4) {
            drawRoom();
            isDrawingRoom = false;
            rooms = [];
        }
    }
});

document.getElementById('addRoom').addEventListener('click', () => {
    isDrawingRoom = true;
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

function drawRoom() {
    let room = document.createElement('div');
    room.classList.add('room');
    room.style.position = 'absolute';
    room.style.left = `${Math.min(...rooms.map(p => p.x))}px`;
    room.style.top = `${Math.min(...rooms.map(p => p.y))}px`;
    room.style.width = `${Math.max(...rooms.map(p => p.x)) - Math.min(...rooms.map(p => p.x))}px`;
    room.style.height = `${Math.max(...rooms.map(p => p.y)) - Math.min(...rooms.map(p => p.y))}px`;
    room.style.border = '2px solid black';
    grid.appendChild(room);
}

var socket = io();
let mousePad;
let keyboardInput ;

window.onload = () => {
    socket.on("connect", () => {
        console.log("Connected");
    });
    mousePad = document.querySelector(".mouse-pad");
    keyboardInput = document.getElementById("keyboard-input");
    mousePad.addEventListener("touchmove", sendMousePosition);
    mousePad.addEventListener("touchend", resetMousePosition);
};

/// mouse event
let lastMousePosition = null;
let delta = null ;

function sendMousePosition(event) {
    event.preventDefault();
    let x = event.touches[0].clientX;
    let y = event.touches[0].clientY;
    if (!lastMousePosition) {
        lastMousePosition = { x, y };
        return;
    }

    let deltaX = x - lastMousePosition.x;
    let deltaY = y - lastMousePosition.y;

    console.log(deltaX, deltaY);

    socket.emit("mousemove", {
        dx : deltaX,
        dy : deltaY
    });

    lastMousePosition = { x, y };
}

function resetMousePosition(){
    lastMousePosition = null ;
}

function sendClick(){
    socket.emit("click");
}

function sendRightClick(){
    socket.emit("rightclick");
}

function sendText(){
    if(keyboardInput.value!==""){
        socket.emit("keyboardType",keyboardInput.value)
        keyboardInput.value = "" ;
    }
}

function sendBackspace(){
    socket.emit("keyboardBackspace")
}
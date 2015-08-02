// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {
    enableGestures: true
};


var iter = 0;
var handy = "";

Leap.loop(controllerOptions, function(frame) {

    //Display Hand object data
    var handOutput = document.getElementById("hand");
    var handString = "";
    if (frame.hands.length > 0) {
        for (var i = 0; i < frame.hands.length; i++) {
            var hand = frame.hands[i];

            handy = hand.type;
        }
    } else {
        handString += "<h1>Virtual Space is empty.</h1>";
    }
    handOutput.innerHTML = handString;

    // Display Pointable (finger and tool) object data


    var pointableOutput = document.getElementById("main");
    var pointableString = "";

    if (frame.pointables.length > 0) {

        var fingerTypeMap = ["Thumb", "Index finger", "Middle finger", "Ring finger", "Pinky finger"];
        var boneTypeMap = ["Metacarpal", "Proximal phalanx", "Intermediate phalanx", "Distal phalanx"];
        document.body.style.backgroundColor = "gray";
        pointableString += "<h1 class='text-center'>Your LeapMotion Hand Controller is working!</h1>";
        pointableString += "<h2 class='text-center'> Frames = " + iter + "</h2>";
        iter++;

        if (iter > 250)
            document.body.style.backgroundColor = "red";
        if (iter > 500)
            document.body.style.backgroundColor = "black";
        if (iter > 750)
            document.body.style.backgroundColor = "#eeff44";
        if (iter > 1000)
            document.body.style.backgroundColor = "#0099FF";
        if (iter > 1100)
            iter = 0;


    } else {

        document.body.style.backgroundColor = "#eee";
    }
    pointableOutput.innerHTML = pointableString;

    // Display Gesture object data
    var gestureOutput = document.getElementById("main");
    var gestureString = "";
    if (frame.gestures.length > 0) {

        for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];


            switch (gesture.type) {
                case "circle":

                    iter = 0;
                    break;
                case "swipe":
                    //document.body.innerHTML = "Some new HTML content";
                    break;
            }
            gestureString += "<br />";
        }
    }
    // Store frame for motion functions
    previousFrame = frame;
})

function vectorToString(vector, digits) {
    if (typeof digits === "undefined") {
        digits = 1;
    }
    return "(" + vector[0].toFixed(digits) + ", " + vector[1].toFixed(digits) + ", " + vector[2].toFixed(digits) + ")";
}

function togglePause() {
    paused = !paused;

    if (paused) {
        document.getElementById("pause").innerText = "Resume";
    } else {
        document.getElementById("pause").innerText = "Pause";
    }
}

function pauseForGestures() {
    if (document.getElementById("pauseOnGesture").checked) {
        pauseOnGesture = true;
    } else {
        pauseOnGesture = false;
    }
}

// Store frame for motion functions
var previousFrame = null;
var paused = false;
var pauseOnGesture = false;
var canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d');
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
            document.body.style.backgroundColor = "#990000";
        if (iter > 500)
            document.body.style.backgroundColor = "black";
        if (iter > 750)
            document.body.style.backgroundColor = "#eeff44";
        if (iter > 1000)
            document.body.style.backgroundColor = "#0099FF";
        if (iter > 1100)
            iter = 0;


        pointableOutput.innerHTML = pointableString;


    } else {

        document.body.style.backgroundColor = "#eee";
    }


    // Display Gesture object data
    var gestureOutput = document.getElementById("main");
    var gestureString = "";
    if (frame.gestures.length > 0) {

        for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];


            switch (gesture.type) {
                case "circle":
                    ctx.fillStyle = "rgba(0,0,0,0.9)";
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    break;
                case "swipe":
                    //document.body.innerHTML = "Some new HTML content";
                    //ctx.fillRect(-canvas.width / 2, -canvas.height, canvas.width, canvas.height);


                    break;
            }
            gestureString += "<br />";
        }
    }
    // Store frame for motion functions
    previousFrame = frame;
})

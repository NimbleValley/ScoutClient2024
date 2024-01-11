// Tries to get user in fullscreen, probably doesn't work
function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();     // Firefox
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();  // Safari
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();      // IE/Edge
    }
};

// Sections array, each tab
var sections = document.getElementsByClassName("section");

// Tries to get user in fullscreen
enterFullScreen(window);

// Animation timeline variable
var tl = new TimelineMax();

// Hide all sections, except the first
for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
}
// TODO set this for debugging to set default screen
sections[0].style.display = "flex";


// Alliance select element
const allianceSelect = document.getElementById("alliance-select");


// Auto dropped pieces
// TODO might need to removed in 2024
var autoDroppedPieced = 0;
const autoDroppedPiecesText = document.getElementById("auto-dropped=pieces-text");

// Tele dropped pieces
// TODO might need to removed in 2024
var teleDroppedPieced = 0;
const teleDroppedPiecesText = document.getElementById("tele-dropped=pieces-text");


// Auto mobility
// TODO might need to removed in 2024
var autoMobility = false;
const autoMobilityCheck = document.getElementById("auto-mobility-check");


// Auto tech
var autoTech = false;
const autoTechCheck = document.getElementById("auto-tech-check");


// Pickup method
// TODO might need to removed in 2024
const pickupMethodSelect = document.getElementById("pickup-method");


// Tele tech
var teleTech = false;
const teleTechCheck = document.getElementById("tele-tech-check");


// Flipped
var teleFlip = false;
const teleFlipCheck = document.getElementById("tele-flip-check");


// Comms issues
var teleComms = false;
const teleCommsCheck = document.getElementById("tele-comms-check");


// Disabled during match
var teleDisabled = false;
const teleDisabledCheck = document.getElementById("tele-disabled-check");


// Tele parked
// TODO might need to removed in 2024
var telePark = false;
const teleParkCheck = document.getElementById("tele-park-check");


// Were they dumb
var dumb = false;
const dumbCheck = document.getElementById("dumb-check");


// Were they reckless
var reckless = false;
const recklessCheck = document.getElementById("reckless-check");


// Was the auto successful
var autoSuccess = true;


// Which section user is on
var onSection = 0;

// Switched section user is on from current to next
async function switchSection(current, next) {
    if(next == -1) {
        return;
    }

    if(next > 5) {
        return;
    }

    if(next > current) {
        onSection ++;
    } else {
        onSection --;
    }

    window.scroll({
        top: 0,
        left: 0
    });

    if (next > current) {
        tl.to(sections[current], { transform: "translate(-60vw, 0vh) scale(0.45) rotate(-7.5deg)", opacity: 0, duration: 0.5, ease: "power2" });
    } else {
        tl.to(sections[current], { transform: "translate(60vw, 0vh) scale(0.45) rotate(7.5deg)", opacity: 0, duration: 0.5, ease: "power2" });
    }

    sections[next].style.display = "flex";

    if (next > current) {
        tl.fromTo(sections[next], { transform: "translate(60vw, 0vh) scale(0.45) rotate(7.5deg)", opacity: 0 }, { transform: "", opacity: 1, duration: 0.5, ease: "power2" }, "-=0.45");
    } else {
        tl.fromTo(sections[next], { transform: "translate(-60vw, 0vh) scale(0.45) rotate(-7.5deg)", opacity: 0 }, { transform: "", opacity: 1, duration: 0.5, ease: "power2" }, "-=0.45");
    }
    await sleep(500);
    sections[current].style.display = "none";
}

// ---- SELECT CALLBACKS ----

autoMobilityCheck.addEventListener("click", function () {
    autoMobility = !autoMobility;
    var checkbox = document.getElementById("auto-mobility-checkbox");

    if (autoMobility) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

autoTechCheck.addEventListener("click", function () {
    autoTech = !autoTech;
    var checkbox = document.getElementById("auto-tech-checkbox");

    if (autoTech) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

teleTechCheck.addEventListener("click", function () {
    teleTech = !teleTech;
    var checkbox = document.getElementById("tele-tech-checkbox");

    if (teleTech) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

teleFlipCheck.addEventListener("click", function () {
    teleFlip = !teleFlip;
    var checkbox = document.getElementById("tele-flip-checkbox");

    if (teleFlip) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

teleCommsCheck.addEventListener("click", function () {
    teleComms = !teleComms;
    var checkbox = document.getElementById("tele-comms-checkbox");

    if (teleComms) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

teleDisabledCheck.addEventListener("click", function () {
    teleDisabled = !teleDisabled;
    var checkbox = document.getElementById("tele-disabled-checkbox");

    if (teleDisabled) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

teleParkCheck.addEventListener("click", function () {
    telePark = !telePark;
    var checkbox = document.getElementById("tele-park-checkbox");

    if (telePark) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

dumbCheck.addEventListener("click", function () {
    dumb = !dumb;
    var checkbox = document.getElementById("dumb-checkbox");

    if (dumb) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

recklessCheck.addEventListener("click", function () {
    reckless = !reckless;
    var checkbox = document.getElementById("reckless-checkbox");

    if (reckless) {
        checkbox.style.backgroundColor = "#6feb36";
        tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    } else {
        checkbox.style.backgroundColor = "rgb(93, 94, 95)";
        tl.to(checkbox, { scale: 0.75, duration: 0.15, ease: "power2" });
        tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
    }
});

// DROPPED PIECES AUTO update callback
function autoDroppedPieceUpdate(num) {
    if(autoDroppedPieced + num < 0) {
        return;
    }
    autoDroppedPieced += num;
    autoDroppedPiecesText.innerText = `Missed Pieces: ${autoDroppedPieced}`
}

// DROPPED PIECES TELE update callback
function teleDroppedPieceUpdate(num) {
    if(teleDroppedPieced + num < 0) {
        return;
    }
    teleDroppedPieced += num;
    teleDroppedPiecesText.innerText = `Missed Pieces: ${teleDroppedPieced}`
}

// Sleep function, pause/delay
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// Keeps the screen on apparently, may or may not work
async function keepScreenOn() {
    // Create an async function to request a wake lock
    try {
        wakeLock = await navigator.wakeLock.request("screen");
    } catch (err) {
        // The Wake Lock request has failed - usually system related, such as battery.
    }
}

keepScreenOn();
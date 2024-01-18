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


// Auto note pickup
const autoNoteImage = document.getElementById("auto-note-image");
const autoNoteContainer = document.getElementById("note-auto-button-container");
const autoNoteButtons = document.getElementsByClassName("note-auto-button");
let autoNoteStatus = [];
for (let i = 0; i < autoNoteButtons.length; i++) {
    autoNoteStatus.push(0);
    autoNoteButtons[i].addEventListener("click", function (e) {
        let id = e.target.id;
        autoNoteStatus[id]++;
        if (autoNoteStatus[id] > 2) {
            autoNoteStatus[id] = 0;
        }
        switch (autoNoteStatus[id]) {
            case 0:
                e.target.style.backgroundColor = "transparent";
                break;
            case 1:
                e.target.style.backgroundColor = "#2bd50050";
                forceAutoMobility();
                break;
            case 2:
                e.target.style.backgroundColor = "#d5000050";
                forceAutoMobility();
                break;
            default:
                console.log("Invalid auto note status :(");
                break;
        }
    });
}


// Auto dropped pieces
var autoMissedSpeaker = 0;
const autoMissedSpeakerText = document.getElementById("auto-missed-speaker-text");

var autoMadeSpeaker = 0;
const autoMadeSpeakerText = document.getElementById("auto-made-speaker-text");

var autoMissedAmp = 0;
const autoMissedAmpText = document.getElementById("auto-missed-amp-text");

var autoMadeAmp = 0;
const autoMadeAmpText = document.getElementById("auto-made-amp-text");


// Tele shot stuff
var teleMadeSpeaker = 0;
const teleMadeSpeakerText = document.getElementById("tele-made-speaker-text");

var teleMadeSpeakerAmplified = 0;
const teleMadeSpeakerTextAmplified = document.getElementById("tele-made-speaker-amplified-text");

var teleMissedSpeaker = 0;
const teleMissedSpeakerText = document.getElementById("tele-missed-speaker-text");

var teleMadeAmp = 0;
const teleMadeAmpText = document.getElementById("tele-made-amp-text");

var teleMissedAmp = 0;
const teleMissedAmpText = document.getElementById("tele-missed-amp-text");


// Auto mobility
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

const climbSelect = document.getElementById("climb-select");

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
    
    if (next == -1) {
        return;
    }

    if (next > 5) {
        return;
    }

    if (next > current) {
        onSection++;
    } else {
        onSection--;
    }

    if(next == 0) {
        update();
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
        tl.fromTo(sections[next], { transform: "translate(60vw, -25vh) scale(0.45) rotate(7.5deg)", opacity: 0 }, { transform: "", opacity: 1, duration: 0.5, ease: "power2" }, "-=0.45");
    } else {
        tl.fromTo(sections[next], { transform: "translate(-60vw, -25vh) scale(0.45) rotate(-7.5deg)", opacity: 0 }, { transform: "", opacity: 1, duration: 0.5, ease: "power2" }, "-=0.45");
    }
    await sleep(500);
    sections[current].style.display = "none";
}

// ---- SELECT CALLBACKS ----

allianceSelect.addEventListener("change", function () {
    if (allianceSelect.value.substring(0, 1) == "R") {
        autoNoteContainer.style.scale = "1 1";
        autoNoteImage.src = "img/redfield24.jpg";
    } else {
        autoNoteContainer.style.scale = "-1 1";
        autoNoteImage.src = "img/bluefield24.jpg";
    }
});

autoMobilityCheck.addEventListener("click", function () {
    if(autoNoteStatus.includes(1) || autoNoteStatus.includes(2)) {
        return;
    }

    autoMobility = !autoMobility;
    let checkbox = document.getElementById("auto-mobility-checkbox");

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


// AUTO AMP & SPEAKER SHOT CALLBACK
function autoMissedSpeakerUpdate(num) {
    if (autoMissedSpeaker + num > 10) {
        return;
    }
    if (autoMissedSpeaker + num < 0) {
        return;
    }
    autoMissedSpeaker += num;
    autoMissedSpeakerText.innerText = `Missed Speaker: ${autoMissedSpeaker}`;
}

function autoMadeSpeakerUpdate(num) {
    if (autoMadeSpeaker + num > 10) {
        return;
    }
    if (autoMadeSpeaker + num < 0) {
        return;
    }
    autoMadeSpeaker += num;
    autoMadeSpeakerText.innerText = `Made Speaker: ${autoMadeSpeaker}`;
}

function autoMissedAmpUpdate(num) {
    if (autoMissedAmp + num > 10) {
        return;
    }
    if (autoMissedAmp + num < 0) {
        return;
    }
    autoMissedAmp += num;
    autoMissedAmpText.innerText = `Missed Amplifier: ${autoMissedAmp}`;
}

function autoMadeAmpUpdate(num) {
    if (autoMadeAmp + num > 10) {
        return;
    }
    if (autoMadeAmp + num < 0) {
        return;
    }
    autoMadeAmp += num;
    autoMadeAmpText.innerText = `Made Amplifier: ${autoMadeAmp}`;
}


// TELE AMP & SPEAKER SHOT CALLBACK
function teleMissedSpeakerUpdate(num) {
    if (teleMissedSpeaker + num > 50) {
        return;
    }
    if (teleMissedSpeaker + num < 0) {
        return;
    }
    teleMissedSpeaker += num;
    teleMissedSpeakerText.innerText = `Missed Speaker: ${teleMissedSpeaker}`;
}

function teleMadeSpeakerUpdate(num) {
    if (teleMadeSpeaker + num > 50) {
        return;
    }
    if (teleMadeSpeaker + num < 0) {
        return;
    }
    teleMadeSpeaker += num;
    teleMadeSpeakerText.innerText = `Made Speaker: ${teleMadeSpeaker}`;
}

function teleMadeSpeakerAmplifiedUpdate(num) {
    if (teleMadeSpeakerAmplified + num > 50) {
        return;
    }
    if (teleMadeSpeakerAmplified + num < 0) {
        return;
    }
    teleMadeSpeakerAmplified += num;
    teleMadeSpeakerTextAmplified.innerHTML = `Made <span style="color:dodgerblue; text-decoration: underline;">AMPLIFIED</span> Speaker: ${teleMadeSpeakerAmplified}`;
}

function teleMadeAmpUpdate(num) {
    if (teleMadeAmp + num > 50) {
        return;
    }
    if (teleMadeAmp + num < 0) {
        return;
    }
    teleMadeAmp += num;
    teleMadeAmpText.innerText = `Made Amp: ${teleMadeAmp}`;
}

function teleMissedAmpUpdate(num) {
    if (teleMissedAmp + num > 50) {
        return;
    }
    if (teleMissedAmp + num < 0) {
        return;
    }
    teleMissedAmp += num;
    teleMissedAmpText.innerText = `Missed Amp: ${teleMissedAmp}`;
}

function teleMissedShotUpdate(num) {
    if (teleMissedShots + num < 0) {
        return;
    }
    teleMissedShots += num;
    teleMissedShotsText.innerText = `Missed Shots: ${teleMissedShots}`
}

climbSelect.addEventListener("change", function() {
    if(climbSelect.value != "Successful") {
        teleParkCheck.style.display = "flex";
    } else {
        teleParkCheck.style.display = "none";
    }
});

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

function forceAutoMobility() {
    autoMobility = true;
    let checkbox = document.getElementById("auto-mobility-checkbox");
    checkbox.style.backgroundColor = "#6feb36";
    tl.to(checkbox, { scale: 1.25, duration: 0.15, ease: "power2" });
    tl.to(checkbox, { scale: 1, duration: 0.15, ease: "power2" });
}
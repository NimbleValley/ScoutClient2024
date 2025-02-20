const nameInput = document.getElementById("name-input");
const teamInput = document.getElementById("team-input");
const matchInput = document.getElementById("match-input");

const submitButton = document.getElementById("submit-button");
const scoutForm = document.getElementById("scout-form");

const downloadButton = document.getElementById("download-button");

const autoSelect = document.getElementById("auto-start");

const autoChargeOutput = document.getElementById("auto-charge");

const scriptURL = "https://script.google.com/macros/s/AKfycbx_KXhLkJ02ADQLSjYrhh3qRcPjA5Dg15CQQQdMBWPEIdZS8XMCryygI_CT70E8r7GJNQ/exec";

const respectInducingImages = ["img/sherril5.jpg", "img/trompmil24.jpg", "img/sherril.jpg", "img/snow.jpg", "img/sherrilwatching.jpg", "img/joseph1.jpg", "img/zachary01.jpg", "img/waytt.jpg", "img/bendi.jpg", "img/hendrick.jpg", "img/hensler.jpg", "img/zacharychomp.png", "img/gabegrin.png", "img/deva1.jpg", "img/aaron.jpg.png"];

document.addEventListener("keypress", function () {
    document.getElementById("respect-your-elders-image").src = respectInducingImages[Math.round(Math.random() * (respectInducingImages.length-1))];
});

var data;
var matchNumberOutput;
var teamOutput;

scoutForm.addEventListener('submit', e => {
    switchSection(4, 5);

    document.getElementById("respect-your-elders-image").src = respectInducingImages[Math.round(Math.random() * (respectInducingImages.length - 1))];

    let autoMobilityOutput = "No";
    if (autoMobility) {
        autoMobilityOutput = "Yes";
    }

    let autoTechOutput = "No";
    if (autoTech) {
        autoTechOutput = "Yes";
    }

    let autoSuccessOutput = "No";
    if (autoSuccess) {
        autoSuccessOutput = "Yes";
    }

    let teleCommsOutput = "No";
    if (teleComms) {
        teleCommsOutput = "Yes";
    }

    let teleDisabledOutput = "No";
    if (teleDisabled) {
        teleDisabledOutput = "Yes";
    }


    let autoPoints = 0;
    if (autoMobility) {
        autoPoints += 2;
    }
    if (autoTech) {
        autoSuccess = false;
    }
    autoPoints += autoMadeSpeaker * 5;
    autoPoints += autoMadeAmp * 2;
    console.log(autoPoints);

    // TELE VALUES

    let teleTechOutput = "No";
    if (teleTech) {
        teleTechOutput = "Yes";
    }

    let teleFlipOutput = "No";
    if (teleFlip) {
        teleFlipOutput = "Yes";
    }

    let dumbOutput = "No";
    if (dumb) {
        dumbOutput = "Yes";
    }

    let recklessOutput = "No";
    if (reckless) {
        recklessOutput = "Yes";
    }

    let telePoints = 0;
    telePoints += teleMadeAmp;
    telePoints += teleMadeSpeaker * 2;


    // ENDGAME
    let teleParkOutput = "No";
    if (telePark) {
        teleParkOutput = "Yes";
    }

    let teleClimbSpeedOutput = climbSpeedSelect.value;

    let teleClimbOutput = climbSelect.value;
    if (teleClimbOutput == "Successful") {
        telePark = false;
        teleParkOutput = "No";
    } else {
        // Special case, they didn't climb, don't report data
        teleClimbSpeedOutput = "N/A";
    }

    let humanPlayerRole = humanPlayerSelect.value;

    let spotlightOutput = spotlightSelect.value;
    if(humanPlayerRole != "Amp") {
        spotlightOutput = "N/A";
    }

    let teleTrapOutcome = trapSelect.value;

    let endgamePoints = 0;
    if (telePark) {
        endgamePoints += 1;
    }

    if (teleClimbOutput == "Successful") {
        endgamePoints += 3;
    }

    if (teleTrapOutcome == "Successful") {
        endgamePoints += 5;
    }

    console.log(endgamePoints);

    let commentsOutput = document.getElementById("comments-area").value;
    if (commentsOutput == "" || commentsOutput == " " || commentsOutput == null) {
        commentsOutput = nameInput.value + " didn't write a comment :(";
    }

    matchNumberOutput = matchInput.value;
    if (matchNumberOutput == null || matchNumberOutput == "" || matchNumberOutput == " ") {
        matchNumberOutput = 0;
    }

    let totalPoints = autoPoints + telePoints + endgamePoints;

    let intakeOutput = pickupMethodSelect.value;

    teamOutput = teamSelect.value;

    let autoSpeakerPercent = Math.round(autoMadeSpeaker / (autoMadeSpeaker + autoMissedSpeaker) * 100);
    let teleSpeakerPercent = Math.round(teleMadeSpeaker / (teleMadeSpeaker + teleMissedSpeaker) * 100);

    //alert("New code");
    //alert(teleMadeSpeaker + teleMadeAmp)

    data = {
        "Name": nameInput.value,
        "Team Number": teamOutput,
        "Alliance": allianceSelect.value,
        "Match Number": matchNumberOutput,
        "Too Tall": teleFlipOutput,
        "Lost Comms": teleCommsOutput,
        "Disabled": teleDisabledOutput,
        "Unintelligent": dumbOutput,
        "Reckless": recklessOutput,
        "Total Points": totalPoints,
        "Comments": commentsOutput,
        "Auto Points": autoPoints,
        "Auto Tech": autoTechOutput,
        "Auto Mobility": autoMobilityOutput,
        "Auto Piece Selection": autoPieceSelection.join(",").toString() != null ? autoPieceSelection.join(",").toString() : "",
        "Auto Made Amp": autoMadeAmp,
        "Auto Missed Amp": autoMissedAmp,
        "Auto Made Speaker": autoMadeSpeaker,
        "Auto Missed Speaker": autoMissedSpeaker,
        "Auto Successful": autoSuccessOutput,
        "Tele Points": telePoints,
        "Tele Tech": teleTechOutput,
        "Tele Made Amp": teleMadeAmp,
        "Tele Passed": teleMissedAmp,
        "Tele Made Speaker": teleMadeSpeaker,
        "Tele Missed Speaker": teleMissedSpeaker,
        "Endgame Points": endgamePoints,
        "Endgame Park": teleParkOutput,
        "Endgame Climb": teleClimbOutput,
        "Climb Speed": teleClimbSpeedOutput,
        "Trap": teleTrapOutcome,
        "Spotlight": spotlightOutput,
        "Intook From": intakeOutput,
        "Speaker Range": speakerShotRange.value,
        "Auto Speaker %": isNaN(autoSpeakerPercent) ? "N/A" : autoSpeakerPercent,
        "Tele Speaker %": isNaN(teleSpeakerPercent) ? "N/A" : teleSpeakerPercent,
        "Auto Start": autoSelect.value,
        "Gamepieces": (teleMadeSpeaker + teleMadeAmp + teleMissedAmp + (teleMissedSpeaker * 0.5))
    };

    console.log(data);

    let formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    e.preventDefault();

    console.log(formData);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            alert('Success!', response);
            switchSection(5, 0);
            resetForm();
        })
        .catch(async error => {
            //alert('Terrible Error :(.', error.message);
            await sleep(500);
            switchSection(5, 6);
        });
});

function resetForm() {
    matchInput.value = "";
    document.getElementById("comments-area").value = "";
    teleCharge = false;
    teleFlip = false;
    dumb = false;
    reckless = false;
    teleTech = false;
    autoCharge = false;
    autoTech = false;
    teleComms = false;
    teleDisabled = false;
    telePark = false;
    autoMobility = false;
    autoSuccess = false;

    autoPieceSelection = [];
    for (let i = 0; i < autoNoteButtons.length; i++) {
        autoNoteStatus[i] = 0;
        autoNoteButtons[i].style.backgroundColor = "transparent";
    }

    autoMadeAmp = 0;
    autoMadeAmpText.innerText = "Made Amplifier: 0";
    autoMissedAmp = 0;
    autoMissedAmpText.innerText = "Missed Amplifier: 0";
    autoMadeSpeaker = 0;

    autoMadeSpeaker = 0;
    autoMadeSpeakerText.innerText = "Made Speaker: 0";
    autoMissedSpeaker = 0;
    autoMissedSpeakerText.innerText = "Missed Speaker: 0";

    teleMadeAmp = 0;
    teleMadeAmpText.innerText = "Made Amplifier: 0";
    teleMissedAmp = 0;
    teleMissedAmpText.innerText = "Passed: 0";
    teleMadeSpeaker = 0;

    teleMadeSpeaker = 0;
    teleMadeSpeakerText.innerText = "Made Speaker: 0";
    teleMissedSpeaker = 0;
    teleMissedSpeakerText.innerText = "Missed Speaker: 0";

    let checks = document.getElementsByClassName("check");
    for (let i = 0; i < checks.length; i++) {
        checks[i].style.backgroundColor = "rgb(93, 94, 95)";
    }
    teleParkCheck.style.display = "flex";
    teleParkCheck.style.scale = 1;
    teleParkCheck.style.transform = "";
    teleParkCheck.style.opacity = 1;
    document.getElementById("comments-area").value = "";

    climbSelect.value = "No";
    trapSelect.value = "No";
    humanPlayerSelect.value = "Source";
    spotlightSelect.value = "0";

    spotlightSelect.style.display = "none";
    climbSpeedSelect.style.display = "none";

    speakerShotRange.value = "Subwoofer";

    //onSection = 0;
    update();
}

downloadButton.addEventListener('click', function() {
    const text = JSON.stringify(data);
    const type = "plain/text";

    // create courseData
    const a = document.createElement("a");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = `Match ${matchNumberOutput} - ${teamOutput}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    switchSection(6, 0);
    switchSection(5, 0);
    resetForm();
});

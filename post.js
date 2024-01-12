const nameInput = document.getElementById("name-input");
const teamInput = document.getElementById("team-input");
const matchInput = document.getElementById("match-input");

const submitButton = document.getElementById("submit-button");
const scoutForm = document.getElementById("scout-form");

const autoChargeOutput = document.getElementById("auto-charge");

const scriptURL = "https://script.google.com/macros/s/AKfycbx_KXhLkJ02ADQLSjYrhh3qRcPjA5Dg15CQQQdMBWPEIdZS8XMCryygI_CT70E8r7GJNQ/exec";

const respectInducingImages = ["img/sherril5.jpg", "img/trompmil24.jpg", "img/sherril.jpg", "img/snow.jpg", "img/sherrilwatching.jpg", "img/joseph1.jpg", "img/zachary01.jpg", "img/waytt.jpg", "img/bendi.jpg", "img/hendrick.jpg", "img/hensler.jpg"];

document.addEventListener("keypress", function () {
    //document.getElementById("respect-your-elders-image").src = respectInducingImages[Math.round(Math.random() * (respectInducingImages.length-1))];
});

scoutForm.addEventListener('submit', e => {
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

    // AUTO IS UNSUCCESSFUL IF THEY RECIEVED TECH, MISSED PIECE, OR TRIED BUT FAILED TO ENGAGE

    let autoPoints = 0;
    if (autoMobility) {
        autoPoints += 3;
    }
    if (autoTech) {
        autoPoints -= 10;
        autoSuccess = false;
    }
    console.log(autoPoints);

    if (autoDroppedPieced > 0) {
        autoSuccess = false;
    }

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

    let teleParkOutput = "No";
    if(telePark) {
        teleParkOutput = "Yes";
    }



    let telePoints = 0;
    // FIXME fix this
    telePoints = 15;
    
    if (telePark) {
        telePoints += 2;
    }
    if (teleTech) {
        telePoints -= 10;
    }
    console.log(telePoints);

    let commentsOutput = document.getElementById("comments-area").value;
    if(commentsOutput == "" || commentsOutput == " " || commentsOutput == null) {
        commentsOutput = nameInput.value + " didn't write a comment :(";
    }

    let matchNumberOutput = matchInput.value;
    if(matchNumberOutput == null || matchNumberOutput == "" || matchNumberOutput == " ") {
        matchNumberOutput = -1;
    }

    if(teleDroppedPieced == null) {
        teleDroppedPieced = 0;
    }

    if(autoDroppedPieced == null) {
        autoDroppedPieced = 0;
    }

    let totalPoints = autoPoints + telePoints;

    // TODO add auto missed shots
    let autoMissedShots = 0;

    data = {
        "Name": nameInput.value,
        "Team Number": teamInput.value,
        "Alliance": allianceSelect.value,
        "Match Number": matchNumberOutput,
        "Flip": teleFlipOutput,
        "Lost Comms": teleCommsOutput,
        "Disabled": teleDisabledOutput,
        "Unintelligent": dumbOutput,
        "Reckless": recklessOutput,
        "Total Points": totalPoints,
        "Comments": commentsOutput,
        "Auto Tech": autoTechOutput,
        "Auto Mobility": autoMobilityOutput,
        "Auto Missed Intake": autoDroppedPieced,
        "Auto Missed Shots": autoMissedShots,
        "Auto Successful": autoSuccessOutput,
        "Auto Points": autoPoints,
        "Tele Tech": teleTechOutput,
        "Tele Missed Shots": teleDroppedPieced,
        "Tele Points": telePoints,
        "Endgame Park": teleParkOutput,
        "Intook From": pickupMethodSelect.value,
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
        .catch(error => {
            alert('Terrible Error :(.', error.message);
            switchSection(5, 0);
            resetForm();
        });
});

function resetForm() {
    teamInput.value = "";
    matchInput.value = "";
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

    autoDroppedPieced = 0;
    teleDroppedPieced = 0;

    teleDroppedPiecesText.innerText = "Missed Pieces: 0";
    autoDroppedPiecesText.innerText = "Missed Pieces: 0";

    let checks = document.getElementsByClassName("check");
    for (let i = 0; i < checks.length; i++) {
        checks[i].style.backgroundColor = "rgb(93, 94, 95)";
    }
    teleParkCheck.style.display = "flex";
    teleParkCheck.style.scale = 1;
    teleParkCheck.style.transform = "";
    teleParkCheck.style.opacity = 1;
    document.getElementById("comments-area").value = "";

    onSection = 0;
}

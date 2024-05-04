// TBA API constants, for finding events
var TBA_EVENT_KEYS;
var TBA_EVENT_NAMES = new Array();
var TBA_RECORDS;
var TBA_COLUMNS;
const tbaOptions = {
    headers: {
        'X-TBA-Auth-Key': 'sBluV8DKQA0hTvJ2ABC9U3VDZunUGUSehxuDPvtNC8SQ3Q5XHvQVt0nm3X7cvP7j'
    }
}

const teamOutput = document.getElementById("teams-output");
const eventSelect = document.getElementById("event-select");
eventSelect.addEventListener("change", getEventTeams);

// Gets event list of current year
const Year = new Date().getFullYear();
getEventListTBA(`https://www.thebluealliance.com/api/v3/events/${Year}`);

// Gets all events & populates event select with them
function getEventListTBA(url) {
    fetch(url, tbaOptions)
        .then((response) => response.json())
        .then((json) => {
            //console.log(json.length);
            eventSelect.innerHTML = "";
            // Sorts the array (smartly called 'json' for some reason) by object property name
            json = json.sort((a, b) => (a.name > b.name ? 1 : -1));
            for (let i = 0; i < json.length; i++) {
                TBA_EVENT_NAMES[i] = json[i].name;
                let tempOption = document.createElement("option");
                tempOption.innerText = json[i].name;
                tempOption.value = json[i].key;
                if (json[i].key == localStorage.getItem("event-key")) {
                    tempOption.selected = "selected";
                }
                eventSelect.appendChild(tempOption);

                // Shorten event name if it's ridiculously long
                if (TBA_EVENT_NAMES[i].length > 25) {
                    TBA_EVENT_NAMES[i] = TBA_EVENT_NAMES[i].substring(0, 25);
                }
            }
        });
}

function getEventTeams() {
    fetch(`https://www.thebluealliance.com/api/v3/event/${eventSelect.value}/teams`, tbaOptions)
        .then((response) => response.json())
        .then((json) => {
            teamOutput.innerHTML = "const eventTeams = [";
            for (let i = 0; i < json.length; i++) {
                teamOutput.innerText = teamOutput.innerText + json[i].team_number + ",";
            }
            teamOutput.innerText = teamOutput.innerText.substring(0, teamOutput.innerText.length - 1);
            teamOutput.innerText += "];"
        });
}
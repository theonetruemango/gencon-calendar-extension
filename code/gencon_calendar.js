main();

function main() {
    // Field texts
    const startTimeText = "Start Date & Time";
    const endTimeText = "End Date & Time";
    const titleText = "Title";
    const locationText = "Location";
    const descriptionText = "Short Description";

    // Start time field
    let startTimeDiv;
    let startTime;
    let endTime;
    let title;
    let location;
    let description;

    for (const div of document.querySelectorAll('.name')) {
        if (div.textContent.includes(startTimeText)) {
            startTimeDiv = div.parentNode.querySelector('.value-full');
            startTime = findSibling(div, 'a');
        }
        if (div.textContent.includes(endTimeText)) {
            endTime = findSibling(div, '.value-full');
        }

        if (div.textContent.includes(titleText)) {
            title = findSibling(div, 'a');
        }

        if (div.textContent.includes(locationText)) {
            location = findSibling(div, '.value-full')
        }

        if (div.textContent.includes(descriptionText)) {
            description = findSibling(div, '.value-full');
        }
    }

    // Error and bail out if we can't find the div
    if (startTimeDiv == null) {
        console.error("Could not find start time div");
        throw new Error("Could not find start time div");
    }

    const link = document.createElement('a');
    link.setAttribute('href', buildCalendarLink(startTime, endTime, title, location, description));
    link.setAttribute('target', 'new');
    link.appendChild(document.createTextNode('Add to Google Calendar'));

    startTimeDiv.appendChild(document.createElement('br'));
    startTimeDiv.appendChild(document.createElement('br'));
    startTimeDiv.appendChild(link);
}


function findSibling(node, selector) {
    return node.parentNode.querySelector(selector).innerText;
}

function buildCalendarLink(startTime, endTime, title, location, description) {
    const startDate = convertToRealDate(startTime);
    const endDate = convertToRealDate(endTime);

    return `https://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(title)}&ctz=America/New_York&dates=${startDate}/${endDate}&details=${window.location.href}${encodeURIComponent("\n\n" + description)}&location=${location}`;

}

// I know this is messy, feel free to improve
function convertToRealDate(date) {
    const pieces = date.split(' ');
    let dates = {};
    const year = new Date().getFullYear();
    if (year === 2022) {
        dates = {
            'Thursday,': '20220804',
            'Friday,': '20220805',
            'Saturday,': '20220806',
            'Sunday,': '20220807',
        };
    } else if (year === 2023) {
        dates = {
            'Thursday,': '20230803',
            'Friday,': '20230804',
            'Saturday,': '20230805',
            'Sunday,': '20230806',
        };
    } else if (year === 2024) {
        dates = {
            'Thursday,': '20240801',
            'Friday,': '20240802',
            'Saturday,': '20240803',
            'Sunday,': '20240804',
        };
    } else if (year === 2025) {
        dates = {
            'Thursday,': '20250731',
            'Friday,': '20250801',
            'Saturday,': '20250802',
            'Sunday,': '20250803',
        };
    } else if (year === 2026) {
        dates = {
            'Thursday,': '20260730',
            'Friday,': '20260731',
            'Saturday,': '20260801',
            'Sunday,': '20260802',
        };
    }
    const day = dates[pieces[0]];
    const timePieces = pieces[1].split(':');

    const hour = parseInt(timePieces[0]) + ((pieces[2] === 'PM') ? 12 : 0);

    return `${day}T${hour}${timePieces[1]}00`;

}


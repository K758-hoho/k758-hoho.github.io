// comic_show.js was created by geno7, with much needed assistance from Dannarchy

// this is the script that actually displays the comics, nav and comic title on the page. 

// below are what's called some "function calls", each one is responsible for making an element of the page. to get something to actually show up on the page, all you'd need to do is make a div with a specific class name and this script will handle the rest.

// a couple of the function calls have toggles too.

writeNav(true); // show navigation for comic pages. to toggle either images or text for nav, set this to true or false.

// debug
console.log(pg);

writePageTitle(".writePageTitle", true, " - "); // write title of page. true/false

writePageClickable(".writePageClickable", true); // show the current page. to toggle whether pages can be clicked to move to the next one, set this to true or false.

writeAuthorNotes(".writeAuthorNotes");

keyNav(); // enables navigation through the comic with the arrow keys and WSAD. It doesn't need a div with a class name, it automatically works. delete or comment out (add // at the beginning) here to disable.

// below this point is more under-the-hood type stuff that we only encourage messing with if you're more familiar with js, 
// but it's still commented as extensively as possible anyway just in case

// SHOW COMIC PAGE, with clickable link
function writePageClickable(div, clickable) {
    if (!clickable) {
        document.querySelector(div).innerHTML = `<div class="comicPage">${writePage()}</div>`; // display comic page without link
    } else if (pg < maxpg) {
        // check whether comic is on the last page
        document.querySelector(div).innerHTML = `<div class="comicPage"><a href="?pg=${pg + 1}${navScrollTo}"/>${writePage()}</a></div>`; // display comic page and make it so that clicking it will lead to the next page
    } else {
        document.querySelector(div).innerHTML = `<div class="comicPage">${writePage()}</div>`; // display comic page without link
    }
}

function writePageTitle(div, toggleNum, char) {
    if (pgData.length >= pg) {
        // display title of current page
        document.querySelector(div).innerHTML = `<h1>${pgData[pg - 1].title}</h1>`;
        if (toggleNum) {
            // toggle whether you want to display the page number
            document.querySelector(div).innerHTML = `<h1>${pgData[pg - 1].pgNum + char + pgData[pg - 1].title}</h1>`; // char denotes a separating character between the number and the title
        }
    }
}

function writeAuthorNotes(div) { // display author notes
    if (pgData.length >= pg) {
        return document.querySelector(div).innerHTML = `${pgData[pg - 1].authorNotes}`;
    }
}

// function used to split pages into multiple images if needed, and add alt text
function writePage() {
    let altText = pgData[pg - 1].altText; // set alt text to the text defined in the array
    let page = ``;

    if (pgData.length < pg) { // if the array is blank or not long enough to have an entry for this page
        // debug
        console.log("page code to insert - " + page);
        console.log("alt text to print - " + altText);
        return page;
    } else if (pgData.length >= pg) { // if the array is not blank, and if it's at least long enough to have an entry for the current page
        pgData[pg - 1].imageFiles.forEach(function(url) {
            page += `<img alt="${altText}" title="${altText}" src="${url}" /><br/>`;
        });
        // debug
        console.log("page code to insert - " + page);
        console.log("alt text to print - " + altText);
        return page;
    }
}

// debug
console.log("array blank/not long enough? " + (pgData.length < pg));
console.log("array length - " + pgData.length);
console.log("current page - " + pg);
console.log("number of page segments - " + pgData[pg - 1].imageFiles.length);
console.log("alt text - " + `"` + pgData[pg - 1].altText + `"`);

console.log("nav text - " + navText);
console.log("nav image file extension - " + navExt);

// Define the folder where your navigation button images are stored
const navFolder = "https://res.cloudinary.com/dkvkq02fo/image/upload/v1739116409";

// Define the text for each navigation button
const navText = ["first", "previous", "next", "latest"];

// Define the file extension for the navigation button images
const navExt = "webp";

function imgOrText(setImg, navTextSet) { // function that writes the indicated nav button as either an image or text
    if (setImg) { // if it's an image
        return `<img src="` + navFolder + `/nav_` + navText[navTextSet].toLowerCase() + `.` + navExt + `" alt="` + navText[navTextSet] + `" title="` + navText[navTextSet] + `" width="110px" height="53.32px" loading="lazy" />`;
    } else {
        return navText[navTextSet];
    }
}

function writeNav(imageToggle) {
    let writeNavDiv = document.querySelectorAll(".writeNav");
    writeNavDiv.forEach(function (element) {
        element.innerHTML = `<div class="comicNav" id="comicNav">
            ${firstButton()}
            ${prevButton()}
            ${nextButton()}
            ${lastButton()}
        </div>`;
    });

    function firstButton() {
        // FIRST BUTTON
        if (pg > 1) {
            // wait until page 2 to make button active
            return `<a href="?pg=` + 1 + navScrollTo + `" rel="start" class="comicnavlink">` + imgOrText(imageToggle, 0) + `</a>`;
        } else {
            return `<a href="?pg=` + 1 + navScrollTo + `" rel="start" class="comicnavlink comicnavlink-grayedout">` + imgOrText(imageToggle, 0) + `</a>`;
        }
    }

    function prevButton() {
        // PREV BUTTON
        if (pg > 1) {
            // wait until page 2 to make button active
            return `<a href="?pg=` + (pg - 1) + navScrollTo + `" rel="prev" class="comicnavlink">` + imgOrText(imageToggle, 1) + `</a>`;
        } else {
            return `<a href="?pg=` + 1 + navScrollTo + `" rel="prev" class="comicnavlink comicnavlink-grayedout">` + imgOrText(imageToggle, 1) + `</a>`;
        }
    }

    function nextButton() {
        // NEXT BUTTON
        if (pg < maxpg) {
            // only make active if not on the last page
            return `<a href="?pg=` + (pg + 1) + navScrollTo + `" rel="next" class="comicnavlink">` + imgOrText(imageToggle, 2) + `</a>`;
        } else {
            return `<a href="?pg=` + maxpg + navScrollTo + `" rel="next" class="comicnavlink comicnavlink-grayedout">` + imgOrText(imageToggle, 2) + `</a>`;
        }
    }

    function lastButton() {
        // LAST BUTTON
        if (pg < maxpg) {
            // only make active if not on last page
            return `<a href="?pg=` + maxpg + navScrollTo + `" rel="index" class="comicnavlink">` + imgOrText(imageToggle, 3) + `</a>`;
        } else {
            return `<a href="?pg=` + maxpg + navScrollTo + `" rel="index" class="comicnavlink comicnavlink-grayedout">` + imgOrText(imageToggle, 3) + `</a>`;
        }
    }
}

// FUNCTION TO UPDATE PREV AND NEXT BUTTONS
function updatePrevNextButtons() {
    const prevButton = document.getElementById('prev-comic-link');
    const nextButton = document.getElementById('next-comic-link');

    if (prevButton) {
        if (pg > 1) {
            prevButton.href = "?pg=" + (pg - 1) + navScrollTo;
            prevButton.classList.remove("comicnavlink-grayedout");
        } else {
            prevButton.href = "#";
            prevButton.classList.add("comicnavlink-grayedout");
        }
    }

    if (nextButton) {
        if (pg < maxpg) {
            nextButton.href = "?pg=" + (pg + 1) + navScrollTo;
            nextButton.classList.remove("comicnavlink-grayedout");
        } else {
            nextButton.href = "#";
            nextButton.classList.add("comicnavlink-grayedout");
        }
    }
}

// Call the function to update prev and next buttons
updatePrevNextButtons();

// KEYBOARD NAVIGATION
function keyNav() {
    document.addEventListener("keydown", (e) => {
        if ((e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') && pg < maxpg) { // right arrow or D goes to next page
            window.location.href = "?pg=" + (pg + 1) + navScrollTo;
        } else if ((e.key == "ArrowLeft" || e.key.toLowerCase() == "a") && pg > 1) { // left arrow or A goes to previous page
            window.location.href = "?pg=" + (pg - 1) + navScrollTo;
        } else if (e.key.toLowerCase() == "w") { // W scrolls up
            window.scrollBy({ top: -30 });
        } else if (e.key.toLowerCase() == "s") { // S scrolls down
            window.scrollBy({ top: 30 });
        }
    });
}

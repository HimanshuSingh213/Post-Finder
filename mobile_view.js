const menuIcon = document.querySelector(".navbar .menu-icon");
const dropdown = document.querySelector(".navbar .navbar-dropdown");
const dropmenuItems = document.querySelectorAll(".navbar .navbar-dropdown ul li");


menuIcon.addEventListener("click", () => {
    if (menuIcon.style.transform === "rotate(0deg)") {
        menuIcon.style.transform = "rotate(90deg)";
    }
    else{
        menuIcon.style.transform = "rotate(0deg)";
    }

    if (dropdown.style.visibility === "visible") {
        dropdown.style.visibility = "hidden";
    }
    else{
        dropdown.style.visibility = "visible";
    }
});


dropmenuItems[0].addEventListener("click", () => {
    window.scrollTo(0, 0);
    dropdown.style.visibility = "hidden";
    menuIcon.style.transform = "rotate(0deg)";
});

dropmenuItems[1].addEventListener("click", () => {
    window.scrollTo(0, 1150);
    dropdown.style.visibility = "hidden";
    menuIcon.style.transform = "rotate(0deg)";
});

dropmenuItems[2].addEventListener("click", () => {
    window.scrollTo(0, 1550);
    dropdown.style.visibility = "hidden";
    menuIcon.style.transform = "rotate(0deg)";
});

dropmenuItems[3].addEventListener("click", () => {
    window.scrollTo(0, 2300);
    dropdown.style.visibility = "hidden";
    menuIcon.style.transform = "rotate(0deg)";
});
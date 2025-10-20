let welcome = document.querySelector(".welcomeCard");
let searchBtn = document.querySelector(".search");
let heading1 = document.querySelectorAll('h1');
let faq = document.querySelectorAll(".faq ol li")
let infoBoxItems = document.querySelectorAll(".infoBox ul li")
let workingSection = document.querySelector(".working")
let faqSection = document.querySelector(".faq")
let genImgSection = document.querySelector(".genImg")
let posterImg = document.querySelectorAll(".infoBox ul li img")
let slider = document.querySelector(".slider");
let byPincodeBtn = document.querySelector(".byPinOption");
let byAreaBtn = document.querySelector(".byAreaOption");
let locationPin = document.querySelector(".byAreaOption p span img");
let searchByPincode = document.querySelector(".byPincode");
let searchByArea = document.querySelector(".byArea");
let searchNowBtn = document.querySelector(".search");
let submitPin = document.querySelector(".submitPin");
let submitArea = document.querySelector(".submitArea");
let searchingSection = document.querySelector(".searching");
let minimizer = document.querySelector(".minimizer");
let afterSearchingSection = document.querySelector(".afterSearching");
let resultBackBtn = document.querySelector(".backSvg");
let pageContainer = document.querySelector(".page-container");
let overlay = document.querySelector(".overlay");
let loadingIcon = document.querySelector(".loadingIcon");
let PostOfficeName = document.querySelector(".postOffice");
let type = document.querySelector(".branchType");
let circle = document.querySelector(".Circle");
let district = document.querySelector(".district");
let division = document.querySelector(".division");
let pincode = document.querySelector(".pincode");
let state = document.querySelector(".state");
let inputPin = document.querySelector("#pincode");
let inputArea = document.querySelector("#area");
let targetPin = document.querySelectorAll(".targetpin");
let targetPlace = document.querySelectorAll(".targetplace");
let branchType = document.querySelectorAll(".branchType");
let deliveryStatus = document.querySelectorAll(".property3");
let resultContainer = document.querySelector(".resultContainer");
let container = document.querySelector(".resultItem ul");
let template = document.querySelector("#resultContainer");
let property3 = document.querySelector(".deliveryStatus");


const getOfficeCountPin = async () => {
    let inputValue = inputPin.value.trim();
    if (!inputValue) {
        alert("Please enter a pincode!");
        return;
    }

    let newURL = `https://api.postalpincode.in/pincode/${inputValue}`;

    console.log("Getting data...");

    try {
        let Response = await fetch(newURL);
        let finalData = await Response.json();

        if (!finalData[0] || !finalData[0].PostOffice) {
            alert("No results found for that pincode!");
            return;
        }

        const offices = finalData[0].PostOffice;
        // container.innerHTML = "";

        document.getElementById("postOfficeArray").textContent = offices.length;
        document.querySelector(".targetpin").textContent = offices[0].Pincode || inputValue;


        offices.forEach((office) => {
            const clone = template.content.cloneNode(true);

            clone.querySelector("#postOfficeName").textContent = office.Name || "N/A";
            clone.querySelector(".targetpin").textContent = office.Pincode || "N/A";
            clone.querySelector(".branchType").textContent = office.BranchType || "N/A";
            clone.querySelector(".deliveryStatus").textContent = office.DeliveryStatus || "N/A";
            if (office.DeliveryStatus === "Non-Delivery") {
                property3.innerText = "Non - Delivery"
                property3.classList.add("nondelivery");
            }

            const values = clone.querySelectorAll(".values");
            if (values.length >= 6) {
                values[0].textContent = office.BranchType || "N/A";
                values[1].textContent = office.DeliveryStatus || "N/A";
                values[2].textContent = office.Circle || "N/A";
                values[3].textContent = office.Region || "N/A";
                values[4].textContent = office.Division || "N/A";
                values[5].textContent = office.State || "N/A";
            }

            container.appendChild(clone);
        });

    }
     catch (err) {
        console.error("Error fetching pincode data:", err);
        alert("Something went wrong while fetching data.");
    }

};

const getOfficeCountArea = async () => {
    let inputValue = inputArea.value.trim();
    if (!inputValue) {
        alert("Please enter a Area/locality!");
        return;
    }
    let newURL = `https://api.postalpincode.in/postoffice/${encodeURIComponent(inputValue)}`;


    if (!finalData[0] || !finalData[0].PostOffice) {
        alert("No results found for that area!");
        return;
    }

    try {
        let Response = await fetch(newURL);
        let finalData = await Response.json();
        const offices = finalData[0].PostOffice;
        container.innerHTML = "";

        document.getElementById("postOfficeArray").textContent = offices.length;
        targetPlace.forEach(element => {
            element.textContent = offices[0].Block || inputValue;
            
        });

        offices.forEach((office) => {
            const clone = template.content.cloneNode(true);

            clone.querySelector("#postOfficeName").textContent = office.Name || "N/A";
            clone.querySelector(".targetpin").textContent = office.Pincode || "N/A";
            clone.querySelector(".branchType").textContent = office.BranchType || "N/A";
            let deliveryStatus = clone.querySelector(".deliveryStatus");
            deliveryStatus.textContent = office.DeliveryStatus || "N/A";
            if (office.DeliveryStatus === "Non-Delivery") {
                deliveryStatus.innerText = "Non - Delivery"
                deliveryStatus.style.addClassList(".nondelivery");
            }

            const values = clone.querySelectorAll(".values");
            values[0].textContent = office.BranchType || "N/A";
            values[1].textContent = office.DeliveryStatus || "N/A";
            values[2].textContent = office.Circle || "N/A";
            values[3].textContent = office.Region || "N/A";
            values[4].textContent = office.Division || "N/A";
            values[5].textContent = office.State || "N/A";

            container.appendChild(clone);
        });
    } catch (err) {
        console.error("Error fetching Area data:", err);
        alert("Something went wrong while fetching data.");
    }
};



document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);

    if (welcome) {
        welcome.classList.add('loaded');
    }
})

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger 50px before element comes into view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            // Stop observing once loaded to prevent re-triggering
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

infoBoxItems.forEach((item) => {
    setTimeout(() => {
        observer.observe(item);
    }, 250);
});

if (workingSection) {
    observer.observe(workingSection);
}
if (faqSection) {
    observer.observe(faqSection);
}
if (genImgSection) {
    observer.observe(genImgSection);
}
welcome.addEventListener("mouseenter", () => {
    welcome.classList.add("hover-effect");
    welcome.style.transform = "scale(1.01)";
    heading1.forEach((heading) => {
        heading.style.transform = "scale(1.1)";
    });
    searchBtn.style.transform = "scale(1.1)";
})

welcome.addEventListener("mouseleave", () => {
    welcome.classList.remove("hover-effect");
    welcome.style.transform = "scale(1)"
    heading1.forEach((heading) => {
        heading.style.transform = "scale(1)";
    });
    searchBtn.style.transform = "scale(1)";
})

searchBtn.addEventListener("mouseover", () => {
    searchBtn.style.transform = "scale(1.15)";
})
searchBtn.addEventListener("mouseout", () => {
    searchBtn.style.transform = "scale(1)";
})

faq.forEach((faqItem) => {
    const plusIcon = faqItem.querySelector('.q img');
    const ans = faqItem.querySelector(".ans")

    faqItem.addEventListener("click", () => {
        if (plusIcon.style.transform === "rotate(180deg)") {
            plusIcon.style.transform = "rotate(0deg)";
        } else {
            plusIcon.style.transform = "rotate(180deg)";
        }

        if (ans.hidden === true) {
            faqItem.style.height = "70px"
            setTimeout(() => {
                ans.hidden = false;
            }, 150);

        } else {
            faqItem.style.height = ""
            setTimeout(() => {
                ans.hidden = true;
            }, 150);
        }
    });
});

faq.forEach(faqItem => {
    faqItem.addEventListener("mouseenter", () => {
        faqItem.style.border = "1px solid red";
    })

    faqItem.addEventListener("mouseleave", () => {
        faqItem.style.border = "";
    })
});

const imgObserverOptions = {
    threshold: 0.1, // Trigger when 10% of image is visible
    rootMargin: '0px 0px -50px 0px' // Trigger 50px before image comes into view
};

const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            imgObserver.unobserve(entry.target);
        }
    });
}, imgObserverOptions);

// Apply observer to all infoBox images
posterImg.forEach((imgElement) => {
    imgObserver.observe(imgElement);
});

byPincodeBtn.addEventListener("click", () => {
    slider.style.transform = "translateX(0%)";
    setTimeout(() => {
        if (byAreaBtn.style.color = "white") {
            byAreaBtn.style.color = "rgb(35, 35, 35)";
            byPincodeBtn.style.color = "white";
            locationPin.style.filter = "";
        }
        searchByArea.hidden = true;
        searchByPincode.hidden = false;
    }, 200);
});

byAreaBtn.addEventListener("click", () => {
    slider.style.transform = "translateX(100%)";
    setTimeout(() => {
        if (byPincodeBtn.style.color = "white") {
            byPincodeBtn.style.color = "rgb(35, 35, 35)";
            byAreaBtn.style.color = "white";
            locationPin.style.filter = "invert(100%)";
        }

        searchByArea.hidden = false;
        searchByPincode.hidden = true;
    }, 200);
    inputPin.style.innerText = "";
});

byPincodeBtn.addEventListener("click", () => {

});

byAreaBtn.addEventListener("click", () => {
    slider.style.transform = "translateX(100%)";
});

searchNowBtn.addEventListener("click", () => {
    searchingSection.style.transform = "translateY(0%)";
    overlay.hidden = false;
    overlay.style.opacity = "100%";
    overlay.style.zIndex = "1000";
})

minimizer.addEventListener("click", () => {
    if (minimizer.style.transform === "Rotate(0deg)") {
        minimizer.style.transform = "Rotate(180deg)"
    } else {
        minimizer.style.transform = "Rotate(0deg)";
    }
    searchingSection.style.transform = "translateY(100%)";
    overlay.hidden = true;
    overlay.style.opacity = "0%";
    overlay.style.zIndex = "-1";
})

overlay.addEventListener("click", () => {
    if (minimizer.style.transform === "Rotate(0deg)") {
        minimizer.style.transform = "Rotate(180deg)"
    } else {
        minimizer.style.transform = "Rotate(0deg)";
    }
    searchingSection.style.transform = "translateY(100%)";
    overlay.hidden = true;
    overlay.style.opacity = "0%";
    overlay.style.zIndex = "-1";
})


submitPin.addEventListener("click", () => {
    if (inputPin.value !== "") {
        loadingIcon.style.zIndex = "1001"
        loadingIcon.style.visibility = "visible";
        loadingIcon.style.opacity = 1;
        
        setTimeout(() => {
            loadingIcon.style.visibility = "hidden";
            loadingIcon.style.opacity = 0;
            loadingIcon.style.zIndex = ""
            afterSearchingSection.style.transform = "translateY(0%)";
        }, 4000);
    }
    targetPin.forEach(targets => targets.hidden = false);
    targetPlace.forEach(targets => targets.hidden = true);
    getOfficeCountPin();
    inputPin.value = "";
});

submitArea.addEventListener("click", () => {
    if (inputArea.value !== "") {
        loadingIcon.style.zIndex = "1001"
        loadingIcon.style.visibility = "visible";
        loadingIcon.style.opacity = 1;
        
        setTimeout(() => {
            loadingIcon.style.visibility = "hidden";
            loadingIcon.style.opacity = 0;
            loadingIcon.style.zIndex = "";
            afterSearchingSection.style.transform = "translateY(0%)";
        }, 4000);
    }
    targetPin.forEach(targets => targets.hidden = true);
    targetPlace.forEach(targets => targets.hidden = false);
    getOfficeCountArea();
    inputArea.value = "";

});

resultBackBtn.addEventListener("click", () => {
    afterSearchingSection.style.transform = "translateY(100%)"
});

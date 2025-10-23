const welcome = document.querySelector(".welcomeCard");
const section1 = document.querySelector(".section1");
const searchBtn = document.querySelector(".search");
const heading1 = document.querySelectorAll('h1');
const faq = document.querySelectorAll(".faq ol li");
const infoBoxItems = document.querySelectorAll(".infoBox ul li");
const workingSection = document.querySelector(".working");
const faqSection = document.querySelector(".faq");
const genImgSection = document.querySelector(".genImg");
const posterImg = document.querySelectorAll(".infoBox ul li img");
const slider = document.querySelector(".slider");
const byPincodeBtn = document.querySelector(".byPinOption");
const byAreaBtn = document.querySelector(".byAreaOption");
const locationPin = document.querySelector(".byAreaOption p span img");
const searchByPincode = document.querySelector(".byPincode");
const searchByArea = document.querySelector(".byArea");
const searchNowBtn = document.querySelector(".search");
const submitPin = document.querySelector(".submitPin");
const submitArea = document.querySelector(".submitArea");
const searchingSection = document.querySelector(".searching");
const minimizer = document.querySelector(".minimizer");
const afterSearchingSection = document.querySelector(".afterSearching");
const resultBackBtn = document.querySelector(".backSvg");
const pageContainer = document.querySelector(".page-container");
const overlay = document.querySelector(".overlay");
const loadingIcon = document.querySelector(".loadingIcon");
const PostOfficeName = document.querySelector(".postOffice");
const type = document.querySelector(".branchType");
const circle = document.querySelector(".Circle");
const district = document.querySelector(".district");
const division = document.querySelector(".division");
const pincode = document.querySelector(".pincode");
const state = document.querySelector(".state");
const inputPin = document.querySelector("#pincode");
const inputArea = document.querySelector("#area");
const targetPin = document.querySelectorAll(".targetpin");
const targetPlace = document.querySelectorAll(".targetplace");
const branchType = document.querySelectorAll(".branchType");
const deliveryStatus = document.querySelectorAll(".property3");
const resultContainer = document.querySelectorAll(".resultContainer");
const container = document.querySelector(".resultItem ul");
const resultItem = document.querySelector(".afterSearching .resultItem");
const template = document.querySelector("#resultContainer");
const property3 = document.querySelector(".deliveryStatus");
const popularArea = document.querySelectorAll(".popularArea ul li");
const popularPin = document.querySelectorAll(".popularPin ul li");
const navbarItems = document.querySelectorAll(".navbar ul li");
const footerAbout = document.querySelectorAll("footer .footerAbout li");
const footerContact = document.querySelectorAll("footer .footerContact li");
const html = document.querySelector("html");
const fixedSearchBtn = document.querySelector(".searchNowBtn");
const backToTop = document.querySelector(".backToTop");
const themeChanger = document.querySelector(".themeChanger");
const themes = document.querySelectorAll(".themeChanger img");
const darkTheme = themes[0];
const lightTheme = themes[1];

const getOfficeCountPin = async () => {
    const inputValue = inputPin.value.trim();
    if (!inputValue) {
        alert("Please enter a pincode!");
        return 0;
    }

    const newURL = `https://api.postalpincode.in/pincode/${inputValue}`;

    console.log("Getting data...");

    try {
        const Response = await fetch(newURL);
        const finalData = await Response.json();

        if (!Array.isArray(finalData) || !finalData[0] || !Array.isArray(finalData[0].PostOffice) || finalData[0].PostOffice.length === 0) {
            alert("No results found for that pincode!");
            return 0;
        }

        const offices = finalData[0].PostOffice;
        if (offices.length === 0) {
            return 0;
        }
        container.innerHTML = "";



        const postOfficeNum = document.getElementById("postOfficeArray");
        if (postOfficeNum) postOfficeNum.textContent = String(offices.length);
        const headerPin = document.querySelector(".targetpin");
        if (headerPin) headerPin.textContent = offices[0].Pincode || inputValue;

        const headerPlaceNames = document.querySelectorAll(".targetplace");
        const headerPlaceText = offices[0].Block || offices[0].District || "";
        headerPlaceNames.forEach((el) => (el.textContent = headerPlaceText));

        offices.forEach((office) => {
            const clone = template.content.cloneNode(true);

            const nameNode = clone.querySelector(".postOfficeName");
            if (nameNode) nameNode.textContent = office.Name || "N/A";
            console.log(office.Name);

            const pinNode = clone.querySelector(".targetpin");
            if (pinNode) pinNode.textContent = office.Pincode || "N/A";

            const branchNode = clone.querySelector(".branchType");
            if (branchNode) branchNode.textContent = office.BranchType || "N/A";

            const deliveryNode = clone.querySelector(".deliveryStatus");
            if (deliveryNode) {
                const deliveryStatus = office.DeliveryStatus || "N/A";
                deliveryNode.textContent = deliveryStatus;
                if (deliveryStatus === "Non-Delivery") {
                    deliveryNode.textContent = "Non - Delivery";
                    deliveryNode.classList.add("nondelivery");
                } else {
                    deliveryNode.classList.remove("nondelivery");
                }
            }

            const values = clone.querySelectorAll(".values");
            if (values && values.length >= 6) {
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
        return 0;
    }

};

const getOfficeCountArea = async () => {

    const inputValue = (inputArea?.value || "").trim();
    if (!inputValue) {
        alert("Please enter a Area/locality!");
        return 0;
    }

    const newURL = `https://api.postalpincode.in/postoffice/${encodeURIComponent(inputValue)}`;

    try {
        const Response = await fetch(newURL);
        const finalData = await Response.json();

        if (!Array.isArray(finalData) || !finalData[0] || !Array.isArray(finalData[0].PostOffice) || finalData[0].PostOffice.length === 0) {
            alert("No results found for that area!");
            return 0;
        }

        const offices = finalData[0].PostOffice;
        if (offices.length === 0) {
            return 0;
        }
        container.innerHTML = "";

        const postOfficeNames = document.getElementById("postOfficeArray");
        if (postOfficeNames) postOfficeNames.textContent = String(offices.length);

        targetPlace.forEach((el) => {
            el.textContent = offices[0].Block || offices[0].District || inputValue;
        });

        const headerPin = document.querySelector(".targetpin");
        if (headerPin) headerPin.textContent = offices[0].Pincode || "";

        offices.forEach((office) => {
            const clone = template.content.cloneNode(true);

            const nameNode = clone.querySelector(".postOfficeName");
            if (nameNode) nameNode.textContent = office.Name || "N/A";
            console.log(office.Name);

            const pinNode = clone.querySelector(".targetpin");
            if (pinNode) pinNode.textContent = office.Pincode || "N/A";

            const branchNode = clone.querySelector(".branchType");
            if (branchNode) branchNode.textContent = office.BranchType || "N/A";

            const deliveryNode = clone.querySelector(".deliveryStatus");
            if (deliveryNode) {
                const ds = office.DeliveryStatus || "N/A";
                deliveryNode.textContent = ds;
                if (ds === "Non-Delivery") {
                    deliveryNode.textContent = "Non - Delivery";
                    deliveryNode.classList.add("nondelivery");
                } else {
                    deliveryNode.classList.remove("nondelivery");
                }
            }

            const values = clone.querySelectorAll(".values");
            if (values && values.length >= 6) {
                values[0].textContent = office.BranchType || "N/A";
                values[1].textContent = office.DeliveryStatus || "N/A";
                values[2].textContent = office.Circle || "N/A";
                values[3].textContent = office.Region || "N/A";
                values[4].textContent = office.Division || "N/A";
                values[5].textContent = office.State || "N/A";
            }

            container.appendChild(clone);
        });
    } catch (err) {
        console.error("Error fetching Area data:", err);
        alert("Something went wrong while fetching data.");
        return 0;
    }

};

document.addEventListener("DOMContentLoaded", () => {
    window.scrollTo(0, 0);

    if (welcome) {
        welcome.classList.add('loaded');
    }

    setTimeout(() => {
        themeChanger.style.opacity = 1;
    }, 200);
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

navbarItems[0].addEventListener("click", () => {
    window.scrollTo(0, 0);
});

navbarItems[1].addEventListener("click", () => {
    window.scrollTo(0, 0);
});

navbarItems[2].addEventListener("click", () => {
    window.scrollTo(0, 1150);
});

navbarItems[3].addEventListener("click", () => {
    window.scrollTo(0, 2300);
});

navbarItems[4].addEventListener("click", () => {
    window.scrollTo(0, 2300);
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

        if ((ans.hidden === true)) {
            faqItem.style.height = "12vh"
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
    faqItem.addEventListener("mouseenter", () => {
        faqItem.style.border = "1.2px solid red";
    })

    faqItem.addEventListener("mouseleave", () => {
        faqItem.style.border = "0.6px solid red";
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
        inputArea.value = "";
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
        inputPin.value = "";
    }, 200);
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
});


minimizer.addEventListener("click", () => {
    if (minimizer.style.transform === "Rotate(0deg)") {
        minimizer.style.transform = "Rotate(180deg)"
    } else {
        minimizer.style.transform = "Rotate(0deg)";
    }
    searchingSection.style.transform = "translateY(100%)";
    overlay.hidden = true;
    overlay.style.zIndex = "-1";
    overlay.style.opacity = "0%";
    setTimeout(() => {
        inputArea.value = "";
        inputPin.value = "";
    }, 200);
});

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


submitPin.addEventListener("click", async () => {
    const count = await getOfficeCountPin();
    if (inputPin.value !== "" && count !== 0) {
        loadingIcon.style.zIndex = "1001"
        loadingIcon.style.visibility = "visible";
        loadingIcon.style.opacity = 1;

        setTimeout(() => {
            loadingIcon.style.visibility = "hidden";
            loadingIcon.style.opacity = 0;
            loadingIcon.style.zIndex = "";
            afterSearchingSection.style.transform = "translateY(0%)";
            document.body.classList.add("no-scroll");
            html.classList.add("no-scroll");
        }, 3000);
    }
    targetPin.hidden = false;
    targetPlace.hidden = true;
    inputPin.value = "";
});

submitArea.addEventListener("click", async () => {
    const count = await getOfficeCountArea();
    if (inputArea.value !== "" && count !== 0) {
        loadingIcon.style.zIndex = "1001"
        loadingIcon.style.visibility = "visible";
        loadingIcon.style.opacity = 1;

        setTimeout(() => {
            loadingIcon.style.visibility = "hidden";
            loadingIcon.style.opacity = 0;
            loadingIcon.style.zIndex = "";
            afterSearchingSection.style.transform = "translateY(0%)";
            document.body.classList.add("no-scroll");
            html.classList.add("no-scroll");
        }, 3000);
    }
    targetPin.hidden = true;
    targetPlace.hidden = false;
    inputArea.value = "";

});

resultBackBtn.addEventListener("click", () => {
    afterSearchingSection.style.transform = "translateY(100%)"
    document.body.classList.remove("no-scroll");
    html.classList.remove("no-scroll");
    if (resultItem) resultItem.scrollTo({
        top: 0, behavior: "instant"
    });
});

popularArea.forEach(element => {
    element.addEventListener("click", () => {
        inputArea.value = element.innerText;
    })

});

popularPin.forEach(element => {
    element.addEventListener("click", () => {
        inputPin.value = element.innerText;
    })

});

footerAbout[0].addEventListener("click", () => {
    window.scrollTo(0, 1150);
});

footerAbout[1].addEventListener("click", () => {
    window.scrollTo(0, 1300);
});

footerAbout[2].addEventListener("click", () => {
    window.scrollTo(0, 2300);
});


backToTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
})
window.addEventListener("scroll", () => {
    if (window.pageYOffset >= 200) {
        fixedSearchBtn.style.opacity = "1";
        fixedSearchBtn.style.cursor = "pointer";
        fixedSearchBtn.addEventListener("click", () => {
            searchingSection.style.transform = "translateY(0%)";
            overlay.hidden = false;
            overlay.style.opacity = "100%";
            overlay.style.zIndex = "1000";
        });
        backToTop.addEventListener("click", () => {
            window.scrollTo(0, 0);
        })
        backToTop.style.cursor = "pointer";
        backToTop.style.opacity = "1";
    }
    else {
        fixedSearchBtn.style.opacity = "0";
        fixedSearchBtn.style.cursor = "default";
        backToTop.style.cursor = "default";
        backToTop.style.opacity = "0";
    }
});

const navbarItem = document.querySelectorAll(".section1 .navbar ul li");
const howH1 = document.querySelector(".working h3");
const howP = document.querySelector(".working p");
const faqH1 = document.querySelector(".faq h3");
const infoBoxItemsPara = document.querySelectorAll(".infoBox ul li p");
const infoBoxItemsH3 = document.querySelectorAll(".infoBox ul li h3");
const footer = document.querySelector(".footerObj");
const footerAboutH4 = document.querySelector(".footerObj .footerAbout h4");
const footerContactH4 = document.querySelector(".footerObj .footerContact h4");
const welcomeSecondH1 = document.querySelector(".welcomeCard h1:nth-child(3)");
const faqQuestion = document.querySelectorAll(".q");
const faqAnswer = document.querySelectorAll(".ans");
const imgBack = document.querySelectorAll(".infoBox ul li .imgBack");
const plusIcon = document.querySelectorAll(".q img");
const drawer = document.querySelector(".drawer");
const searchingH3 = document.querySelector(".head1 h3");
const searchingH4 = document.querySelector(".head1 h4");
const slidingBar = document.querySelector(".slidingBar");
const inputAreaSection = document.querySelector(".byArea #area");
const inputPinSection = document.querySelector(".byPincode #pincode");
const resultSlab = document.querySelector(".afterSearching .result");
const backSvg = document.querySelector(".afterSearching .result .backSvg img");
const backSvgBackground = document.querySelector(".afterSearching .result .backSvg");
const targetH4 = document.querySelectorAll(".result .target h4");
const targetH3 = document.querySelector(".result .target h3");
const resultItemH4 = document.querySelector(".resultItem h4");
const nameValue = document.querySelectorAll(".resultContainer .officeDetail ul li .nameValue");
const watermark = document.querySelector(".watermark");

// Setting Theme Changer 
themeChanger.addEventListener("click", () => {
    setTimeout(() => {

        if (darkTheme.style.opacity === '0') {
            lightTheme.style.opacity = 0;
            darkTheme.style.opacity = 1;
            section1.style.backgroundColor = "";
            pageContainer.style.backgroundColor = "";
            howH1.style.color = "";
            howP.style.color = "";
            faqH1.style.color = "";
            infoBoxItems.forEach(items => {
                items.style.backgroundColor = "";
                items.style.boxShadow = "none";
            });
            infoBoxItemsPara.forEach(items => {
                items.style.color = ""
            });
            infoBoxItemsH3.forEach(items => {
                items.style.color = ""
            });
            welcome.classList.remove('inverted');
            footer.style.backgroundColor = "";
            footerAboutH4.style.color = "";
            footerContactH4.style.color = "";
            welcome.style.background = "";
            welcomeSecondH1.style.color = "";
            infoBoxItems.forEach(item => {
                item.addEventListener("mouseenter", () => {
                    item.style.border = "";
                });

                item.addEventListener("mouseleave", () => {
                    item.style.border = "";
                });
            });
            faq.forEach(items => {
                items.style.backgroundColor = "";
            });
            faqQuestion.forEach(items => {
                items.style.filter = "";
            });
            faqAnswer.forEach(items => {
                items.style.filter = "";
            });
            imgBack.forEach(items => {
                items.style.background = "";
            });
            searchingSection.style.background = "";
            drawer.style.color = "";
            searchingH3.style.color = "";
            searchingH4.style.color = "";
            minimizer.style.stroke = "";
            slidingBar.style.backgroundColor = "";
            byAreaBtn.style.color = "";
            locationPin.style.filter = "";
            slider.style.transform = "translateX(0%)";
            byPincodeBtn.style.color = "white";
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
                    inputArea.value = "";
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
                    inputPin.value = "";
                }, 200);
            });

            inputPinSection.style.backgroundColor = "";
            inputAreaSection.style.backgroundColor = "";
            popularArea.forEach(element => {
                element.style.backgroundColor = "";
                element.style.color = "";

            });

            popularPin.forEach(element => {
                element.style.backgroundColor = "";
                element.style.color = "";
            });
            popularArea.forEach(element => {
                element.addEventListener("mouseenter", () => {
                    element.style.backgroundColor = "";
                    element.style.color = "";
                });

                element.addEventListener("mouseleave", () => {
                    element.style.backgroundColor = "";
                    element.style.color = "";
                });

            });

            popularPin.forEach(element => {
                element.addEventListener("mouseenter", () => {
                    element.style.backgroundColor = "";
                    element.style.color = "";
                });

                element.addEventListener("mouseleave", () => {
                    element.style.backgroundColor = "";
                    element.style.color = "";
                });
            });
            inputAreaSection.style.color = "";
            inputPinSection.style.color = "";
            resultSlab.style.backgroundColor = "";
            backSvg.style.filter = "";
            backSvgBackground.classList.remove("dark");
            targetH3.style.filter = "";
            targetH4.forEach(element => {
                element.style.filter = "";
            });
            resultItem.style.backgroundColor = "";
            resultItemH4.style.color = "";

            document.documentElement.classList.toggle('dark');
        }
        else {
            darkTheme.style.opacity = 0;
            lightTheme.style.opacity = 1;
            section1.style.backgroundColor = "#111827";
            pageContainer.style.backgroundColor = "#030712";
            howH1.style.color = "white";
            howP.style.color = "white";
            faqH1.style.color = "white";
            infoBoxItems.forEach(items => {
                items.style.backgroundColor = "#101828";
                items.style.boxShadow = "none";
            });
            infoBoxItemsPara.forEach(items => {
                items.style.color = "#99a1af"
            });
            infoBoxItemsH3.forEach(items => {
                items.style.color = "#f6f3f4"
            });
            welcome.style.background = "url('Assets/Images-SVG/background-img2.jpg')";
            footer.style.backgroundColor = "#111827";
            footerAboutH4.style.color = "#ffffffde";
            footerContactH4.style.color = "#ffffffde";
            welcomeSecondH1.style.color = "white";
            infoBoxItems.forEach(item => {
                item.addEventListener("mouseenter", () => {
                    item.style.border = "3px solid red";
                });

                item.addEventListener("mouseleave", () => {
                    item.style.border = "";
                });
            });
            faq.forEach(items => {
                items.style.backgroundColor = "#101828";
            });
            faqQuestion.forEach(items => {
                items.style.filter = "invert(100%)";

            });
            faqAnswer.forEach(items => {
                items.style.filter = "invert(100%)";

            });
            imgBack.forEach(items => {
                items.style.background = "#b0b0b0";
            });
            searchingSection.style.background = "#111827";
            drawer.style.color = "#4a5565";
            searchingH3.style.color = "#f6f3f4";
            searchingH4.style.color = "#99a1af";
            minimizer.style.stroke = "#99a1af";
            slidingBar.style.backgroundColor = "#3741514d";
            byAreaBtn.style.color = "#9ca3af";
            locationPin.style.filter = "invert(100%)";
            slider.style.transform = "translateX(0%)";
            byPincodeBtn.style.color = "white";
            byPincodeBtn.addEventListener("click", () => {
                slider.style.transform = "translateX(0%)";
                setTimeout(() => {
                    if (byAreaBtn.style.color = "white") {
                        byAreaBtn.style.color = "#9ca3af";
                        byPincodeBtn.style.color = "white";
                        locationPin.style.filter = "invert(100%)";
                    }
                    searchByArea.hidden = true;
                    searchByPincode.hidden = false;
                    inputPin.value = "";
                }, 200);
            });
            byAreaBtn.addEventListener("click", () => {
                slider.style.transform = "translateX(100%)";
                setTimeout(() => {
                    if (byPincodeBtn.style.color = "white") {
                        byPincodeBtn.style.color = "#9ca3af";
                        byAreaBtn.style.color = "white";
                        locationPin.style.filter = "invert(100%)";
                    }

                    searchByArea.hidden = false;
                    searchByPincode.hidden = true;
                    inputPin.value = "";
                }, 200);
            });
            inputPinSection.style.backgroundColor = "#364153";
            inputAreaSection.style.backgroundColor = "#364153";
            popularArea.forEach(element => {
                element.style.backgroundColor = "#364153";
                element.style.color = "#f6f3f4";
                element.addEventListener("mouseenter", () => {
                    element.style.backgroundColor = "#450a0a";
                    element.style.color = "#f87171";
                });

                element.addEventListener("mouseleave", () => {
                    element.style.backgroundColor = "#364153";
                    element.style.color = "#f6f3f4";
                });

            });

            popularPin.forEach(element => {
                element.style.backgroundColor = "#364153";
                element.style.color = "#f6f3f4";
                element.addEventListener("mouseenter", () => {
                    element.style.backgroundColor = "#450a0a";
                    element.style.color = "#f87171";
                });

                element.addEventListener("mouseleave", () => {
                    element.style.backgroundColor = "#364153";
                    element.style.color = "#f6f3f4";
                });
            });
            inputAreaSection.style.color = "white";
            inputPinSection.style.color = "white";
            resultSlab.style.backgroundColor = "#101828";
            backSvg.style.filter = "invert(100%)";
            backSvgBackground.classList.add("dark");
            targetH3.style.filter = "invert(100%)";
            targetH4.forEach(element => {
                element.style.filter = "invert(90%)";
            });
            resultItem.style.backgroundColor = "#030712";
            resultItemH4.style.color = "#e5e7eb";

            document.documentElement.classList.toggle('dark');

        }
    }, 200);
})
let welcome = document.querySelector(".welcomeCard");
let searchBtn = document.querySelector(".search");
let bodyContent = document.querySelectorAll(".welcomeCard");
let heading1 = document.querySelectorAll('h1');
let faq = document.querySelectorAll(".faq ol li")
let infoBoxItems = document.querySelectorAll(".infoBox ul li")
let workingSection = document.querySelector(".working")
let faqSection = document.querySelector(".faq")

document.addEventListener("DOMContentLoaded", () => {
    if (welcome) {
        welcome.classList.add('loaded');
    }
})

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
    observer.observe(item);
});

if (workingSection) {
    observer.observe(workingSection);
}
if (faqSection) {
    observer.observe(faqSection);
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
       
        if(ans.hidden === true){
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
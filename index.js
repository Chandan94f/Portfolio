// ========================================
//  Creating a resposive nav-bar component
// ========================================

const mobile_nav = document.querySelector(".mobile-navbar-btn");
const headerElem = document.querySelector(".header");

mobile_nav.addEventListener("click", () => {
    headerElem.classList.toggle("active");
})

// ========================================
// sticky navigation
// ========================================
const sectionHero = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
    (entries) => {
        const ent = entries[0];
        // console.log(ent);
        !ent.isIntersecting ?
            document.body.classList.add("sticky") :
            document.body.classList.remove("sticky");
    }, {
        // viewport
        root: null,
        threshold: 0,
        rootMargin: "-100px",
    }
);
// when the hero section end part reached then we need to show the sticky navigation
observer.observe(sectionHero);


// ========================================
//  Creating a portfolio tabbed component
// ========================================

const p_btns = document.querySelector(".p-btns");
const p_btn = document.querySelectorAll(".p-btn");
const p_img_elem = document.querySelectorAll(".img-overlay");

p_btns.addEventListener("click", (e) => {
    const p_btn_clicked = e.target;
    // console.log(p_btn_clicked);

    if (!p_btn_clicked.classList.contains("p-btn")) return ;




    p_btn.forEach((currElem) => currElem.classList.remove("p-btn-active"));
    
    p_btn_clicked.classList.add("p-btn-active");

    // to find the number in data attr

    const btn_num = p_btn_clicked.dataset.btnNum;

    // console.log(btn_num);

    // now targeting specifi

    const img_active = document.querySelectorAll(`.p-btn--${btn_num}`);

    p_img_elem.forEach((currElem) => currElem.classList.add("p-image-not-active"));

    img_active.forEach((currElem) => {
        currElem.classList.remove("p-image-not-active")
    });
});

// ==================
// swiper js code
// ==================
new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});

// ====================================
// media queries using javascript
// ====================================


const myJSmedia = (widthSize) => {
    if(widthSize.matches) {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
        });
    }else {
        new Swiper(".mySwiper", {
            slidesPerView: 2,
            spaceBetween: 30,
        });
    }
}




const widthSize = window.matchMedia("(max-width: 780px)");
// Call listener function at run time

myJSmedia(widthSize);

// Attach listener function at run time

widthSize.addEventListener("change", myJSmedia);


// ==============================


// scroll to top button
// ===============================

const footerElem = document.querySelector(".section-footer");
const heroSection = document.querySelector(".section-hero");

const scrollElement = document.createElement("div");
scrollElement.classList.add("scrollTop-style");

scrollElement.innerHTML = `<ion-icon name="arrow-up-outline" class="scroll-top"></ion-icon>`;

footerElem.after(scrollElement);


const scrollTop = () => {
    heroSection.scrollIntoView({behavior : "smooth"});
};


scrollElement.addEventListener("click", scrollTop);

// animate number counter

const speed = 200;
// all because class used at multiple times.
const counterNum = document.querySelectorAll(".counter-numbers");

counterNum.forEach( (curElem) => {
    const updateNumber = () => {
        const targetNumber = parseInt(curElem.dataset.number);
        // console.log(targetNumber);

        const initialNum = parseInt(curElem.innerText);
        // console.log(initialNum);

        const incrementNumber = Math.round(targetNumber/speed);
        // console.log(incrementNumber);

        if(initialNum < targetNumber) {
            curElem.innerHTML = `${initialNum + incrementNumber}+`;

            setTimeout(updateNumber, 1);
        }
    };
    updateNumber();
});


// ========================================
//  lazy loading section
// ========================================
const imgRef = document.querySelector("img[data-src]");
// console.log(imgRef);

const lazyImg = (entries) => {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.src = imgRef.dataset.src;
};

const imgObserver = new IntersectionObserver(lazyImg, {
    root: null,
    threshold: 0,
    // rootMargin: "100px",
});

imgObserver.observe(imgRef);
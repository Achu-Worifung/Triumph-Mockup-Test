//navigation menu toggle
const menuIcon = document.querySelector(".menu-icon");
const centerNav = document.querySelector(".center-nav");

menuIcon.addEventListener("click", () => {
  centerNav.classList.toggle("collapsed");
});

let play = true;
let swiper;

function initializeSwiper() {
  if (typeof Swiper !== "undefined") {
    if (swiper) swiper.destroy(true, true);
    swiper = new Swiper(".mySwiper", {
      loop: play,
      autoplay: play
        ? {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        : false,
      slidesPerView: 7,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 7,
          spaceBetween: 30,
        },
      },
    });
  }
}

// Initialize Swiper to show multiple slides at once
document.addEventListener("DOMContentLoaded", initializeSwiper);

document.getElementById("pause-play").addEventListener("click", function () {
  play = !play;
  console.log("Play state:", play);
  if (play) {
    this.innerHTML = '<i class="fa-solid fa-pause text-dark"></i>';
  } else {
    this.innerHTML = '<i class="fa-solid fa-play text-dark"></i>';
  }
  initializeSwiper();
});

function getNextSunday(date) {
  const nextSunday = new Date(date);
  nextSunday.setDate(date.getDate() + ((7 - date.getDay()) % 7));
  return nextSunday;
}
// next service countdown timer
document.addEventListener("DOMContentLoaded", function () {
  var nextServiceDate = getNextSunday(new Date());
  var nextServiceDate = new Date(
    nextServiceDate.getFullYear(),
    nextServiceDate.getMonth(),
    nextServiceDate.getDate(),
    10,
    0,
    0
  );

  // Function to update the countdown timer
  function updateCountdown() {
    var now = new Date();
    var distance = nextServiceDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days + "D";
    document.getElementById("hours").textContent = hours + "H";
    document.getElementById("minutes").textContent = minutes + "M";
    document.getElementById("seconds").textContent = seconds + "S";

    setTimeout(updateCountdown, 1000);
  }

  // Start the countdown timer
  updateCountdown();
});

// nav bar animations
const nav = document.getElementById("main-nav");
const indicator = document.querySelector(".center-nav .indicator");
const navItems = nav.querySelectorAll(".nav-indicator");
const activeItem = nav.querySelector(".nav-indicator.active");

function setIndicatorPosition(item) {
  const link = item.querySelector("a") || item;
  const itemRect = link.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();

  indicator.style.width = `${itemRect.width + 15}px`;
  indicator.style.height = `${itemRect.height + 5}px`;
  indicator.style.left = `${itemRect.left - navRect.left}px`;
  indicator.style.top = `${itemRect.top - navRect.top + 4.5}px`;
}

if (activeItem) {
  setIndicatorPosition(activeItem);
}

// Add hover listeners
navItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    setIndicatorPosition(item);
  });
});

// Return to active item when not hovering
nav.addEventListener("mouseleave", () => {
  if (activeItem) {
    setIndicatorPosition(activeItem);
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  if (activeItem) {
    setIndicatorPosition(activeItem);
  }
});

// Optional: Handle clicks to change active state
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    // Don't prevent default if you want links to work
    navItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    setIndicatorPosition(item);
  });
});

// mobile nav toggle
const mobileMenuBtn = document.querySelector(".mobile-menu");
const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
const closeMobileNav = document.querySelector(".close-mobile-nav");

mobileMenuBtn.addEventListener("click", () => {
  mobileNavOverlay.classList.add("active");
  mobileNavOverlay.classList.remove("d-none");
  document.body.classList.add("nav-open");
});

closeMobileNav.addEventListener("click", () => {
  mobileNavOverlay.classList.remove("active");
  document.body.classList.remove("nav-open");

  setTimeout(() => {
    mobileNavOverlay.classList.add("d-none");
  }, 300);
});

// Close on link click
document.querySelectorAll(".mobile-nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNavOverlay.classList.remove("active");
    document.body.classList.remove("nav-open");

    setTimeout(() => {
      mobileNavOverlay.classList.add("d-none");
    }, 300);
  });
});
//minimize nav
//minimize nav
document.getElementById("minimizer").addEventListener("click", function () {
  const nav = document.getElementById("navigation");
  console.log("Minimizer clicked");
  
  const icon = this.querySelector("i");
  const indicators = document.querySelectorAll(".nav-indicator:not(.remain):not(.active)");
  console.log("Indicators found:", indicators);

   const giveOnline = document.querySelectorAll(".nav-indicator.remain")[0];
    giveOnline.classList.add("active");
  
  if (!nav.classList.contains("minimized")) {
    // Minimizing - fade out first, then hide
    indicators.forEach((indicator) => {
      indicator.style.opacity = "0";
      indicator.style.maxWidth = "0";
      indicator.style.margin = "0";
      indicator.style.padding = "0";
    });

    // Remove active class from all nav-indicator elements
    document.querySelectorAll(".nav-indicator").forEach((el) => el.classList.remove("active"));
    // Add active only to Give Online
    giveOnline.classList.add("active");
    

    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      indicators.forEach((indicator) => {
        indicator.classList.add("d-none");
      });
      nav.classList.add("minimized");
      setIndicatorPosition(giveOnline);
    }, 50); // Match this to your CSS transition duration

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");

  } else {
    // Expanding - show first, then fade in
    nav.classList.remove("minimized");
    document.querySelectorAll(".indicator").forEach((indicator) => {
      indicator.style.opacity = "1";
    });

    indicators.forEach((indicator) => {
      indicator.classList.remove("d-none");
      // Force reflow to ensure transition works
      indicator.offsetHeight;
      indicator.style.opacity = "1";
      indicator.style.maxWidth = "200px";
      indicator.style.margin = "";
      indicator.style.padding = "";
    });

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

    // Remove d-none from all indicators in case some are stuck hidden
    indicators.forEach((indicator) => indicator.classList.remove("d-none"));
    giveOnline.classList.add("active");
     // Wait for animation to complete before hiding
    setTimeout(() => {
      indicators.forEach((indicator) => {
        indicator.classList.remove("d-none");
      });
      nav.classList.remove("minimized");
      setIndicatorPosition(giveOnline);
    }, 50); // Match this to your CSS transition duration

    // Remove active from all nav indicators
    document.querySelectorAll('.nav-indicator').forEach(el => el.classList.remove('active'));
    // Add active to first nav item (excluding .remain)
    const firstNav = document.querySelectorAll('#main-nav .nav-indicator:not(.remain)')[0];
    if (firstNav) firstNav.classList.add('active');
    setIndicatorPosition(firstNav);

  }
});

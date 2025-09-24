// Animation navbar in mobile device

const listbar = document.querySelector(".listbar"); // take class listbar from svg listbar icon
const navSlide = document.querySelector("nav ul"); // take ul element for give animation.
const nav = document.querySelector("nav"); // take nav element for give animation when scrolled

listbar.addEventListener("click", () => {
  navSlide.classList.toggle("slide"); // give animation slide when listbar clicked
  listbar.classList.toggle("actice"); // give border when listbar active
});

// Animation navbar when scrolled
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.classList.add("scrolled"); // give animation when scrolled
  } else {
    nav.classList.remove("scrolled"); // remove animation when scroll top
  }
});

// This is for dark mode toggle button
const modeToggle = document.querySelector(".mode-toggle"); // take mode-toggle class from svg icon
const html = document.documentElement; // take html element;

const themeImages = document.querySelectorAll(".theme-img");

// Function to get theme preference
function getThemePreference(isDark) {
  if (isDark) {
    html.classList.add("dark-mode"); // add dark-mode class from html element
    themeImages.forEach((img) => {
      img.src = img.dataset.dark; // take data from data-dark
    });
    localStorage.setItem("theme", "dark"); // save theme preference to local storage
  } else {
    html.classList.remove("dark-mode"); // remove dark-mode class from html element
    themeImages.forEach((img) => {
      img.src = img.dataset.light;
    });
    localStorage.setItem("theme", "light"); // save theme preference to local storage
  }
}

const theme = localStorage.getItem("theme"); // get theme preference from local storage

if (getThemePreference) {
  getThemePreference(theme === "dark"); // if theme preference is dark, add dark-mode class from html element
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  getThemePreference(true); // if theme preference is dark, add dark-mode class from html element
}

modeToggle.addEventListener("click", () => {
  const isDark = html.classList.contains("dark-mode"); // check if html element has dark-mode class
  getThemePreference(!isDark); // toggle dark-mode class from html element
});
// End of dark mode toggle button

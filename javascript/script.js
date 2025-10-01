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

// When Toggle is clicked
modeToggle.addEventListener("click", () => {
  const isDark = html.classList.contains("dark-mode"); // check if html element has dark-mode class
  //add animation in every picture
  themeImages.forEach((img) => {
    img.classList.remove("show", "hide");

    img.classList.add("hide"); // add rotate

    setTimeout(() => {
      img.src = isDark ? img.dataset.light : img.dataset.dark; // change src picture in half of animation time
      img.classList.remove("hide");
      img.classList.add("show");
    }, 300);
  });
  getThemePreference(!isDark); // toggle dark-mode class from html element
});
// End of dark mode toggle button

// this is for animation intersections
const animations = document.querySelectorAll(".animation");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  { threshold: 0.1 }
);
animations.forEach((animation) => {
  const delay = animation.dataset.delay || 0; // this is a condition, if element doesn't has any delay, it will set 0
  animation.style.transitionDelay = `${delay}s`; // give delay for each element
  observer.observe(animation);
});

// Get reverence to MODAL(popup) element
const form = document.getElementById("contact-form"); // get form element
const sumbitBtn = document.getElementById("submit-btn"); // get submit button element
const modal = document.getElementById("success-modal"); // get modal element
const closeBtn = document.querySelector(".close-btn"); // get close button element
const okBtn = document.getElementById("modal-ok-btn"); // get ok button element

// When the user clicks the submit button, open the modal
function showModal() {
  modal.classList.add("show");
}

// When the user clicks on <span> (x), close the modal
function hidemodal() {
  modal.classList.remove("show");
  // reset form
  form.reset();
}

// event listener to close the modal when close button is clicked
closeBtn.addEventListener("click", hidemodal);
// event listener to close the modal when ok button is clicked
okBtn.addEventListener("click", hidemodal);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    hidemodal();
  }
});

// Form submission handling
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent the default form submission

  // 1. Disable Submit button (prevent double clicks)
  sumbitBtn.disabled = true;
  sumbitBtn.textContent = "Sending..."; // feedback visual on button

  // 2. Take data form
  const data = new FormData(event.target); // easy way to take all input data

  // 3. send data by fecth
  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      // 4. If success: show modal
      showModal();
    } else {
      // 5. If error: Handle error (e.g show alert or another error modal)
      // We can take error message from Formspree
      const result = await response.json();
      let errorMessage = "Submission failed. Please try again.";

      if (result && result.errors && Array.isArray(result.errors)) {
        errorMessage +=
          " Detail: " + result.errors.map((e) => e.message).join(" | ");
      } else if (result && result.error) {
        // Jika Formspree mengembalikan properti 'error' tunggal (string)
        errorMessage += " Detail: " + result.error;
      }

      alert(errorMessage);
    }
  } catch (error) {
    // Handle failed connection (e.g Network down)
    console.log("Error when connecting", error);
    alert("Conection failed, Please try again.");
  } finally {
    // 6. Turn on the submit button
    sumbitBtn.disabled = false;
    sumbitBtn.textContent = "Submit";
  }
});

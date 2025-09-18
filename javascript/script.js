// Animation navbar in mobile device 

const listbar = document.querySelector('.listbar') // take class listbar from svg listbar icon
const navSlide = document.querySelector('nav ul') // take ul element for give animation.
const nav = document.querySelector('nav') // take nav element for give animation when scrolled


listbar.addEventListener('click', () => { 
    navSlide.classList.toggle('slide') // give animation slide when listbar clicked
    listbar.classList.toggle('actice') // give border when listbar active
})

// Animation navbar when scrolled
window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        nav.classList.add('scrolled') // give animation when scrolled
    } else {
        nav.classList.remove('scrolled') // remove animation when scroll top
    }
})

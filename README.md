# Frontend Mentor - FAQ accordion card solution

This is a solution to the [FAQ accordion card challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/faq-accordion-card-XlyjD0Oam). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the component depending on their device's screen size
- See hover states for all interactive elements on the page
- Hide/Show the answer to a question when the question is clicked

### Links

- Solution URL: [GitHub](https://github.com/pedrotpo/frontendmentor-faq-accordion)
- Live Site URL: [GitHub Pages](https://pedrotpo.github.io/frontendmentor-faq-accordion/)

## My process

### Built with

- Semantic HTML5 markup
- SASS
- Flexbox
- Mobile-first workflow
- Javascript

### What I learned

Positioning, the bane of every frontend dev's existence. To be honest I thought the accordion would be the most troubling part, but it really wasn't - with just 27 lines of code I was able to make an accordion with animated transitions. However, positioning the SVG elements and clipping them was the real challenge here. In the end, all I can say is that CSS positioning is just one of thoses things I guess I'll never really understand (will anyone, really?), but I hope to one day get so used to doing it that it'll just work? 

### Useful resources

- [W3Schools How To - Accordion](https://www.w3schools.com/howto/howto_js_accordion.asp) - Thank the gods for W3Schools. Their content is simple and straightfoward, and will usually provide you with a simple explanation for most of your doubts.
- [Chuck Dries Medium article on how to use array methods on DOM array-like elements](https://chuckdries.medium.com/traversing-the-dom-with-filter-map-and-arrow-functions-1417d326d2bc) - So this is the article where I found out about the `Array.from()` method. Pretty good stuff.
- [W3Schools How To - HR Styling](https://www.w3schools.com/howto/howto_css_style_hr.asp) - I know that styling a simple element such as a `hr` should be a no-brainer, but guess what, it wasn't. So again, thank you W3Schools!
- [W3Schools Docs - childNodes](https://www.w3schools.com/jsref/prop_node_childnodes.asp) - It's always been a bit confusing to me this concept that DOM elements have an Array-like behavior, but are actually an Object of their own, so everytime I have to manipulate the DOM using vanilla JS, I have to refer back to some documentation. Althought the official doc is the MDN one, I sometimes find the W3Schools material to be less confusing and more straightfoward.
- [Clippy - A clip-path calculator](https://bennettfeely.com/clippy/) - Hello `clip-path`, my new favorite tool for clipping images when nothing else seeems to work (I'm looking at you, `overflow: hidden`). This handy tool will calculate the apropriate `clip-path` for you, so it's a must-have.

## Author

- Frontend Mentor - [@pedrotpo](https://www.frontendmentor.io/profile/pedrotpo)

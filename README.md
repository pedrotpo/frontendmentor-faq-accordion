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

Positioning, the bane of every frontend dev's existence. To be honest I thought the accordion would be the most troubling part, but it really wasn't - with just 27 lines of code I was able to make an accordion with animated transitions. However, positioning the SVG elements and clipping them was the real challenge here.

So, what did I learn? Well, I learned - for one - to pay attention to how I write media queries when dealing with positioning. Because depending on how changes are made to the layout based on said queries, you have to remember to check if no positioning attributes are being added to the overall calculation.

Take the following code, for example:

```css
.logo {
    background-image: url("./images/illustration-woman-online-mobile.svg");
    height: 196px;
    width: 266px;
    transform:translate(-50%,-50%);
    position: absolute;
    top: -8px;
    left: 150px;
    z-index: 2;
    
    @media (min-width: 768px) {
        background-image: url("./images/illustration-woman-online-desktop.svg");
        bottom: 295px;
        right: 146px;
        height: 359px;
        width: 472px;
        clip-path: inset(0 0 0 90px);
    }
}
```

In the above snippet, the problem is that the `.logo` component is positioned in mobile screens via `top` and `left` attributes, while in desktop screens its positioning is set via `right` and `bottom`. 

See the issue yet?

Whoever said "they add up", come on up and take your prize!

The problem here is that media queries either add new attributes or overwrite existing ones. Meaning that, because no changes were made to the original (mobile) attributes, the actual values for the `.logo` component in desktop screens would look something like this:

```css
.logo {
    @media (min-width: 768px) {
        background-image: url("./images/illustration-woman-online-desktop.svg");
        height: 359px;
        width: 472px;
        transform:translate(-50%,-50%);
        position: absolute;
        top: -8px;
        left: 150px;
        bottom: 295px;
        right: 146px;
        z-index: 2;
        clip-path: inset(0 0 0 90px);
    }
}
```

In case you don't want to lose countless hours of your precious time figuring out why things are always breaking when you change screen resolution, remember to either override unused values - which in the above example would mean setting `top: 0` and `left: 0` inside the media query - or use the same positioning elements on both settings, using negative values whenever you need to "switch" the positioning reference.

I came to better understand positioning because of a very simple caveat in my accordion's code. In order to collapse the information in the accordion, it was necessary to increase the height of the div containing the accordion's content. And that's when I realized that whenever a accordion was collapsed, the logo on my container would also move, which was not at all the intended effect. So to understand what was going on, I had to better understand how anchoring and units work in relatively positioned elements. Let's talk a bit about that, shall we?

HTML elements are rendered from top to bottom, left to right, which means that whenever you increase the width of a `div`, for example, the rendered object will grow towards the right side of the screen. This is important to keep in mind when you have elements positioned absolutely, because since their positioning is dependent on their closest relatively positioned ancestor, if said ancestor were to change its dimensions due to a direct manipulation of its width and height value - or if a child element grows, causing the parent element to also expand - then the absolutely positioned element might shift its position on screen due to those changes.

Ok, so that was a bit confusing, so lets try to simplify. Consider the following code:

```html
<body>
  <div class="parent">
    <div class="child"></div>
  </div>
</body>
```

```css
.parent {
    position: relative;
    background: red;
    width: 100px;
    height: 100px;
}

.child {
  position: absolute;
  background: blue;
  width: 50px;
  height: 50px;
  top: 25px;
}
```

It will render the following result:

![red square with smaller blue square in it](https://raw.githubusercontent.com/pedrotpo/frontendmentor-faq-accordion/main/screenshots/01.png "Initial Setup")

In the squares above, the blue square is positioned in the vertical middle of the red square. So far nothing too complicated, right? So now lets turn the red square into a rectangle by increasing its height to `height: 200px`, and see what happens:

![red rectangle with smaller blue square in its top half](https://raw.githubusercontent.com/pedrotpo/frontendmentor-faq-accordion/main/screenshots/02.png "Initial Setup")

So the blue square mantains its position as intended, and the red square is now a rectangle. Neat. But what if we change the blue square to be positioned from `bottom` instead of `top`?

![red rectangle with smaller blue square in its bottom half](https://raw.githubusercontent.com/pedrotpo/frontendmentor-faq-accordion/main/screenshots/03.png "Initial Setup")

As expected, our blue square is at the bottom half of the red rectangle. Keep in mind that we could acheive the same result using `top: 125px`. Try it out for yourself and see that nothing changes on screen. 

Now here's where things get tricky: say you have a configuration similar to the image above, where you need an element to be positioned in the bottom half of another element, and that you have some other element (lets say a button with some JS attached) that will modify the parent element's height to be bigger than what it originally was. Do you position the element using `top` or `bottom`?

The answer is "it depends". If your design specifies that the child element should maintain its position regardless of how tall the parent element grows,then you should use `top`; but if you need the child element to stick with the bottom half of the element at all times, then use `bottom`. And the reason for this is because of what was explained earlier: when you specify either `top` or `bottom` you're anchoring that element according to the directions in which things are rendered on screen (top to bottom, left to right). Any increase in `height` will always stretch an element towards the bottom of the screen, and any increase in width will stretch towards the right. Anchoring an element to either `bottom` or `right` ensures that your element will always move towards one of those ends of the screen.

And why not use `position: fixed` on the blue square then? Well, in the above case that would work just fine, since our elements are smaller than the minimum screen size that we have for most devices nowadays (something around 360x768), but on bigger elements that might be an issue if you have other non-fixed elements on screen. I'm not saying not to use `position: fixed`, but make sure to use it only in cases where said elements will not compromise other elements on screen, or when you are sure that the fixed element will always ever stay at that position, regardless of screen size manipulation.

Which reminds me: be careful when using relative units, such as percentages. Percentage units will calculate where an element will be according to the current size of the element. Changing the parent element's size will inevitably move the child elements position, since it will recalculate the position  relative to the new values set for the dimensions. Relative units are awesome for responsive design, but it doesn't mean that you should always use them (as I have painfully learned in the past hours)

### Useful resources

- [W3Schools How To - Accordion](https://www.w3schools.com/howto/howto_js_accordion.asp) - Thank the gods for W3Schools. Their content is simple and straightfoward, and will usually provide you with a simple explanation for most of your doubts.
- [Chuck Dries Medium article on how to use array methods on DOM array-like elements](https://chuckdries.medium.com/traversing-the-dom-with-filter-map-and-arrow-functions-1417d326d2bc) - So this is the article where I found out about the `Array.from()` method. Pretty good stuff.
- [W3Schools How To - HR Styling](https://www.w3schools.com/howto/howto_css_style_hr.asp) - I know that styling a simple element such as a `hr` should be a no-brainer, but guess what, it wasn't. So again, thank you W3Schools!
- [W3Schools Docs - childNodes](https://www.w3schools.com/jsref/prop_node_childnodes.asp) - It's always been a bit confusing to me this concept that DOM elements have an Array-like behavior, but are actually an Object of their own, so everytime I have to manipulate the DOM using vanilla JS, I have to refer back to some documentation. Althought the official doc is the MDN one, I sometimes find the W3Schools material to be less confusing and more straightfoward.
- [Clippy - A clip-path calculator](https://bennettfeely.com/clippy/) - Hello `clip-path`, my new favorite tool for clipping images when nothing else seeems to work (I'm looking at you, `overflow: hidden`). This handy tool will calculate the apropriate `clip-path` for you, so it's a must-have.

## Author

- Frontend Mentor - [@pedrotpo](https://www.frontendmentor.io/profile/pedrotpo)

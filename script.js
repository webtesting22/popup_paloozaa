// Smooth scrolling for links
document.addEventListener("DOMContentLoaded", function () {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(scrollLink => {
        scrollLink.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector("#navbar-container").offsetHeight;
                const fromTop = window.pageYOffset || document.documentElement.scrollTop;
                const toTop = targetElement.getBoundingClientRect().top + fromTop - navbarHeight;
                scrollToSmoothly(toTop, 1000); // 1000 milliseconds = 1 second
            }
        });
    });
});

// Custom smooth scroll function
function scrollToSmoothly(to, duration) {
    const element = document.scrollingElement || document.documentElement,
          start = element.scrollTop,
          change = to - start,
          startDate = +new Date(),
          easeInOutQuad = function (t, b, c, d) {
              t /= d / 2;
              if (t < 1) return c / 2 * t * t + b;
              t--;
              return -c / 2 * (t * (t - 2) - 1) + b;
          };
    
    const animateScroll = function () {
        const currentDate = +new Date();
        const currentTime = currentDate - startDate;
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
        if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
        } else {
            element.scrollTop = to;
        }
    };
    
    animateScroll();
}

/*
  * Copyright (c) 2023 Giovanni Antonio
  * All rights reserved. This code is licensed under the MIT.
  * Unauthorized use, modification, or distribution is strictly prohibited.
*/

// document.querySelectorAll(".picture").forEach((p, i) => {
// 	let r = Math.random() * 255;
// 	let g = Math.random() * 255;
// 	let b = Math.random() * 255;
// 	let color = `rgba(${r},${g},${b},1)`;
// 	p.style.backgroundColor = color;
// 	p.style.color = `${brightness(r, g, b) < 130 ? "#fff" : "#000"}`;
// 	// p.textContent = p.style.backgroundColor;
// });

const root = document.documentElement;

let close = document.querySelector("#close");
let gallery = document.querySelector(".gallery");
let current = 0;

// window.addEventListener(
// 	"resize",
// 	function () {
// 		setTimeout(function () {
// 			// update();
// 		}, 1000);
// 	},
// 	{ passive: true }
// );

function update() {
	if (!current) return;
	let a = current.getBoundingClientRect();
	let b = document.querySelector(".picture-clone");
	b.style.width = a.width + "px";
	b.style.height = a.height + "px";
	let c = b.getBoundingClientRect();

	let p = dist(a, c);
	let s = scale(a);
	let t = `translate(${(p.x / window.innerWidth) * 100}vw,${
		(p.y / window.innerHeight) * 100
	}vh) scale(${s.z}) translateZ(0)`;
console.table(s)
	current.style.transform = t;
}

function reset() {
	let t = `translate(0,0) scale(1,1)`;
	current.style.transform = t;
	gallery.classList.add("close");
	setTimeout(() => {
		current.classList.remove("active");
		current = 0;
		gallery.classList.remove("open");
		gallery.classList.remove("close");
		root.classList.remove("fs");
	}, 2000);
}

close.addEventListener("click", reset);

gallery.addEventListener("click", (e) => {
	if (e.target === e.currentTarget) return;

	if (e.target.classList.contains("picture")) {
		// create a function that works when window resizes and update target position

		if (!current) {
			// first active
			current = e.target;
		} else {
			// remove old and init new
			current.classList.remove("active");
			current = e.target;
		}

		// no scroll fullscreen
		root.classList.add("fs");
		// activate now
		current.classList.add("active");

		gallery.classList.toggle("open");

		update();
		e.preventDefault();
		e.stopPropagation();
	}
});

function scale(a) {
	let v =
		window.innerWidth >= window.innerHeight
			? window.innerWidth / a.width
			: window.innerHeight / a.height;
	return {
		x: window.innerWidth / a.width,
		y: window.innerHeight / a.height,
		z: v
	};
}

function dist(a, b) {
	return {
		x: b.x - a.x,
		y: b.y - a.y
	};
}

function brightness(r, g, b) {
	var light = Math.sqrt(0.241 * r * r + 0.691 * g * g + 0.068 * b * b);
	return light;
}

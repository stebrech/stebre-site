// https://codepen.io/darrielleevans/pen/gOjgKBY

const elements = document.querySelectorAll(".animate__animated");
const options = {
	root: null,
	rootMargin: "0px",
	threshold: 0.05,
};
const callbacks = (entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("animate__fadeInUp");
		}
	});
};
let observer = new IntersectionObserver(callbacks, options);
elements.forEach((element) => {
	observer.observe(element);
});

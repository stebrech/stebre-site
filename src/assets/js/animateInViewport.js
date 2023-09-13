// const observer = new IntersectionObserver((entries) => {
// 	entries.forEach((entry) => {
// 		const square = entry.target.querySelector(".slideInUp");

// 		if (entry.isIntersecting) {
// 			square.classList.add("animate__slideInUp");
// 			return; // if we added the class, exit the function
// 		}

// 		// We're not intersecting, so remove the class!
// 		square.classList.remove("animate__slideInUp");
// 	});
// });

// observer.observe(document.querySelector(".animateContainer"));

// const element = document.querySelector(".animate__slideInUp");
// const observer = new IntersectionObserver((entries) => {
// 	element.classList.toggle("animation", entries[0].isIntersecting);
// });

// observer.observe(element);

$(document).ready(function () {
	/** ---------------------------- //
	 *  @group viewport trigger script
	 * for adding or removing classes from elements in view within viewport
	 */

	var $animationElements = $(".animate__animated");
	var $window = $(window);

	// ps: Let's FIRST disable triggering on small devices!
	var isMobile = window.matchMedia("only screen and (max-width: 768px)");
	if (isMobile.matches) {
		$animationElements.removeClass("animate__animated");
	}

	function checkIfInView() {
		var windowHeight = $window.height();
		var windowTopPosition = $window.scrollTop();
		var windowBottomPosition = windowTopPosition + windowHeight;

		$.each($animationElements, function () {
			var $element = $(this);
			var elementHeight = $element.outerHeight();
			var elementTopPosition = $element.offset().top;
			var elementBottomPosition = elementTopPosition + elementHeight;

			//check to see if this current container is within viewport
			if (
				elementBottomPosition >= windowTopPosition &&
				elementTopPosition <= windowBottomPosition
			) {
				$element.addClass("in-view");
			} else {
				$element.removeClass("in-view");
			}
		});
	}

	$window.on("scroll resize", checkIfInView);
	$window.trigger("scroll");
});

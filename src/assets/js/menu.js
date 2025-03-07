/* https://github.com/thecodercoder/space-cats-hamburger-menu */

const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");
const media = window.matchMedia("(width < 40rem)");
const menuContainer = document.querySelector(".menu-container");
const main = document.querySelector("main");
const body = document.querySelector("body");

function openMobileMenu() {
	btnOpen.setAttribute("aria-expanded", "true");
	menuContainer.removeAttribute("inert");
	menuContainer.removeAttribute("style");
	main.setAttribute("inert", "");
	bodyScrollLockUpgrade.disableBodyScroll(body);
	btnClose.focus();
}

function closeMobileMenu() {
	btnOpen.setAttribute("aria-expanded", "false");
	menuContainer.setAttribute("inert", "");
	main.removeAttribute("inert");
	bodyScrollLockUpgrade.enableBodyScroll(body);
	btnOpen.focus();

	setTimeout(() => {
		menuContainer.style.transition = "none";
	}, 500);
}

function setupTopNav(e) {
	if (e.matches) {
		// is mobile
		console.log("is mobile");
		menuContainer.setAttribute("inert", "");
		menuContainer.style.transition = "none";
	} else {
		// is tablet/desktop
		console.log("is desktop");
		closeMobileMenu();
		menuContainer.removeAttribute("inert");
	}
}

setupTopNav(media);

btnOpen.addEventListener("click", openMobileMenu);
btnClose.addEventListener("click", closeMobileMenu);

media.addEventListener("change", function (e) {
	setupTopNav(e);
});

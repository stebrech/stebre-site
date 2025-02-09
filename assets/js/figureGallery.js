const figures = document.querySelectorAll("figure");
figures.forEach((figure, index) => {
	figure.setAttribute("figIndex", index + 1);
});
const firstFigureInARow = document.querySelectorAll(":not(figure)+figure:has(+ figure)");
const lastFigureInARow = document.querySelectorAll(
	"figure:has(+ figure) ~ figure:has(+ :not(figure))",
);
console.log(firstFigureInARow);
console.log(lastFigureInARow);

firstFigureInARow.forEach((figure, index) => {
	currentContainer = document.createElement("div");
	currentContainer.classList.add("figureGallery");

	figure.parentNode.insertBefore(currentContainer, figure);

	const firstIndex = figure.getAttribute("figIndex");
	const lastIndex = lastFigureInARow[index].getAttribute("figIndex");
	console.log(`First figure index: ${firstIndex}, Last figure index: ${lastIndex}`);

	let count = 0;

	for (let i = firstIndex; i <= lastIndex; i++) {
		const figure = document.querySelector(`figure[figIndex="${i}"]`);
		currentContainer.appendChild(figure);
		count++;
	}
});

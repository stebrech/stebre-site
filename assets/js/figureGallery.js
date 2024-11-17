// Alle figure-Elemente auf der Seite auswählen
const figures = document.querySelectorAll("figure");

// Container-Wrapper hinzufügen
function wrapFiguresInContainer() {
	let currentContainer = null; // Aktueller Container für benachbarte Figuren

	figures.forEach((figure, index) => {
		const prevFigure = figures[index - 1];

		// Prüfen, ob das aktuelle figure direkt auf ein anderes folgt
		if (prevFigure && figure.previousElementSibling === prevFigure) {
			if (!currentContainer) {
				// Neuen Container erstellen
				currentContainer = document.createElement("div");
				currentContainer.classList.add("figureGallery");

				// Das vorherige und das aktuelle figure in den Container verschieben
				prevFigure.parentNode.insertBefore(currentContainer, prevFigure);
				currentContainer.appendChild(prevFigure);
			}

			// Das aktuelle figure in den Container verschieben
			currentContainer.appendChild(figure);
		} else {
			// Container zurücksetzen, wenn keine direkte Nachbarschaft vorliegt
			currentContainer = null;
		}
	});
}

// Funktion ausführen
wrapFiguresInContainer();

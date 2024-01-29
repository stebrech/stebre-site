module.exports = {
	currentDate() {
		let today = new Date();
		return today;
	},
	currentYear() {
		let today = new Date();
		return today.getFullYear();
	},

	experience() {
		return new Date().getFullYear() - 2000;
	},
};

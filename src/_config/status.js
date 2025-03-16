export default function (eleventyConfig) {
	eleventyConfig.addPreprocessor("status", "*", (data) => {
		if (
			data.status !== "done" &&
			data.status !== "needs-translation" &&
			process.env.ELEVENTY_RUN_MODE === "build"
		) {
			return false;
		}
	});
}

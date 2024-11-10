import dotenv from "dotenv";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import deepl from "deepl-node";

// Load environment variables from .env file
dotenv.config();

const AUTH_KEY = process.env.DEEPL_API_KEY;
const TRANSLATOR = new deepl.Translator(AUTH_KEY);

// console.log(fs.readdirSync(path.resolve("./de"), { recursive: true }));

const posts = fs
	.readdirSync(path.resolve("./de"), { recursive: true })
	.filter((file) => file.endsWith(".md"))
	.map((file) => {
		// count the number of slashes in the file path
		const count = (file.match(/\//g) || []).length;
		// if the file path contains more than one slash, it is a subdirectory
		if (count > 0) {
			const filename = file.split("/")[count];
			const subdirectory = file.split("/")[0];
			return { name: filename, subdirectory: subdirectory + "/" };
		} else {
			const filename = file.split("/")[0];
			return { name: filename, subdirectory: "/" };
		}
	});

// loop through all the markdown files in the bookmarks folder
posts.forEach((post) => {
	const srcContent = fs.readFileSync(path.resolve(`./de/${post.subdirectory}${post.name}`));
	const srcData = matter(srcContent);

	if (srcData.data.status === "translate") {
		fs.copyFileSync(
			path.resolve(`./de/${post.subdirectory}${post.name}`),
			path.resolve(`./en/${post.subdirectory}${post.name}`),
		);
		let destContent = fs.readFileSync(
			path.resolve(`./en/${post.subdirectory}${post.name}`),
			"utf-8",
		);

		// Update src content
		srcData.data.status = "done";
		fs.writeFileSync(
			path.resolve(`./de/${post.subdirectory}${post.name}`),
			matter.stringify(srcData),
			"utf-8",
		);

		// Call the translation API and write the translated content
		const apiCall = async () => {
			try {
				const result = await TRANSLATOR.translateText(destContent, "de", "en-US");
				destContent = result.text;
				const destData = matter(destContent);
				destData.data.status = "needs-review";
				fs.writeFileSync(
					path.resolve(`./en/${post.subdirectory}${post.name}`),
					matter.stringify(destData),
					"utf-8",
				);
				console.log("Translation complete:", post.name);
			} catch (error) {
				console.error("Translation error:", error);
			}
		};
		apiCall();
	}
});

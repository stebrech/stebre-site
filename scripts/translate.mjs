import dotenv from "dotenv";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import deepl from "deepl-node";

// Load environment variables from .env file
dotenv.config();

const authKey = process.env.DEEPL_API_KEY;
const deepL = new deepl.Translator(authKey);

// console.log(fs.readdirSync(path.resolve("./de"), { recursive: true }));

const mdFilesDePath = path.resolve("./src/content/de/");
const mdFilesEnPath = path.resolve("./src/content/en/");

const mdFilesDe = fs
	.readdirSync(mdFilesDePath, { recursive: true })
	.filter((file) => file.endsWith(".md"))
	.map((file) => {
		const srcPath = path.join(mdFilesDePath, file);
		const destPathEn = path.join(mdFilesEnPath, file);
		const fileName = file.split("/")[1];
		const rootFolder = file.split("/")[0];
		return {
			srcPath: srcPath,
			destPathEn: destPathEn,
			fileName: fileName,
			postType: rootFolder + "/",
		};
	});

mdFilesDe.forEach((file) => {
	const srcContent = fs.readFileSync(file.srcPath);
	const srcContentMatter = matter(srcContent);

	if (srcContentMatter.data.status === "translate") {
		fs.copyFileSync(file.srcPath, file.destPathEn);

		// Update status of src content
		const updatedSrcContent = srcContent.toString().replace(/status: translate/g, "status: done");
		fs.writeFileSync(file.srcPath, updatedSrcContent, "utf-8");

		// Translate dest content
		let destContent = fs.readFileSync(file.destPathEn, "utf-8");
		const apiCall = async () => {
			try {
				const result = await deepL.translateText(destContent, "de", "en-US");
				destContent = result.text;

				const updatedDestContent = destContent
					.toString()
					.replace(/status: translate/g, "status: needs-review");
				fs.writeFileSync(file.destPathEn, updatedDestContent, "utf-8");

				console.log("Translation complete:", file.fileName);
			} catch (error) {
				console.error("Translation error:", error);
			}
		};
		apiCall();
	}
});

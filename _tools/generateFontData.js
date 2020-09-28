// Copyright 2019 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// 	https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require("fs");
const util = require("util");
const path = require("path");
const {
	parseFontFile,
	buildStylesheet,
	getSelector,
	guessFontStyle
} = require("specimen-skeleton-support");

const srcDirectory = path.resolve(__dirname, "../", "src");
const fontsDirectory = path.resolve(srcDirectory, "fonts");
const dataDirectory = path.resolve(srcDirectory, "_data/fonts");
const metaDataPath = path.resolve(srcDirectory, "_data/", "fontdata.json");
const fontsStylesheetPath = path.resolve(srcDirectory, "css", "fonts.css");

const assert = (condition, message) => {
	if (!condition) {
		throw new Error(message);
	}
};

const _appendFile = util.promisify(fs.appendFile);
const _writeFile = util.promisify(fs.writeFile);
const writeFile = (path, contents, append) => {
	console.info("Writing", path);
	if (append) {
		return _appendFile(path, contents);
	}
	return _writeFile(path, contents);
};

const writeDataFile = async (filename, fontName, data) => {
	fs.mkdir(path.join(dataDirectory, fontName), { recursive: true }, () => {
		const dataFilePath = path.join(dataDirectory, fontName, filename);
		const fileContents = JSON.stringify(data, null, 4);
		return writeFile(dataFilePath, fileContents);
	});
};

const writeDataFiles = async fontData => {
	const promises = Object.entries(fontData.data).map(([type, data]) => {
		return writeDataFile(`${type}.json`, getSelector(fontData, true), data);
	});

	return Promise.all(promises);
};

const writeStylesheet = async (fontData, fontFilePath) => {
	const fontUrl = path.relative(
		path.dirname(fontsStylesheetPath),
		fontFilePath
	);
	let stylesheet = buildStylesheet(fontData, fontUrl).toString();
	stylesheet += "\n\n";
	return writeFile(fontsStylesheetPath, stylesheet, true);
};

const findFontFile = async directory => {
	const fontFiles = (await util.promisify(fs.readdir)(directory)).filter(
		f => path.extname(f) == ".woff2"
	);

	assert(
		fontFiles.length > 0,
		`No WOFF2 font files found. Place your WOFF2 fonts in ${path.relative(
			process.cwd(),
			directory
		)}.`
	);

	const paths = fontFiles.map(fontFile => ({
		name: path.basename(fontFile, path.extname(fontFile)),
		path: path.resolve(fontsDirectory, fontFile)
	}));

	return paths;
};

const getMetaData = async (fontData, fontFile) => {
	return {
		name: fontFile.name,
		selector: getSelector(fontData, true),
		style: guessFontStyle(fontFile.name)
	};
};

const main = async () => {
	const fontFiles = process.argv[2] || (await findFontFile(fontsDirectory));

	// Clear out old data files
	console.log("Deleting old data files");
	fs.rmdirSync(dataDirectory, { recursive: true });

	// Initialise files
	writeFile(
		fontsStylesheetPath,
		`/* Generated by the Specimen Skeleton */\n`
	);

	let metaData = [];
	for (const fontFile of fontFiles) {
		const fontData = await parseFontFile(fontFile.path);
		metaData.push(await getMetaData(fontData, fontFile));
		await Promise.all([
			writeDataFiles(fontData),
			writeStylesheet(fontData, fontFile.path)
		]);
	}

	const fileContents = JSON.stringify(metaData, null, 4);
	writeFile(metaDataPath, fileContents);
};

main().catch(e => {
	process.exitCode = 1;
	console.error("Failed to generate font data.", e);
});

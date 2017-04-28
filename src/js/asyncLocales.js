const path = require('path');
const fs = require('fs');
const md5File = require('md5-file/promise');

const showError = error => console.log(error);

module.exports = function () {
	const localesPath = path.resolve('src/locales');

	// get all languages by oarsing locales folder
	fs.readdir(localesPath, (err, languages) => {
		if (err) {
			showError(err);
		} else {
			// for every available language (use only folders for names)...
			const t = languages
				.filter(language => fs.statSync(path.resolve(localesPath, language)).isDirectory())
				.map(language =>
					new Promise((resolve, reject) => {
						// ...get namespace filename and file's md5 hash 
						fs.readdir(path.resolve(localesPath, language), (err, nsFiles) => {
							if (err) {
								reject(err);
							} else {
								Promise.all(
									nsFiles.map(nsFile => md5File(path.resolve(localesPath, language, nsFile))
										.then(hash => ({
											[path.parse(nsFile).name]: hash.slice(0, 8),
										})))
								)
								.then(filenamesWithHashes => resolve({[language]: filenamesWithHashes}))
								.catch(err => reject(err));
							}
						})
					})
				);
			Promise.all(t)
				.then(files => {
					console.log(files[0], files[1], files[2]);
					fs.writeFile(
						path.resolve('src/locales', 'localesManifest.json'),
						JSON.stringify(files),
						err => err && showError(err)
					);
				})
				.catch(showError);
		}
	});
}

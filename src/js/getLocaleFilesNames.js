const fs = require('fs');
const path = require('path');
const md5File = require('md5-file');

const showError = (err) => console.error(err);

module.exports = function() {
	try {
		const localesPath = path.resolve('src/locales');
		const languages = fs.readdirSync(localesPath);

		return languages
			.filter(file => fs.statSync(path.resolve(localesPath, file)).isDirectory())
			.map(language => {
				const langPath = path.resolve(localesPath, language);
				const nsFiles = fs.readdirSync(langPath);
				
				return nsFiles.map(nsFile => ({
					[path.parse(nsFile).name]: md5File.sync(path.resolve(langPath, nsFile)),
				}));
			});
	} catch (error) {
		showError(error);
	}
}
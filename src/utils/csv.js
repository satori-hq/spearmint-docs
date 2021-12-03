/// from: https://stackoverflow.com/a/68146412/1060487

/** Convert a 2D array into a CSV string
 */
export function arrayToCsv(data) {
	return data.map(row =>
		row
			.map(String)  // convert every value to String
			.map(v => v.replaceAll('"', '""'))  // escape double colons
			.map(v => `"${v}"`)  // quote it
			.join(',')  // comma-separated
	).join('\r\n');  // rows starting on new lines
}

/** Download contents as a file
* Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
*/
export function downloadBlob(content, filename, contentType) {
	// Create a blob
	var blob = new Blob([content], { type: contentType });
	var url = URL.createObjectURL(blob);

	// Create a link to download it
	var pom = document.createElement('a');
	pom.href = url;
	pom.setAttribute('download', filename);
	pom.click();
}
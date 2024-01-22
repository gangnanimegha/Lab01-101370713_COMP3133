const fs = require('fs');
const csv = require('csv-parser');

// Read CSV file using fs.createReadStream and csv-parser
fs.createReadStream('input_countries.csv')
   .pipe(csv())
   .on('data', (row) => {
      // Filter and write data to canada.txt and usa.txt
      if (row.country.toLowerCase() === 'canada') {
         fs.appendFileSync('canada.txt', `${Object.values(row).join(',')}\n`);
      } else if (row.country.toLowerCase() === 'united states') {
         fs.appendFileSync('usa.txt', `${Object.values(row).join(',')}\n`);
      }
   })
   .on('end', () => {
      console.log('Processing complete.');
   });

// Delete canada.txt and usa.txt if they exist
try {
   fs.unlinkSync('canada.txt');
   fs.unlinkSync('usa.txt');
} catch (err) {
   // Ignore if the files don't exist
}

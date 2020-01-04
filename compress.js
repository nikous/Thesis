// Require copress alogrithms brotli and zlib 
const brotli = require('brotli');
const fs = require('fs'); // File system module allows you to work with the file system on your computer.
const zlib = require('zlib');


const brotliSettings = {

    extension: 'br',
    skipLarger: true,
    mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
    quality: 10, // 0 - 11,
    lgwin: 12 // default
};

// Choose files from these folders to  compress
var dirs = ['../thesis', 'public/css', 'routes', 'views', 'models', 'config', 'public/js'];

// For  each dir if file ends to .js, .css, .ejs, .html compress them
dirs.forEach(dir => {

    fs.readdirSync(dir).forEach(file => {

        if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.ejs')) {

            // brotli
            const result = brotli.compress(fs.readFileSync(dir + '/' + file), brotliSettings);
            fs.writeFileSync(dir + '/' + file + '.br', result);

            // gzip
            const fileContents = fs.createReadStream(dir + '/' + file);
            const writeStream = fs.createWriteStream(dir + '/' + file + '.gz');
            const zip = zlib.createGzip();

            fileContents

                .pipe(zip)
                .on('error', err => console.error(err))
                .pipe(writeStream)
                .on('error', err => console.error(err));
        }
    })
});
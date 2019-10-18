require('@babel/register')({
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-react"]
  ]
});
// const argv = process.argv.slice(2);
// const example = argv[0];

const showtime = require('./src/index.js');

showtime.orgfile_to_renderloop(process.argv.slice(2)[0])

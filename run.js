require('@babel/register')({
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-react"]
  ]
});
// const argv = process.argv.slice(2);
// const example = argv[0];

require('./src/index.js');

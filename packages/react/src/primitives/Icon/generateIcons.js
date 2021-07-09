const fs = require("fs-extra");
const path = require("path");

const ICONS_PATH = path.resolve("../../../../../material-design-icons/src");

// To grab icon name and content in a directory
// {iconName: content}
const icons = {};
fs.readdirSync(ICONS_PATH, { withFileTypes: true }, function(err, files) {
  if (err) {
    console.log(err);
    return;
  }
  // how to get the icon name and read the content :()
  files.
});

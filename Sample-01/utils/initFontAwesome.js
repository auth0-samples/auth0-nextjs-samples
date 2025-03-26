const { faLink, faPowerOff, faUser } = require('@fortawesome/free-solid-svg-icons');
const { library } = require('@fortawesome/fontawesome-svg-core');

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
}

module.exports = initFontAwesome;

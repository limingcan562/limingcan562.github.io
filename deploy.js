const ghpages = require('gh-pages');
const colors = require('colors');
const onlineUrl = 'https://limingcan562.github.io/'
const txtStart = 'dist deploying...';
const txtEnd = 'dist successfully deployed!';
const txtView = 'preview in';


console.log('[deploy]'.yellow, txtStart.green);
ghpages.publish('./dist', {
    branch: 'gh-pages',
    repo: 'https://github.com/limingcan562/limingcan562.github.io.git'
}, (err) => {
    if (err) {
        console.log('[error]'.red, JSON.stringify(err).red);
    } else {
        console.log('[deploy]'.yellow, txtEnd.green);
        console.log('[deploy]'.yellow, `${txtView} ${onlineUrl.green}`);
    }
});
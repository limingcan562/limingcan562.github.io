const ghpages = require('gh-pages');
const colors = require('colors');
const onlineUrl = 'https://limingcan562.github.io/'
const txtStart = 'dist deploying...';
const txtEnd = 'dist successfully deployed!';
const txtView = 'preview in';


console.log('[deploy]'.bold.yellow, txtStart.bold.yellow);
ghpages.publish('./dist', {
    branch: 'gh-pages',
    repo: 'https://github.com/limingcan562/limingcan562.github.io.git',
    dotfiles: true,
    message: 'deploy'
}, err => {
    if (err) {
        console.log('[error]'.bold.red, JSON.stringify(err).red);
    } else {
        console.log('[deploy]'.bold.green, txtEnd.bold.green);
        console.log('[deploy]'.bold.green, `${txtView.bold.green} ${onlineUrl.underline.white}`);
    }
});


const insta = require('./bot');
const reader = require('readline-sync'); //npm install readline-sync

(async () => {

    const USERNAME = 'dbrno';
    const PASSWORD = 'brenobrl';

    const TAG = reader.question('Hashtag: ');
    
    await insta.initialize();
    await insta.bot(USERNAME, PASSWORD, TAG);

})();
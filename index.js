const insta = require('./bot');
const reader = require('readline-sync'); //npm install readline-sync

(async () => {

    const USERNAME = 'YOUR_USER';
    const PASSWORD = 'YOUR_PASSOWRD';

    const TAG = reader.question('Hashtag: ');
    
    await insta.initialize();
    await insta.bot(USERNAME, PASSWORD, TAG);

})();

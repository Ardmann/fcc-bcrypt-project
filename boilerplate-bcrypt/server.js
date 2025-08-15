'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const bcrypt      = require('bcrypt'); // ✅ bcrypt nativo
const app         = express();

fccTesting(app);

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

//START_ASYNC
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) throw err;
  console.log('Async hash:', hash);

  bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
    if (err) throw err;
    console.log('Async password match:', result);
  });

  bcrypt.compare(someOtherPlaintextPassword, hash, (err, result) => {
    if (err) throw err;
    console.log('Async wrong password match:', result);
  });
});
//END_ASYNC

//START_SYNC
const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log('Sync hash:', hashSync);

console.log('Sync password match:', bcrypt.compareSync(myPlaintextPassword, hashSync));
console.log('Sync wrong password match:', bcrypt.compareSync(someOtherPlaintextPassword, hashSync));
//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port:", PORT);
});

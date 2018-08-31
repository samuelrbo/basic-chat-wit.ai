require('dotenv').config({ silent: true });
const { Wit, log } = require('node-wit');

console.log(process.env);

const client = new Wit({
  accessToken: process.env.WITAI_SERVER_ACCESS_TOKEN,
  logger: new log.Logger(log.DEBUG),
});

client.message('Obrigado', {})
  .then((data) => {
    console.log(data);
    console.log('Yay, got Wit.ai response:', JSON.stringify(data));
  })
  .catch((err) => {
    console.log(err);
  });

console.log(client.message('set an alarm tomorrow at 7am'));

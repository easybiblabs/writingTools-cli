const https = require('https');
const { githubHost } = require ('./githubConst');

const accessToken   = process.env.GITHUB_ACCESS_TOKEN;

module.exports = (path, method, data) => {
  return new Promise((resolve) => {
    const options = {
      hostname: githubHost,
      method: method,
      path: `${path}`,
      body: data,
      headers: { 'Authorization': `token ${accessToken}`, 'user-agent': 'Chegg WT Release'},
    };

    const req = https.request(options, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        resolve(JSON.parse(body))
      });
    });
    req.on('error', d => console.log(`[error] : ${JSON.stringify(d)}`));
    req.end();
  })
};

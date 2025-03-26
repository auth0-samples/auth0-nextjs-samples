require('dotenv').config({ path: './.env.local' });

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const port = process.env.API_PORT || 3001;
const baseUrl = process.env.APP_BASE_URL;
const domain = process.env.AUTH0_DOMAIN;

if (!baseUrl) {
  throw new Error('Please make sure that the file .env.local is in place and populated');
}

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: baseUrl }));

app.use((req, res, next) => {
  console.log('Authorization header:', req.headers.authorization);
  next();
});


const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`
  }),
  audience: '',
  issuer: `https://${domain}/`,
  algorithms: ['RS256']
});

app.get('/api/shows', checkJwt, (req, res) => {
  res.send({
    msg: 'Your access token was successfully validated!'
  });
});

const server = app.listen(port, () => console.log(`API Server listening on port ${port}`));
process.on('SIGINT', () => server.close());

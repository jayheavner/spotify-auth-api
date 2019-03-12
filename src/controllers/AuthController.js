import querystring from 'querystring';
import request from 'request';

import config from './../../config';
import utils from './../utils';

require('dotenv').config();

const AuthController = {
  login: function(req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const state = req.query.callback;
    console.log('');
    console.log('----------------------------------');
    console.log('/login');
    console.log(`state > ${state}`);
    console.log(`${new Date()} `);
    console.log(`url >${fullUrl}`);
    console.log(`spotify clientId => ${process.env.clientId}`);
    console.log(`spotify clientSecret => ${process.env.clientSecret}`);
    console.log('----------------------------------');
    console.log('');

    const url =
      config.spotifyAccountsAPI +
      'authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.clientId,
        scope: config.scope,
        redirect_uri: config.redirectUri,
        state: state
      });

    console.log('');
    console.log('----------------------------------');
    console.log(`      url > ${url}`);
    console.log('----------------------------------');
    console.log('');

    res.redirect(url);
    // res.status(200).json(url);
  },

  callback: function(req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const code = req.query.code || null;
    const state = req.query.state || null;
    console.log('');
    console.log('----------------------------------');
    console.log('      IN CALLBACK');
    console.log('');
    console.log(`fullUrl > ${fullUrl}`);
    console.log(`state > ${state}`);
    console.log('----------------------------------');
    console.log('');

    if (state === null) {
      res.redirect(
        '/#' +
          querystring.stringify({
            error: 'state_mismatch'
          })
      );
    } else {
      const authOptions = {
        url: config.spotifyAccountsAPI + 'api/token',
        form: {
          code: code,
          redirect_uri: config.redirectUri,
          grant_type: 'authorization_code'
        },
        headers: {
          Authorization:
            'Basic ' +
            new Buffer(
              process.env.clientId + ':' + process.env.clientSecret
            ).toString('base64')
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const { access_token, refresh_token, expires_in } = body;

          console.log('');
          console.log('----------------------------------');
          console.log(` access_token > ${access_token}`);
          console.log('----------------------------------');
          console.log('----------------------------------');
          console.log(` redirecting to > ${state}`);
          console.log('----------------------------------');
          console.log('');

          // res.send({
          //   access_token: access_token,
          //   refresh_token: refresh_token,
          //   expires_in: expires_in
          // });

          res.redirect(
            `${state}/?` +
              querystring.stringify({
                access_token,
                refresh_token,
                expires_in
              })
          );
        } else {
          res.redirect(
            '/#' +
              querystring.stringify({
                error: 'invalid_token'
              })
          );
        }
      });
    }
  },

  refreshToken: function(req, res) {
    console.log('');
    console.log('----------------------------------');
    console.log('      IN refreshToken');
    console.log('----------------------------------');
    console.log('');

    const refresh_token = req.query.refresh_token;
    console.log('');
    console.log('----------------------------------');
    console.log(` refresh_token > ${refresh_token}`);
    console.log('----------------------------------');
    console.log('');

    const authOptions = {
      url: config.spotifyAccountsAPI + 'api/token',
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(
            process.env.clientId + ':' + process.env.clientSecret
          ).toString('base64')
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const expires_in = body.expires_in;

        res.send({
          access_token: access_token,
          expires_in: expires_in
        });
      }
    });
  },
  sonosHook: function(req, res) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    //console.log(`  url > ${fullUrl}`);
    //console.log(req.body);
    res.send(req.body);
  },

  generic: function(req, res) {
    console.log('GENERIC');
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(`  url > ${fullUrl}`);
    //console.log(req);
    //console.log(req.body);
  }
};

export default AuthController;

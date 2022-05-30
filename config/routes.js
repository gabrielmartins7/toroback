module.exports = app => {
  app.post('/signup', app.api.user.save);
  app.post('/signin', app.api.auth.signin);
  app.post('/spb/events', app.api.events.save);

  app
    .route('/buy/stock')
    .all(app.config.passport.authenticate())
    .post(app.api.stock.save);
};

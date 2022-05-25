const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
    });
  };

  const save = (req, res) => {
    obterHash(req.body.password, hash => {
      const password = hash;
      console.warn('aqui');
      console.warn(req.body);
      app
        .db('users')
        .insert({
          name: req.body.name,
          cpf: req.body.cpf,
          password,
        })
        .then(_ => res.status(200).send('USUARIO CADASTRADO COM SUCESSO'))
        .catch(err => res.status(400).json(err));
    });
  };

  return { save };
};

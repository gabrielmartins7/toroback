const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const signin = async (req, res) => {
    if (!req.body.cpf || !req.body.password) {
      return res.status(400).send('Dados incompletos');
    }

    const user = await app
      .db('users')
      .whereRaw('cpf = ?', req.body.cpf)
      .first();

    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).send('A senha informada é inválida!');
        }

        const payload = {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
        };

        res.json({
          name: user.name,
          cpf: user.cpf,
          token: jwt.encode(payload, authSecret),
        });
      });
    } else {
      res.status(400).send('Usuário não cadastrado!');
    }
  };

  return { signin };
};

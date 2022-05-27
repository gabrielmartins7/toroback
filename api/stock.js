module.exports = app => {
  const save = async (req, res) => {
    try {
      let user = await app.db('users').where({ account: req.body.account });
      let value_total = req.body.value * req.body.qtd;
      if (user[0].amount - value_total >= 0) {
        const operation = await app
          .db('users')
          .where({ account: req.body.account })
          .decrement({ amount: value_total });
        if (operation) {
          let amount = await app
            .db('users')
            .where({ account: req.body.account });
          return res.json({
            saldo: amount[0].amount,
            stock: req.body.stock,
            qtd: req.body.qtd,
          });
        }
      } else {
        res.status(400).json({ error: 'Saldo insuficiente' });
      }
      res.status(200).send('USUARIO CADASTRADO COM SUCESSO');
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }

    /* app
      .db('users')
      .where({ account: req.body.account })
      .then(usu => {
        let value_total = req.body.value * req.body.qtd;
        if (usu[0].amount - value_total >= 0) {
          app
            .db('users')
            .where({
              account: req.body.account,
            })
            .decrement({ amount: value_total })
            .then(tasks =>
              res.status(200).send('USUARIO CADASTRADO COM SUCESSO')
            )
            .catch(err => res.status(400).json(err));
        }
        console.log('amount1', amount);
      })
      .catch(err => res.status(400).json(err)); */
  };

  return { save };
};

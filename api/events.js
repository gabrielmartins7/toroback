const user = require('./user');

module.exports = app => {
  const save = async (req, res) => {
    let user = await app
      .db('users')
      .where({ account: req.body.target.account });
    if (!user || user.length === 0) {
      const msg = `Não foi encontrada a conta ${req.body.target.account}.`;
      return res.status(400).json({ error: msg });
    }
    if (req.body.target.bank != 352) {
      return res.status(400).send('Banco invalido');
    }
    if (req.body.target.branch != 0001) {
      return res.status(400).send('Agencia invalida');
    }
    let events = await app.db('events').insert({
      origin_bank: parseInt(req.body.origin.bank),
      origin_branch: parseInt(req.body.origin.branch),
      origin_cpf: req.body.origin.cpf,
      target_bank: parseInt(req.body.target.bank),
      target_branch: parseInt(req.body.target.branch),
      target_account: req.body.target.account,
      amount: parseFloat(req.body.amount),
      event: req.body.event,
    });
    if (events) {
      let operation = await app
        .db('users')
        .where({ account: req.body.target.account })
        .where({ cpf: req.body.origin.cpf })
        .increment({ amount: req.body.amount });
      if (operation) {
        let amount = await app
          .db('users')
          .where({ account: req.body.target.account });
        return amount
          ? res.json({ amount: amount[0].amount })
          : res.status(400).json({ error: 'Error ao executar a operação' });
      }
    } else {
      return res.status(400).json({ error: 'Error ao executar a operação' });
    }
  };

  return { save };
};

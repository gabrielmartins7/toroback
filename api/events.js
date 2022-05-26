module.exports = app => {
  const save = (req, res) => {
    app
      .db('users')
      .where({ account: parseInt(req.body.target.account) })
      .then(usu => {
        if (!usu || usu.length === 0) {
          const msg = `Não foi encontrada a conta ${req.body.target.account}.`;
          res.status(400).send(msg);
        }
      })
      .catch(err => res.status(400).json(err));
    if (req.body.target.bank != 352) {
      return res.status(400).send('Banco invalido');
    }
    if (req.body.target.branch != 1) {
      return res.status(400).send('Agencia invalida');
    }
    app
      .db('events')
      .insert({
        origin_bank: parseInt(req.body.origin.bank),
        origin_branch: parseInt(req.body.origin.branch),
        origin_cpf: req.body.origin.cpf,
        target_bank: parseInt(req.body.target.bank),
        target_branch: parseInt(req.body.target.branch),
        target_account: parseInt(req.body.target.account),
        amount: parseFloat(req.body.amount),
        event: req.body.event,
      })
      .then(_ => {
        app
          .db('users')
          .where({
            account: parseInt(req.body.target.account),
          })
          .where({
            cpf: req.body.origin.cpf,
          })
          .increment({ amount: req.body.amount })
          .then(tasks => res.json(tasks))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  };

  return { save };
};

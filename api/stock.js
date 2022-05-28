const stock = require('../stocks.json');
module.exports = app => {
  let value_stock = 0;
  let name_stock = '';
  const save = async (req, res) => {
    try {
      let user_info = await app
        .db('users')
        .where({ account: req.body.account });
      if (!user_info || user_info.length === 0) {
        const msg = `Não foi encontrada a conta ${req.body.account}.`;
        return res.status(400).json({ error: msg });
      }
      stock.forEach(element => {
        if (element.name == req.body.stock) {
          value_stock = element.value;
          name_stock = element.name;
        }
      });
      console.log(value_stock);
      if (value_stock == 0) {
        return res.status(400).json({ error: 'Ação não encontrada' });
      }
      let user = await app.db('users').where({ account: req.body.account });
      let value_total = value_stock * req.body.qtd;
      if (user[0].amount - value_total >= 0) {
        const operation = await app
          .db('users')
          .where({ account: req.body.account })
          .decrement({ amount: value_total });
        if (operation) {
          let user_info = await app
            .db('users')
            .where({ account: req.body.account });
          let operation = await app
            .db('stock')
            .insert({
              name: name_stock,
              qtd: req.body.qtd,
              userId: user_info[0].id,
            })
            .onConflict('name')
            .merge();
          console.log(operation);
          let stocks = await app.db('stock').where({ userId: user_info[0].id });
          console.log(stocks);
          let saldo = await app.db('users').where({ id: user_info[0].id });
          return res.json({
            saldo: saldo[0].amount,
            stock: stocks,
          });
        }
      } else {
        return res.status(400).json({ error: 'Saldo insuficiente' });
      }
      return res.status(200).send('USUARIO CADASTRADO COM SUCESSO');
    } catch (error) {
      console.log('aqui');
      return res.status(400).json({ error: error });
    }
  };

  return { save };
};

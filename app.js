const express = require('express');
const sequelize = require('./config/config');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importar rotas
const productRoutes = require('./routes/products');
const saleRoutes = require('./routes/sales');

// Usar rotas
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

// Sincronizar o banco de dados
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}).catch(err => {
  console.error('Não foi possível conectar ao banco de dados:', err);
});

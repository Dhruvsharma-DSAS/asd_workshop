const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

app.use('/products', productRoutes);
app.use('/product', productRoutes);

app.listen(3000, () => {
  console.log('SERVER START AT LOCALHOST 3000');
});

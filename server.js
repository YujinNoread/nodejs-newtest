require('dotenv').config();
const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT;
const baseUrl = '/api/v1'
const authRouter = require('./routes/authRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const categoryRouter = require('./routes/categoriesRouter');
const ordersRouter = require('./routes/ordersRouter');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, usersRouter);
app.use(`${baseUrl}/products`, productsRouter);
app.use(`${baseUrl}/products-categories`, categoryRouter);
app.use(`${baseUrl}/orders`, ordersRouter);


db.sequelize.sync({ force: false }).then(()=>{
	app.listen(PORT, () => {
		console.log(`listening on: http://localhost:${PORT}${baseUrl}`);
		
	})
})

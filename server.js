require('dotenv').config();
const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT;
const baseUrl = '/api/v1'
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/usersRouter');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, userRouter);

db.sequelize.sync({ force: false }).then(()=>{
	app.listen(PORT, () => {
		console.log(`listening on: http://localhost:${PORT}${baseUrl}`);
		
	})
})

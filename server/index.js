require('dotenv').config();
const db = require('./connect/db');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;
const userRouter = require('./routes/users');
const loanRouter = require('./routes/loans');
const productRouter = require('./routes/products');
const paymentRouter = require('./routes/payment');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use('/',userRouter);
app.use('/',productRouter);
app.use('/',loanRouter);
app.use('/', paymentRouter);

// app.post('/callback', async (req,res)=>{
//    let message = await JSON.stringify(req.body);
//     return console.log({
//       success:true,
//       message
//   });
// })

//MURZAN
const start = () => {
try {
 db(process.env.MONGO_URI);
 app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}.....`)
 })   
} catch (error) {
   console.log(error) 
}
}

start()
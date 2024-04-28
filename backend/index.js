const express = require ('express'); 

const cors = require('cors');  // permet d'accéder à des ressources d'un serveur 
                               //situé sur une autre origine que le site courant

const bodyParser = require('body-parser');  //Il est responsable de l'analyse des corps 
                                            //de requête entrants dans un middleware avant de le gérer
                                            
const cookieParser = require('cookie-parser');
const userRoute = require('./api/user/userRoute');
const productRoute = require('./api/product/productRoute');
const authRoute = require('./api/auth/authRouter');
const categoryRoute = require('./api/category/categoryRoute');
const notificationRoute = require('./api/notification/notificationRoute');



const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials:true,
}


app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));



app.use(cookieParser());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT , OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
})

app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', authRoute);
app.use('/api', categoryRoute);
app.use('/api', notificationRoute)



app.listen(8000, () =>{
    console.log("SERVEUR IS RUNNING ON PORT 8000");
} );
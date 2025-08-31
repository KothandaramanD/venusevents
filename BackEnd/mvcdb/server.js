const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const path = require('path');
const emailRoute = require('./routes/emailRoute');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const config=require('./config/config');
mongoose.connect(config.mongoURI).then(()=>{
    console.log("mongo db connected")
}).catch((e)=>{
    console.log(e);
});

  
//Routes
const itemRoutes = require('./routes/items');
const itemRoutes1 = require('./routes/users');
const eventRoutes = require('./routes/eventRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const eventservice = require('./routes/eventservice');
const billing = require('./routes/billing');
app.use('/api/billing', billing);
app.use('/api/eventservice', eventservice);
app.use('/api/organizers', organizerRoutes);
app.use('/api/events', eventRoutes);
app.use('/api', emailRoute);
app.use('/api', itemRoutes);
app.use('/api', itemRoutes1);
app.listen(config.PORT, ()=>{
console.log(`Server is running on port: ${config.PORT}`);
});

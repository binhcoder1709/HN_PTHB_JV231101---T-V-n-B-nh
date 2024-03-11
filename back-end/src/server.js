import express from 'express';
import cors from 'cors'
const app = express();

app.use(cors());

const PORT = 3000;
app.listen(PORT, ()=>
{
    console.log('Server is running with port: ', PORT);
})
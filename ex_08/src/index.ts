import express from 'express';
import cors from 'cors';
import config from './config';



const app = express();
app.use(cors);
app.use(express.json());



app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.json({pong:true});
});
  
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});


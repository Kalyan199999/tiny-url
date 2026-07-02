
import express, { Application , Request, Response }  from 'express'
import 'dotenv/config'
import router from './routes/url_route.js'

const app:Application = express();

app.use( express.json() )

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  return res.json({ status: 'Server is running cleanly' });
});

app.use( '/url' , router)

app.listen( port , ()=>{
    console.log(`server started on the port: http://localhost:${port}`);
})

export default app;
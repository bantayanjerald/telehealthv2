import express  from "express";
import authRoutes from './routes/auth.js'
import cors from 'cors';
import bodyParser from "body-parser";
import multer from "multer";

import requestIp from 'request-ip';

const ipMiddleware = function(req, res, next) {
  console.log(requestIp.getClientIp(req));
  const  clientIp = requestIp.getClientIp(req); 
  next();
};

const app = express();

app.use(ipMiddleware);

app.use(express.json());
app.use(cors({
    origin: "http://192.168.100.42:3000"
}))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/src/assets/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })
  app.use('/api/upload', upload.single("file"), (req, res) =>{
    const file = req.file;
    res.status(200).json(file.filename);
  })


app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api/auth", authRoutes)


app.listen(8800, ()=>{
    console.log("Listening on port 8800");
})

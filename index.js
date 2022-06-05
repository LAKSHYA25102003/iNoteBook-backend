const connectToMongo=require("./config/mongoose.js");
connectToMongo();
const path = require('path');


const PORT=process.env.PORT||5000;
const express=require("express");
var cors = require('cors')
const app=express();

// for parsing data coming with req body
app.use(cors())
app.use(express.json());


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


// routes to provide correct router
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));

if(process.env.NODE_ENV=="production")
{
    app.use(express.static("Frontend/build"));
}

// listening express server
app.listen(PORT,function(){
    console.log(`Express server is started successfully on the port:${PORT}`);
});
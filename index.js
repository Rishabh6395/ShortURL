const express = require("express");
const path = require('path')
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user')

const {restrictToLoggedinUserOnly, checkAuth} = require('./middlewares/auth')


const URL = require("./models/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongo is started")
);

app.set("view engine", "ejs")
app.set('views',path.resolve('./views'))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// app.get('/test', async(req,res)=>{
//   const allUrls = await URL.find({})
//   return res.render('home', {
//     urls: allUrls,
//   })
// })

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use('/', checkAuth, staticRoute)

app.use('/user', userRoute)


app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp: Date.now()
        },
      },
    }
  );
  res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));

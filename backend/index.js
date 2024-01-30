const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Arivazhagan:Arivu007@arivazhagan.hjobthp.mongodb.net/?retryWrites=true&w=majority');
var db = mongoose.connection;

app.get('/', (req, res) => { res.send('Server is runing on!!!') })

//api post call for signup
app.post('/signup', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;

  var data = {
    "name": name,
    "email": email,
    "password": pass
  }
  db.collection('user').insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });
  res.status(200).json(data);
})


//api post call for login
app.post("/login", async function (req, res) {
  try {
    // check if the user exists
    const user = await db.collection('user').findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = req.body.password === user.password;
      if (result) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ error: "Password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

//api for get the users
app.get('/user/:id', async (req, res) => {
 try{
  const { id } = req.params;
  const user = await db.collection('user').findOne({ name: id });
  if (user) {
    res.status(200).json(user);
  }
  else { res.status(400).json({ error: "User doesn't exist" }); }
 }catch(e){
  res.status(400).json({ e });
 }
  
});


//api for update the user details
app.put('/user/:id', async (req, res) => {
   const { id } = req.params;
   const result= await db.collection('user').replaceOne({name: id}, req.body);
   res.data('Updated')
});


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

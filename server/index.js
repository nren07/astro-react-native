// server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(bodyParser.json()); // Parse JSON bodies

// Sample route for submitting astrology data
app.post("/api/planets", (req, res) => {
    let kundliData;
    const data = req.body;
    console.log(data);

 
  // Respond with a success message
  res.status(200).json({ message: "Data submitted successfully!",kundliData });
});

app.get("/get",(req,res)=>{
    console.log("req rec");
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

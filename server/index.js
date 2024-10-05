// server.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes


const PORT = process.env.PORT || 5000;
// Middleware

app.use(bodyParser.json()); // Parse JSON bodies

// Sample route for submitting astrology data
app.post("/fetchLocation", async (req, res) => {
      const dataRec=req.body;
      console.log(req.body);
      console.log("req received");
      const data=await fetchCoordinates(dataRec.placeOfBirth);
      const location = data.results[0]?.geometry?.location
      console.log(location);
      dataRec.latitude=location.lat;
      dataRec.longitude=location.lng;
      delete dataRec.placeOfBirth;
      const kundliData=await fetchKundli(dataRec); // when we get api key for this url 'https://json.freeastrologyapi.com/planets'
      // return kundliData 
      res.status(200).json(kundliData??dataRec);
});

const fetchCoordinates = async (place) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyC-KW_gEoZC_5DCMF4hGKSHPd-IB9rU_I8`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
const fetchKundli = async (requestData) => {
  try {
    const response = await fetch('https://json.freeastrologyapi.com/planets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY', // Replace with your actual API key
      },
      body: JSON.stringify(requestData), // Convert the request data to JSON
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
    // console.error('There was a problem with the fetch operation:', error);
  }
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

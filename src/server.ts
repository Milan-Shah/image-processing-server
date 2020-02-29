import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

/** 
   * Implement a GET Request for /filteredImage that requires image url query to be passed. 
   * Validate the protocol and the format of the file
   * Send a resized, gray scalled and compressed filtered image back 
**/
app.get("/filteredImage", async (req, res) => {
    
  const { image_url } = req.query;
  if (!image_url) {
    return res.status(400).send("image url query is required");
  } 

  try {
    const localFile: string  = await filterImageFromURL(image_url);
    res.sendFile(localFile, err => {
      if (err) {
        console.error('ERROR for sending the file:', { localFile })
      }
      deleteLocalFiles([localFile])
    })
  } catch (e) {
    console.log('ERROR', e)
    res.status(500).end(e);
  }
});
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
/***********************************************************
*This API requests a URL,
*Scrapes  all images from url using a third party module called cheerio,
*than returns JSON with image source list.

API Name 	: Web imAGE Scraper
Version 	: 1.0.0 
Deployed	: 2023 January
Author		: www.linkedin.com/in/simiso-mthiyane-b83993210

************************************************************
************************************************************
************************************************************
************************************************************
*****************  ********  ***  ***       ****************
****************  ***  ***  ***  ***  **********************
***************  **  * **  ***  ***       ******************
**************  *  **  *  ***  ********  *******************
*************    ****    ***  ***       ***  ***  **********
************************************************************
************************************************************
************************************************************
************************************************************/

const PORT = process.env.PORT || 5000;

const express = require("express");
const cheerio = require("cheerio");
const request = require("request");

//express server app
const app = express();

//route
app.get("/web-image-scraper-api-v1-0-0/",(req, res)=>{
	//get request data
	const url = req.query.text;
	//make request
 	request(
		url,
		(error, response, html)=>{
			if(!error){
				//cheerio scrapping
				const images = cheerio.load(html)('img')
				.toArray()
				.map(image => image.attribs.src);
				console.dir(images);
				res.status(200);

				//response
				res.setHeader('Content-Type','application/json');
				res.json({images: images,length: images.length,source:url});	
			}else{
				//error response
				res.setHeader('Content-Type','application/json');
				res.json({message:error});
			}
		}
	);//end make request 
});//end route

app.listen(PORT);
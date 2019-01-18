const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(cors());

app.listen(4000, () => {
	console.log('Server Works !!! At port 4000');
});

app.post('/download', (req, res) => {
	var URL = req.body.url;
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	res.send(ytdl(URL, {
		format: 'mp4'
	}).pipe(fs.createWriteStream('video.mp4')));

	// ytdl.getInfo(videoID, (err, info) => {
	//   console.log(info);
	// 	res.send({data: info});
	// });
});

app.get('/download', (req, res) => {
	var URL = req.query.url;
	console.log(req.body);
	res.header('Content-Disposition', 'attachment; filename="video.mp4"');
	ytdl(URL, {
		format: 'mp4'
	}).pipe(res);
});

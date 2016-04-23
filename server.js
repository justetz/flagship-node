'use strict'

let express			= require('express')
let handlebars	= require('express-handlebars')
let multer			= require('multer')
let mime        = require('mime')

var app	=	express()

var storage	=	multer.diskStorage({
  destination: (req, file, callback) => callback(null, './uploads'),
  filename: (req, file, callback) => callback(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype))
});

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const DEMO_CATEGORIES = [
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'},
	{name: 'Test'}
]

app.get('/', (req, res) => res.render('home', {
	pageTitle: "Browse Categories",
	categories: DEMO_CATEGORIES
}))

app.get('/upload', (req, res) => res.render('upload', {
	pageTitle: 'Upload Document',
	categories: DEMO_CATEGORIES
}))
// app.get('/', (req,res) => res.sendFile(__dirname + "/index.html"));

app.post('/api/file', (req,res) =>
	multer({ storage : storage }).single('file')(req, res, (err) => {
		if(err) {
			console.log(err)
			return res.end("Error uploading file.")
		}

		res.end("File is uploaded")
	}))

app.listen(3000, () => console.log("Working on port 3000"))

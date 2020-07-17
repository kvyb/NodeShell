const express = require('express')
const multer = require('multer')
const mime = require('mime-types')
const shortid = require('shortid')
const { exec } = require('child_process')

// CREATE APPLICATION
const app = express()

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        let id = shortid.generate()
        let ext = mime.extension(file.mimetype)
        cb(null, `${id}.${ext}`)
    }
})
const upload = multer({ storage })

// SERVE STATIC FILES
app.use(express.static('public'))

// ROUTES
app.get('/', (req, res) => {
    res.json({
        message: 'Working'
    })
})

app.post('/', upload.single('photo'), async (req, res) => {
    const photo = req.file

    const { stdout, stderr } = await exec('mkdir test');

    console.log('stdout:', stdout);
    console.log('stderr:', stderr);

    res.json({
        photo: `http://localhost:3000/${photo.filename}`
    })
})

// SERVE APPLICATION
app.listen(3000, () => {
    console.log('App is working on port 3000')
})

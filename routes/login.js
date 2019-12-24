//  Root path is /login

const express = require('express');
const router = express.Router();
const {
    User,
    createDummyUser,
    showUser
} = require('../models/userModel');
const dbx_api = (require('config').get("dbx") !== undefined) ? require('config').get("dbx") : process.env.dbx ;

//  Dropbox API
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;

async function doBoxing() {
    const dbx = new Dropbox({
        accessToken: dbx_api,
        fetch: fetch
    });
    /*  Create folders:
        ? uploads/
        * avatars/
        * posts/

    *  dbx.filesUpload()
    *  show images (download? or link) to insert in html
    *  ^ file search?
    */
    dbx.filesListFolder({
            path: ''
        })
        .then(function (response) {
            console.log("IS response//////////////////");
            for(let x = 0; x < response.entries.length; x++) {
                console.log(response.entries[x].name);
            }
        })
        .catch(function (error) {
            console.log("IS error//////////////////");
            console.log(error);
        });
}

router.get('/', async (req, res) => {
    console.log('Connected to /login');

    await doBoxing();

    res.render('login');
});

router.post('/', async (req, res) => {
    //createDummyUser('Tyler', 'Broere', 'tyler@mail.com', '123456');
    showUser('5e01d78f8acef012a417c2a5');
});

module.exports = router;
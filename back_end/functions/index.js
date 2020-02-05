// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// __      ___  _  ___    _____ _  _ ___ ___     _   ___ ___ 
// \ \    / / || |/ _ \  |_   _| || |_ _/ __|   /_\ | _ \_ _|
//  \ \/\/ /| __ | (_) |   | | | __ || |\__ \  / _ \|  _/| | 
//   \_/\_/ |_||_|\___/    |_| |_||_|___|___/ /_/ \_\_| |___
//
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// This code was written by Zach Schickler for the Who This
// Contact Manager as a project for Dr. Leineker's POOS class
// of Spring 2020. This code is not intended for distribution
// or reuse and is the sole property of the group.        
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~                                               


// Boring boilerplate...
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));

// Sample API call for testing connection.
app.get('/hello-world', (req, res) => {
  return res.status(200).send('Hello World!');
});

// I honestly can't remember what this line does.
exports.app = functions.https.onRequest(app);

// Loads the permission file and uses said file to initialize
// the application.
var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-api-9a206..firebaseio.com"
});
const db = admin.firestore();

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// The following are the official API calls.
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

app.post('/api/create-user', (req, res) => {
(async () => {
    try {
        await db.collection('users').doc(req.body.uid)
            .create({uid: req.body.uid,
                    email: req.body.email,
                    first_name: req.body.first_name,
                    last_name:  req.body.last_name,
                    number: req.body.number
                    });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.get('/api/get-user/:uid', (req, res) => {
    (async () => {
        try {
            let query = db.collection('users');
            let response = [];
            await query.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    uid: doc.id,
                    email: doc.data().email,
                    first_name: doc.data().first_name,
                    last_name: doc.data().last_name,
                    number: doc.data().number,
                };
                if (selectedItem.uid === doc.params.uid)
                    response.push(selectedItem);
            }
            });
            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

app.post('/api/create-contact/:uid', (req, res) => {
(async () => {
    try {
        await db.collection('users').doc(req.params.uid).collection('contacts')
            .add({name: req.body.contact_name,
                  number: req.body.contact_number,
                  email: req.body.contact_email});
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.get('/api/read/:uid', (req, res) => {
(async () => {
    try {
        let query = db.collection('users').doc(req.params.uid).collection('contacts');
        let response = [];
        await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                name: doc.data().name,
                number: doc.data().number,
                email:doc.data().email
            };
            response.push(selectedItem);
        }
        });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.get('/api/read/:uid/:substring', (req, res) => {
(async () => {
    try {
        let query = db.collection('users').doc(req.params.uid).collection('contacts');
        let response = [];
        await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {
            const selectedItem = {
                id: doc.id,
                name: doc.data().name,
                number: doc.data().number,
                email: doc.data().email
            };
            if (selectedItem.name.includes(req.params.substring))
                response.push(selectedItem);
        }
        });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});

app.delete('/api/delete/:uid/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('users').doc(req.params.uid).collection('contacts').doc(req.params.id);
            await document.delete();
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        })();
    });

/*
app.delete('/api/delete/:user', (req, res) => {
(async () => {
    try {
        const document = db.collection('users').doc(req.params.user);
        await document.delete();
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});
*/
/*
app.put('/api/update-name/:uid', (req, res) => {
(async () => {
    try {
        let query = db.collection('users').doc(req.params.uid).collection('contacts')
                    .doc(req.body.id)
        query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.update({
                    name: req.body.new_name
                });
            });
        });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});
*/
app.put('/api/update/:uid/:id', (req, res) => {
(async () => {
    try {
        const document = db.collection('users').doc(req.params.uid).collection('contacts')
                    .doc(req.params.id)
        
        document.update({ name: req.body.contact_name,
                          number: req.body.contact_number,
                          email: req.body.contact_email });
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    })();
});
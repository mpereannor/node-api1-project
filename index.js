// implement your API here
const express = require('express');
const cors = require('cors');

const db = require( './data/db');

const app = express();

app.use(cors());
app.use(express.json());


// app.get('/api/hubs/:id', getHubById)
// app.get('/api/hubs', getAllHubs)
app.post('/api/users/new', createNewUser);
app.get('/api/users/:id', getUserById);
app.get('/api/users', getUsers);
app.get('*', handleDefaultRequest);

// function getAllHubs(req, res) {
//     db.find()
//       .then(data => {
//         console.log(data)
//         res.json(data)
//       })
//       .catch(error => {
//         console.log(error)
//               res.status(500).json('The users information could not be retrieved.')

//       })
//   }
function createNewUser(req, res) {

    console.log(req);

     const newUser = {
        name: req.body.name,
        bio: 'otherth',
        created_at: 'now',
        updated_at: 'now'
    }

    db.insert(newUser)
}

function getUserById(req, res) {
    const { id } = req.params;
    db.findById(id)
    .then(data => {
        if(data) {
            res.status(200).json({
                success: true,
                data,
            });
        } 
        // else if {
        //     res.status(404).json({
        //         success: false, 
        //         message: 'The user with the specified ID does not exist.'
        //     })
        
        else {
            res.status(500).json({
                success: failure, 
                message: 'The user with the specified ID does not exist.'
            })
        }
    })

}

function getUsers( req, res) { 
    db.find()
        .then(data => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                success: false,
                err,
            })
        })
}
   

// function getHubById(req, res) {
//     const { id } = req.params;
//     db.findById(id)
//       .then(data => {
//         console.log(data);
//         res.status(200).json(data)
//       })
//       .error(error => {
//         console.log(error);
//       })
//   }

// function find
function handleDefaultRequest(req, res) { 
    res.json('hello monde')
}
app.listen(process.env.PORT || 3300, () => {
    console.log('listening on' + (process.env.PORT || 3300));
});
// implement your API here

const express = require('express');
const cors = require('cors');

const db = require( './data/db');

const app = express();

app.use(cors());
app.use(express.json());
app.update('api;users', updateUser)
app.delete('/api/users', deleteUser)
app.post('/api/users', createNewUser);
app.get('/api/users/:id', getUserById);
app.get('/api/users', getUsers);
app.get('*', handleDefaultRequest);

function updateUser(req, res){
    const { id } = req.params;
    const body = req.body;
    db.update(id, body)
    .then(count => { 
        if (count) {
            res.status(200).json(count);
        }
        else{
            res.status(404).json({
                message: 'The User with the speicified ID  does not exists'})
            }
        })
    .catch(error => { 
        res.status(500).json({
            error: 'The User Information could not be modified'
        });
    });
}


function deleteUser( req, res) {
    console.log(req)
    const { id } = req.params;

    db.remove(id)
    .then(deleted => { 
        if (deleted) {
            res.status(204).end();
        } 
        else{
            res.status(404).json({
                success: false, 
                message: 'The User with the specified ID does not exist'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message,
        })
    })
}

function createNewUser(req, res) {

    const newUser = req.body;

    db.insert(newUser)
    .then(data => {
        console.log(data);
        res.status(201).json({
            success: true,
            data
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            success: false, 
            error
        })
    })
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
   
function handleDefaultRequest(req, res) { 
    res.json('hello monde')
}
app.listen(process.env.PORT || 3300, () => {
    console.log('listening on' + (process.env.PORT || 3300));
});
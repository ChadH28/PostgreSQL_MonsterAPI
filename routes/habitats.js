const { Router } = require('express');
const pool = require('../db/server')
const router = Router();


// Get all the habitats
router.get('/', (request, response, next) => {
    pool.query(
        "SELECT * from habitats ORDER BY id ASC", 
        (error, res) => {
            if(error) next(error);    
            response.json(res.rows)
        }
    );
});


// get one habitat
router.get('/:id', (request, response, next) => {
    const {id} = request.params;
    pool.query(
        "SELECT * from habitats WHERE id = $1", 
        [id], 
        (error, res) => {
            if(error) next(error);
            response.json(res.rows)
        }
    );
});


// Adding a habitat
router.post('/', (request, response, next) => {
    const { name, climate, temperature } = request.body;
    pool.query(
        "INSERT INTO habitats(name, climate, temperature) VALUES($1, $2, $3)",
        [name, climate, temperature], 
        (error, res) => {
            if(error) next(error);   
            response.redirect('/habitats')
        }
    );
});


// Editing/updating a habitat
router.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const keys = ['name', 'climate', 'temperature'];
    const fields = [];
    
    keys.forEach( key => {
        if( request.body[key]) fields.push(key)
    })
    
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE habitats SET ${field}=($1) WHERE id=($2)`,
            [request.body[field], id], 
            (error, res) => {
                if(error) next(error);   
                if (index === fields.length -1) response.redirect('/habitats')
            }
        );
    });
})

module.exports = router;
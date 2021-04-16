const { Router } = require('express');
const pool = require('../db/server')


const router = Router();

// Get all the monsters
router.get('/', (request, response, next) => {
    pool.query(
        "SELECT * from monsters ORDER BY id ASC", 
        (error, res) => {
            if(error) next(error);    
            response.json(res.rows)
        }
    );
});

// get one monster
router.get('/:id', (request, response, next) => {
    const {id} = request.params;
    pool.query(
        "SELECT * from monsters WHERE id = $1", 
        [id], 
        (error, res) => {
            if(error) next(error);
            response.json(res.rows)
        }
    );
});

// Adding a monster
router.post('/', (request, response, next) => {
    const { name, personality } = request.body;
    pool.query(
        "INSERT INTO monsters(name, personality) VALUES($1, $2)",
        [name, personality], 
        (error, res) => {
            if(error) next(error);   
            response.redirect('/monsters')
        }
    );
});

// Vid 9 put method
// Editing/updating a monster
router.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const keys = ['name', 'personality'];
    const fields = [];
    
    keys.forEach( key => {
        if( request.body[key]) fields.push(key)
    })
    
    fields.forEach((field, index) => {
        pool.query(
            `UPDATE monsters SET ${field}=($1) WHERE id=($2)`,
            [request.body[field], id], 
            (error, res) => {
                if(error) next(error);   
                if (index === fields.length -1) response.redirect('/monsters')
            }
        );
    });
})

// deleting a monster
router.delete('/:id', (request, response, next) => {
    const { id } = request.params;
    pool.query(
        `DELETE FROM monsters WHERE id=($1)`,
        [id], 
        (error, res) => {
            if(error) next(error);   
            response.redirect('/monsters')
        }
    );
});




module.exports = router
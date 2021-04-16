const { Router } = require('express');
const pool = require('../db/server')
const router = Router();

// Get all the living enviroments
router.get('/', (request, response, next) => {
    pool.query(
        "SELECT * from lives", 
        (error, res) => {
            if(error) next(error);    
            response.json(res.rows)
        }
    );
});

// Get all the living conditions
router.get('/conditions', (request, response, next) => {
    pool.query(
        "SELECT * from lives JOIN habitats ON habitats.name = lives.habitat", 
        (error, res) => {
            if(error) next(error);    
            response.json(res.rows)
        }
    );
});











module.exports = router;
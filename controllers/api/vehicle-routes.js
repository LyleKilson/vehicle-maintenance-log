// routes for vehicles? 
const router = require('express').Router();
const {Owner, Vehicle, MaintLog} = require('../../models');

router.get('/', (req, res) => {
    Vehicle.findAll({})
    .then(dbVehicleData => res.json(dbVehicleData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// may need to be modified to show or include maintlog data
router.get('/:id', (req, res) => {
    Vehicle.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'make', 'model', 'year','owner_id']
    })
    .then(dbVehicleData => {
        if(!dbVehicleData) {
            res.status(404).json({message: 'no vehicle of with that particular ID!'});
            return;
        }
        res.json(dbVehicleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Vehicle.create({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        owner_id: req.session.owner_id
    })
    .then(dbVehicleData => res.json(dbVehicleData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req,res) => {
    Vehicle.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbVehicleData => {
        if(!dbVehicleData) {
            res.status(404).json({message: 'no vehicle with such ID'})
            return;
        }
        res.json(dbVehicleData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
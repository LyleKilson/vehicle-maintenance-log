// routes for a vehicle owner?
const router = require('express').Router();
const {Owner, Vehicle, MaintLog} = require('../../models');

router.get('/', (req, res) => {
    Owner.findAll({})
    .then(ownerData => res.json(ownerData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Owner.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id 
         },
          include: [
            {
                model: Vehicle,
                attributes: ['id', 'make', 'model', 'year', 'created_at' ],
                include: MaintLog,
                attributes: ['id']
            }
        ]
    })
    .then(ownerData => {
        if(!ownerData) {
            res.status(400).json({message: 'no owner has this ID'})
            return;
        }
        res.json(ownerData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Owner.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password 
    })
    .then(newOwnerData => {
        req.session.save(() => { 
        req.session.owner_id = newOwnerData.id;
        req.session.username = newOwnerData.username;
        req.session.loggedIn = true;

        res.json(newOwnerData)
      })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.post('/login', (req,res) => {
Owner.findOne({
    where: {
        email: req.body.email
    }
})
.then(dbOwner => {
    if(!dbOwner) {
   res.status(400).json({message: 'no user with that email'});
   return;
    }
    const goodPassword = dbOwner.checkPassword(req.body.password);
    if(!goodPassword) {
res.status(400).json({message: 'incorrect password'});
return;
    } 
    req.session.save(() => {
        // here we declare session variables
        req.session.owner_id = dbOwner.id;
        req.session.username = dbOwner.username;
        req.session.loggedIn = true;

        res.json({user: dbOwner, message: 'you are now logged in!'});
    })
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
  
});


router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }else{
        res.status(404).end();
    }
});


module.exports = router;



/*'last_oil_change', 'last_tire_rotation', 'last_spark_plugs', 'last_ait_filter', 'notes', 'vehicle_id'] */ 
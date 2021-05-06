// model associations go here
const Vehicle = require('./Vehicle')
const Owner = require('./Owner');
const MaintLog = require('./MaintLog');

Owner.hasMany(Vehicle, {
foreignKey: 'owner_id'
});

Vehicle.belongsTo(Owner, {
    foreignKey: 'owner_id'
});

Vehicle.hasOne(MaintLog, {
foreignKey: 'vehicle_id'
});

MaintLog.belongsTo(Vehicle, {
    foreignKey: 'vehicle_id'
});


module.exports = {Vehicle, Owner, MaintLog};
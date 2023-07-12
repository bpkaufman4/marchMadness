const User = require('./User');

const getUnusedUserPerma = function(seed) {
    User.findOne({
        where: {
            perma: seed
        }
    }).then(userData => {
        if(!userData) {
            return seed;
        } else {
            return getUnusedUserPerma(seed+'1');
        }
    })
}

module.exports = getUnusedUserPerma;
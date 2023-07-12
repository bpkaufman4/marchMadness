
const { User } = require('../../models');

const getUnusedUserPerma = function(seed) {
    User.findOne({
        where: {
            perma: seed
        }
    }).then(userData => {
        if(userData) {
            return getUnusedUserPerma(seed+'1');
        } else {
            return seed;
        }
    });
}

module.exports = { getUnusedUserPerma };
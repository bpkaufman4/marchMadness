
const getUnusedUserPerma = function(seed) {
    console.log(seed);
    var newSeed;

    User.findOne({
        where: {
            perma: seed
        }
    }).then(userData => {
        console.log(userData);
        if(userData) {
            newSeed = getUnusedUserPerma(seed+'1');
        } else {
            newSeed = seed;
        }
    });
}

module.exports = getUnusedUserPerma;
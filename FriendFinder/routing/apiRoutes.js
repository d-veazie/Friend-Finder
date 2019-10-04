let list = require('../app/data/friends');
module.exports = function(app) {
    app.get("/api/friends.js", function(req, res) {
        res.json(list);
    });
    app.post("/api/friends.js", function(req, res) {
        let newFriend = req.body;
        console.log(newFriend);
        let match = {
            name: "",
            difference: 10
        };
        for (let i = 0; i < list.length; i++) {
            let total = 0;
            for (let j = 0; j < list[i].scores.length; j++) {
                total += Math.abs(parseInt(list[i].scores[j]) - parseInt(newFriend.scores[j]));
                if (total <= match.difference) {
                    match.name = list[i].name;
                    match.photo = list[i].photo;
                    match.difference = total;
                }
            }
        }
        list.push(newFriend);
        res.json(match);
        console.log(match);
    });
}
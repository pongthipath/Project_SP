const app = require('express')();
const save = require('./save/save');

app.get('/', function(req, res){
    res.sendFile(__dirname + "/module/election.html");
});

app.get('/data/:poll_name', function(req, res){
    let poll_name = req.params.poll_name;
    var data = {
        "poll_name": poll_name,
        "count": 0
    }
    save.saveFile(data);
    res.send(data);
});

app.get('/voter', function(req, res){
    res.sendFile(__dirname + '/module/voter.html');
});

app.get('/voter/data', function(req, res){
    var allPoll = save.loadAllPoll();
    res.send(allPoll);
});

app.get('/voter/data/:poll_name', function(req, res){
    let poll_name = req.params.poll_name;
    var data = save.loadFile(poll_name);
    this.data = data;
    this.data.count += 1;
    save.saveFile(this.data);
    console.log(this.data);
});

app.listen('8080', function(req, res){
    console.log("connected!");
});
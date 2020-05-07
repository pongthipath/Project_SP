const fs = require('fs');

function saveFile(data){
    this.data = data;
    var rawData = JSON.stringify(this.data);
    fs.writeFile(__dirname + '/save_poll/' + this.data.poll_name + '.json', rawData , 'utf8', function (err) {
        if(err) throw err;
    });
}

function loadFile(poll_name){
    this.poll_name = poll_name
    var rawData = fs.readFileSync(__dirname + '/save_poll/' + this.poll_name + '.json', function(err, data){
        if(err) throw err;
    });
    var data = JSON.parse(rawData);
    return data;
}

function loadAllPoll(){
    var allPoll = []
    var allPollName = []
    allPoll = fs.readdirSync(__dirname + '/save_poll/', (err, files) => {
        files.forEach(file => {
          console.log(file);
        });
    });
    for(var i = 0 ; i < allPoll.length ; i++){
        var data = fs.readFileSync(__dirname + '/save_poll/' + allPoll[i], function(err, data){
            if(err) throw err;
        });
        var rawData = JSON.parse(data);
        allPollName.push(rawData.poll_name);
    }
    return allPollName;
}

module.exports = {
    saveFile: saveFile,
    loadFile: loadFile,
    loadAllPoll: loadAllPoll
}
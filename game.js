const math = require('mathjs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const _ = require('lodash');
const UP = '0';
const RIGHT = '1';
const DOWN = '2';
const LEFT = '3';

var prevState;

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://gabrielecirulli.github.io');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/next-move', function (req, res) {
    let state = req.body;
    let move;
    let counterX = checkNextMove(state);
    let counterY = checkNextMove(math.transpose(state));
    console.log(state); // Print the grid 
    console.log('Somma mossa a destra', counterX);
    console.log('Somma mossa a su', counterY);

    if(counterX < counterY) 
        move = _.isEqual(state,prevState) ? DOWN : UP;
    else 
        move = _.isEqual(state,prevState) ? LEFT : RIGHT; //3

    prevState = state;
    res.end(move); // Right Move
});

app.listen(3000, function () {
    console.log('The 2048 server listening on port 3000!');
});

function checkNextMove(state) {
    let counterX = 0;

    state.forEach((row) => {
        console.log(counter(row));
        counterX = counterX + counter(row);
    });

    return counterX;
}

function counter(row) {
    let counter = 0;
    let value = row[0];
    let sibling = row[1];

    for(c=1; c<3; c++){
        sibling = row[c];

        if(value === 0) {
            value = sibling;
            continue;
        }

        if(sibling === 0)
            continue;

        if(sibling === value){
            counter++;
            value = row[c+1];
            c++;
        } else {
            value = sibling;
        }

    }

    // while(i<4){



    //     // if (value===0) {
    //     //     i=i+2;
    //     //     value=row[i-1];
    //     //     sibling=row[i];
    //     //     continue;
    //     // }

    //     // if (sibling===0) {
    //     //     i++;
    //     //     sibling=row[i];
    //     //     continue;
    //     // }
        
    //     // if (value === sibling){
    //     //     counter++;
    //     //     i++;
    //     // } else {
    //     //     value=sibling;
    //     //     i++;
    //     //     sibling=row[i];
    //     // }

    // }

    return counter;          
}
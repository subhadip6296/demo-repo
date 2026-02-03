const express = require('express');
const app = express();

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

//middle ware-to get the body from postman later it will be explained
app.use(express.json());

app.get("/", function (req, res) {
    // write logic how many of kidneys are there, how many are healthy, how many are unhealthy
    let johnKidneys = users[0].kidneys;
    let numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < numberOfKidneys; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys += 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
    //use filter js
})

app.post("/", function (req, res) {
    //any time post req happens add an input kidney healthy unhealthy kidney
    //query parameter
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })

    //because they don't need any data
    res.json({
        msg: "Done!"
    })
})

app.put("/", function (req, res) {
    //change all the kidneys to healthy
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    //The request will be hung if i don't send any data
    res.json({})
})

app.delete("/", function (req, res) {
    //remove all the unhealthy kidney
    // only if one unhealthy kidney is there do this, else return 411
    if (isThereAnyUnhealthyKidney()) {
        let newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        //The request will be hung if i don't send any data
        res.json({
            msg: "Done"
        })

        // for(let i=0;i<users[0].kidneys.length;i++) {
        //     users[0].kidneys[i].healthy=true;
        // }
        // //The request will be hung if i don't send any data
        // res.json({})

    } else {
        // res.sendStatus(411)
        res.status(411).json({
            msg:"You have no bad kidneys"
        });
    }
})

function isThereAnyUnhealthyKidney() {
    let atLeastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atLeastOneUnhealthyKidney = true;
        }
    }
    return atLeastOneUnhealthyKidney; 
}

app.listen(3001);
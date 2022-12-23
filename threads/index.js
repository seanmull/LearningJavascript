const express = require("express");
const { Worker } = require("worker_threads")

const app = express();
const port = process.env.PORT || 3000;

app.get("/non-blocking/", (req, res) => {
    res.status(200).send("This page is non-blocking");
});

// function calculateCounter() {
//     return new Promise((resolve, reject) => {
//         let counter = 0
//         for (let i = 0; i < 20_000_000_000; i++) {
//             counter++;
//         }
//         resolve(counter);
//     }).catch((error) => {
//         console.log(error);
//     });
// }

app.get("/blocking", async (req, res) => {
    const worker = new Worker("./worker.js")
    worker.on("message", (data) => {
        res.status(200).send(`result is ${data}`)
    })
    worker.on("error", (msg) => {
        res.status(404).send(`An error occured: ${msg}`)
    })
    // let counter = 0
    // for (let i = 0; i < 20_000_000_000; i ++){
    //     counter++
    // }
    // const counter = await calculateCounter();
    // res.status(200).send(`result is ${counter}`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

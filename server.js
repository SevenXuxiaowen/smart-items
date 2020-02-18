const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(
    bodyParser.urlencoded({
        extended:false
    })
);

//test if the server works
app.get('/', (req, res) => {
    res.json({"test": "server works well"});
})

const Api = require('./apis');

//search products @param keyword
//e.g. http://localhost:5000/search/laptop
app.get('/search/:keyword', async (req, res) => {
    const data = await Api.search(req.params.keyword)
    res.json(data);
})

app.get('/recommends/:catId', async (req, res) => {
    const data = await Api.recommends(req.params.catId);
    res.json(data);
})

//look up product detail @param id
//e.g. http://localhost:5000/detail/7007013
app.get('/detail/:id', async (req, res) => {
    const data = await Api.detail(req.params.id);
    res.json(data);
})

//Get recommend products @param categories_id
//e.g. http://localhost:5000/recommends/abcat0811002


const port  = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on port: " + port);
})

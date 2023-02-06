// server side script fetching remote data and preparing report data source
const axios = require('axios');

// group the data for report
async function prepareDataSource() {
    const authors = await fetchOrders()
    return authors;
}

// add jsreport hook which modifies the report input data
async function beforeRender(req, res) {
    const resAuthors = await axios.get('http://localhost:8000/api/authors?include=pieces')
    req.data.authors = [];
     req.data.authors.push(resAuthors.data.data);
     names = [];
     counts = [];
     resAuthors.data.data.forEach(author => {
        author['count']= author['pieces'].length;
        names.push(author.name);
        counts.push(author.count);
        });
    req.data.authors.push(names);
    req.data.authors.push(counts);
    console.log(counts);
    return req.data.authors;
}
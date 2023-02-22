// server side script fetching remote data and preparing report data source
const axios = require('axios');


// add jsreport hook which modifies the report input data
async function beforeRender(req, res) {
    const resEvents = await axios.get('http://localhost:8000/api/events')
    req.data.events = [];
     req.data.events.push(resEvents.data.data);
     names = [];
     counts = [];
     resEvents.data.data.forEach(event => {
        event['count']= event['musicians'].length;
        names.push(event.name);
        counts.push(event.count);
        });
    req.data.events.push(names);
    req.data.events.push(counts);
    return req.data.events;
}
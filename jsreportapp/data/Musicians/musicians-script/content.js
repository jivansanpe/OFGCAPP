// server side script fetching remote data and preparing report data source
const axios = require('axios');


// add jsreport hook which modifies the report input data
async function beforeRender(req, res) {
    const resMusicians = await axios.get('http://localhost:8000/api/musicians')
    req.data.musicians = [];
     req.data.musicians.push(resMusicians.data.data);
     names = [];
     counts = [];
     special_count = [];
     resMusicians.data.data.forEach(musician => {
        count = 0;
        musician['count']= musician['events'].length;
        musician['events'].forEach(event =>{
            if(event['pivot'].special == "Si"){
                count += 1;
            }
        })
        musician['special_count']= count;
        names.push(musician.name);
        counts.push(musician.count);
        special_count.push(count);
        });
    req.data.musicians.push(names);
    req.data.musicians.push(counts);
    req.data.musicians.push(special_count);
    console.log(special_count);
    return req.data.musicians;
}
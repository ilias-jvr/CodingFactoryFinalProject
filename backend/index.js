const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

var serverPort = 8085;
const hostname = 'localhost';
app.get('/status', (request, response) => {
    const status = {
        Status: 'Running',
    };

    response.send(status);
});
const patients_routes = require('./routes/patients.routes');
app.use('/api/patients', patients_routes);

const system_routes = require('./routes/system.routes');
app.use('/api', system_routes);

app.listen(serverPort, hostname, () => {
    console.log(`Server running at http://${hostname}:${serverPort}/`);
});

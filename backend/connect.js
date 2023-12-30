const typeorm = require('typeorm');

const dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'patiently',
    password: 'patientlypass',
    database: 'patiently',
    synchronize: true,
    entities: [`${__dirname}/models/*.js`], // `${ __dirname }/entity/*.entity.js`
    migrations: [],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migrations',
    },
});

dataSource
    .initialize()
    .then(function () {
        console.log('Connected to database');
    })
    .catch(function (error) {
        console.log('Problem in connecting to database', error);
    });

module.exports = dataSource;

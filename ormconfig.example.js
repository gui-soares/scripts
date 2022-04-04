export default {
    "type": "mssql",
    "host": "localhost",
    "port": 1433,
    "username": "",
    "password": "",
    "database": "",
    "entities": [
        "./src/entities/*.js"
    ],
    "options": {
        "encrypt": true,
        "enableArithAbort": true,
        "trustServerCertificate": true
    },
}
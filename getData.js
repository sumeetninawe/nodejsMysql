const mysql = require('mysql');
const fs = require('fs');


function getConf() {

    return new Promise((resolve, reject) => {


        fs.readFile('./configuration.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)

            }
            //     console.log('File data:', jsonString);
            resolve(JSON.parse(jsonString));


        })

    });
}


function createConnetion(conf) {
    let connection = mysql.createConnection(conf.DatabaseConf);
    return connection;
}



function connect(connection) {
    return new Promise((resolve, reject) => {
        connection.connect(function(err) {

            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err.stack);
            }
            //               console.log('Connected as id ' + connection.threadId);
            resolve(connection);

        })
    });
}

function query(connection) {

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM EmployeeInfo', function(error, results, fields) {
            if (error)
                throw error;
            connection.end();
            resolve(results);
        });
    });


}

async function getData() {
	try{
		let conf = await getConf();
		let connection = await createConnetion(conf);
		connection = await connect(connection);
		let result = await query(connection);
		return JSON.stringify(result);
	}
	catch(err)
	{
		throw new Error();
		
	/*	var e = err.split('\n')[0];
		console.log("Error Message: "+ e );
		fs.writeFile("serverLogs.txt", e+"\n", (error) => {
		if (error) console.log(err);
			console.log("Successfully Written to File.");
		});*/
	}

}

module.exports = {
    "getData": getData

}


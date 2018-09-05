const mysqlTransaction = require('./index.js');
const config = {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: '4dpick',
    port:'3306',
    dateStrings: true
}

let abc = async () => {
	let transaction = await mysqlTransaction(config);
	let res = await transaction.startTrans(async (trans)=>{

		let step1 = await transaction.dbs(`INSERT INTO test (vaa,caa) VALUES ('${1}','${1}')`,transaction.conn);
		if(step1 === false){console.log('error!');return false};
		console.log('step1,success')

		let step2 = await transaction.dbs(`INSERT INTO test (vaa,caa) VALUES ('${2}','${2}')`,transaction.conn);
		if(step2 === false){console.log('error!');return false};
		console.log('step2,success')

		let step3 = await transaction.dbs(`INSERT INTO test (xaa,caa) VALUES (${3},'${3}')`,transaction.conn);
		if(step3 === false){console.log('error!');return false};
		console.log('step3,success')
	})

	console.log(res)
}

abc();




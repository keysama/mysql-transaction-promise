const mysql = require('mysql');


const output = {};



const mysqlTransaction = (config) => {
	return new Promise(async (resolve,reject)=>{
		output.config = config;

		output.pool = mysql.createPool(config);

		output.conn = await getConnection(output.pool)

		output.db = db;

		output.startTrans = startTrans;

		output.dbs = dbs;

		resolve(output)
	})
};

let getConnection = (pool) => {
	return new Promise((resolve, reject)=>{
		pool.getConnection(function(err,conn){
	        if(err){
	            resolve(false)
	        }else{
	            resolve(conn)
	        }
	    })
	})
}

let db = (sql) => {
	return new Promise(function(resolve, reject) {
        mysql(sql, function(error,results){
            if(error){
              	resolve(false)
            }else{
               resolve(results)
            }
        })
    });
};


let startTrans = (prom) => {
	return new Promise(async function(resolve, reject) {
		let conn = output.conn;

		conn.beginTransaction(async (err)=>{
			if(err){resolve(false)};

			let res = await prom(conn);
			if(res === false){
				conn.rollback(function() {console.log('事务回滚')});
				resolve(false);
				return;
			}
			console.log('完成')
			conn.commit(function(){ console.log('发送事务') })
			resolve(res)
		})
    });
};

let dbs = (sql,conn) => {
	return new Promise(function(resolve, reject){
		conn.query(sql,function(error,results){
	        if(error){
            	console.log('事务查询出错啦','sql:'+sql)
              	resolve(false)
            }else{
               	resolve(results)
            }
	    })
	})
};

module.exports = mysqlTransaction;
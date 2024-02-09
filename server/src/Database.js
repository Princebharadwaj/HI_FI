const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'prince',
    password: 'princeps',
    port: 5432,
})

pool.connect((err, res) =>{
    if(err){
        console.error(err.message);
    }else{
        console.log("connected to database ...")
    }
});


module.exports = pool;
const Pool= require("pg").Pool;

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'12345',
    port:5432,
    database:'prodcutos'

}); 

module.exports=pool;

/*
const getProductos=async()=>{
    const res=await pool.query('select * from produc');
    console.log(res.rows);
}

getProductos();
*/
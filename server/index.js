const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//intermedios
app.use(cors());
app.use(express.json());

//RUTAS

app.post("/todos", async (req, res) => {
    try {
        
        const { id } = req.body;
        const {nombre}=req.body;
        const {precio}=req.body;
        const {stock}=req.body;
        
        pool.query("insert into produc(id,nombre,precio,stock) values($1,$2,$3,$4)", [id,nombre,precio,stock]);
        
        
    } catch (err) {
        console.error(err.message)
    }

})


//buscar todos 

app.get("/todos", async (req, res) => {
    try {

        const newTodo = await pool.query("select * from produc");

        res.json(newTodo.rows);
        res.end();

    } catch (err) {
        console.error(err.message);
    }

});


//buscar maximo ID  de tabla produc
app.get("/maxid",async (req,res)=>{

    try {

        const maxId = await pool.query("SELECT id FROM produc WHERE id=(select max(id) from produc) ");
        res.json(maxId.rows);
        
        

        

    } catch (err) {
        console.error(err.message,"error en esta monda");
    }
    

})


//editar segun id
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {nombre}=req.body;
        const {precio}=req.body;
        const {stock}=req.body;

        const todo = await pool.query("update produc set nombre=$1,precio=$2,stock=$3 where id=$4", [nombre,precio,stock,id])

        res.json();
        //res.end();
    } catch (err) {

    }

})
//eliminar un registro por id 
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        

        const todo = await pool.query("DELETE FROM produc WHERE id=$1", [id])

        res.json();
        //res.end();
    } catch (err) {

    }

})


app.listen(5000, () => {
    console.log("servidor iniciado")
})





import React, { useEffect, useState } from 'react';
import './css/style.css';
import EditTodo from './EditTodo';
import DelTodo from './DelTodo';
import imgheader from './img/headerlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
//import SaveTodo from './saveTodo';


const Principal = () => {

    const [todos, setTodos] = useState([]);
    let [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [precio2, setPrecio2] = useState('');//auxiliar de precio 1 para poder con el useffect solo agrgar los numeros
    const [stock, setStock] = useState('');
    const [stock2, setStock2] = useState('');
    const [error, setError] = useState('');
    let [btnActivo, setBtnActivo] = useState(false);

    const validarCampos = (e) => {

        if (nombre === null || nombre === "") {
            setError("Se requiere el nombre del producto");

        } else if (precio === null || precio === "") {
            setError("Se requiere el Precio del producto");

        } else if (stock === null || stock === "") {
            setError("Se requiere el Stock del producto");

        } else {
            setError(" ");
            setBtnActivo(true);
            guardarTodo(e);
        }


    }




    //con este metodo inserti registros
    const guardarTodo = async e => {
        e.preventDefault();

        try {
            const body = { id, nombre, precio, stock };
            await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body),

            })




        } catch (err) {
            console.error(err.message);
        }

    }




    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
            maxId();


        } catch (err) {
            console.error(err.message);
        }
    }

    //buscar maximo id

    const maxId = async () => {
        try {
            const response = await fetch("http://localhost:5000/maxid");
            const jsonData = await response.json();

            setId(jsonData[0].id + 1);



        } catch (err) {
            console.error(err.message);
        }

    }

    const limpiarCampos = () => {
        setNombre('');
        setPrecio('');
        setStock('');
    }

    useEffect(() => {
        limpiarCampos();
        setBtnActivo(false);

    }, [id]);

    useEffect(() => {
        getTodos();

    });

    useEffect(() => {
        let aux = precio2.split('');

        for (let i = 0; i < aux.length; i++) {
            if (Number(aux[i])) {
                setPrecio(precio + aux[i]);
            }
        }



    }, [precio2]);

    useEffect(() => {
        let aux = stock2.split('');

        for (let i = 0; i < aux.length; i++) {
            if (Number(aux[i])) {
                setStock(stock + aux[i]);
            }
        }



    }, [stock2]);








    return (

        <>
            <nav className="navbar navbar-expand-sm bg-primary navbar-light">
                <div className="logo">
                    <img alt="" src={imgheader} />
                </div>
                <div className="nav-bar">
                    <div className="menus row">

                    </div>
                </div>
            </nav>
            <br />
            <div className="container">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Guardar nuevo Producto</h5>
                    </div>
                    <div className="modal-body ">
                        <div className="container">
                            <div className="row">
                                <div className="col-2"><label>Identificador</label>
                                    <input type="text" value={id} readOnly />
                                    <label>Nombre</label>
                                    <input type="text" value={nombre} onChange={e => setNombre((e.target.value))} /></div>
                                <div className="col-6">{error}</div>
                                <div className="col-2"><label>Precio</label>
                                    <input type="number" value={precio} onChange={e => setPrecio2(e.target.value)} />
                                    <label>Stock</label>
                                    <input type="number" value={stock} onChange={e => setStock2(e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" id="btnSave" className="btn btn-success" onClick={e => validarCampos(e)} disabled={btnActivo}><FontAwesomeIcon icon={faSave} />Guardar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><FontAwesomeIcon icon={faCancel} />Cancelar</button>

                    </div>
                </div>
                <br />
                <table className="table" id="tabla">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(todo => (

                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.nombre}</td>
                                    <td>{todo.precio}</td>
                                    <td>{todo.stock}</td>


                                    <td>

                                        <EditTodo todo={todo} />
                                    </td>


                                    <td>
                                        <DelTodo todo={todo} />
                                    </td>




                                </tr>
                            ))}

                    </tbody>
                </table>

            </div>
        </>
    );
}

export default Principal;

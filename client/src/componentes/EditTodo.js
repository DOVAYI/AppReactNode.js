import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCancel } from '@fortawesome/free-solid-svg-icons';


const EditTodo = ({ todo }) => {



    const [ident] = useState(todo.id);
    const [nombre, setNombre] = useState(todo.nombre);
    const [precio, setPrecio] = useState(todo.precio);
    const [stock, setStock] = useState(todo.stock);


    const updateTodo = async e => {
        e.preventDefault();

        try {
            const body = { nombre, precio, stock };
            await fetch(`http://localhost:5000/todos/${todo.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(body)

            })


        } catch (err) {
            console.error(err.message);
        }
    }

    return <>

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${todo.id}`}>
            <FontAwesomeIcon icon={faEdit} />
            Editar
        </button>


        <div className="modal fade" id={`id${todo.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar Producto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body ">
                        <div className="container">
                            <div className="row">
                                <div className="col-4"><label>Identificador</label>
                                    <input type="text" defaultValue={ident} />
                                    <label>Nombre</label>
                                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} /></div>
                                <div className="col-2"></div>
                                <div className="col-4"><label>Precio</label>
                                    <input type="text" value={precio} onChange={e => setPrecio(e.target.value)} />
                                    <label>Stock</label>
                                    <input type="text" value={stock} onChange={e => setStock(e.target.value)} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={e => updateTodo(e)}><FontAwesomeIcon icon={faEdit} />Editar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><FontAwesomeIcon icon={faCancel} />Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>

};

export default EditTodo;
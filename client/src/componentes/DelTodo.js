import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faCancel } from '@fortawesome/free-solid-svg-icons';

const DelTodo = ({ todo }) => {



    const [ident] = useState(todo.id);
    const [nombre] = useState(todo.nombre);
    const [precio] = useState(todo.precio);
    const [stock] = useState(todo.stock);

    const DeleteTodo = async e => {
        e.preventDefault();

        try {

            await fetch(`http://localhost:5000/todos/${todo.id}`, {
                method: "DELETE"
            })


        } catch (err) {
            console.error(err.message);
        }
    }

    return <>

        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#id2${todo.id}`}>
            <FontAwesomeIcon icon={faDeleteLeft} />
            Eliminar
        </button>


        <div className="modal fade" id={`id2${todo.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Eliminar Producto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body ">
                        <div className="container">
                            <div className="row">
                                <div className="col-4"><label>Identificador</label>
                                    <input type="text" defaultValue={ident} />
                                    <label>Nombre</label>
                                    <input type="text" defaultValue={nombre} /></div>
                                <div className="col-2"></div>
                                <div className="col-4"><label>Precio</label>
                                    <input type="text" defaultValue={precio} />
                                    <label>Stock</label>
                                    <input type="text" defaultValue={stock} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={e => DeleteTodo(e)}><FontAwesomeIcon icon={faDeleteLeft} />Eliminar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><FontAwesomeIcon icon={faCancel} />Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </>

};

export default DelTodo;
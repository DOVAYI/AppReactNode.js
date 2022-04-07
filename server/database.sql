CREATE DATABASE prodcutos;/*para postgres todo en minuscula*/

create table produc(
    id serial primary key,
    nombre varchar(200),
    precio int,
    stock int
);
/*
    despues de crear la base de datos \l con esto podemos
    ver la lista de base de datos que tenemos

    con \c "nombre base de datos" seleccionamos la base de datos
    luego creamos las tablas

    con \dt vemos las tablas creadas
*
/
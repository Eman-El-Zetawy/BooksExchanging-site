const
 express = require('express'),
    fs = require('fs'),
    router = express.Router(),
    routeBase = '/myBooks',
    {
        createDatabaseConnection,
        DB_NAME
    } = require('../DataBase/config');

    router.get(routeBase+'/:id', (req, res) => {
        let id = req.params.id ;
        
console.log(id);
        createDatabaseConnection((error, connection) => {
            if (error) {
                res.status(500);
                return;
            }
            let sql =`SELECT b.id , b.NameBook , b.NameAuthor , b.versionBook , b.dateBook , b.id_univer , b.donation ,b.exchange , b.sale , b.name_book_exchange , b.price ,b.nagotiable , b.img , b.id_user, u.name , d.Name_user,   d.email_user , d.mobile  FROM  ${DB_NAME}.books as b  ,  ${DB_NAME}.unviersities as u , ${DB_NAME}.data_user as d  where b.id_univer = u.id and b.id_user =d.id  and  b.id_user=`+id;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
            });
        });
    });
    

    router.get(routeBase +'/User/:id', (req, res) => {
        let id = req.params.id ;
console.log(id);
        createDatabaseConnection((error, connection) => {
            if (error) {
                res.status(500);
                return;
            }
            let sql =`SELECT   u.name as univ , d.Name_user, d.email_user , d.mobile ,d.img ,d.id_univer , d.id_college ,d.id_department , s.type_SM , s.url_SM , s.id_user ,c.name as college , p.name as depart FROM   ${DB_NAME}.social_media as s , ${DB_NAME}.unviersities as u , ${DB_NAME}.college as c , ${DB_NAME}.department as p , ${DB_NAME}.data_user as d  where d.id_univer = u.id   and d.id_college = c.id   and d.id_department = p.id   and s.id_user= d.id and   d.id=${id}`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
            });
        });
    });





    router.delete(routeBase + "/", (req, res) => {
        let id = req.body.id;
        createDatabaseConnection((error, connection) => {
            if (error) {
                res.status(500);
                return;
            }
            let sql = `DELETE FROM ${DB_NAME}.books WHERE id=${id}`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                res.status(200).send(result);
            });
        });
    });

    module.exports = router;
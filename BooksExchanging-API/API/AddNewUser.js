const 
// express = require("express"),
// bcrypt = require("../DataBase/Hash"),
// jwt = require("jsonwebtoken"),
// router = express.Router(),
{createDatabaseConnection, DB_NAME} = require('../DataBase/config') ;

function checkUserEmailExists(Email, callback) {
    const sql = `SELECT COUNT(*) as count from ${DB_NAME}.data_user WHERE email_user = "${Email}"`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                console.log(result);
                if (callback) {
                    console.log(result);
                    callback(error,result[0].count>0);
                }
        
                connection.end();
            });
        }
    });
}
function addUserAccount(username,Email,password,Mobile,img,SocialMedia,university,college,department,callback){
let sql =`INSERT INTO ${DB_NAME}.data_user (Name_user, email_user, mobile ,img, id_univer, id_college, id_department, pass_user) 
VALUES('${username}','${Email}','${Mobile}','${img}','${university}',' ${college}','${department}','${password}')`;
// SocialMedia
createDatabaseConnection((connectError, connection) => {
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
         
               
                console.log(result);
                console.log("socalee111" , SocialMedia);
                SocialMedia.forEach((item)=>{
console.log(item);
    let sql = `INSERT INTO ${DB_NAME}.social_media (type_SM,  url_SM , id_user) VALUES('${item.type}','${item.name}','${result.insertId}');`;
           console.log(sql);
    connection.query(sql, (error, result2) => {
        console.log(result2);
        callback(error,result);
    });
     
})
       callback(error,result);
        connection.end();
    });
    }
});
}

function checkPasswordDB(Email , callback) {
    const sql = `select * from ${DB_NAME}.data_user where email_user ='${Email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             console.log("reselt CPDB",result);
                    callback(error,result);
    
                connection.end();
            });
        }
    });
}

function showNameWithLogIn(email , callback){
    const sql = `select * from ${DB_NAME}.data_user where email_user ='${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             console.log("resuit is =",result);
                    callback(error,result);

                connection.end();
            });
        }
    });
}


function UpdatePasswordUser(id , newPassword , callback){
    const sql = `UPDATE ${DB_NAME}.data_user SET pass_user = '${newPassword}' WHERE (id = '${id}')`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);

                connection.end();
            });
        }
    });
}


function UpdateInformationUser(id , name , phone ,img , social_media ,university ,college ,deparment ,  callback){
    const sql = `UPDATE ${DB_NAME}.data_user SET Name_user= '${name}', mobile = '${phone}', img='${img}' ,
    id_univer='${university}' , id_college ='${college}' ,id_department='${deparment}'   WHERE (id = '${id}')`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
    callback(error,result);
                   console.log(social_media);
                social_media.forEach((item)=>{
             const sql = `UPDATE ${DB_NAME}.social_media SET  type_SM= '${item.type}', url_SM = '${item.name}' WHERE (id = '${id}')`
                connection.query(sql, (error1, result1) => {   
console.log(result1);
                    callback(error1,result1);
                });
                    
 });
 
                connection.end();
               
            });
        }
    });
}

function getAllUsers(callback) {
const sql = `select id,Name_user,mobile,email_user from ${DB_NAME}.data_user`
createDatabaseConnection((connectError, connection) => {
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
         
                callback(error,result);

            connection.end();
        });
    }
});
}


module.exports = {
    checkUserEmailExists,addUserAccount,checkPasswordDB,showNameWithLogIn,UpdatePasswordUser,
    getAllUsers,UpdateInformationUser


};
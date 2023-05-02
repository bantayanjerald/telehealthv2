import mysql  from "mysql";

export const db = mysql.createConnection({
    host: "122.55.220.156",
    user: "admin",
    password:"AtmpI@2021",
    database: "ehealthcare_pxy_2018",

})
// export const pool = mysql.createPool({
//     host: "122.55.220.156",
//     user: "admin",
//     password:"AtmpI@2021",
//     database: "ehealthcare_pxy_2018",
//     waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//     idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//     queueLimit: 0
//   });


// db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
// db.beginTransaction();
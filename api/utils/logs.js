import { db } from "../db.js";

export const regLogs = (dateNow,personID, status) =>{
    const sqlLogs= "INSERT INTO ehealthcare_pxy_2018.telehealth_reg_logs (`dateTime`, `Account_id`,  `STATUS`) VALUES (?)"
    const values = [
        dateNow,
        personID,
        status
    ]
    db.query(sqlLogs,[values], (err, data)=>{
        console.log("LOGS");
        if (err) {console.log(err); return res.status(500).json(err);}

        // console.log("LOGS INSERTED!");

    })   

}

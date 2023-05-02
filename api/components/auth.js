
import { db } from '../db.js';
import md5 from 'md5';
import ageCalculator from 'age-calculator';
import { AgeFromDateString } from 'age-calculator';
import moment from 'moment-timezone';
import { regLogs } from '../utils/logs.js';
import ip from 'ip';





export const login = (req, res) => {

    console.log("Login");
    const sqlLogin = "SELECT * FROM ehealthcare_pxy_2018.pxymua18nrs where USERNAME = ? AND PASSWORD = md5(?)";

    console.log(req.body.username);
    db.query(sqlLogin, [req.body.username, req.body.password], (err, data) => {
        if (err) return res.status(500).json(err)
        if(data.length === 0) return res.status(404).json("Invalid Username or Password");
        const ipadd = ip.address();
        data[0].IP = ipadd;
        
        return res.status(200).json(data);
    })

}


export const register = async (req, res) => {

   

    const sqlPxymua18nrs = "INSERT INTO ehealthcare_pxy_2018.pxymua18nrs (USERTYPE, CODE, FIRSTNAME, LASTNAME, BIRTHDATE, GENDER, EMAILADDRESS, MOBILE_PHONE,SUBSCRIPTION_CODE,USERNAME,PASSWORD, VERIFICATION, ORG_CODE, ORG_NAME) VALUES (?)"

    const personID = Math.floor(Math.random() * (999999 - 100000 + 1));
    const DEFAULT_ORG_CODE = '2022081901';
    const DEFAULT_ORG_NAME = 'DEFAULT ORG';
   
    let data = req.body.inputs;
    let dateNow =moment().tz("Asia/Manila").format('YYYY-MM-DD hh-mm-ss');
    // const pxyValues = [
    //     1,
    //     personID,
    //     data.firstName,
    //     data.lastName,
    //     data.birthDate,
    //     data.gender,
    //     data.email,
    //     data.mobile,
    //     'FREESUBSCRIPTION',
    //     data.username,
    //     md5(data.password),
    //     null,
    //     DEFAULT_ORG_CODE,
    //     DEFAULT_ORG_NAME
    // ]

    // db.query(sqlPxymua18nrs, [pxyValues], async(err, data) => {
    //     if (err){ await regLogs(dateNow,personID,'Error in table pxymua18nrs => '+ err.sqlMessage +' '+ err.code); }
    //     else{await regLogs(dateNow,personID,'Data inserted in pxymua18nrs'); }
    //     // return res.status(201).json("Data Successfully Inserted!");
    // })

    // const sqlDiscount = "INSERT INTO ehealthcare_pxy_2018.special_discount (`patient_id`, `id_type`, `id_number`, `id_picture`,`approve`) VALUES (?)"

    // const discValues = [
    //     personID,
    //     data.IDType,
    //     data.IDNumber,
    //     req.body.imgUrl,
    //     'pending'
    // ]

    // db.query(sqlDiscount, [discValues], async(err, data) => {
    //     if (err) { await regLogs(dateNow,personID,'Error in table special_discount => '+ err.sqlMessage +' '+ err.code); }//return res.status(500).json(err);
    //     else{await regLogs(dateNow,personID,'Data inserted in special_discount');}

    //     // console.log(`ID INSERTED!`);
    //     // return res.status(201).json("DISCOUNT Successfully Inserted!");
    // })

    // const sqlMpiPersonBasics = "INSERT INTO med_gwc.mpi_personbasics (GLOBAL_ID,NAME,FIRST_NAME,LAST_NAME,EMAIL,BIRTHDAY,AGE,IDENTITY_CARDS,CREATED_TIME,CHANGED_TIME,state,PID,FLAG,RECORDWAY,CATEGORY,EMPI,SCDATE,ORG_CODE,ORG_NAME,PHONE_NUMBER)  VALUES (?)"
    // // $age = date_diff(date_create($BDAY), date_create('now'))->y;
    
    // let age = new AgeFromDateString(data.birthDate).age;
    // const mpiValues=[
    //     personID,
    //     data.firstName +' '+ data.lastName,
    //     data.firstName,
    //     data.lastName,
    //     data.email,
    //     data.birthDate,
    //     age,
    //     personID,
    //     dateNow,
    //     dateNow,
    //     '1',
    //     personID,
    //     '1',
    //     '1',
    //     '1',
    //     md5(personID),
    //     dateNow,
    //     DEFAULT_ORG_CODE,
    //     DEFAULT_ORG_NAME,
    // ]

    // db.query(sqlMpiPersonBasics,[mpiValues], async(err,data) =>{
    //     if(err) {await regLogs(dateNow,personID,'Error in table mpi_personbasics => '+ err.sqlMessage +' '+ err.code); }
    //     else{await regLogs(dateNow,personID,'Data inserted in mpi_personbasics'); }
    // })

    const cbfSql = "INSERT INTO med_gwc.cbf_user (USERNAME, PASSWORD,STATUS,email,type,EMPI,identity_cards) VALUES (?)";
    
    const cbfValues=[
        data.username,
        md5(data.password),
        1,
        data.email,
        0,
        md5(personID),
        personID,
    ]

    db.query(cbfSql, [cbfValues], async(err,data) =>{
        if(err) {await regLogs(dateNow,personID, 'Error in table cbf_user => '+ err.sqlMessage +' '+ err.code);}
        else{await regLogs(dateNow,personID, 'Data inserted in cbf_user');
            return res.status(201).json('Data inserted in cbf_user');
        }
    })
    
    // VALUES ('$UNAME', md5('$PASS'), '1', '$EADD', '0', md5('$newID') , '$newID')"
    // $populateCbfUserPatient = mysqli_query($con,"INSERT INTO med_gwc.cbf_user (USERNAME, PASSWORD,STATUS,email,type,EMPI,identity_cards)
    // VALUES ('$UNAME', md5('$PASS'), '1', '$EADD', '0', md5('$newID') , '$newID')");

    // if($populateCbfUserPatient != "1"){
    //     $err = mysqli_error($con);
    //     $addLogs = mysqli_query($con,"INSERT INTO ehealthcare_pxy_2018.telehealth_reg_logs (`dateTime`, `Account_id`, `ORG_CODE`, `STATUS`) VALUES ( '$todays_date', '$newID', '', 'Error in table cbf_user => $err')") or die(mysqli_error($con));
    // }else{
    //     $addLogs = mysqli_query($con,"INSERT INTO ehealthcare_pxy_2018.telehealth_reg_logs (`dateTime`, `Account_id`, `ORG_CODE`, `STATUS`) VALUES ( '$todays_date', '$newID', '', 'data inserted in cbf_user')") or die(mysqli_error($con));
    // }




}

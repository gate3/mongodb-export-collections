var express = require('express');
var router = express.Router();
const fs = require('fs')

const bcrypt = require('bcrypt-nodejs')
const mailHelper = require('../helpers/mail')
const UserModel = require('../models/user.model')

const saveUser = async (req, res) => {
  const {fname, mname, lname, address, password, program} = req.body
  const pass = bcrypt.hashSync(password)
  try{
    await UserModel.create({
      fname, mname, lname, address, password: pass, program
    })
    res.json({
      success: false,
      message: 'saved'
    })
  }catch(e){
    res.status(400).json({
      success: false,
      data:e 
    })
  }
}
router.post('/save', saveUser)

/* 
  Download csv file 
*/
const download = async function (req, res, next) {
  const filename = 'user-data-file.csv'
    res.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=${filename}`
    })
  await UserModel.find().stream()
    .pipe(UserModel.csvTransformStream())
    .pipe(res)
}
router.get('/download', download);

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const mailCsv = async function (req, res) {

  const {email} = req.body

  const filename = 'user-data-file.csv'

  try{
    const s = fs.createWriteStream(`./${filename}`)
    await UserModel.find().stream()
          .pipe(UserModel.csvTransformStream())
          .pipe(s)
          
    s.on('close', async () => {
        await mailHelper(email, filename, null, [{
            filename: filename,
            path: `./${filename}`
        }], null, true)
        fs.unlinkSync(`./${fileName}`)
    })

    res.json({
      success: false,
      message: 'The collection will be mailed to you shortly.'
    })
  }catch(e){
    res.status(400).json({
      success: false,
      data:e 
    })
  }
}
router.post('/send-to-mail', mailCsv);

module.exports = router;

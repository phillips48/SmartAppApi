const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const connectDB = require('./DBConnection')
const common = require('./common')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/Add', (req, res, next) => {
  connectDB((isSuccess, response) => {
    if (isSuccess) {
      const { Name, Contact_Number, How, Injured_Person, Ambulance_Needed, Situation, Address, Location } = req.body
      var requiredFields = ''
      if (Name === undefined || Name === '') {
        requiredFields += 'Name, '
      } if (Contact_Number === undefined || Contact_Number === '') {
        requiredFields += 'Contact Number, '
      } if (How === undefined || How === '') {
        requiredFields += 'How, '
      } if (Injured_Person === undefined || Injured_Person === '') {
        requiredFields += 'Injured Person, '
      } if (Ambulance_Needed === undefined || Ambulance_Needed === '') {
        requiredFields += 'Ambulance Needed, '
      } if (Situation === undefined || Situation === '') {
        requiredFields += 'Situation, '
      } if (Address === undefined || Address === '') {
        requiredFields += 'Address, '
      } if (Location === undefined || Location === '') {
        requiredFields += 'Location, '
      } if (requiredFields) {
        res.status(400).send({ message: `Following Fileds Are Missing: ${requiredFields.substr(0, requiredFields.length - 2)}` })
      } else {
        const iid = common.getUUIDv4()
        response.query(`INSERT INTO INCIDENT (ID, Name, Contact_Number, How, Injured_Person, Ambulance_Needed, Situation, Address, Location, Created_Date, Status) VALUES ('${iid}', '${Name}', '${Contact_Number}', '${How}', ${Injured_Person}, ${Ambulance_Needed}, '${Situation}', '${Address}', '${Location}', '${new Date().toLocaleString()}', 'Pending')`, (error, result, fields) => {
          if (error) {
            res.status(400).send({ error: error })
          } else {
            res.send({ message: 'Incident Reported Successfully', iid: iid })
          }
        })
      }
    } else {
      res.status(500).send({ message: 'Error in connecting with DB.' })
    }
  })
})

router.get('/GetAll', (req, res, next) => {
  connectDB((isSuccess, response) => {
    if (isSuccess) {
      response.query(`SELECT * FROM INCIDENT`, (error, result, fields) => {
        if (error) {
          res.status(400).send({ error: error })
        } else {
          res.send({ incidents: result })
        }
      })
    } else {
      res.status(500).send({ message: 'Error in connecting with DB.' })
    }
  })
})

router.get('/GetByID/:ID', (req, res, next) => {
  connectDB((isSuccess, response) => {
    if (isSuccess) {
      const { ID } = req.params
      response.query(`SELECT * FROM INCIDENT WHERE ID = '${ID}'`, (error, result, fields) => {
        if (error) {
          res.status(400).send({ error: error })
        } else {
          res.send({ incident: result })
        }
      })
    } else {
      res.status(500).send({ message: 'Error in connecting with DB.' })
    }
  })
})

router.post('/Update', (req, res, next) => {
  connectDB((isSuccess, response) => {
    if (isSuccess) {
      const { ID, Name, Contact_Number, How, Injured_Person, Ambulance_Needed, Situation, Address, Location, Created_Date, Status } = req.body
      var requiredFields = ''
      if (ID === undefined || ID === '') {
        requiredFields += 'ID, '
      } if (Name === undefined || Name === '') {
        requiredFields += 'Name, '
      } if (Contact_Number === undefined || Contact_Number === '') {
        requiredFields += 'Contact Number, '
      } if (How === undefined || How === '') {
        requiredFields += 'How, '
      } if (Injured_Person === undefined || Injured_Person === '') {
        requiredFields += 'Injured Person, '
      } if (Ambulance_Needed === undefined || Ambulance_Needed === '') {
        requiredFields += 'Ambulance Needed, '
      } if (Situation === undefined || Situation === '') {
        requiredFields += 'Situation, '
      } if (Address === undefined || Address === '') {
        requiredFields += 'Address, '
      } if (Location === undefined || Location === '') {
        requiredFields += 'Location, '
      } if (Created_Date === undefined || Created_Date === '') {
        requiredFields += 'Created_Date, '
      } if (Status === undefined || Status === '') {
        requiredFields += 'Status, '
      } if (requiredFields) {
        res.status(400).send({ message: `Following Fileds Are Missing: ${requiredFields.substr(0, requiredFields.length - 2)}` })
      } else {
        response.query(`UPDATE INCIDENT SET Name = '${Name}', Contact_Number = '${Contact_Number}', How = '${How}', Injured_Person = ${Injured_Person}, Ambulance_Needed = ${Ambulance_Needed}, Situation = '${Situation}', Address = '${Address}', Location = '${Location}', Created_Date = '${Created_Date}', Status = '${Status}' WHERE ID = '${ID}'`, (error, result, fields) => {
          if (error) {
            res.status(400).send({ error: error })
          } else {
            res.send({ message: 'Incident Updated Successfully', iid: ID })
          }
        })
      }
    } else {
      res.status(500).send({ message: 'Error in connecting with DB.' })
    }
  })
})

module.exports = router
let employeeRecord

const createEmployeeRecord = function(arr) {
    employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord
}

const createEmployeeRecords = function (arr) {
    let employeeRecordsArr = arr.map(emp => createEmployeeRecord(emp))
    return employeeRecordsArr
}

let day
let hour

function deriveDate(dateAndTime) {
    day = dateAndTime.split('').slice(0, 10).join('')
    return day
}
  
function deriveTime(dateAndTime) {
    hour = dateAndTime.split('').slice(11, 15).join('')
    parseInt(hour, 10)
    return hour
}

const createTimeInEvent = function(dateAndTime) {
    day = deriveDate(dateAndTime)
    hour = parseInt(deriveTime(dateAndTime), 10)
    let newTimeInObj = {
      type: 'TimeIn',
      hour: hour,
      date: day,
      getDate: function() {
        return this.date
      },
      getHour: function() {
        return this.hour
      },
    }
   this.timeInEvents.push(newTimeInObj)
   return this
  }

  const createTimeOutEvent = function(dateAndTime) {
    day = deriveDate(dateAndTime)
    hour = parseInt(deriveTime(dateAndTime), 10)
    let newTimeOutObj = {
      type: 'TimeOut',
      hour: hour,
      date: day,
      getDate: function() {
        return this.date
      },
      getHour: function() {
        return this.hour
      },
    }
    this.timeOutEvents.push(newTimeOutObj)
    return this
  }

let hourIn
let hourOut

const findHourInDate = function(date) {
    let targetInDate = this.find(event => event.date === date)
    hourIn = targetInDate.getHour.call(targetInDate)
    return hourIn
  }
  
const findHourOutDate = function(date) {
    let targetOutDate = this.find(event => event.date === date)
    hourOut = targetOutDate.getHour.call(targetOutDate)
    return hourOut
  }
  
  let hoursWorked

  const hoursWorkedOnDate = function(date) {
    let timeInEvents = this.timeInEvents
    let timeOutEvents = this.timeOutEvents
    findHourInDate.call(timeInEvents, date)
    findHourOutDate.call(timeOutEvents, date)
    hoursWorked = (hourOut - hourIn) / 100
    return parseInt(hoursWorked, 10)
  }

 const wagesEarnedOnDate = function(date) {
    hoursWorkedOnDate.call(this, date)
    let wagesEarnedDate = hoursWorked * this.payPerHour
    return parseInt(wagesEarnedDate)
  }

  const findEmployeeByFirstName = function(arr, firstName) {
    let targetFirstName = arr.find(emp => emp.firstName === firstName)
    return targetFirstName
  }


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
let payable

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const sum = function() {
    const reducer = (sum, val) => sum + val
    const initialValue = 0
    return this.reduce(reducer, initialValue)
}

function calculatePayroll(arr) {
    let totalOwedEmployee = []
    arr.forEach(emp => totalOwedEmployee.push(allWagesFor.call(emp)))
    let grandTotal = sum.call(totalOwedEmployee)
    return grandTotal
  }

//   function calculatePayroll(arr) {
//     let grandTotalOwed = arr.reduce((sum, value) => sum + allWagesFor(value), 0);
//     return grandTotalOwed
//   }
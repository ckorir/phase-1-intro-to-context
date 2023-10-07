// Function for creating an employee record from
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
}
// Function for creating an employee
function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(createEmployeeRecord);
}

// Function for creating an employee time in event
function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// Function for creating an employee time out event
function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// Function for finding work hours
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

// Function for calculating wages earned
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    return hoursWorked * payRate;
}

// Function for calculating all wages for the employee
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
}

// Function for calculating payrollers for the employees
function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
    return totalPayroll;
}
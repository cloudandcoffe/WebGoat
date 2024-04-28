var dataFetched = false;

function selectUser() {
    var newEmployeeID = $("#UserSelect").val();
    var employeeRecordElement = document.getElementById("employeeRecord");
    var newEmployeeElement = document.getElementById(newEmployeeID);
    
    if (employeeRecordElement && newEmployeeElement) {
        employeeRecordElement.textContent = newEmployeeElement.textContent;
    }
}

function fetchUserData() {
    if (!dataFetched) {
        dataFetched = true;
        ajaxFunction(document.getElementById("userID").value);
    }
}

function ajaxFunction(userId) {
    $.get("clientSideFiltering/salaries?userId=" + userId, function (result, status) {
        var table = document.createElement("table");
        table.setAttribute("border", "1");
        table.setAttribute("width", "90%");
        table.setAttribute("align", "center");

        var headerRow = table.insertRow();
        headerRow.insertCell().textContent = "UserID";
        headerRow.insertCell().textContent = "First Name";
        headerRow.insertCell().textContent = "Last Name";
        headerRow.insertCell().textContent = "SSN";
        headerRow.insertCell().textContent = "Salary";

        for (var i = 0; i < result.length; i++) {
            var row = table.insertRow();
            row.id = result[i].UserID;
            row.insertCell().textContent = result[i].UserID;
            row.insertCell().textContent = result[i].FirstName;
            row.insertCell().textContent = result[i].LastName;
            row.insertCell().textContent = result[i].SSN;
            row.insertCell().textContent = result[i].Salary;
        }

        var container = document.getElementById("hiddenEmployeeRecords");
        container.innerHTML = "";
        container.appendChild(table);
    });
}

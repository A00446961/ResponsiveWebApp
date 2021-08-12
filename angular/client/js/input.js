var SERVER_URL = 'http://dev.cs.smu.ca:9898';
function save(){
var name = $("#name").val();
 var address = $("#address").val();
 var phone = $("#phone").val(); 

    
    if (name == '') {
        alert("Enter University Name to be searched");
        $("#name").focus();
        return false;
    }
    if (address == '') {
        alert("Enter Contact Address of University");
        $("#address").focus();
        return false;
    }
    if (phone == '') {
        alert("Enter Contact Info of the university!");
        $("#phone").focus();
        return false;
    }
    var tokens = phone.split('-');

    for (var i = 0; i < tokens.length; i++) {
        if (isNaN(tokens[i])) {
            alert("Use only Phone numbers or -.  () Not allowed");
            $("#phone").focus();
            return false;
        }
    }
    var firstChar = address.trim().substr(0, 1);

    if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#address").focus();
        return false;
    }
    if (validCharForStreetAddress(address)) {
        alert("Address not valid. Enter complete address with street number and streert name");
        $("#address").focus();
        return false;
    }
    var universityInfo = {
        "Name": document.getElementById("name").value ,
        "Address": document.getElementById("address").value ,
        "Phone": document.getElementById("phone").value ,
    };

        $.post(SERVER_URL + "/addUniversity",
                        universityInfo,
                        function (data) {
                        alert(data);
        });

}
function validCharForStreetAddress(c) {
    if(",#-/ !@$%^*(){}|[]\\".indexOf(c) >= 0){
        return true
    }
    var regExp = /[a-zA-Z]/g;
    if(!regExp.test(c)){
        return true
    }
}


function remove(){
var name = $("#name").val();
if (name == '') {
        alert("Enter University Name");
        $("#name").focus();
        return false;
    }
var universityInfo = {
            "Name": document.getElementById("name").value  };
    $.post(SERVER_URL + "/deleteUniversity",
                        universityInfo,
                        function (data) {
if(data['n']==0){
alert("Record Not Found");
}
else{
alert("Record deleted successfully");
}
        });


        $("#name").val('');
        $("#address").val('');
        $("#phone").val('');
    return;
}

function showTable(ele){
$("#displayTable").html(
                "   <tr>" +
                "<th>Name</th>" +
                "     <th>Address</th>" +
                "     <th>Phone</th>" +
                "   </tr>"
        );
if(ele.id=="0"){
var name = $("#search").val();
console.log("tables")
if (name == '') {
        alert("Enter University name");
        $("#name").focus();
        return false;
    }
    var universityInfo = {
                "Name": document.getElementById("search").value  };
    $.post(SERVER_URL + "/searchUniversity",
                            universityInfo,
                            function (data) {
                            var table = document.getElementById('displayTable');
            var universities = (data);
            if(universities.length==0){
                    alert("University record not found")
            return;
            }
            
            for (var i = 0; i < universities.length; i++) {
                var name = universities[i].Name;
                var address = universities[i].Address; 
                var phone = universities[i].Phone; 
                var r = table.insertRow();
                r.insertCell(-1).innerHTML = name;
                r.insertCell(-1).innerHTML = address;
                r.insertCell(-1).innerHTML = phone; 
            }
            });
    }
    else{
    $.post(SERVER_URL + "/searchAllUniversity",
                            function (data) {
                            var table = document.getElementById('displayTable');
            var universities = (data);
    if(universities.length==0){
    alert("University record not found")
    return;
    }
            
            for (var i = 0; i < universities.length; i++) {
                var name = universities[i].Name;
                var address = universities[i].Address;
                var phone = universities[i].Phone; 
                var r = table.insertRow();
                r.insertCell(-1).innerHTML = name;
                r.insertCell(-1).innerHTML = address;
                r.insertCell(-1).innerHTML = phone;
            }
            });
    
    }
    
}
    
    
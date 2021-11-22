  //Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCMDgNOL9szKvvrAaTs2iHlHxGdbgILin4",
    authDomain: "systems-analysis.firebaseapp.com",
    databaseURL: "https://systems-analysis-default-rtdb.firebaseio.com/",
    projectId: "systems-analysis",
    storageBucket: "systems-analysis.appspot.com",
    messagingSenderId: "918156820236",
    appId: "1:918156820236:web:1b7f878f358f2f132dd329"
  };
  //Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();
const trucksRef = dbRef.child('trucks');

var d = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[d.getDay()];

/* this is where we check trucks out */
const checkedInTrucks = document.getElementById("trucks-checked-in");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $ul = document.createElement("ul");
    let $button = document.createElement("button");
    $button.type = "button";
    $button.name = "check-out";
    $button.style.fontWeight = "700";
    $button.style.borderWidth = "2px";
    $button.value="Submit";
    $button.textContent = "Check Out";
    $button.className="btn btn-outline-danger btn-sm";
    for(var key in snap){
        if(truck.status == "On Lot"){
            $ul.id = truck.DOT_ID;
            $button.onclick = function(){
                changeTruckStatus($ul.id);
            }
            $ul.innerHTML = String(truck.year + " " + truck.make + " " + truck.model + " ");
            $ul.append($button);
            $ul.style.textAlign = "center";
            $ul.style.fontSize = "x-large";
            $ul.style.fontWeight = "600";
        } 
    }

    $ul.setAttribute("child-key", snap.key);
    $ul.addEventListener("load",checkedInTrucks.append($ul));
});

/* this is where we check trucks in */
const checkedOutTrucks = document.getElementById("trucks-checked-out");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $ul = document.createElement("ul");
    let $button = document.createElement("button");
    $button.type = "button";
    $button.name = "check-out";
    $button.style.fontWeight = "700";
    $button.style.borderWidth = "2px";
    $button.value="Submit";
    $button.textContent = "Check In";
    $button.className = "btn btn-outline-success btn-sm";
    for(var key in snap){
        if(truck.status == "On Road"){
            $ul.id = truck.DOT_ID;
            $button.onclick = function(){
                changeTruckStatus($ul.id);
            }
            $ul.innerHTML = String(truck.year + " " + truck.make + " " + truck.model + " ");
            $ul.append($button);
            $ul.style.textAlign = "center";
            $ul.style.fontSize = "x-large";
            $ul.style.fontWeight = "600";
        } 
    }

    $ul.setAttribute("child-key", snap.key);
    $ul.addEventListener("load",checkedOutTrucks.append($ul));
});


/* this will be how we chnage the truck status*/
function changeTruckStatus(id){
    var id;
    var theParent;
    this.id = id;
    
    //grab the parent node from the known child
    dbRef.child('trucks').orderByChild('DOT_ID').equalTo(id).on("value", function(snapshot) {
        //console.log(snapshot.val());
        snapshot.forEach(function(data) {
            console.log(data.key);
            theParent = data.key;
            return;
        });
    });


    //update truck status 
    trucksRef.child("/"+theParent).once('value').then( snap => {
        let truck = snap.val();
        console.log(truck.status);

        //let user confirm check in or out of truck
        let response = confirm('Confirm "'+truck.year + " " + truck.make + " " + truck.model + '"check in or out!');

        if(response == true){
            if(truck.status == "On Lot"){
                trucksRef.child(theParent).update({
                    'status': "On Road"
                })
                window.alert('"'+truck.year + " " + truck.make + " " + truck.model + '" has been checked out!');
                location.reload();
            }else if(truck.status == "On Road"){
                //get new mileage of truck after chekced in
                let newMileage = prompt("Enter the trucks new mileage: ");
                //if mileage is cancelled then we do nothing
                if(newMileage === null || newMileage <= truck.mileage){
                    let error = alert("Odometer can only increase")
                    return error;
                }else{
                    trucksRef.child(theParent).update({
                        'status': "On Lot"
                    })
                }
                let odometer = truck.mileage;
                console.log(newMileage+ ' '+truck.DOT_ID);
                changeTruckOdometer(odometer, newMileage, truck.DOT_ID);
                window.alert('"'+truck.year + " " + truck.make + " " + truck.model + '" has been checked in!');
                location.reload();
            }
        }else{
            console.log("Call Cancelled");
        }
        
    });
}

function changeTruckOdometer(origMiles, mileage, id){
    let today = origMiles;
    let odometer = mileage;
    let DOT_ID = id;
    var theParent;
    var d = new Date()
    var weekDay = d.getDay();

    //grab the parent node from the known child
    dbRef.child('trucks').orderByChild('DOT_ID').equalTo(id).on("value", function(snapshot) {
        //console.log(snapshot.val());
        snapshot.forEach(function(data) {
            console.log(data.key);
            theParent = data.key;
            return;
        });
    });

    //update truck mileage 
    trucksRef.child("/"+theParent).once('value').then( snap => {
        let truck = snap.val();
        console.log(truck.status);
        let milestoday = odometer - today;
        let weekMiles = truck.weeklymiles;
        let monthMiles = truck.monthlymiles;

        weekMiles += milestoday;
        monthMiles += milestoday;

        trucksRef.child(theParent).update({
            'mileage': odometer,
            'milestoday': milestoday,
            'weeklymiles': weekMiles,
            'monthlymiles': monthMiles,
            'lastUpdateWeek': d.getDate(),
            'lastUpdateMonth': d.getMonth(),
            'lastUpdate': d.getDay()

        })
    });
}

function resetMiles(){
    var d = new Date()
    var weekDay = d.getDay();

    trucksRef.once("value", function(snapshot){
        trucksRef.once("value", function(snapshot){
            snapshot.forEach(function(child){
                let truck = child.val();
                console.log(truck.lastUpdate);
                if(truck.lastUpdate != d.getDay()){
                    child.ref.update({
                        'milestoday': 0,
                    });
                }
                if(truck.lastUpdateWeek % 6 == 0){
                    child.ref.update({
                        'weeklymiles': 0,
                    });
                }
                if(d.getMonth() != truck.lastUpdateMonth){
                    child.ref.update({
                        'monthlymiles': 0,
                    });
                }
            });
        });
  })
}
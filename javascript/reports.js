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

/* this is where we add full sleeper trucks that are on the road onto the home page */
const fullSleeper = document.getElementById("daily-report");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $tr = document.createElement("tr");
    
    let truckDriver = document.createElement("th");
    truckDriver.innerHTML = String(truck.firstName + " " + truck.lastName);
    let truckName = document.createElement("th");
    truckName.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    let status = document.createElement("th");
    status.innerHTML = String(truck.mileage);
    let odometer = document.createElement("th");
    odometer.innerHTML = truck.milestoday;
    let maintenance = document.createElement("th");
    maintenance.innerHTML = truck.mileage;

    odometer.style.textAlign = "center";
    status.style.textAlign = "center";
    truckDriver.style.textAlign = "center";
    truckName.style.textAlign = "center";
    maintenance.style.textAlign = "center";

    $tr.appendChild(truckDriver);
    $tr.appendChild(truckName);
    $tr.appendChild(status);
    $tr.appendChild(odometer);
    
    //color table cel denpding on maintenance needs
    if(truck.type == "Full Sleeper"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 20000;
      let interval = 20000 - remainder;

      maintenance.innerHTML = interval;
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      //check if a cell color change is needed by comparing the interval of maintenance
      if(interval <= 2000 && interval > 1000){
        console.log(truck.mileage % 20000);
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000){
        maintenance.style.backgroundColor = "red";
      }
    }else if(truck.type == "Single Cab"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 25000;
      let interval = 25000 - remainder;
      maintenance.innerHTML = interval;
      
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      if(interval <= 2000 && interval > 1000){
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000 ){
        maintenance.style.backgroundColor = "red";
      }
    }else if(truck.type == "Single Axle"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 25000;
      let interval = 20000 - remainder;
      maintenance.innerHTML = interval;
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      if(interval <= 2000 && interval > 1000){
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000 ){
        maintenance.style.backgroundColor = "red";
      }
    }     
    $tr.appendChild(maintenance);
    //console.log(snap);
    $tr.setAttribute("child-key", snap.key);
    $tr.addEventListener("load",fullSleeper.append($tr));
});


/* this is where we add full sleeper trucks that are on the road onto the home page */
const singleCab = document.getElementById("weekly-report");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $tr = document.createElement("tr");
    
    let truckDriver = document.createElement("th");
    truckDriver.innerHTML = String(truck.firstName + " " + truck.lastName);
    let truckName = document.createElement("th");
    truckName.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    let status = document.createElement("th");
    status.innerHTML = String(truck.mileage);
    let odometer = document.createElement("th");
    odometer.innerHTML = truck.weeklymiles;
    let maintenance = document.createElement("th");
    maintenance.innerHTML = truck.mileage;

    odometer.style.textAlign = "center";
    status.style.textAlign = "center";
    truckDriver.style.textAlign = "center";
    truckName.style.textAlign = "center";
    maintenance.style.textAlign = "center";

    $tr.appendChild(truckDriver);
    $tr.appendChild(truckName);
    $tr.appendChild(status);
    $tr.appendChild(odometer);
    
    //color table cel denpding on maintenance needs
    if(truck.type == "Full Sleeper"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 20000;
      let interval = 20000 - remainder;

      maintenance.innerHTML = interval;
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      //check if a cell color change is needed by comparing the interval of maintenance
      if(interval <= 2000 && interval > 1000){
        console.log(truck.mileage % 20000);
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000){
        maintenance.style.backgroundColor = "red";
      }
    }else if(truck.type == "Single Cab"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 25000;
      let interval = 25000 - remainder;
      maintenance.innerHTML = interval;
      
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      if(interval <= 2000 && interval > 1000){
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000 ){
        maintenance.style.backgroundColor = "red";
      }
    }else if(truck.type == "Single Axle"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 25000;
      let interval = 20000 - remainder;
      maintenance.innerHTML = interval;
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      if(interval <= 2000 && interval > 1000){
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000 ){
        maintenance.style.backgroundColor = "red";
      }
    }     
    $tr.appendChild(maintenance);
    //console.log(snap);
    $tr.setAttribute("child-key", snap.key);
    $tr.addEventListener("load",singleCab.append($tr));
});


/* this is where we add full sleeper trucks that are on the road onto the home page */
const singleAxle = document.getElementById("monthly-report");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $tr = document.createElement("tr");
    
    let truckDriver = document.createElement("th");
    truckDriver.innerHTML = String(truck.firstName + " " + truck.lastName);
    let truckName = document.createElement("th");
    truckName.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    let status = document.createElement("th");
    status.innerHTML = String(truck.mileage);
    let odometer = document.createElement("th");
    odometer.innerHTML = truck.monthlymiles;
    let maintenance = document.createElement("th");
    maintenance.innerHTML = truck.mileage;
    
    odometer.style.textAlign = "center";
    status.style.textAlign = "center";
    truckDriver.style.textAlign = "center";
    truckName.style.textAlign = "center";
    maintenance.style.textAlign = "center";

    $tr.appendChild(truckDriver);
    $tr.appendChild(truckName);
    $tr.appendChild(status);
    $tr.appendChild(odometer);
    
    //color table cel denpding on maintenance needs
    if(truck.type == "Full Sleeper"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 20000;
      let interval = 20000 - remainder;

      maintenance.innerHTML = interval;
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      //check if a cell color change is needed by comparing the interval of maintenance
      if(interval <= 2000 && interval > 1000){
        console.log(truck.mileage % 20000);
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000){
        maintenance.style.backgroundColor = "red";
      }
    }else if(truck.type == "Single Cab"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 25000;
      let interval = 25000 - remainder;
      maintenance.innerHTML = interval;
      
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      if(interval <= 2000 && interval > 1000){
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000 ){
        maintenance.style.backgroundColor = "red";
      }
    }else if(truck.type == "Single Axle"){
      //get the remainder of miles left over
      let remainder = truck.mileage % 25000;
      let interval = 20000 - remainder;
      maintenance.innerHTML = interval;
      //set color to green and change if needed
      maintenance.style.backgroundColor = "green";
      if(interval <= 2000 && interval > 1000){
        maintenance.style.backgroundColor = "yellow";
      }
      if(interval <= 1000 ){
        maintenance.style.backgroundColor = "red";
      }
    }     
    $tr.appendChild(maintenance);
    //console.log(snap);
    $tr.setAttribute("child-key", snap.key);
    $tr.addEventListener("load",singleAxle.append($tr));
});
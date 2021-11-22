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
const fullsleeper = document.getElementById("full-sleeper");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $ul = document.createElement("ul");
    if(truck.status == "On Road" && truck.type == "Full Sleeper"){
        $ul.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    }
    $ul.setAttribute("child-key", snap.key);
    $ul.addEventListener("load",fullsleeper.append($ul));
});

/* this is where we add single cab trucks that are on the road onto the home page */
const singlecab = document.getElementById("single-cab");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $ul = document.createElement("ul");
    if(truck.status == "On Road" && truck.type == "Single Cab"){
        $ul.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    }
    $ul.setAttribute("child-key", snap.key);
    $ul.addEventListener("load",singlecab.append($ul));
});

/* this is where we add single axle trucks that are on the road onto the home page */
const singleaxle = document.getElementById("single-axle");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $ul = document.createElement("ul");
    if(truck.status == "On Road" && truck.type == "Single Axle"){
        $ul.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    }
    $ul.setAttribute("child-key", snap.key);
    $ul.addEventListener("load",singleaxle.append($ul));
});

////////////////////////////////////////////////////////////////////////////////////

/* this is where we add full sleeper trucks that are on the road onto the home page */
const fullsleeperlot = document.getElementById("full-sleeper-lot");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $ul = document.createElement("ul");
    if(truck.status == "On Lot" && truck.type == "Full Sleeper"){
        $ul.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    }
    $ul.setAttribute("child-key", snap.key);
    $ul.addEventListener("load",fullsleeperlot.append($ul));
});

/* this is where we add single cab trucks that are on the road onto the home page */
const singlecablot = document.getElementById("single-cab-lot");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $ul = document.createElement("ul");
    if(truck.status == "On Lot" && truck.type == "Single Cab"){
        $ul.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    }
    $ul.setAttribute("child-key", snap.key);
    $ul.addEventListener("load",singlecablot.append($ul));
});

/* this is where we add single axle trucks that are on the road onto the home page */
const singleaxlelot = document.getElementById("single-axle-lot");
trucksRef.on("child_added", snap => {
    let truck = snap.val();
    let $ul = document.createElement("ul");
    if(truck.status == "On Lot" && truck.type == "Single Axle"){
        $ul.innerHTML = String(truck.year + " " + truck.make + " " + truck.model);
    }
    $ul.setAttribute("child-key", snap.key);
    $ul.addEventListener("load",singleaxlelot.append($ul));
});
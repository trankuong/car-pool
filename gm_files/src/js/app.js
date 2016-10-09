// Your code goes here

//check click and destination is set

var cur_lat = "";
var cur_lng = "";
var des_lat = "";
var des_lng = "";
var json = "";
var carpooling = false;

gm.info.getCurrentPosition(initialPosition, true)
var id = gm.info.watchPosition(processPosition, true)

function initialPosition(position) {
	cur_lat = position.coords.latitude;
	cur_lng = position.coords.longitude;
}

function processPosition(position) {
	cur_lat = position.coords.latitude;
	cur_lng = position.coords.longitude;
}

function setRide() {
	dest = {};
	dest.latitude = json.latitude;
	dest.longitude = json.longitude;
	carpooling = true;
	gm.nav.setDestination(dest, true);
}

var dest = {};
dest = gm.nav.getDestination(success, failure, true);

function success(destination) {
	dest_lat = destination.latitude;
	dest_lng = destination.longitude;
}

function failure(err) {
	alert('No Destination Entered');
}

var check = setInterval(myTimer, 900000);


function myTimer() {
	if(!carpooling) {


		xhr = new XMLHttpRequest();
		var url = ""; //ip address here

		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");

		var data = JSON.stringify({"latitude":cur_lat,"longitude":cur_lng, "dest_lat":dest_lat, "dest_lng":dest_lng});
		xhr.send(data);	

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				json = JSON.parse(xhr.responseText);
				gm.ui.showAlert({
					alertTitle: "Car Pool Wanted",
					alertDetail: "People in your area are interested in carpooling!",
					primaryButtonText: "Give Ride!",
					primaryAction: function setRide() {
						var id = gm.voice.startTTS(success, failure, 'Updating navigation to pick up ' + json.name + '.');
							
						function success() {
						  carpooling = true;
						  json = JSON.parse(xhr.responseText);
						  setRide();
						}

						function failure() {
							carpooling = true;
							json = JSON.parse(xhr.responseText);
							setRide();
						}
					},
					secondaryButtonText: "Not Now",
					secondaryAction: function declRide() {
						var id = gm.voice.startTTS(success, 'Declining request from ' + json.name + '.');

						function success() {
							return;
						}
					}
				});
			}
		}
	}
	else {
		return;
	}
}

//Send Json info to server
document.getElementById('button').onclick = function() {

	gm.info.clearPosition(id);

	xhr = new XMLHttpRequest();
	var url = ""; //ip address here

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");

	var data = JSON.stringify({"latitude":cur_lat,"longitude":cur_lng, "dest_lat":dest_lat, "dest_lng":dest_lng});
	xhr.send(data);	

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			json = JSON.parse(xhr.responseText);
		}
	}

	//json = {'name': 'mary', 'latitude': 90, 'longitude': 87.6, 'email': 'karen@yahoo.com'}

	function btnSelect_Click() {
		gm.ui.showAlert({
			alertTitle: json.name + ", " + json.email,
			alertDetail: "Pick up " + json.name + " at X: " + json.longitude + ", Y: " + json.latitude + "?",
			primaryButtonText: "Sure!",
			primaryAction: function ride() {
				var id = gm.voice.startTTS(success, failure, 'Updating navigation to pick up ' + json.name + '.');
				//gm.voice.stopTTS(id);
					
				function success() {
					carpooling = true;
					setRide();
				}

				function failure() {
					carpooling = true;
					setRide();
				}
				
			},
			secondaryButtonText: "No Thanks",
			secondaryAction: function declRide() {
				var id = gm.voice.startTTS(success, 'Declining request from ' + json.name + '.');

				function success() {
					return;
				}
			}
		})
	}

	btnSelect_Click();
}

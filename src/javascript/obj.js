var clock = {
	id: "clock",
	location:"room1",
	objfunction: function () {
		var d = new Date();
		var hr = d.getHours();
		var min = d.getMinutes();
		if(min < 10) {
			min = "0" + min;
		}
		var ampm = hr < 12 ? "am" : "pm";
		var time = hr + ":" + min + " " + ampm;
		return "A pretty standard alarm clock that you found in the local electronics dump, it reads " + time;	
	}
}
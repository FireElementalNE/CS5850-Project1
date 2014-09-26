var clock = {
	id: "clock",
	location:"room1",
	names: ["clock"],
	cantake:false,
	inInv:false,
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
var bed = {
	id: "bed",
	names: ["bed"],
	location:"room1",
	cantake:false,
	inInv:false,
	objfunction: function () {
		return "Just a Normal Unmade Bed...";	
	}
}

var terminal = {
	id: "CRK-150",
	names: ["terminal","crk-150"],
	location:"room1",
	cantake:false,
	inInv:false,
	objfunction: function () {
		return "Your custom CRK-150, outfitted to be one of the " +
				"Fastest computer terminals on the market. It is on."	
	}
}
var icebreaker = {
	id: "icebreaker",
	names: ["icebreaker"],
	location:"room3",
	cantake:true,
	inInv:false,
	objfunction: function () {
		return "a russian military grade ice breaker you found in a local electronics shop, was pretty cheap.";
	}
}

var drawers = {
	id: "drawers",
	names: ["drawers"],
	location:"room4",
	cantake:true,
	inInv:false,
	objfunction: function () {
		return "Some basic bank accounts. You could crack them with ease but its not worth your time."; 
	}
}
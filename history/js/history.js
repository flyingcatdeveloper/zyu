var h = document.getElementById("h"),
history_holder = document.getElementById("history_holder");

<<<<<<< HEAD
function Send2(vID, startAt) {
	var v = vID;
	v = v.substr(v.length - 11, 11);
	var url = "./watch.html?v=" + encodeURIComponent(v) + "&t=" + encodeURIComponent(startAt + "s");
=======
function Send2(vID) {
	var v = vID;
	v = v.substr(v.length - 11, 11);
	var url = "./watch.html?v=" + encodeURIComponent(v);
>>>>>>> main
	window.location.href = url;
}

function loadHistory() {
<<<<<<< HEAD
	var count = 0;
	var history = JSON.parse(localStorage.getItem("history"));
    if (history != null) {
		var orderList = [];
		Object.keys(history).forEach(function(key) {
			orderList[history[key].placement] = history[key];
		}) 
		orderList.forEach(function(item) {
			var nh = document.createElement("p");
			var historyVidID = item.videoId;
			nh.innerHTML = item.title;
			nh.onclick = () => {
				Send2(item.videoId, item.startAt);
=======
	var count = 0-1;
	var history = localStorage.getItem("history");
    if (history != null) {
		let decodedHistory = history.split(":");
		Array.from({length: decodedHistory.length}, () => {
			var nh = document.createElement("p");
			var nhd = decodedHistory[count += 1].split(".");
			nh.innerHTML = Base64.decode(nhd[0]);
			nh.onclick = () => {
				Send2(Base64.decode(nhd[1]));
>>>>>>> main
			}
			nh.style.color = "yellow";
			nh.style.textDecoration = "underline";
			nh.style.cursor = "pointer";
<<<<<<< HEAD
			h.prepend(nh);
		})
=======
			h.appendChild(nh);
			// localStorage.removeItem("history");
		});
>>>>>>> main
	} else {
		h.innerHTML = "Nothing recently watched.";
		Array.from({length: h.children.length}, () => {
			var hc = h.firstChild;
			hc.parentNode.removeChild(hc);
		})
	}
}

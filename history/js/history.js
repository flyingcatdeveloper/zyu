var h = document.getElementById("h"),
history_holder = document.getElementById("history_holder");

function Send2(vID, startAt) {
	var v = vID;
	v = v.substr(v.length - 11, 11);
	var url = "./watch.html?v=" + encodeURIComponent(v) + "&t=" + encodeURIComponent(startAt + "s");
	window.location.href = url;
}

function loadHistory() {
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
			}
			nh.style.color = "yellow";
			nh.style.textDecoration = "underline";
			nh.style.cursor = "pointer";
			h.prepend(nh);
		})
	} else {
		h.innerHTML = "Nothing recently watched.";
		Array.from({length: h.children.length}, () => {
			var hc = h.firstChild;
			hc.parentNode.removeChild(hc);
		})
	}
}

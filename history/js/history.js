var h = document.getElementById("h"),
history_holder = document.getElementById("history_holder");

function Send2(vID) {
	var v = vID;
	v = v.substr(v.length - 11, 11);
	var url = "./watch.html?v=" + encodeURIComponent(v);
	window.location.href = url;
}

function loadHistory() {
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
			}
			nh.style.color = "yellow";
			nh.style.textDecoration = "underline";
			nh.style.cursor = "pointer";
			h.appendChild(nh);
			// localStorage.removeItem("history");
		});
	} else {
		h.innerHTML = "Nothing recently watched.";
		Array.from({length: h.children.length}, () => {
			var hc = h.firstChild;
			hc.parentNode.removeChild(hc);
		})
	}
}

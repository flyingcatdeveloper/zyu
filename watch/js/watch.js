const base = "https://www.youtube-nocookie.com/embed/";
const base2 = "https://www.youtube.com/";
const watch = "watch?v=";
var t = document.querySelector("#title");
var u = document.querySelector("#user");
var video_holder;
var vid = document.querySelector(".video");
var v = document.getElementById("video");
var home = document.getElementById("home");
var video_holder_holder = document.getElementById('video-holder-holder');
var link;
var id;
var time;

home.onclick = () => {
  window.location.href = "./index.html"
}

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i < ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }

function loadJSON(path, success, error) {
	var xhr = new XMLHttpRequest;
	xhr.onreadystatechange = function () {
	  if (xhr.readyState === 4) {
		if (xhr.status === 200) {;
		  success(JSON.parse(xhr.responseText));
		  lw.style.display = "none";
		}
		else {
      window.alert("Invalid Video!");
      window.location.href = "index.html";
		}
	  }
	};
	xhr.open('GET', path, true);
	xhr.send();
  }
  
  function myData(Data)
  {
	t.innerHTML = Data.title;
	u.innerHTML = Data.author_name;
	document.title = Data.title + " - " + Data.author_name;
  localStorage.setItem("lwvt", Data.title);
  localStorage.setItem("lwv", id);
  localStorage.setItem("lwvsa", time);
  if (JSON.parse(localStorage.getItem("history"))) {
    var newHistLength = parseInt(localStorage.getItem("historyLength"))+ 1;
    localStorage.setItem("historyLength", newHistLength);
    var historyObj = JSON.parse(localStorage.getItem("history"));
    historyObj[id] = {
      videoId: id,
      placement: parseInt(localStorage.getItem("historyLength")),
      title: Data.title,
      startAt: time
    }
    localStorage.setItem("history", JSON.stringify(historyObj));
  } else {
    localStorage.setItem("historyLength", 1);
    var historyObj = {}
    historyObj[id] = {
      videoId: id,
      placement: parseInt(localStorage.getItem("historyLength")),
      title: Data.title,
      startAt: time
    }
    localStorage.setItem("history", JSON.stringify(historyObj));
  }
}

// window.onerror = function (msg, url, linenumber) {
//     alert(
//       'Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber
//     );
//   return true;
// };

function onYouTubeIframeAPIReady() {
  var pageURL = document.location.href;
  var makePlayer = false;
  var v = null;
  var t = null;
  if (pageURL.includes("?")) {
    var afterParam = pageURL.split("?")[1];
    if (afterParam.includes("&")) {
      var splitParams = afterParam.split("&");
      splitParams.forEach(function(param) {
        if (param.includes("v=")) {
          v = param.split("v=")[1];
        }
        if (param.includes("t=")) {
          var beforeSecSplit = param.split("t=")[1];
          t =  parseInt(beforeSecSplit.split("s")[0]);
        }
      });
      makePlayer = true;
    } else if (afterParam.includes("v=")) {
      v = afterParam.split("v=")[1];
      t = 0;
      makePlayer = true;
    } else {
      alert("missing needed parameters!");
    }
  } else {
    alert("missing parameters!");
  }
  if (makePlayer) {
    var player = new YT.Player('video', {
      videoId: v,
      host: 'https://www.youtube-nocookie.com',
      playerVars: {
        start: t,
        origin: window.location.host
      }
    });
    id = v;
    time = t;
    var oembed = "https://www.youtube.com/oembed?url=" + base2 + watch +  v + "&format=json";
    loadJSON(oembed, myData);

    setInterval(function() {
      var newTime = Math.round(player.getCurrentTime());
      localStorage.setItem("lwvsa", newTime);
      var newHistoryObj = JSON.parse(localStorage.getItem("history"));
      newHistoryObj[v].startAt = newTime;
      localStorage.setItem("history", JSON.stringify(newHistoryObj));
    }, 1000);
  } else {
    window.location.href = "./index.html";
  }
}

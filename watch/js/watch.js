const base = "https://www.youtube-nocookie.com/embed/";
const base2 = "https://www.youtube.com/";
const watch = "watch?v=";
const end = "?wmode=transparent&amp;iv_load_policy=3&amp;autoplay=0&amp;html5=1&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=0&amp;theme=light";
const strip_timestamps = /\?t=\d+/;
var t = document.querySelector("#title");
var u = document.querySelector("#user");
var video_holder;
var vid = document.querySelector(".video");
var v = document.getElementById("video");
var home = document.getElementById("home");
var video_holder_holder = document.getElementById('video-holder-holder');
var link;
var id;

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
  if (localStorage.getItem("history") != null) {
    localStorage.setItem("history", localStorage.getItem("history") + Base64.encode(Data.title) + "." + Base64.encode(id) + ":");
  } else {
    localStorage.setItem("history", Base64.encode(Data.title) + "." + Base64.encode(id) + ":");
  }
  }

var queryString = new Array();
window.onload = function () {
    if (queryString.length == 0) {
        if (window.location.search.split('?').length > 1) {
            var params = window.location.search.split('?')[1].split('&');
            for (var i = 0; i < params.length; i++) {
                var key = params[i].split('=')[0];
                var value = decodeURIComponent(params[i].split('=')[1]);
                queryString[key] = value;
            }
        }
    }
    if (queryString["v"] != null) {
        if(document.getElementById('instructions')) {
            document.getElementById('instructions').remove();
        }
        vid.style.display = "";
        link = queryString["v"];
        id = link.replace(strip_timestamps, "");
        id = id.substr(id.length - 11, 11);
        video_holder = document.getElementById('video-holder');
        video_holder.style.display = 'block';
        v.src = base + id + end;
        video_holder_holder.appendChild(video_holder);
        var oembed = "https://www.youtube.com/oembed?url=" + base2 + watch +  id + "&format=json";
        // t.innerHTML = oembed
        loadJSON(oembed, myData);
        url.value = "";
    }
};

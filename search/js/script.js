<<<<<<< HEAD
var DEV = false;
=======
var DEV = true;
>>>>>>> main

window.onerror = function (msg, url, linenumber) {
  if (DEV === true) {
    alert(
      'Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber
    );
  }
  return true;
};

const base = "https://www.youtube-nocookie.com/embed/";
const base2 = "https://www.youtube.com/";
const watch = "watch?v=";
const end = "?wmode=transparent&amp;iv_load_policy=3&amp;autoplay=0&amp;html5=1&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=0&amp;theme=light";
const strip_timestamps = /\?t=\d+/;
var submit = document.getElementById('submit');
var download = document.getElementById('download');
var url = document.getElementById('url');
var t = document.querySelector("#title");
var u = document.querySelector("#user");
var video_holder;
var vid = document.querySelector(".video");
var v = document.getElementById("video");
var l = document.getElementById("lw");
var lw = document.querySelector(".lw");
var ofs = document.getElementById("ofs");
var video_holder_holder = document.getElementById('video-holder-holder');
var link;
var title;
var id;

function Send() {
	var v = document.getElementById("vLink").value;
<<<<<<< HEAD
  if (v.includes("?")) {
    var beforeUrl = v.split("?")[1];
    if (beforeUrl.includes("&")) {
      var t = null;
      var v = null;
      var splitAnd = beforeUrl.split("&");
      splitAnd.forEach(function(q) {
        if (q.includes("v=")) {
          v = q.split("v=")[1];
        }
        if (q.includes("t=")) {
          t = q.split("t=")[1];
        }
      });
      if (t && v) {
        var url = "watch.html?v=" + v + "&t=" + t;
        window.location.replace(url);
      } else if (v) {
          var url = "watch.html?v=" + v;
          window.location.replace(url);
      } else {
        alert("missing needed parameters");
      }
    } else {
      if (beforeUrl.includes("v=")) {
        var v = beforeUrl.split("v=")[1];
        var url = "watch.html?v=" + v;
        window.location.replace(url);
      } else {
        alert("missing needed parameters");
      }
    }
  } else {
    alert("url missing parameters");
  }
}

function Send2(vID, startAt) {
	var v = vID;
	var url = "watch.html?v=" + encodeURIComponent(v) + "&t=" + encodeURIComponent(startAt);
	window.location.replace(url);
}
 
  function checkLWV() {
    if (localStorage.getItem("lwv") != null && localStorage.getItem("lwvt") != null && localStorage.getItem("lwvsa") != null) {
		lw.style.display = "";
		l.innerHTML = localStorage.getItem("lwvt");
		l.addEventListener("click", () => {
			Send2(localStorage.getItem("lwv"), localStorage.getItem("lwvsa"));
=======
	var beforeUrl = v.split("?")[1];
	if (beforeUrl.includes("&")) {
		afterUrl = beforeUrl.split("&")[0];
		v = afterUrl.split("v=")[1];
	} else {
		v = beforeUrl.split("v=")[1];
	}
	var url = "watch.html?v=" + encodeURIComponent(v);
	window.location.replace(url);
}

function Send2(vID) {
	var v = vID;
	var url = "watch.html?v=" + encodeURIComponent(v);
	window.location.replace(url);
}

  function checkLWV() {
    if (localStorage.getItem("lwv") != null && localStorage.getItem("lwvt") != null) {
		lw.style.display = "";
		l.innerHTML = localStorage.getItem("lwvt");
		l.addEventListener("click", () => {
			Send2(localStorage.getItem("lwv"));
>>>>>>> main
		})
	} else {
		lw.style.display = "none";
		l.innerHTML = "Unavailable";
	}
  }

const searchYoutube = async ()=>
{

    try{
      let input = document.getElementById("searchInput").value;
         
   let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${input}&key=AIzaSyBfzPlgNmYfU_flDKmXobkcQ4u_imqKyaQ&maxResults=100`);

    let data = await res.json()
    showResult(data.items)

}
    
catch(err)
{
 alert("err1",err);
}


}

let result = document.getElementById("result");

const showResult =(data) =>
{
result.innerHTML="<h3 style='text-align: center; font-weight: bolder;'>Results:</h3><br>";
data.forEach(({snippet, id:{videoId}}) =>
{
   
    try
    {
         
		if (videoId != undefined && videoId != null & videoId != "") {

            let div = document.createElement("div");
            div.addEventListener("click",()=>
            {
                Send2(videoId);
            })

            let thumbnail = document.createElement("img");
            thumbnail.id="video"
            thumbnail.src=snippet.thumbnails.high.url;

            thumbnail.style.height=snippet.thumbnails.high.height + "px";
            thumbnail.style.width=snippet.thumbnails.high.width + "px";

			thumbnail.style.margin = "0 auto";

            let channel=document.createElement("p");
            channel.innerText=snippet.channelTitle;
            channel.id="channel";

            let title = document.createElement("p");
            title.id="text";
            title.innerText=snippet.title;

			div.style.textAlign = "center";


            div.append(thumbnail,title,channel);
            result.append(div);

		}
    }
    catch(err)
    {
        alert("err2",err);
    }




});

}

document.getElementById("vLink").addEventListener("keydown", function(e) {
	if (e.key == "Enter") {
		Send();
	}
})

document.getElementById("searchInput").addEventListener("keydown", function(e) {
	if (e.key == "Enter") {
		searchYoutube();
	}
})

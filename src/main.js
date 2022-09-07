
window.addEventListener("load", startup, false);
let video;
let logs;

function startup() {
	video = document.getElementById("video");
	logs = document.getElementById("logs");
	// PIP
	if (document.pictureInPictureEnabled) {
		createToggleBtn()
		// togglePictureInPicture()
		document.pictureInPictureElement
		// setTimeout(() => togglePictureInPicture(), 2000);
	}
	// HLS
	if (Hls.isSupported()) {
        var hls = new Hls({
          debug: true,
        });
        hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          video.muted = true;
          video.play();
        });
      }
      else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('canplay', function () {
          video.play();
        });
      }
}
function createToggleBtn() {
	const togglePipButton = document.createElement("button");
	togglePipButton.textContent = "Toggle Picture-in-Picture";
	togglePipButton.addEventListener("click", togglePictureInPicture, false);

	document.getElementById("controlbar").appendChild(togglePipButton);
	setTimeout(() => togglePipButton.click(), 2000);
}

function togglePictureInPicture() {
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture();
	} else {
		if (document.pictureInPictureEnabled) {
			video.requestPictureInPicture()
				.then(pictureInPictureWindow => {
					pictureInPictureWindow.addEventListener("resize", onPictureInPictureResize, false);
				});
		}
	}
}

function onPictureInPictureResize() {
	// const listItem = document.createElement("li");
	// listItem.textContent = `resize - ${Date.now()}`;

	// logs.appendChild(listItem);
	// setTimeout(() => logs.removeChild(listItem), 2000);
};

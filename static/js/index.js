'use strict';

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player = null;
var videoId = 'GvRQ_vVayZ0';
var startSec = 8;
var endSec = 168;

var playerId = 'player';
var playerElement = document.getElementById(playerId);

var onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
	if (!playerElement) {
		return;
	}
	player = new YT.Player(playerId, {
		videoId: videoId,
		playerVars: {
			playsinline: 1,
			autoplay: 1,
			cc_load_policy: 0,
			controls: 0,
			enablejsapi: 1,
			iv_load_policy: 3,
			disablekb: 1,
			showinfo: 0,
			rel: 0,
			start: startSec,
			end: endSec,
			modestbranding: 1
		},
		events: {
			onReady: function onReady(event) {
				playerElement.classList.add('is-ready');
				event.target.mute();
			},
			onStateChange: function onStateChange(event) {
				if (event.data == YT.PlayerState.PLAYING) {}
				if (event.data == YT.PlayerState.ENDED) {
					player.playVideo(startSec);
					player.seekTo(startSec, true);
				}
			}
		}
	});
};

var resizeMovie = function resizeMovie() {
	if (!playerElement) {
		return;
	}

	var bw = 1200; //基準にする横幅
	var bh = bw * (9 / 16); //基準にする高さ(16:9)
	var w = window.innerWidth; //表示サイズ(幅)
	var h = window.innerHeight; //表示サイズ(高さ)
	var mw = w; //動画サイズ(幅)
	var mh = Math.round(bh * (mw / bw)); //動画サイズ(高さ)

	if (mh < h) {
		//動画の高さが表示サイズの高さより小さかったら
		mh = h; //表示サイズの高さに変更
		mw = Math.round(bw * (mh / bh)); //高さに合わせて横幅変更
	}
	playerElement.style.width = mw + 'px';
	playerElement.style.height = mh + 'px';
	playerElement.style.marginTop = (h - mh) / 2 + 'px';
};

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
window.addEventListener('onload', resizeMovie());
window.addEventListener('resize', resizeMovie);
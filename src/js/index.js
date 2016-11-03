import {_ua} from './Util';

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player = null;
const videoId = 'GvRQ_vVayZ0';
const startSec = 8;
const endSec = 168;

const playerId = 'player';
const playerElement = document.getElementById(playerId);

const onYouTubeIframeAPIReady = () => {
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
			disablekb:1,
			showinfo:0,
			rel:0,
			start: startSec,
			end: endSec,
			modestbranding: 1
		},
		events: {
			onReady: (event) => {
				playerElement.classList.add('is-ready');
				event.target.mute();
			},
			onStateChange: (event) => {
				if (event.data == YT.PlayerState.PLAYING) {
				}
				if (event.data == YT.PlayerState.ENDED) {
					player.playVideo(startSec);
					player.seekTo(startSec, true);
				}
			},
		}
	});
};

const resizeMovie = () => {
	if (!playerElement) {
		return;
	}

	let bw = 1200;
	let bh = bw * (9 / 16);
	let w = window.innerWidth;
	let h = window.innerHeight;
	let mw = w;
	let mh =  Math.round(bh * (mw/bw));

	if ( mh < h ) {
		mh = h;
		mw = Math.round(bw * (mh/bh));
	}
	playerElement.style.width = `${mw}px`;
	playerElement.style.height = `${mh}px`;
	playerElement.style.marginTop = `${(h - mh)/2}px`;
}

if (!_ua.Mobile && !_ua.Tablet) {
	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
	window.addEventListener('onload', resizeMovie());
	window.addEventListener('resize', resizeMovie);
}

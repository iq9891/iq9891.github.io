function Orientation() {
    window.addEventListener('deviceorientation', orientationListener, false);
}

function orientationListener(evt) {
	if (!evt.gamma && !evt.beta) {
		evt.gamma = (evt.x * (180 / Math.PI)); //转换成角度值,
		evt.beta = (evt.y * (180 / Math.PI)); //转换成角度值
		evt.alpha = (evt.z * (180 / Math.PI)); //转换成角度值
	}

	var gamma = evt.gamma;
	var beta = evt.beta;
	var alpha = evt.alpha;

	if (evt.accelerationIncludingGravity) {
		gamma = event.accelerationIncludingGravity.x * 10;
		beta = -event.accelerationIncludingGravity.y * 10;
		alpha = event.accelerationIncludingGravity.z * 10;
	}

	gamma = gamma.toFixed(1);
	beta = beta.toFixed(1);
	alpha = alpha.toFixed(1);
	if (this._lastGamma != gamma || this._lastBeta != beta) {

		$(".allBg").css("backgroundPosition", (allX + gamma / 180 * 140) + "px " + (allY + beta / 180 * 140) + "px");

		this._lastGamma = gamma;
		this._lastBeta = beta;
	}
};
Orientation();
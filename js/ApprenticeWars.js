
var ApprenticeWars = function() {
	var _this = this;
	_this.inputManager = new InputManager();
	_this.currentScene = null;
}

ApprenticeWars.prototype.start = function() {
	var _this = this;
	this.ctx = $('#screen').get(0).getContext('2d');
	$(window).resize( function() { _this.onResize(); })
	this.onResize();

	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			function( callback ) {
				window.setTimeout( callback, 1000/60 );
			};
	})()

	function animloop(){
	window.requestAnimationFrame(animloop);
		_this.update();
	}

	animloop();

}

ApprenticeWars.prototype.update = function() {

	this.ctx.clearRect( 0, 0, this.currentWidth, this.currentHeight );
	this.ctx.fillStyle = '0e0e0e';
	this.ctx.fillRect( 0, 0, this.currentWidth, this.currentHeight );
	this.ctx.save();

	this.ctx.imageSmoothingEnabled = false;
	this.ctx.webkitImageSmoothingEnabled = false;
	this.ctx.mozImageSmoothingEnabled = false;

	if( this.currentScene !== null ) {
		this.currentScene.update();
	}

	this.ctx.restore();
}

ApprenticeWars.prototype.onResize = function() {
	this.currentWidth = window.innerWidth;
	this.currentHeight = window.innerHeight;
	$('#screen').get(0).width = this.currentWidth;
	$('#screen').get(0).height = this.currentHeight;
};


(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


$(document).keydown( function( e ) {
	game.inputManager.onKeyDown( e.keyCode );
	e.preventDefault();
});

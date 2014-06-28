
var InputManager = function() {
	var _this = this;
	_this.callbacks = [];
}

InputManager.prototype.onKeyDown = function( keycode ) {
	var _this = this;
	for( var callback in _this.callbacks ) {
		if( callback != null ) {
			var result = callback( keycode );
			if( result === false ) return;
		}
	}
}

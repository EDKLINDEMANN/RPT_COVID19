(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.mrec_carro = function() {
	this.initialize(img.mrec_carro);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,250);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.mrec_carro();
	this.instance.setTransform(-384,-125);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-384,-125,768,250);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#04142B").s().p("A3bTiMAAAgnDMAu3AAAMAAAAnDg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150,-125,300,250);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C8282E").s().p("AhVChQgaggAAg8IAAiKQAAg9AageQAZgfA8ABQA8gBAaAfQAaAfAAA8IAACKQAAA8gaAgQgaAeg8AAQg8AAgZgegAgVh5QgGAMAAAUIAACzQAAAUAFALQAFAMARAAQARAAAFgMQAGgLAAgUIAAizQAAgUgGgMQgFgMgRAAQgQAAgFAMg");
	this.shape.setTransform(91.825,32.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C8282E").s().p("AgoC6IAAk2Ig4AAIAAg9IDBAAIAAA9Ig3AAIAAE2g");
	this.shape_1.setTransform(68.125,32.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C8282E").s().p("AhBCvQgZgNgJgaQgKgbAAgpIAAkAIBRAAIAAENQAAAWAGAOQAFANARgBQARABAGgNQAFgOAAgWIAAkNIBSAAIAAEAQAAApgKAbQgKAagYANQgYAOgqAAQgpAAgYgOg");
	this.shape_2.setTransform(44.375,32.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C8282E").s().p("AAuC6IhMjAIAADAIhGAAIAAlzIA6AAIBLCzIAAizIBEAAIAAFzg");
	this.shape_3.setTransform(17.925,32.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C8282E").s().p("AgoC6IAAlzIBRAAIAAFzg");
	this.shape_4.setTransform(-1.875,32.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C8282E").s().p("ABNC6IgHj3IgrD3IgzAAIguj5IgGD5Ig6AAIAFlzIBZAAIAoDXIAsjXIBVAAIAHFzg");
	this.shape_5.setTransform(-25,32.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C8282E").s().p("AhVChQgaggAAg8IAAiKQAAg9AageQAZgfA8ABQA8gBAaAfQAaAfAAA8IAACKQAAA8gaAgQgaAeg8AAQg8AAgZgegAgVh5QgGAMAAAUIAACzQAAAUAFALQAFAMARAAQARAAAFgMQAGgLAAgUIAAizQAAgUgGgMQgFgMgRAAQgQAAgFAMg");
	this.shape_6.setTransform(-66.475,32.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C8282E").s().p("AApC6IgNhOIg2AAIgMBOIhOAAIBHlzIBcAAIBGFzgAgSA6IAmAAIgTiQg");
	this.shape_7.setTransform(-92.65,32.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhKCjQgagcgBg+IBGgLQAAAkAIAQQAIAPAQAAQAUAAAAgbQAAgWgKgQQgJgPgVgSIgggcQgYgUgNgWQgNgXAAgfQAAgvAcgZQAcgZAvAAQA1AAATAeQATAfACAsIhHAJQgBgdgEgNQgFgMgOAAQgKAAgGAJQgFAIAAAMQAAASAIANQAJANARARIAfAbQAcAXAPAZQAPAbAAAjQAAAbgMAVQgMAWgWAMQgWAMgdAAQg1AAgagcg");
	this.shape_8.setTransform(76.425,-25.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AApC6IgNhOIg2AAIgMBOIhOAAIBGlzIBeAAIBFFzgAgSA6IAnAAIgUiQg");
	this.shape_9.setTransform(51.55,-25.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgoC6IAAlzIBRAAIAAFzg");
	this.shape_10.setTransform(31.975,-25.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhTCgQgZggAAg8IAAiGQAAg9AZggQAZgfA8AAQA6AAAZAbQAYAdABAzIAAAgIhRAAIAAglQAAgWgFgLQgEgMgSAAQgQAAgGANQgFALAAAWIAACvQAAAWAFAMQAGALAQAAQASAAAEgLQAFgMAAgWIAAgnIBRAAIAAAfQgBA1gYAdQgZAdg6AAQg8AAgZgfg");
	this.shape_11.setTransform(12.35,-25.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag8D3IAAlzIBSAAIAAFzgAgsiaIAdhcIBMAAIg6Bcg");
	this.shape_12.setTransform(-5.825,-32.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgoC6IAAk2Ig4AAIAAg9IDBAAIAAA9Ig3AAIAAE2g");
	this.shape_13.setTransform(-24.925,-25.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AhVCgQgageAAg9IAAiKQAAg9AageQAZgeA8AAQA8AAAaAeQAaAfAAA8IAACKQAAA9gaAeQgaAfg8AAQg8AAgZgfgAgVh5QgGALAAAVIAACyQAAAVAFAMQAFALARAAQARAAAFgLQAGgMAAgVIAAiyQAAgVgGgLQgFgMgRAAQgQAAgFAMg");
	this.shape_14.setTransform(-48.625,-25.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAuC6IhMjAIAADAIhGAAIAAlzIA6AAIBLCzIAAizIBEAAIAAFzg");
	this.shape_15.setTransform(-75.025,-25.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-107.4,-70.3,214.8,140.6);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAgCSIgJg+IgqAAIgKA+Ig9AAIA3kjIBIAAIA2EjgAgOAuIAeAAIgQhxg");
	this.shape.setTransform(64.85,23.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgzCJQgTgKgIgVQgHgVAAggIAAjIIA/AAIAADSQAAASAEAKQAFAKANAAQAOAAAEgKQAEgKAAgSIAAjSIBAAAIAADIQABAggJAVQgHAVgUAKQgTALggAAQggAAgTgLg");
	this.shape_1.setTransform(44.45,23.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAkCSIg7iWIAACWIg3AAIAAkjIAtAAIA7CNIAAiNIA1AAIAAEjg");
	this.shape_2.setTransform(23.725,23.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgfCSIAAkjIA/AAIAAEjg");
	this.shape_3.setTransform(8.225,23.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgfCSIAAjzIgsAAIAAgwICXAAIAAAwIgsAAIAADzg");
	this.shape_4.setTransform(-5.175,23.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAkCSIg7iWIAACWIg3AAIAAkjIAtAAIA7CNIAAiNIA1AAIAAEjg");
	this.shape_5.setTransform(-23.325,23.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhCB+QgVgZAAgvIAAhrQAAgwAVgYQAUgYAuAAQAvAAAVAYQAUAYAAAwIAABrQAAAvgUAZQgVAYgvAAQguAAgUgYgAgRhfQgEAKAAAQIAACLQAAAPAEAKQAEAJANAAQAOAAADgJQAFgKAAgPIAAiLQAAgQgFgKQgDgJgOAAQgMAAgFAJg");
	this.shape_6.setTransform(-43.95,23.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhBB9QgUgZAAgvIAAhoQAAgxAUgYQAUgZAvAAQAuAAATAWQATAWAAAoIAAAZIg/AAIAAgdQAAgQgEgKQgDgJgOAAQgNAAgEAKQgEAJAAARIAACIQAAASAEAJQAFAJAMAAQANAAAEgJQAEgJAAgSIAAgeIA/AAIAAAZQAAApgTAXQgTAXguAAQgvAAgUgZg");
	this.shape_7.setTransform(-64.425,23.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C8282E").s().p("AhCB9QgVgYAAgwIAAhrQAAgvAVgYQATgYAvAAQAvAAAVAYQAUAYAAAvIAABrQAAAwgUAYQgVAZgvAAQgvAAgTgZgAgRheQgEAIAAARIAACLQAAAQAEAJQAEAJANAAQANAAAEgJQAFgJAAgQIAAiLQAAgRgFgIQgEgKgNABQgMgBgFAKg");
	this.shape_8.setTransform(119.05,-18.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C8282E").s().p("AgfCSIAAjzIgsAAIAAgwICXAAIAAAwIgsAAIAADzg");
	this.shape_9.setTransform(100.525,-18.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C8282E").s().p("AAYCSIgfiDIgSAAIAACDIhBAAIAAkjIBRAAQAvAAAYARQAZARAAArQAAAdgIASQgIARgUAJIAoCNgAgZgVIASAAQASAAAIgKQAIgLAAgUQAAgUgHgKQgIgKgQAAIgVAAg");
	this.shape_10.setTransform(82.125,-18.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C8282E").s().p("AhCB9QgVgYAAgwIAAhrQAAgvAVgYQAUgYAuAAQAvAAAVAYQAUAYAAAvIAABrQAAAwgUAYQgVAZgvAAQguAAgUgZgAgRheQgEAIAAARIAACLQAAAQAEAJQAEAJANAAQAOAAADgJQAFgJAAgQIAAiLQAAgRgFgIQgDgKgOABQgNgBgEAKg");
	this.shape_11.setTransform(60.35,-18.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#C8282E").s().p("AhWCSIAAkjIBhAAQAmAAATAWQATAWAAApQAAAvgWARQgWASgoAAIgZAAIAAB8gAgWgWIAWAAQAQAAAFgJQAGgJAAgVQAAgUgFgJQgGgKgRAAIgVAAg");
	this.shape_12.setTransform(40.125,-18.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C8282E").s().p("Ag5CAQgVgXgBgvIA3gJQAAAcAHALQAGANAMAAQAQAAAAgWQAAgQgIgNQgIgLgPgPIgagWQgSgPgLgRQgKgSAAgZQAAglAWgTQAWgUAlAAQApAAAPAYQAPAYABAjIg3AHQgBgXgDgKQgEgKgLAAQgHAAgFAHQgFAHAAAJQAAAOAHAKQAHALAOANIAYAVQAVASAMATQAMAWAAAcQAAAUgJAQQgKASgRAJQgSAKgWAAQgpAAgUgWg");
	this.shape_13.setTransform(20.275,-18.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C8282E").s().p("AhBCSIAAkjICCAAIAAAsIhCAAIAABIIAzAAIAAAsIgzAAIAABXIBDAAIAAAsg");
	this.shape_14.setTransform(3.4,-18.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C8282E").s().p("AhVCSIAAkjIBKAAQAkAAAWAJQAVAKAJAUQAJAUAAAhIAABpQAAAigJAUQgJAUgVAKQgVAKgkAAgAgUBlIAKAAQANAAAGgEQAHgEACgIQACgIgBgPIAAh+QAAgOgCgHQgCgIgGgDQgHgEgMAAIgKAAg");
	this.shape_15.setTransform(-15.7,-18.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AhCB9QgVgYAAgwIAAhrQAAgvAVgYQAUgYAuAAQAvAAAVAYQAUAYAAAvIAABrQAAAwgUAYQgVAZgvAAQguAAgUgZgAgRheQgEAIAAARIAACLQAAAQAEAJQAEAJANAAQAOAAADgJQAFgJAAgQIAAiLQAAgRgFgIQgDgKgOABQgMgBgFAKg");
	this.shape_16.setTransform(-46.2,-18.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("Ag5CAQgVgXgBgvIA3gJQAAAcAHALQAGANAMAAQAQAAAAgWQAAgQgIgNQgIgLgPgPIgagWQgSgPgLgRQgKgSAAgZQAAglAWgTQAWgUAlAAQApAAAPAYQAPAYABAjIg3AHQgBgXgDgKQgEgKgLAAQgHAAgFAHQgFAHAAAJQAAAOAHAKQAHALAOANIAYAVQAVASAMATQAMAWAAAcQAAAUgJAQQgKASgRAJQgSAKgWAAQgpAAgUgWg");
	this.shape_17.setTransform(-74.925,-18.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAgCSIgJg+IgqAAIgKA+Ig+AAIA3kjIBJAAIA2EjgAgOAuIAeAAIgQhxg");
	this.shape_18.setTransform(-94.35,-18.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AA8CSIgFjBIgiDBIgoAAIgjjDIgFDDIguAAIAFkjIBFAAIAfCpIAjipIBCAAIAFEjg");
	this.shape_19.setTransform(-116.925,-18.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-131.7,-53.2,263.4,106.5);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA8CSIgFjBIgiDBIgoAAIgjjDIgFDDIguAAIAFkjIBFAAIAfCpIAjipIBCAAIAFEjg");
	this.shape.setTransform(84.175,23.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhBCSIAAkjICCAAIAAAsIhCAAIAABIIAzAAIAAAsIgzAAIAABXIBDAAIAAAsg");
	this.shape_1.setTransform(64.15,23.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AhDB7QgTgZAAgxIAAhhQABgxATgaQAVgaAuAAQAuAAATAXQAVAWgBApIAAASIg/AAIAAgYQAAgRgEgJQgDgJgOAAQgNAAgEAKQgEAJAAASIAACGQgBARAGAKQAFAKAMAAQAaAAAAgmIAAgiIgbAAIAAglIBUAAIAACXIgpAAIgFgZQgNAdghAAQgrAAgSgbg");
	this.shape_2.setTransform(44.85,23.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAgCSIgJg+IgrAAIgJA+Ig+AAIA3kjIBJAAIA2EjgAgOAuIAeAAIgQhxg");
	this.shape_3.setTransform(24.55,23.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAYCSIgfiDIgSAAIAACDIhBAAIAAkjIBRAAQAvAAAYARQAZARAAArQAAAdgIASQgIARgUAJIAoCNgAgZgVIASAAQASAAAIgKQAIgLAAgUQAAgUgHgKQgIgKgQAAIgVAAg");
	this.shape_4.setTransform(4.275,23.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAgCSIgJg+IgrAAIgJA+Ig+AAIA3kjIBJAAIA2EjgAgOAuIAeAAIgQhxg");
	this.shape_5.setTransform(-16.85,23.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhDB7QgSgZgBgxIAAhhQAAgxAVgaQATgaAvAAQAuAAATAXQAVAWAAApIAAASIg/AAIAAgYQAAgRgFgJQgDgJgOAAQgNAAgFAKQgDAJAAASIAACGQgBARAGAKQAFAKAMAAQAaAAAAgmIAAgiIgbAAIAAglIBVAAIAACXIgrAAIgDgZQgOAdghAAQgrAAgSgbg");
	this.shape_6.setTransform(-37.3,23.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAgCSIgJg+IgrAAIgJA+Ig+AAIA3kjIBJAAIA2EjgAgOAuIAeAAIgQhxg");
	this.shape_7.setTransform(-66.8,23.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAkCSIg7iWIAACWIg3AAIAAkjIAtAAIA7CNIAAiNIA1AAIAAEjg");
	this.shape_8.setTransform(-86.825,23.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AhCB9QgVgYAAgwIAAhrQAAgvAVgYQAUgYAuAAQAvAAAVAYQAUAYAAAvIAABrQAAAwgUAYQgVAZgvAAQguAAgUgZgAgRheQgEAIAAARIAACLQAAAQAEAJQAEAJANAAQAOAAADgJQAFgJAAgQIAAiLQAAgRgFgIQgDgKgOABQgNgBgEAKg");
	this.shape_9.setTransform(125.6,-18.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAgC9IgKg+IgpAAIgLA+Ig8AAIA3kjIBIAAIA2EjgAgOBYIAeAAIgPhwgAARiJIgNgHIgKgFQgFgCgEAAQgMAAAAAOIgcAAQgCgyAiAAQAGAAAFABIAMAHIAKAFQAFACAFAAQALAAAAgNIAaAAQABAWgGAOQgGAPgRAAQgGgBgGgCg");
	this.shape_10.setTransform(105.15,-22.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgfCSIAAjzIgsAAIAAgwICXAAIAAAwIgsAAIAADzg");
	this.shape_11.setTransform(87.275,-18.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag5CAQgVgXgBgvIA3gJQAAAcAHALQAGANAMAAQAQAAAAgWQAAgQgIgNQgIgLgPgPIgagWQgSgPgLgRQgKgSAAgZQAAglAWgTQAWgUAlAAQApAAAPAYQAPAYABAjIg3AHQgBgXgDgKQgEgKgLAAQgHAAgFAHQgFAHAAAJQAAAOAHAKQAHALAOANIAYAVQAVASAMATQAMAWAAAcQAAAUgJAQQgKASgRAJQgSAKgWAAQgpAAgUgWg");
	this.shape_12.setTransform(70.275,-18.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhBCSIAAkjICCAAIAAAsIhBAAIAABIIAxAAIAAAsIgxAAIAABXIBCAAIAAAsg");
	this.shape_13.setTransform(53.4,-18.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C8282E").s().p("Ag5CAQgVgXgBgvIA3gJQAAAcAHALQAGANAMAAQAQAAAAgWQAAgQgIgNQgIgLgPgPIgagWQgSgPgLgRQgKgSAAgZQAAglAWgTQAWgUAlAAQApAAAPAYQAPAYABAjIg3AHQgBgXgDgKQgEgKgLAAQgHAAgFAHQgFAHAAAJQAAAOAHAKQAHALAOANIAYAVQAVASAMATQAMAWAAAcQAAAUgJAQQgKASgRAJQgSAKgWAAQgpAAgUgWg");
	this.shape_14.setTransform(26.475,-18.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C8282E").s().p("AhDB9QgUgYAAgwIAAhrQAAgvAUgYQAVgYAuAAQAvAAAUAYQAVAYAAAvIAABrQAAAwgVAYQgUAZgvAAQguAAgVgZgAgQheQgFAIAAARIAACLQAAAQAEAJQAEAJANAAQANAAAFgJQAEgJAAgQIAAiLQAAgRgEgIQgFgKgNABQgMgBgEAKg");
	this.shape_15.setTransform(6.4,-18.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C8282E").s().p("AAYCSIgfiDIgSAAIAACDIhBAAIAAkjIBRAAQAvAAAYARQAZARAAArQAAAdgIASQgIARgUAJIAoCNgAgZgVIASAAQASAAAIgKQAIgLAAgUQAAgUgHgKQgIgKgQAAIgVAAg");
	this.shape_16.setTransform(-14.525,-18.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C8282E").s().p("AAYCSIgfiDIgSAAIAACDIhBAAIAAkjIBRAAQAvAAAYARQAZARAAArQAAAdgIASQgIARgUAJIAoCNgAgZgVIASAAQASAAAIgKQAIgLAAgUQAAgUgHgKQgIgKgQAAIgVAAg");
	this.shape_17.setTransform(-36.125,-18.125);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C8282E").s().p("AAgCSIgJg+IgrAAIgKA+Ig9AAIA3kjIBJAAIA3EjgAgOAuIAeAAIgQhxg");
	this.shape_18.setTransform(-57.25,-18.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C8282E").s().p("AhBB9QgUgZAAgwIAAhnQAAgxAUgZQAUgYAvAAQAuAAATAWQATAWAAAoIAAAaIg/AAIAAgeQAAgRgEgIQgDgKgOABQgNAAgEAJQgEAKAAAQIAACIQAAASAEAJQAFAJAMAAQANAAAEgJQAEgJAAgSIAAgeIA/AAIAAAZQAAApgTAXQgTAXguAAQgvAAgUgZg");
	this.shape_19.setTransform(-77.075,-18.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ag5CAQgVgXgBgvIA3gJQAAAcAHALQAGANAMAAQAQAAAAgWQAAgQgIgNQgIgLgPgPIgagWQgSgPgLgRQgKgSAAgZQAAglAWgTQAWgUAlAAQApAAAPAYQAPAYABAjIg3AHQgBgXgDgKQgEgKgLAAQgHAAgFAHQgFAHAAAJQAAAOAHAKQAHALAOANIAYAVQAVASAMATQAMAWAAAcQAAAUgJAQQgKASgRAJQgSAKgWAAQgpAAgUgWg");
	this.shape_20.setTransform(-105.575,-18.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AhCB9QgVgYAAgwIAAhrQAAgvAVgYQATgYAvAAQAvAAAVAYQAUAYAAAvIAABrQAAAwgUAYQgVAZgvAAQgvAAgTgZgAgRheQgEAIAAARIAACLQAAAQAEAJQAEAJANAAQANAAAEgJQAFgJAAgQIAAiLQAAgRgFgIQgEgKgNABQgMgBgFAKg");
	this.shape_21.setTransform(-125.65,-18.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-138.2,-53.2,276.5,106.5);


(lib.ClipGroup_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AbBRFQiNg4hbhhQhchhgsiFIgIgZIhSGHQgeANgrALQgkAKg6ALQg0AKg4AHQg5AHg0AAQh+AAhVghQhTggg0g7Qgzg6gVhMQgUhOAAhZQAAgbADgjQAEgoAFggQAFgiAIgpICXrZIi2AAIiiLzQgLA5gRBkQgKA7gNBhQgKBJgHBFIgKBzIoTAAIALhjIANhfIASiCIgHAAQhBBShKBDQhKBEhQAvQhRAwhVAaQhXAbhXAAQjTAAhth2Qhth2AAjXQAAgaAFgoQAEgiAJg2IAPhYQAIgtAGgcIDPveIIRAAIjMPIQgIAggFAYQgHAjgDAYIgHA0IgCAkQAABKAoAsQAnAtBNAAQBUAABNgvQBOgtBAhNQBAhNAthcQAuhgAThcICssoILFAAIBXmSIIpiJIhvIbIGUAAIhDEbQBMhYBihFQB0hOCPgtQCRgtC1AAQCyAACJA0QCKAzBdBeQBfBgAwCEQAxCGAACiQAAB4gXB9QgXB+gyB3QgxB3hQBsQhQBthvBOQhwBPiTAvQiSAvi9AAQi9AAiNg3gEAgzgC4QhSA8g4BfQg4BegfB4QgeB4AAB2QAACZBHBTQBGBUByAAQBsAABSg7QBSg6A4hfQA3heAdh3QAch3AAh5QAAhHgRg6QgRg8gggqQgggrgvgYQgvgZg9AAQhoAAhTA9gAPdI4QgDAXAAAPQAABDAhAgQAhAfBNAAQAVAAAdgFQAmgGAZgIQApgKAWgHIAvgPQgkh9AAiJQAAh/AZh9QAZiBA0h1QAhhKArhFIlYAAgEgrQARPQhggthEhVQhChVgjh8Qgjh+AAiZQAAhNARh1QATh0Ath9QAuh+BRh8QBSh8B+hlQCBhlCzg+QC0g9D1gBQBfAABfAIQBjAIBZAMQBkAOBOAQQBbARBHAQIjpRLQgMA2gKBIQgLBDgJBWQgJBQgGBMQgGBMAAA4IoUAAQAAgWACgrIAGhRQADgqAFgmIAHhCIgGAAQgyBCgyA7Qg0A9g/AuQhAAuhMAbQhNAchmAAQh9AAhhgtgEgh1gDvQhXAnhAA9QhAA/grBNQgrBPgaBRQgZBQgMBOQgKBNAAA6QAABAAMA0QAMA0AbAnQAaAmAoAWQAnAWAzAAQBfAABKg4QBLg4A3hVQA3hXAmhrQAkhqAZhsIBYmPQgqgJgrgEQgvgEgpAAQhyAAhXAng");
	mask.setTransform(317.875,203.95);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#C8282E","#D25D61","#C8282E"],[0.298,0.498,0.698],0,220.2,0,-220.1).s().p("EgxwAiZMAAAhEyMBjhAAAMAAABEyg");
	this.shape.setTransform(318.475,220.15);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(11,89.2,613.8,229.60000000000002), null);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ap1D5IA9khIAEgTIAEgYIADgXIACgTIBNAAIgBAKIgBAMIgDAWIABAAQAHgLAJgJQAJgJAKgHQALgGAMgFQANgDAPAAQARAAAOAGQAOAGAKANQAKALAFATQAFAMABARQAHgRAMgOQAMgRARgLQARgMAWgGQAWgHAbAAQAbAAAUAIQAVAHAOAOQAOAOAHAVQAHATAAAZQAAASgDASQgDASgIASQgHASgMARQgMAPgRANQgRALgWAIQgWAHgcAAQgcgBgWgHQgVgJgNgPQgOgOgHgUQgFgOgBgQIgCAEQgJAUgNAQQgNAQgSANQgTAMgWAIQgWAHgcAAIgWgCIgUgEIgZB1gAnKg/QgLAJgIANQgJANgGAQQgFAPgEAQIgNA6IAHACIAJABIAIACIAIAAQASAAAQgJQAPgKALgPQALgPAGgUQAGgSAAgWQAAgIgCgIQgBgJgEgGQgEgFgHgEQgGgDgJAAQgOAAgMAHgAjbg9QgMAIgJAPQgIAOgFASQgEARAAASQAAAXAKAMQALANARAAQAQAAAMgJQANgJAIgOQAJgOAEgSQAEgRAAgSQAAgLgCgIQgDgJgFgHQgFgGgHgEQgHgDgJAAQgQAAgMAJgAEOCDQgOgHgKgNQgKgNgFgSIgBgCIgKAxIgLAEIgOACIgQADIgQABQgTAAgNgFQgNgFgHgIQgIgJgDgMQgDgLAAgNIAAgKIACgLIACgLIAWhtIgTAAIgDAPIAAAAIgOgFQgIgCgHAAQgOAAgMAHQgMAGgJAMQgJALgGAPQgGAOgEARIgVBsIhQAAIAoi7IAEgZIAEgXIADgVIBNAAIgHA0IABAAQAQgdARgPQARgOAWAAIANABIALACIgBADIATAAIANg8IBTgVIgQBRIA8AAIgMA0QALgOAOgKQATgQAbgJQAbgJAlAAIAcABIAcADIAbAFIAYAEIgjClIgDATIgDAWIgCAYIgBATIhQAAIABgKIADgiIgBAAIgPATQgIAKgJAGQgKAHgMAEQgLAFgPAAQgTgBgPgGgAFphFQgNAFgKAJQgKAKgGAMQgGALgEAMQgEAMgCALIgBAUQAAAKACAIQABAHAEAHQAEAFAGAEQAGADAIAAQAOAAALgJQALgIAJgMQAIgOAGgQIAJgfIANg8IgNgCIgNgBQgRAAgNAHgACyAyIgBAGQAAAKAFAFQAFAFAMAAIAHgBIAKgCIAJgDIADgBQgDgNAAgSQAAgMADgRQADgQAGgTQAHgSAMgUIACgDIg4AAgAIICEQgMgFgHgHQgIgJgEgKQgDgLAAgNIAAgMIACgPIACgPIADgOIAThYIAKguIAciHIBQAAIg5ELIgEAUQgCAKAAAJQAAAJAGADQAGAFAIAAIANgCQAGgBAGgDIgHAeIgGAeIgKACIgNADIgNACIgOABQgRAAgMgFg");
	this.shape.setTransform(43.575,0);

	this.instance = new lib.ClipGroup_1();
	this.instance.setTransform(-60.45,0.05,0.15,0.15,0,0,0,318.4,220.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-108.2,-33,214.8,66.1);


// stage content:
(lib.mrec_carro_v1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(266));

	// Layer_5
	this.instance = new lib.Tween4("synched",0);
	this.instance.setTransform(150,125.05);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(212).to({_off:false},0).to({alpha:1},5).to({startPosition:0},43).to({alpha:0},5).wait(1));

	// Layer_4
	this.instance_1 = new lib.Tween3("synched",0);
	this.instance_1.setTransform(150,125);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(153).to({_off:false},0).to({alpha:1},5).to({startPosition:0},50).to({alpha:0},5).to({_off:true},1).wait(52));

	// Layer_3
	this.instance_2 = new lib.Tween2("synched",0);
	this.instance_2.setTransform(150,125);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(89).to({_off:false},0).to({alpha:1},5).to({startPosition:0},55).to({alpha:0},5).to({_off:true},60).wait(52));

	// Layer_2
	this.instance_3 = new lib.Tween1("synched",0);
	this.instance_3.setTransform(150,125);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(30).to({_off:false},0).to({alpha:1},5).to({startPosition:0},50).to({alpha:0},5).to({_off:true},124).wait(52));

	// Layer_7
	this.instance_4 = new lib.Tween5("synched",0);
	this.instance_4.setTransform(150,125);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:0.6484},4).to({startPosition:0},256).to({alpha:1},5).wait(1));

	// Layer_1
	this.instance_5 = new lib.Tween6("synched",0);
	this.instance_5.setTransform(384,125);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({alpha:0.0617},0).wait(1).to({alpha:0.2477},0).wait(1).to({alpha:0.5599},0).wait(1).to({alpha:1},0).to({x:-83.9},256,cjs.Ease.quartInOut).wait(1).to({x:-83.9363,alpha:0.6374},0).wait(1).to({x:-83.9643,alpha:0.3571},0).wait(1).to({x:-83.9842,alpha:0.158},0).wait(1).to({x:-83.9961,alpha:0.0394},0).wait(1).to({x:-84,alpha:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-318,125,1086,125);
// library properties:
lib.properties = {
	id: '7EBB24BE28B4FB4887743DB266A061E1',
	width: 300,
	height: 250,
	fps: 30,
	color: "#04142B",
	opacity: 1.00,
	manifest: [
		{src:"images/mrec_carro.jpg?1587582914588", id:"mrec_carro"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['7EBB24BE28B4FB4887743DB266A061E1'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
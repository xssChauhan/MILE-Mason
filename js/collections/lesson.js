var app = app || {}

var Lesson = Backbone.Collection.extend({
	model : app.Brick,
	localStorage : new Backbone.LocalStorage('lesson-backbone'),

	stats : function(t){
		return this.filter(function(brick){
			return brick.get(t);
		});
	},

	nextID : function(){
		if( !this.length){
			return 1;
		}
		return this.last().get('id') + 1;

	},
	clearLesson : function(){
		this.localStorage._clear();
	}
});

app.Lesson = new Lesson();
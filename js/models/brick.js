var app = app || {}

app.Brick = Backbone.Model.extend({
	defaults:{
		id:0,
		type: 0,
		content:'',
		readonly: true,
		show : false
	},
	toggleShow : function(){
		this.save({
			show : !this.get('show')
		})
	},
	toggleEdit : function(){
		this.save({
			readonly : !this.get('readonly')
		})
	}


})
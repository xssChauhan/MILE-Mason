var app = app || {};

app.modalView = Backbone.View.extend({
	id : "lessonUpload",
	className : "modal fade",
	template : _.template($("#modal-template").html()),
	
	events:{
		'click .upload-lesson' : 'uploadFile'
	},
	render : function(){
		this.$el.html(this.template());
		return this;
	},
	show : function(){
		this.$el.modal('show');
		
	},
	uploadFile : function(event){
		readFile();
		this.$el.data('modal', null);
		this.$el.modal('hide');
		
		
		
	}
})
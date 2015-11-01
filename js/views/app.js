var app = app || {};

app.AppView = Backbone.View.extend({
	el : "#milewebapp",
	//statsTemplate :  _.template($("#stats-template").html()),

	events :{
		'click #submit-new-brick': 'createOnClick',
		'click .main-dropdown li a' : 'updateOnClick',
		'click #show-all-button' : 'toggeShowAll',
		'click .panel-body' : 'HideError',
		'click .clear-lesson' : 'resetLesson',
		'click .download-lesson' : 'downloadLesson'
	},
	initialize :  function(){
		this.$main = this.$("#main");
		this.$lessonInputType = $("#dropdownMenuMain");
		this.$lessonInputContent = $(".input-lesson-content");
		this.listenTo(app.Lesson,"add",this.addOne);
		this.listenTo(app.Lesson, "reset", this.addAll);
		//this.listenTo(app.Lesson, "all", this.render);
		
		app.Lesson.fetch();
	},

	render : function(){
		if (app.Lesson.Length){
			this.$main.show();
		}
		else{
			this.$main.html('Get Started');
		}
	},

	addOne :  function(brick){
		var view = new app.BrickView({model: brick});
		$("#lesson-list").append(view.render().el);
	},
	addAll :  function(){
		this.$("#lesson-list").html('');
		app.Lesson.each(this.addOne, this);
	},
	newAttributes :  function(){
		console.log(this.$lessonInputType.text());
		return {
			id : app.Lesson.nextID(),
			type : this.$lessonInputType.text().trim(),
			content : this.$lessonInputContent.val().trim()
		};
	},
	createOnClick : function(event){
		if( !this.$lessonInputType.text().trim() || !this.$lessonInputContent.val().trim()){
			this.$(".alert-warning").show().html('Please fill in appropriate values').hide(3000);
			return;
		}
		app.Lesson.create(this.newAttributes());
		this.$lessonInputContent.val('');
		this.$lessonInputType.text('Select Lesson Type');		
	},
	updateOnClick : function(event){
		var text = $(event.currentTarget).text();
		this.$lessonInputType.html(text);
	},
	toggeShowAll : function(){
		console.log('Yes');
		_.each(app.Lesson.models, function(m){
			m.toggleShow();
		})
	},
	resetLesson : function(){
		app.Lesson.each(function(model){
			model.destroy();
		});
		window.location.reload();
	},
	downloadLesson : function(){
		var blob = new Blob([JSON.stringify(app.Lesson)],{type : 'application/json'});
		var url = window.URL.createObjectURL(blob);
		this.$(".download-lesson").attr({
			'download':'lesson.json',
			'href' : url
		});
		
		
	}

})
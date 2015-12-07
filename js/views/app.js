var app = app || {};

app.AppView = Backbone.View.extend({
	el : "#milewebapp",
	modalTemplate :  _.template($("#modal-template").html()),

	events :{
		'click #submit-new-brick': 'createOnClick',
		'click .main-dropdown li a' : 'updateOnClick',
		'click #show-all-button' : 'toggeShowAll',
		'click .panel-body' : 'HideError',
		'click .clear-lesson' : 'resetLesson',
		'click .download-lesson' : 'downloadLesson',
		'click .import-lesson' : 'showModal'
	},
	initialize :  function(){
		this.$main = this.$("#main");
		this.$lessonInputType = $("#dropdownMenuMain");
		this.$lessonInputContent = $(".input-lesson-content");
		this.listenTo(app.Lesson,"add",this.addOne);
		this.listenTo(app.Lesson, "reset", this.addAll);
		app.Lesson.fetch();
	},

	render : function(){
		if (app.Lesson.Length){
			this.$main.show();
		}
		else{
			this.$main.html('Get Started');
		}
		this.$main.append(this.modalTemplate());
	},

	addOne :  function(brick){
		var view = new app.BrickView({model: brick});
			if(((brick.get('id')-1)%3 == 0)){
				$("#lesson-list").append('<div class="row"></div>')
			}
		$("#lesson-list div.row:last-child").append(view.render().el);
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
		/**_.chain(app.Lesson.models).clone().each(function(model){
			console.log('deleting model'+ model.get('id'));
			model.destroy();
		}**/
		app.Lesson.clearLesson();
		window.location.reload();
	},
	downloadLesson : function(){
		var blob = new Blob([JSON.stringify(app.Lesson)],{type : 'application/json'});
		var url = window.URL.createObjectURL(blob);
		this.$(".download-lesson").attr({
			'download':'lesson.json',
			'href' : url
		});
		
		
	},
	showModal : function(){
		var modal = new app.modalView();
		this.$main.append(modal.render().el);
		modal.show();
	}

})
var app = app || {};
var options = ['Line and a Pause','Input', 'Number','No pause in line','Graph','Video Links','2 Variable Array','Shaded Area Pair']

app.BrickView = Backbone.View.extend({
	tagName : 'li',
	className : 'col-md-4',
	template :  _.template($("#item-template").html()),

	events : {
		//Add events to collapse or show an individual model
		"click .show-button" : "showBrick",
		"click .edit-button" : "editMode",
		"keypress input" : "updateOnEnter",
		"click .dropdown-menu li a" : 'updateMenu'
	},
	initialize: function(){
		this.listenTo(this.model,'!change:show', this.render);
		this.listenTo(this.model,'change:readonly', this.render);
	},
	render: function(){
		this.$el.html( this.template(this.model.attributes, options));
		this.$panel = this.$(".panel-body");
		return this;
	},
	showBrick : function(){
		this.model.toggleShow();
		showGlyphicon  =this.$(".show-button").find("span.glyphicon");
		var classes = showGlyphicon.attr('class').split(/\s+/);
		if(classes[1] == 'glyphicon-eye-open'){
			showGlyphicon.removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
		}
		else if(classes[1] == 'glyphicon-eye-close'){
			showGlyphicon.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
		}
		this.$(".panel-body").toggle(500);
		//console.log(this.model.get("show"));
		//console.log(this.$(".panel-body").html());

	},
	close: function(){
		var content = this.$("input").val().trim();
		var  type = this.$(".menu-dropdown").text().trim();
		this.model.save({content: content, type: type, readonly: true})
		
	},
	editMode : function(){
		this.model.save({show: true, readonly : false});

	},
	updateOnEnter : function(e){
		if (e.which == 13){
			this.close();
		}

	},
	clear : function(){
		this.model.destroy();
	},
	updateMenu : function(event){
		var text = $(event.currentTarget).text();
		event.preventDefault();
		this.$(".menu-dropdown").html(text + '<span class="caret"></span>');
	}


})
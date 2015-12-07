var app = app || {};

$(function(){
	new app.AppView();
});

/**$(function(){
	$("#submit-new-brick").on('click',function(){
		console.log("from main");
	})
})**/

function readFile(){
	var files = document.getElementById("lesson-data").files[0];
	if(files){
		var r = new FileReader();
		r.onload = (function(f){
			return function(e){
			contents =   e.target.result;
			jsoncontent = JSON.parse(contents);
			//JSONcontent = JSON.parse(contents);
			console.log(jsoncontent);
			app.Lesson.clearLesson();
			ParseJSON(jsoncontent);
			};
		})(files);
		r.readAsText(files);
	}
	else{
		alert("failed to load file");
	}
	return;

}
function ParseJSON(data){
	_.each(data, function(model){
		temp = {
			'id' : model.id,
			'type' : model.type,
			'show' : false,
			'edit' : false
		};
		if(typeof(model.content) == 'object'){
		 keys = Object.keys(model.content);
		 temp.content = JSON.stringify(model.content);
		 
		}
		else if(typeof(model.content) == 'string'){
			temp.content = model.content
		}
		app.Lesson.add(temp);
		
	})
}


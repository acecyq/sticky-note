// add edit button and delete button to every note
// edit button onclick displays title and content in form
// form displays update button instead of save button
// detects index of note editing
// when click update changes note editing

// board of sticky notes
var board = document.getElementsByClassName("grid-container")[0];

// new note button
var newNote = document.getElementById('newNote');

// form div and elements
var form = document.getElementById('form');
var formTitle = document.getElementById('formTitle');
var newTitle = document.getElementById('newTitle');
var newContent = document.getElementById('newContent');
var newSave = document.getElementById('newSave');

var editBtn = document.getElementsByClassName('edit');
var editBtn = document.getElementsByClassName('del');



function resetInput() {
	// sets the input values to empty
	newTitle.value = "";
	newContent.value = "";
}

// when new form button is clicked
function showForm() {

	// shows the form
	form.style.display = "block";
	resetInput();
}

function editNote(i) {
	var titleI = document.getElementById("title" + i);
	var contentI = document.getElementById("content" + i);
	newTitle.value = titleI.textContent;
	newContent.value = contentI.textContent;
}



// when save button is clicked
function addNote() {
	// create a note
	var note = document.createElement('div');
	var count = document.getElementsByClassName("grid-item").length;
	note.className = "grid-item";

	// create note elements and add textContent
	var title = document.createElement('h3');
	var content = document.createElement('p');
	var edit = document.createElement('button');
	var del = document.createElement('button');
	title.id = "title" + count;
	title.textContent = newTitle.value;
	content.id = "content" + count;
	content.textContent = newContent.value;
	edit.className = "edit";
	edit.textContent = "Edit";
	del.className = "del";
	del.textContent = "Delete";

	// when edit and del buttons are clicked
	edit.addEventListener("click", function() {
		editNote(count);
	});
	del.addEventListener("click", function() {
		console.log("del");
	});

	// add elements to the note and add the note to the board
	note.appendChild(title);
	note.appendChild(content);
	note.appendChild(edit);
	note.appendChild(del);
	board.appendChild(note);

	resetInput();
}



newNote.addEventListener("click", showForm);
newSave.addEventListener("click", addNote);



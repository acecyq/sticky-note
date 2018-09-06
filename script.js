// add edit button and delete button to every note
// edit button onclick displays title and content in form
// form displays update button instead of save button
// detects index of note editing
// when click update changes note editing

// board of sticky notes
var board = document.getElementsByClassName("grid-container")[0];

// form div and elements
var form = document.getElementById('form');
var formTitle = document.getElementById('formTitle');
var newTitle = document.getElementById('newTitle');
var newContent = document.getElementById('newContent');
var newSave = document.getElementById('newSave');
var update = document.getElementById('update');
var formSave = document.getElementById('formSave');
var formUpdate = document.getElementById('formUpdate');

// edit and del buttons on the note
var editBtn = document.getElementsByClassName('edit');
var delBtn = document.getElementsByClassName('del');

var target;



function resetInput() {
	// sets the input values to empty
	newTitle.value = "";
	newContent.value = "";
}

// when edit button is clicked
function switchForm() {

	// change form title to edit note
	if (formTitle.textContent === "New Note") {
		formTitle.textContent = "Edit Note";
	} else {
		formTitle.textContent = "New Note";
	}

	// change save button to edit button or vice versa
	formSave.classList.toggle("hidden");
	formUpdate.classList.toggle("hidden");
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


// when edit button on note is clicked
function editNote(i) {

	// elements on clicked note
	var titleI = document.getElementById("title" + i);
	var contentI = document.getElementById("content" + i);

	// change form elements value to clicked note elements textcontent
	newTitle.value = titleI.textContent;
	newContent.value = contentI.textContent;

	// change form to edit form
	switchForm();

	// assign target to the be index of the note
	target = i;
}

function updateNote() {
	var titleClass = "title" + target;
	var contentClass = "content" + target;
	var titleChange = document.getElementById(titleClass);
	var contentChange = document.getElementById(contentClass);
	titleChange.textContent = newTitle.value;
	contentChange.textContent = newContent.value;
	newTitle.value = "";
	newContent.value = "";

	// change form to new form
	switchForm();
}



newSave.addEventListener("click", addNote);
update.addEventListener("click", updateNote);


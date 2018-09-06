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

// get index of the note to update
var target;

// search input and search button
var searchBar = document.getElementById('searchBar');
var searchBtn = document.getElementById('searchBtn');



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

// when delete button is clicked
function delNote(i) {
	
	// find div to delete and set display none and add deleted class
	var delDiv = document.getElementById("note" + i);
	delDiv.classList.add("hidden");
	delDiv.classList.add("deleted");
}

// when save button is clicked
function addNote() {
	// create a note
	var note = document.createElement('div');
	var count = document.getElementsByClassName("grid-item").length;
	note.className = "grid-item"
	note.id = "note" + count;

	// create note elements and add textContent
	var title = document.createElement('h3');
	var content = document.createElement('p');
	var edit = document.createElement('button');
	var del = document.createElement('button');
	title.id = "title" + count;
	title.className = "titles"
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
		delNote(count);
	});

	// add elements to the note and add the note to the board
	note.appendChild(title);
	note.appendChild(content);
	note.appendChild(edit);
	note.appendChild(del);
	board.appendChild(note);

	// reset form inputs
	resetInput();
}

function updateNote() {

	// get title and content to edit and change their textContent to form input values
	var titleChange = document.getElementById("title" + target);
	var contentChange = document.getElementById("content" + target);
	titleChange.textContent = newTitle.value;
	contentChange.textContent = newContent.value;

	// reset form inputs
	resetInput();

	// change form to new form
	switchForm();
}

// when search button is clicked
function searchNotes() {

	// all titles and search input value
	var titles = document.getElementsByClassName('titles');
	var searchInput = searchBar.value;

	// declare title id value and get the note of that id value
	var j, checkNote;

	// loop through all the titles
	for (var i = 0; i < titles.length; i++) {
		j = parseInt(titles[i].id.charAt(5));
		checkNote = document.getElementById('note' + j);

		// if title textContent has search input value
		if (titles[i].textContent.includes(searchInput)) {

			// check if note is not deleted but hidden, display it
			if (!checkNote.classList.value.includes("deleted") && checkNote.classList.value.includes("hidden")) {
				checkNote.classList.toggle("hidden");
			}
		} else {

			// if note does not have search input value and is not hidden, then hide it
			if (!checkNote.classList.value.includes("hidden")) {
				checkNote.classList.toggle("hidden");
			}
		}
	}
}



newSave.addEventListener("click", addNote);
update.addEventListener("click", updateNote);
searchBtn.addEventListener("click", searchNotes);


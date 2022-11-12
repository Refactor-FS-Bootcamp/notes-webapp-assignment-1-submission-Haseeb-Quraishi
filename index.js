function getFullDate() {
    var date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    var fullDate = `${date.getDate()} ${month} ${year}`;
    return fullDate;
}

var btnSave = document.getElementById("save");
btnSave.addEventListener("click", (e) => {
    let title = document.getElementById("note");
    let body = document.getElementById("body");
    let noteArray = [];
    let note = localStorage.getItem('note');
    if (note == null) {
        noteArray = [];
    } else {
        noteArray = JSON.parse(note);
    }

    const myNoteObj = {
        title: title.value,
        body: body.value,
        date: getFullDate()
    }
    noteArray.push(myNoteObj);

    if (document.getElementById("note").value == '') {
        e.preventDefault();
        btnSave.classList.add('data-toggle="modal"', 'data-target="#exampleModal"');
        $("#exampleModal").modal('show');
    }
    else {
        localStorage.setItem('note', JSON.stringify(noteArray));
        title.value = '';
        body.value = '';
    }
    fetchNotes();
});

function fetchNotes() {
    let note = localStorage.getItem('note');
    if (note == "[]") {
        noteArray = [];
        document.getElementById('notesection').innerHTML = 
        `<div class='col-md-12'>
            <p>No Saved Notes Available, Please save a note first and don't 
            forget to provide a suitable <strong>Title</strong> to your note.</p>
        </div>`
    } else {
        noteArray = JSON.parse(note);
    }

    let card = "";
    noteArray.forEach((element, index) => {
        card += `
    <div class="col-sm-4 mb-2">
        <div class="card bg-light note">
        <div class="card-body">
            <h5 class="card-title">${(index + 1, element.title)} 
            <span><button id="${index}" onclick="editNote(this.id)" class="btn btn-sm btn-warning">edit</button>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-sm ml-1 btn-danger">delete</button></span></h5>
            <p class="card-text">${element.body}</p>
            <p id="date-align">${element.date}</p>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        </div>
        </div>
    </div>
        `;
        let noteElement = document.getElementById('notesection');
        if (noteArray.length != 0) {
            noteElement.innerHTML = card;
        } else {
            noteElement.innerHTML = `<p>No Notes Available, Please save a note first</p>`
        }
    });
}

function deleteNote(id) {
    let note = localStorage.getItem('note');
    if (note == null) {
        noteArray = [];
    } else {
        noteArray = JSON.parse(note);
    }

    noteArray.splice(id, 1);
    localStorage.setItem('note', JSON.stringify(noteArray));
    fetchNotes();
}

function editNote(id) {
    let note = localStorage.getItem('note');
    if (note == null) {
        noteArray = [];
    } else {
        noteArray = JSON.parse(note);
    }

    console.log(id);
    noteArray.forEach((elem, index) => {
        if (index == id) {
            console.log(elem.title);
            document.getElementById("note").value = elem.title;
            document.getElementById("body").value = elem.body;
            deleteNote(id);
        }
    })
}

console.log(getFullDate());
fetchNotes();
//Uses classes to apply a box to create a note.
var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

//keeps track of current notes
var currentnote = {};

//pulls all notes from the database
var pullNotes = function () {
    return $.ajax({
        url: "/api/note",
        method: "GET"
    });
};

//Saves notes
var save = function (note) {
    return $.ajax({
        url: "/api/note",
        data: note,
        method: "POST"
    });
};

//sets classes to show notes once made
var renderNote = function () {
    $saveNoteBtn.hide();
    if (currentnote.id) {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
      } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }
};

var handleNoteSave = function () {
    var newNote = {
      title: $noteTitle.val(),
      text: $noteText.val()
    };
  
    save(newNote).then(function (data) {
      getAndRenderNotes();
      render();
    });
  };

  var renderNote = function (notes) {
    $noteList.empty();
  
    var noteListItems = [];
  
    for (var i = 0; i < notes.length; i++) {
      var note = notes[i];
  
      var $li = $("<li class='list-group-item'>").data(note);
      var $span = $("<span>").text(note.title);
      var $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
  
      $li.append($span, $delBtn);
      noteListItems.push($li);
    }
  
    $noteList.append(noteListItems);
  };

  var getAndRenderNotes = function () {
    return pullNotes().then(function (data) {
      renderNoteList(data);
    });
  };
  
  $saveNoteBtn.on("click", handleNoteSave);
  $noteList.on("click", ".list-group-item", handleNoteView);
  $newNoteBtn.on("click", handleNewNoteView);
  $noteList.on("click", ".delete-note", handleNoteDelete);
  $noteTitle.on("keyup", handleRenderSaveBtn);
  $noteText.on("keyup", handleRenderSaveBtn);
  
  getAndRenderNotes();
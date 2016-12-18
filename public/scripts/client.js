$(document).ready(function(){
var taskArray = [];

  var getTasks = function(){
    console.log('in getTasks');
    $.ajax({
      type: 'GET',
      url: '/retrieveTasks',
      success: function(response){
        console.log('back from get call:', response);
        $('#toDoItems').html='';//clear div
        var outputText = '';
        for (var i = 0; i < response.length; i++) {
          taskArray.push = (response[i]);
          outputText += '<p>' + response[i].task + ' ' + '<button class="completedTaskButton" data="' + response[i].id + '">Task Complete</button>' + ' ' + '<button class="deleteTaskButton">Delete Item</button>';

        }//end for loop
        $('#toDoItems').html(outputText);
      }
    });//end getTasks ajax
  };//end getTasks

  var addTask = function(){
    console.log('in addTask');
    //assemble object to send to db
    var objectToSend={
      task: $("#toDoItem").val(),
      status: "false"
    };//end objectToSend
    $.ajax({
      type: 'POST',
      url: '/addToList',
      data: objectToSend,
      success: function(response){
        console.log('back from post call:', response);
        getTasks();
      },//end success function
      error: function(){
        console.log('error with addToList ajax call!');
      }//end error function
    });//end ajax call in addTask
  };//end addTask funciton

  $('#addTaskButton').on('click', function(){
    console.log('addItem clicked');
    addTask();
  });//end addItemButton


  $('#toDoItems').on('click', '.completedTaskButton',function(){
    var id = $(this).attr('data');
    console.log(id);
  });//end completedTaskButton

});//end doc ready function

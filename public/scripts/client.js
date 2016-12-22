  $(document).ready(function(){

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
      if(response[i].completed === true){
        outputText += '<p class="completed">' + response[i].task + ' ' + '<button class="deleteTaskButton" data="' + response[i].id + '">Delete</button>';
        $(this).hide();
      }//end if
      else {
        outputText += '<p class="stuff">' + response[i].task + ' ' + '<button class="completedTaskButton" data="' + response[i].id + '">Complete</button>' + ' ' + '<button class="deleteTaskButton" data="' + response[i].id + '">Delete</button>';
      }///end else
      }//end for loop
        $('#toDoItems').html(outputText);
      }
      });//end getTasks ajax
    };//end getTasks function

  var addTask = function(){
    console.log('in addTask');

    //assemble object to send to db
    var objectToSend={
      task: $('#toDoItem').val(),
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
    addTask();
    $('#toDoItem').val('');
  });//end addItemButton on click

  $('#toDoItems').on('click', '.completedTaskButton',function(){
    $(this).parent().toggleClass('completed');
    $(this).hide();

    var status = $(this).attr('data');
      if (status === false){
        status = 'true';
      }//change status to completed

    var objectToSend = {
      id: $(this).attr('data')
    };
    $.ajax({
      type:'PUT',
      url:'/completedTasks',
      data: objectToSend,
      success:function(response){
      console.log(response);
      }
      });//end ajax
    });//end completedTaskButton on click

  $('#toDoItems').on('click', '.deleteTaskButton',function(){
    if(confirm("Are you sure you want to delete this item?")=== true){
    $(this).parent().hide();

    var objectToDelete = {
        id: $(this).attr('data')
      };//end objectToDelete
      console.log(objectToDelete);
    $.ajax({
      type:'DELETE',
      url:'/deleteTask',
      data: objectToDelete,
      success:function(response){
      console.log(response, 'delete it');
      }
    });
    }
    });//end deleteTaskButton

  });//end doc ready function

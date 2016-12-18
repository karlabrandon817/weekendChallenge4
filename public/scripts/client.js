  $(document).ready(function(){
  var taskArray = [];

    var getTasks = function(){
      console.log('in getTasks');
      $.ajax({
        type: 'GET',
        url: '/retrieveTasks',
        success: function(response){
          console.log('back from get call:', response);
          // $('#toDoItems').html='';//clear div
          var outputText = '';
          for (var i = 0; i < response.length; i++) {
            taskArray.push = (response[i]);
            outputText = '<p class="stuff">' + response[i].task + ' ' + '<button class="completedTaskButton" data="' + response[i].id + '">Task Complete</button>' + ' ' + '<button class="deleteTaskButton" data="' + response[i].id + '">Delete Item</button>';
          }//end for loop
          $('#toDoItems').append(outputText);
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

  //buttons
    $('#addTaskButton').on('click', function(){
      addTask();
      $('#toDoItem').val('');
    });//end addItemButton

    $('#toDoItems').on('click', '.completedTaskButton',function(){
       $(this).parent().toggleClass('completed');
       $(this).hide();
      var status = $(this).attr('data');
      if (status === false){
        status = 'true';
      }
      console.log(status);
      var objectToSend = {
      id: $(this).attr('data')
    };
      $.ajax({
        type:'PUT',
        url:'/completedTasks',
        data: objectToSend,
        success:function(response){
      console.log(response, 'yo');
      }
    });
    });//end completedTaskButton

    $('#toDoItems').on('click', '.deleteTaskButton',function(){
      if(confirm("Are you sure you want to delete this item?")=== true){
      $(this).parent().hide();
      //$(this).hide();

      var objectToDelete = {
        id: $(this).attr('data')
      };
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

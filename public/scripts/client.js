$(document).ready(function(){
  console.log('frank the tank');



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
    },//end success function
    error: function(){
      console.log('error with addToList ajax call!');
    }//end error function
  });//end ajax call in addTask
};//end addTask funciton


$('#addItemButton').on('click', function(){
  console.log('addItem clicked');
  addTask();
});//end addItemButton
});

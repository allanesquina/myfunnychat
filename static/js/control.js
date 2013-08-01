
var Control = {};
var socket = {};
Control.User = {
  name: "",
  email:""
};

Control.Chat = {    
  
  sendMessage: function() {
    var msg = document.getElementById('msg');
    socket.emit('sendMsg', msg.value);
    msg.value = "";
  },
  load: function(action) {
    if (action == "show") {
      $('#myModal').modal('show');
    }
    if (action == "hide") {
      $('#myModal').modal('hide');
    }
  },
  writeMessage: function(data) {
    var content = document.getElementById("contentMSG");
    content.innerHTML = content.innerHTML + "<p>" + data.content + "</p>";
  },  
  connect: function() {
    var inputName = document.getElementById('inputName'),
        inputEmail = document.getElementById('inputEmail');
    Control.User.name = inputName.value;
    Control.User.email = inputEmail.value;
    
    socket = io.connect('http://simplechat-20116.sae1.actionbox.io:8080/');

    socket.on('connecting', function(data) {
      Control.Chat.load("show");
      console.log("Connecting");
    });

    socket.on('disconnect', function(data) {

    });
    
    socket.on('connect', function(data) {
      socket.emit('userProfile', Control.User);
      location.href = "/#chat";
      Control.Chat.load("hide");
      console.log("Connected");
    });

    socket.on('wMsg', function(data) {
      Control.Chat.writeMessage(data);
    });
  }
}
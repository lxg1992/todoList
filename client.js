var todoList = {
  //initiliaze todos
  todos: [],

  //push a new task to todos
  addTodo: function(todoText) {
    
    this.todos.push({
      todoText: todoText,
      completed: false
    }); 
  },

  //change a todo at a position
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },

  //delete a todo at a position
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
        
    this.todos.forEach(function(todo) {
      if (todo.completed === true){
         completedTodos ++; 
      }
    });

    this.todos.forEach(function(todo){
      if(completedTodos === totalTodos){
       todo.completed=false; 
      } else {
       todo.completed = true; 
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    if(addTodoTextInput.value != ''){
      todoList.addTodo(addTodoTextInput.value);
      addTodoTextInput.value = '';
      view.displayTodos();
    } else {
      alert("Enter task to add!");
      view.displayTodos();
    }

  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  singleToggleCompleted: function(position){
     todoList.toggleCompleted(position);
      view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {

  displayTodos: function() {
    

    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      //todoLi.className = 'list-group-item list-unstyled'
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoLi.className ='list-group-item list-group-item-success';
        todoTextWithCompletion = '['+position+']' + ' (\u2713) ' + todo.todoText;
      } else {
        todoLi.className ='list-group-item list-group-item-light';
        todoTextWithCompletion = '['+position+']' + ' (x) ' + todo.todoText;
      }
      
      todoLi.id = position+'item';      
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createToggleButton());
      todosUl.appendChild(todoLi);
      
    }, this);
    
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton btn btn-danger float-right';
    return deleteButton;
  },
  createToggleButton: function(){
    var toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle';
    toggleButton.className = 'toggleButton btn btn-outline-success float-right';
    return toggleButton;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      console.log(event.target.parentNode.id);
  //Get clicked Element
      var elementClicked = event.target;
  
  
  
      if (elementClicked.classList.contains('deleteButton')){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      } else if (elementClicked.classList.contains('toggleButton')){
         handlers.singleToggleCompleted(parseInt(elementClicked.parentNode.id));
      }
  });

    
  }
};

view.setUpEventListeners();

//Initial construction from watchandcode
//CSS Styling as well as optimization and improvements by Alex Garin
//https://github.com/lxg1992/todoList










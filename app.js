// BUTGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals : {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: function(type, des, val){
      var newItem, ID;
      ID = data.allItems[type][data.allItems[type].length -1].id +1;
      ID = 0;
      if(type === 'Exp') {
        newItem = new Expense(ID, des, val);
      } else if(type === 'Inc') {
        newItem = new Income( ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  }
})();

//UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };

    },
    getDOMstrings : function() {
      return DOMstrings;
    }
  };
})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListener = function() {

    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
  if (event.keycode === 13 || event.which ===13) {
      ctrlAddItem();
  }

    });

  };


  var ctrlAddItem = function() {
    var input, newItem;
    //1. Get the field input data.
    var input = UICtrl.getInput();
    var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    //2. Add the item to the budget CONTROLLER
    //3. Add the item to the UI
    //4. Calculate the budgetController

  };

  return {
    init : function() {
      console.log('Application has started');
      setupEventListener();
    }
  };

})(budgetController, UIController);
controller.init();

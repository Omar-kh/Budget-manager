// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType); 

    };

    var updateBudget = function () {
        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    };


    var updatePercentages = function () {

        budgetCtrl.calculatePercentages();

        var percentages = budgetCtrl.getPercentages();

        UICtrl.displayPercentages(percentages);

    }

    var ctrlAddItem = function () {

        var input, newItem;

            input = UICtrl.getInput();

            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            UICtrl.addListItem(newItem, input.type);

            UICtrl.clearFields();

            updateBudget();

            updatePercentages();

        }
    };

    var ctrlDeleteItem = function (event) {

        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.id;

        if (itemID) {

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

        }
        budgetCtrl.deleteItem(type, ID);

        UICtrl.deleteListItem(itemID);

        updateBudget();

        updatePercentages();

    };

    return {

        init: function () {
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            setupEventListeners();
            UICtrl.displayMonth();
        }

    }

}) (budgetController, UIController);


controller.init();
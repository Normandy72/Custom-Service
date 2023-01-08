// ---------- CUSTOM SERVICE ----------
// (function(){
//     'use strict';

//     angular.module('ShoppingListApp', [])
//     .controller('ShoppingListAddController', ShoppingListAddController)
//     .controller('ShoppingListShowController', ShoppingListShowController)
//     .service('ShoppingListService', ShoppingListService);

//     ShoppingListAddController.$inject = ['ShoppingListService'];
//     function ShoppingListAddController(ShoppingListService){
//         var itemAdder = this;
//         itemAdder.itemName = '';
//         itemAdder.itemQuantity = '';

//         itemAdder.addItem = function(){
//             ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
//         };
//     };

//     ShoppingListShowController.$inject = ['ShoppingListService'];
//     function ShoppingListShowController(ShoppingListService){
//         var showList = this;
//         showList.items = ShoppingListService.getItem();
//         showList.removeItem = function(itemIndex){
//             ShoppingListService.removeItem(itemIndex);
//         };
//     };

//     function ShoppingListService(){
//         var service = this;

//         // list of shopping items
//         var items = [];

//         service.addItem = function(itemName, itemQuantity){
//             var item = {
//                 name: itemName,
//                 quantity: itemQuantity
//             };
//             items.push(item);
//         };

//         service.removeItem = function(itemIndex){
//             items.splice(itemIndex, 1);
//         };

//         service.getItem = function(){
//             return items;
//         };
//     };
// })();


// ********************************************************************************
// ---------- CUSTOM SERVICE THROUGH A FACTORY----------
(function(){
    'use strict';

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory);

    // List #1 - Controller
    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory){
        var list1 = this;

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory();

        list1.items = shoppingList.getItem();

        list1.itemName = '';
        list1.itemQuantity = '';

        list1.addItem = function(){
            shoppingList.addItem(list1.itemName, list1.itemQuantity);
        };

        list1.removeItem = function(itemIndex){
            shoppingList.removeItem(itemIndex);
        }
    };

    // List #2 - Controller
    ShoppingListController2.$inject = ['ShoppingListFactory'];
    function ShoppingListController2(ShoppingListFactory){
        var list2 = this;

        // Use factory to create new shopping list service
        var shoppingList = ShoppingListFactory(3);

        list2.items = shoppingList.getItem();

        list2.itemName = '';
        list2.itemQuantity = '';

        list2.addItem = function(){
            try{
                shoppingList.addItem(list2.itemName, list2.itemQuantity);
            }catch(error){
                list2.errorMessage = error.message;
            }            
        };

        list2.removeItem = function(itemIndex){
            shoppingList.removeItem(itemIndex);
        }
    };

    // If not specified, maxItems assumed unlimited
    function ShoppingListService(maxItems){
        var service = this;
        
        // list of shopping items
        var items = [];
        
        service.addItem = function(itemName, itemQuantity){
            if((maxItems === undefined) || (maxItems !== undefined) && (items.length < maxItems)){
                var item = {
                    name: itemName,
                    quantity: itemQuantity
                };
                items.push(item);
            }            
            else{
                throw new Error('Max items: (' + maxItems + ') reached.');
            }
        };
        
        service.removeItem = function(itemIndex){
            items.splice(itemIndex, 1);
        };
        
        service.getItem = function(){
            return items;
        };
    };

    function ShoppingListFactory(){
        var factory = function(maxItems){
            return new ShoppingListService(maxItems);
        };
        return factory;
    };

})();
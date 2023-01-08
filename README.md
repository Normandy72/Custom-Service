## Custom Service

## 1
### Controllers's responsibilites
Use controllers to
* Set up initial state of $scope
* Add behavior to the $scope

Do __NOT__ use controllers to
* Handle business logic directly
* Share code or state across controllers

### Register Service Function Constructor
```
angular.module('app', [])
.controller('ctrl', Ctrl)
.service('CustomService', CustomService);
```
### Singleton Design Pattern
Restricts object to always having a single instance.
* Each dependent component gets a reference to the same instance.
* Multiple controllers injected with a Service will all have access to the same service instance.

### Lazily Instantiated
Only created if application component declares it as a dependency.
If no components in application are dependent on this service, it will never get created.

***
#### _Summary_
Controllers are not supped to
* Handle business logic
* Code sharing
* Be used to share data across other components

Custom services instantiated with `.service` method
* Singletons (only 1 instance of object exists)
* Lazily instantiated (only created if something depends on them)

`.service('name', function)`, treats function as a function constructor
***
## 2
### Factory Design Pattern
Central place that produces new objects or functions
* Can produce any type of object, not just a singleton
* Can be used to produce dynamically customizable services

### Factory vs. Service Confusion
* `.factory()` is __not__ just another way of creating the same service you can create with `.service()` but it __can be__.
* `.service()` is also a factory, but a much more limited one compared to `.factory()`. It's a factory that always produces the same type of service - a singleton, without an easy way to configure its behavior.

### Register Service Factory Function
```
angular.module('app', [])
.controller('ctrl', Ctrl)
.factory('CustomService', CustomService);
```
### Service Factory Function - Return Function
```
function CustomService(){
    var factory = function(){
        return new SomeService();
    };
    return factory;
}
```
### Service Factory Function - Return Object Literal
```
function CustomService(){
    var factory = {
        getSomeService: function(){
            return new SomeService
        }
    };
    return factory;
};
```
##### Using Object Function Approach
```
...
var someSrv = CustomService();
someSrv.method();
```
##### Using Object Literal Approach
```
...
var someSrv = CustomService.getSomeService();
someSrv.method();
```
***
#### _Summary_
`.factory()` allows us to produce any type of object or function
* that includes a service (even a singleton), but is __not__ limited to
* `service()` is just a more limited factory

`.factory('name', FactoryFunction)` - name is what's injected

Injected factory function refers to whatever is returned in the factory function
* can be object literal with a property that's a function that creates something
* can be a function that creates something
***
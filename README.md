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

## 3
### Custom Services with .provider()
Steps to use `.provider()` function:
#### Step 1 - Define Provider Function
```
function ServiceProvider(){
    var provider = this;
    provider.config = {...};

    provider.$get = function(){
        var service = new Service(provider.config.prop);
        return service;
    };
}
```
#### Step 2 - Register Provider Function With Module
```
angular.module('app', [])
.controller('ctrl', Ctrl)
.provider('Service', ServiceProvider);
```
Name of service (`'Sevice'`) as it will be injected into other services, controllers, etc.

Name of this function __does not__ matter at all.

#### Step 3 - Inject It As Usual
```
Ctrl.$inject = ['$scope', 'Service'];
function Ctrl($scope, Service){
    Service.someMethod();
};
```
#### Step 4a (Optional) - Register Config Function
```
angular.module('app', [])
.controller('ctrl', Ctrl)
.provider('Service', ServiceProvider)
.config(Config);
```
Config guaranteed to run before any services, factories or controllers are created.

#### Step 4b (Optional) - Inject Provider Into Config
```
...
.provider('Service', ServiceProvider);
...
Config.$inject = ['ServiceProvider'];
function Config(ServiceProvider){
    ServiceProvider.config.prop = 'value';
};
```
***
#### _Summary_
`.provider()` - most verbose, but most flexible
* configure factory not just at time of use, but at app bootstrapping

`.provider('name', function)`
* whatever the 'name' is  - that's what gets injected into other components

`.config()` function gets called _before_ any service, factory, or controller is instantiated
* therefor, we __can't__ inject any regular components into `.config`
* we __can__ inject the provider of service with nameProvider
***
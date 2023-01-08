## Custom Service
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
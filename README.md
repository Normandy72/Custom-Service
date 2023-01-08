### Custom Service
#### Controllers's responsibilites
Use controllers to
* Set up initial state of $scope
* Add behavior to the $scope

Do __NOT__ use controllers to
* Handle business logic directly
* Share code or state across controllers

#### Register Service Function Constructor
```
angular.module('app', [])
.controller('ctrl', Ctrl)
.service('CustomService', CustomService);
```
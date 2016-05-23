'use strict';

app.factory('TestBuilderFactory', function($http, AuthService){
	var testobj = {};

	testobj.create = function(obj){
        var clonedObj = _.cloneDeep(obj);
        if(clonedObj._id){delete clonedObj._id; }
        if (clonedObj.validators) {
            clonedObj.validators = JSON.stringify(clonedObj.validators);
        }
        clonedObj.body.data = JSON.stringify(clonedObj.body.data);
		return $http.post('/api/tests/', clonedObj)
		.then(response =>  {
            let currentDate = new Date();
            let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
            return response.data;
        });
	};
    testobj.edit = function(obj){
        obj.validators = JSON.stringify(obj.validators);
        obj.body.data = JSON.stringify(obj.body.data);
        return $http.put('/api/tests/' + obj._id, obj)
        .then(response => response.data);
    };
    testobj.delete = function(obj){
        return $http.delete('/api/tests/' + obj._id)
    };

    testobj.allTests = function() {
        return AuthService.getLoggedInUser()
            .then(function(user) {
                return $http.get('/api/tests?userId=' + user._id);
            })
            .then(function(response) {
                return response.data;
            });
    };

    return testobj;
});

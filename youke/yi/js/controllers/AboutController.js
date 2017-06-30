
angular.module("myApp.controller")
    .controller("AboutController",["$scope","$http","$ionicLoading",function ($scope,$http,$ionicLoading){
        var  url="http://59.110.139.104:3000/wy?myUrl=http://c.m.163.com/nc/article/list/T1467284926140/0-20.html";

        $scope.data1=[];

        $ionicLoading.show();



        $scope.getData=function () {
            $http.get(url).then(function (res) {

                $ionicLoading.hide();


                $scope.data1=res.data.T1467284926140;




            },function (err) {
                $ionicLoading.show({
                    template:"获取数据失败",
                    duration:5000

                })
                console.log(err);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        $scope.getData();

    }]);
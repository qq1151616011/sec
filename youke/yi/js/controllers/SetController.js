/**
 * Created by Administrator on 2017/6/22.
 */

angular.module("myApp.controller")
    .controller("SetController",["$scope","$http","$ionicLoading",function ($scope,$http,$ionicLoading){

        var  url="http://59.110.139.104:3000/wy?myUrl=http://c.m.163.com/nc/auto/list/6YOR5bee/0-20.html";

        $scope.data1=[];

        $ionicLoading.show();



        $scope.getData=function () {
            $http.get(url).then(function (res) {

                $ionicLoading.hide();

                $scope.data1=res.data.list;
               console.log(res.data.list);




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
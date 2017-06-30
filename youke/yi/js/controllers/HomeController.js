
angular.module("myApp.controller",[])
.controller("HomeController",["$scope","$http","$ionicLoading","$ionicSlideBoxDelegate",function ($scope,$http,$ionicLoading,$ionicSlideBoxDelegate){


    var  url="http://59.110.139.104:3000/wy?myUrl=http://c.3g.163.com/recommend/getSubDocPic?tid=T1348647909107&from=toutiao&offset=0&size=10";
    $scope.data=[];
    $scope.data1=[];

       $ionicLoading.show();



$scope.getData=function () {
    $http.get(url).then(function (res) {

        $ionicLoading.hide();
        $scope.data=res.data.推荐;

        $scope.data1=res.data.推荐;
       $scope.data1=$scope.data1.slice(1,$scope.data1.length);



    },function (err) {
        $ionicLoading.show({
            template:"获取数据失败",
            duration:5000

        })
        console.log(err);
    }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
        $ionicSlideBoxDelegate.update();
        $ionicSlideBoxDelegate.loop(true);
    });

}

$scope.getData();

}]);
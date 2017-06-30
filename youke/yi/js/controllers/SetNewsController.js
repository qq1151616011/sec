/**
 * Created by Administrator on 2017/6/22.
 */
/**
 * Created by Administrator on 2017/6/22.
 */
angular.module("myApp.controller")
    .controller("SetNewsController",["$scope","$http","$ionicLoading","$stateParams",function ($scope,$http,$ionicLoading,$stateParams){
        var s=$stateParams.id;

        var  url="http://59.110.139.104:3000/wy?myUrl=http://c.m.163.com/nc/article/"+s+"/full.html";

        $scope.img=[];
        $scope.body="";
        $scope.data={};
        $ionicLoading.show();


        $scope.getData=function () {

            $http.get(url).then(function (res) {
                $ionicLoading.hide();
                $scope.data = res.data[s];
                $scope.img = res.data[s].img;
                $scope.body = res.data[s].body;

                for (var i = 0; i < $scope.img.length; i++) {
                    $scope.body = $scope.body.replace("<!--IMG#" + i + "-->", "<img src='" + $scope.img[i].src + "'/>")
                }


            }, function (err) {
                $ionicLoading.show({
                    template: "获取数据失败",
                    duration: 5000

                });
                console.log(err);
            }).finally(function () {

                $scope.$broadcast('scroll.refreshComplete');
            });

        }

        $scope.getData();


    }]);

angular.module("myApp.controller",[])
    .controller("HomeController",["$scope","$http",function ($scope,$http){
        var url="http://localhost:3000/IndexInfo";
        $scope.homedata="";
         $scope.hot="";
        $scope.tv="";
        $scope.cpt="";
        $scope.list=["微电影", "电影","电视剧","传统戏剧","话剧","书画","相声","戏剧","音乐剧","纪录片"];

        $http({
            method:"get",
            url:url
        }).then(function (res) {

            if(res.data.resultCode=="0000"){
                $scope.homedata=res.data.result;
                $scope.hot=res.data.result.hot;
                $scope.tv=res.data.result.new;
                $scope.cpt=res.data.result.unit;
                
                setTimeout(function () {
                    $(".o_ul li").click(function () {

                        $(this).addClass("colo").siblings().removeClass("colo");
                        $(".o_ul li").find("a").removeClass("color");
                        $(this).find("a").addClass("color");
                    })

                })
            }
        },function (err) {
            alert("error");
        });
    }])



    .controller("RegisterController",["$scope","$http","$state",function ($scope,$http,$state){

                $scope.check = false;
              $scope.res=function (c) {

                  if(!c){
              $http({
                  url:"http://localhost:3000/user/reg",
                  method:"post",
                  data:{
                      name:$scope.user,
                      phone:$scope.user1,
                      password:$scope.psd1,
                      passwordRepeat:$scope.psd2

                  }

              }).then(function (res) {
                    console.log(res);
                  if(res.data.resultCode=="0000"){

                      $state.go("login");
                  }
              },function (error) {

               })
                  }
          }
    }])
    .controller("LoginController",["$scope","$http","$state",function ($scope,$http,$state) {

        $scope.check=false;
        $scope.val=false;
        $scope.res = function (d) {
            if(!d){
            $http({
                url: "http://localhost:3000/user/login",
                method: "post",
                data: {
                    phone: $scope.user,
                    password: $scope.psd1

                }
            }).then(function (res) {
                if(res.data.resultCode!="0000"){
                    $scope.val=true;

                }
                if(res.data.resultCode=="0000"){

                   $state.go("home");
                }
            }, function (error) {

            })
            }
        }

    }])
   /* .controller("ProlistController",function($scope,$http) {
        $scope.mes="";
        $http({
            method:"get",
            url:"http://localhost:3000/prolist"

        }).then(function (res) {
            if(res.data.resultCode=="0000"){
               $scope.mes=res.data.result.list;
            }

        },function (error) {
            console.log(error);
        });
    })*/
/*
    .controller("ProlistController",function (){
      /!*  *!/



    })
*/



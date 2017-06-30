angular.module("myApp",["ionic","myApp.controller"])
.config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {

       $urlRouterProvider.otherwise("/tabs/home");
       $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.views.transition('no');
    $stateProvider
        .state("tabs",{
            url:"/tabs",
            templateUrl:"views/main.html"


        })
       .state("tabs.home",{
           url:"/home",
           views:{
               "tabs-home":{

                   templateUrl:"views/home.html",
                   controller:"HomeController"

               }
           }
       })
       .state("tabs.gnews",{
           url:"/gnews/:id",
           views:{
               "tabs-home":{

                   templateUrl:"views/gnews.html",
                   controller:"GnewsController"

               }
           }
       })
       .state("tabs.about",{
           url:"/about",
           views:{
               "tabs-about":{

                   templateUrl:"views/about.html",
                   controller:"AboutController"

               }
           }
       })
       .state("tabs.aboutnews",{
       url:"/aboutnews/:id",
       views:{
           "tabs-about":{

               templateUrl:"views/aboutnews.html",
               controller:"AboutNewsController"

           }
       }
   })
       .state("tabs.set",{
       url:"/set",
       views:{
           "tabs-set":{

               templateUrl:"views/set.html",
               controller:"SetController"

           }
       }
   })
       .state("tabs.setnews",{
           url:"/setnews/:id",
           views:{
               "tabs-set":{

                   templateUrl:"views/setnews.html",
                   controller:"SetNewsController"

               }
           }
       });


}]);
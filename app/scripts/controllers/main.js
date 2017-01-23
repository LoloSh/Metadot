'use strict';

/**
 * @ngdoc function
 * @name metadotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the metadotApp
 */

 var myApp = angular.module('metadotApp', ['ngCookies']);

 myApp.controller('MainCtrl', ['$scope','$http', 'myCache','$cookies', function ($scope,$http,myCache,$cookies) {

   if ($scope.degree=="metric")
   {
     var temp= " degrees Celcius ";
   }
   else if ($scope.deree="imperial")
   {
     var temp = " degrees Fahrenheit";
   }
   else {
     var temp = " degrees Kelvin";
   }


      activeCache($scope, myCache);
      function  activeCache($scope, myCache){
      //myCache.put('myData', 'test');
      var cache = myCache.get('myData');
      var cookie=$cookies.get('myCookie');
      var cookie1=$cookies.get('myCookie1');
      var cookie2=$cookies.get('myCookie2');
      var cookie3=$cookies.get('myCookie3');
      var cookie4=$cookies.get('myCookie4');

      console.log(cache);
      console.log(cookie);
      console.log(cookie2);
      console.log(cookie3);
      console.log(cookie4);



      if (cache) { // If there’s something in the cache, use it!
        $scope.response = cache//cache['city']['name'];
      }
      else if (cookie){
        $scope.response = cookie;
        $scope.response1=cookie1;
        $scope.response2=cookie2;
        $scope.response3=cookie3;
        $scope.response4=cookie4;

      }
      else {
        $scope.response="No previous research"
        $scope.response1="";
        $scope.response2="";
        $scope.response3="";
        $scope.response4="";
      }

    }




  $scope.datas = function(){

    if($scope.long!=null && $scope.lat!=null)
    {
      $http({
          method: 'GET', //q=London
          cache:true,
          url: "http://" +'api.openweathermap.org/data/2.5/forecast?lat='+$scope.lat +'&lon='+$scope.long+'&lang='+ $scope.language+'&units='+$scope.degree+ '&APPID=f8afa1eacfd3cc0e7ecbb783df45bf3f'
        }).then(function successCallback(response) {


                    // this callback will be called asynchronously
                    // when the response is available

                    $scope.informations=response.data;
                     $scope.result=[{"name":"","currentT":"","descriptionCurrentT":"" }]
                     console.log(response.data)
                     $scope.result.name=response.data['city']['name'];
                     $scope.result.currentT=response.data['list'][0]['main']['temp'] + temp;
                     $scope.result.descriptionCurrentT=response.data['list'][0]['weather'][0]['description'];

                     var  d=  new Date();
                     var n =d.getDay();

                     var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                     var response1 = "For tomorrow : " + response.data['list'][8]['main']['temp'] + temp+', '+response.data['list'][8]['weather'][0]['description'];
                     var response2 = "For " + days[(n+2)%7] + " : " +response.data['list'][16]['main']['temp']+ temp+', '+response.data['list'][16]['weather'][0]['description'];
                     var response3 = "For " + days[(n+3)%7] + " : "+response.data['list'][24]['main']['temp']+ temp+', '+response.data['list'][24]['weather'][0]['description'];
                     var response4 = "For " + days[(n+4)%7] + " : "+response.data['list'][32]['main']['temp']+ temp +', '+response.data['list'][32]['weather'][0]['description'];
                     console.log(response1);
                     console.log(response2);
                     console.log(response3);
                     console.log(response4);

                     $scope.response1=response1;
                     $scope.response2=response2;
                     $scope.response3=response3;
                     $scope.response4=response4;





                     $scope.response=$scope.result.name+','+$scope.result.currentT+','+$scope.result.descriptionCurrentT;

                     myCache.put('myData', $scope.response);
                     $cookies.put('myCookie',$scope.response);
                     $cookies.put('myCookie1',$scope.response1);
                     $cookies.put('myCookie2',$scope.response2);
                     $cookies.put('myCookie3',$scope.response3);
                     $cookies.put('myCookie4',$scope.response4);


        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
            $scope.result='No city with such a description';
        });
      }


    else if ($scope.city!=null)
    {
      $http({
          method: 'GET', //q=London
          cache:true,
          url: "http://" +'api.openweathermap.org/data/2.5/forecast/city?q='+$scope.city+'&lang='+ $scope.language+'&units='+$scope.degree+ '&APPID=f8afa1eacfd3cc0e7ecbb783df45bf3f'
        }).then(function successCallback(response) {


          // this callback will be called asynchronously
          // when the response is available
  
          $scope.informations=response.data;
           $scope.result=[{"name":"","currentT":"","descriptionCurrentT":"" }]
           console.log(response.data)
           $scope.result.name=response.data['city']['name'];
           $scope.result.currentT=response.data['list'][0]['main']['temp'] + temp;
           $scope.result.descriptionCurrentT=response.data['list'][0]['weather'][0]['description'];

           var  d=  new Date();
           var n =d.getDay();

           var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
           var response1 = "For tomorrow : " + response.data['list'][8]['main']['temp'] + temp+', '+response.data['list'][8]['weather'][0]['description'];
           var response2 = "For " + days[(n+2)%7] + " : " +response.data['list'][16]['main']['temp']+ temp+', '+response.data['list'][16]['weather'][0]['description'];
           var response3 = "For " + days[(n+3)%7] + " : "+response.data['list'][24]['main']['temp']+ temp+', '+response.data['list'][24]['weather'][0]['description'];
           var response4 = "For " + days[(n+4)%7] + " : "+response.data['list'][32]['main']['temp']+ temp +', '+response.data['list'][32]['weather'][0]['description'];
           console.log(response1);
           console.log(response2);
           console.log(response3);
           console.log(response4);

           $scope.response1=response1;
           $scope.response2=response2;
           $scope.response3=response3;
           $scope.response4=response4;



           $scope.response=$scope.result.name+','+$scope.result.currentT+','+$scope.result.descriptionCurrentT;

           myCache.put('myData', $scope.response);
           $cookies.put('myCookie',$scope.response);
           $cookies.put('myCookie1',$scope.response1);
           $cookies.put('myCookie2',$scope.response2);
           $cookies.put('myCookie3',$scope.response3);
           $cookies.put('myCookie4',$scope.response4);



        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
            $scope.response='No city with such a description';
        });
      }
      else if ($scope.city!=null & $scope.pc !=null){


          $http({
              method: 'GET', //q=London
              cache:true,
              url: "http://" +'api.openweathermap.org/data/2.5/forecast/city?q='+$scope.city+','+$scope.cp+'&lang='+ $scope.language+'&units='+$scope.degree+ '&APPID=f8afa1eacfd3cc0e7ecbb783df45bf3f'
            }).then(function successCallback(response) {


              // this callback will be called asynchronously
              // when the response is available

              $scope.informations=response.data;
               $scope.result=[{"name":"","currentT":"","descriptionCurrentT":"" }]
               console.log(response.data)
               $scope.result.name=response.data['city']['name'];
               $scope.result.currentT=response.data['list'][0]['main']['temp'] + temp;
               $scope.result.descriptionCurrentT=response.data['list'][0]['weather'][0]['description'];

               var  d=  new Date();
               var n =d.getDay();

               var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
               var response1 = "For tomorrow : " + response.data['list'][8]['main']['temp'] + temp+', '+response.data['list'][8]['weather'][0]['description'];
               var response2 = "For " + days[(n+2)%7] + " : " +response.data['list'][16]['main']['temp']+ temp+', '+response.data['list'][16]['weather'][0]['description'];
               var response3 = "For " + days[(n+3)%7] + " : "+response.data['list'][24]['main']['temp']+ temp+', '+response.data['list'][24]['weather'][0]['description'];
               var response4 = "For " + days[(n+4)%7] + " : "+response.data['list'][32]['main']['temp']+ temp +', '+response.data['list'][32]['weather'][0]['description'];
               console.log(response1);
               console.log(response2);
               console.log(response3);
               console.log(response4);

               $scope.response1=response1;
               $scope.response2=response2;
               $scope.response3=response3;
               $scope.response4=response4;



               $scope.response=$scope.result.name+','+$scope.result.currentT+','+$scope.result.descriptionCurrentT;

               myCache.put('myData', $scope.response);
               $cookies.put('myCookie',$scope.response);
               $cookies.put('myCookie1',$scope.response1);
               $cookies.put('myCookie2',$scope.response2);
               $cookies.put('myCookie3',$scope.response3);
               $cookies.put('myCookie4',$scope.response4);



            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
                $scope.response='No city with such a description';
            });


      }



    else{
      $scope.response='No city with such a description';


    }



}



 }]);

 // Set up the cache ‘myCache’
myApp.factory('myCache', ['$cacheFactory', function($cacheFactory) {
return $cacheFactory('myData');
}]);

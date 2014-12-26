
angular.module('website', ['ngAnimate','ngTouch','ngRoute','ui.bootstrap'])

	.config(['$routeProvider', function($routeProvider) {
'use strict';
	$routeProvider. when('/',{controller:'MainController', templateUrl:'html/homePage.html'}).
				   otherwise({redirectTo:"/"})

}])
	.controller('MainController', ["$scope","$interval","MainService",function ($scope,$interval,MainService) {
    $scope.slides = MainService.getSlides();

    $scope.webImageUrlArray= MainService.getWebImageUrlArray();

    $scope.personalWebArray= MainService.getPersonalWebArray();

    $scope.webImageThumbsArray = MainService.getWebImageThumbsArray();

    $scope.martialArtWebArray= MainService.getMartialArtWebArray();

    $scope.martialArtWebThumbArray= MainService.getMartialArtWebThumbArray();
   
    $scope.popupWebArray= [];

    $scope.timer=3000;
    $scope.popupTimer=2500;
    $scope.stopTimer="";
    $scope.nextTimer="";
    $scope.popupStopTimer="";
    $scope.popupNextTimer="";
    $scope.preTimer="";
    $scope.toggle=false;
    $scope.isDisplayPopupImage=false;//display the popup for webimage
    $scope.popupImageCounter=0;//the first image of the array
    $scope.caroselButtonLabel="Play";
    $scope.isOnCarouselMode= false;
    $scope.showPlayCaroselButton=true;//show the playCarouseSlideShow at the beginning
    $scope.isEnter=false;
    $scope.counter =0;//index of image
    $scope.contactImage="assets/images/icons/sendMail.jpeg";
    $scope.caroselButtonLabel="play";
   //-----===========TESTING========================
        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };


        $scope.nextSlide = function () {
            console.log("next");
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
        console.log("end");

        //=========init==============
        $scope.init = function(imgArray ){
        
        //$scope.urlImgArray = [];
            $scope.stopTimer=$interval(function(){
                $scope.nextImg();

            }, $scope.timer);
        };
        //==========nextImg==========
    $scope.nextImg=function(){
         $interval.cancel($scope.stopTimer);
         $interval.cancel($scope.preTimer);

       // if ($scope.counter < $scope.urlImgArray.length-1){
            if($scope.currentIndex === $scope.slides.length-1)
            {
                 $interval.cancel($scope.nextTimer);
                $scope.nextTimer=$interval($scope.nextImg,$scope.timer);
                $scope.currentIndex=0;
            }
           // $timeout($scope.nextImg,$scope.time);
            else
            {
                 $interval.cancel($scope.nextTimer);
                $scope.nextTimer=$interval($scope.nextImg,$scope.timer);
                $scope.currentIndex ++;
            }
        };

        //========================selectedImage=============$
   $scope.thumbImageWebSite=[];
   $scope.selectedImage = function(imageUrl){
    console.log("image",imageUrl);
    if (imageUrl ==='assets/images/imageWebReferences/personalWebThumb.jpg')
    {
        $scope.popupWebArray=$scope.personalWebArray; //copy the personal website to the popupWebArray
        $scope.thumbImageWebSite=$scope.webImageThumbsArray;
        $scope.isDisplayPopupImage=true;
        
    }
    else if(imageUrl==='assets/images/imageWebReferences/martialArtWebThumb.jpg')
    {
        $scope.popupWebArray=$scope.martialArtWebArray;
        $scope.thumbImageWebSite=$scope.martialArtWebThumbArray;
        $scope.isDisplayPopupImage=true;
     
    }
   } ;
   //===============nextPopuImg===================
   $scope.nextPopupImg=function(){
        if ($scope.popupImageCounter===$scope.popupWebArray.length-1)
        {
            $scope.popupImageCounter=0;
        }
        else
        {
            $scope.popupImageCounter++;
        }
    $scope.isMouseOver=false;
   };
  //==================prePopupImg===============
  $scope.prePopupImg=function(){
        if ($scope.popupImageCounter===0)
        {
            $scope.popupImageCounter=$scope.popupWebArray.length-1;
        }
        else
        {
            $scope.popupImageCounter--;
        }
      $scope.isMouseOver=false;
   };
   //===============caroselButton==================

   $scope.playCaroselSlideShow=function(){
      if( $scope.caroselButtonLabel==="play")
      { $scope.caroselButtonLabel="stop";
        $scope.isOnCarouselMode= true;
        $scope.runPopupCarosel();
        }
        else
        {
            $scope.caroselButtonLabel="play";
             $scope.isOnCarouselMode= false;
            $interval.cancel($scope.popupNextTimer);
            $scope.showPlayCaroselButton=true;//show the playCarouseSlideShow at the beginning
        }
    };

    //============
    $scope.runPopupCarosel=function() {
      //==========nextImg==========
         $interval.cancel($scope.popupStopTimer);
       
       // if ($scope.counter < $scope.urlImgArray.length-1){
            if($scope.popupImageCounter === $scope.popupWebArray.length-1)
            {
                 $interval.cancel($scope.popupNextTimer);
                $scope.popupNextTimer=$interval($scope.runPopupCarosel,$scope.popupTimer);
                $scope.popupImageCounter=0;
            }
           // $timeout($scope.nextImg,$scope.time);
            else
            {
                 $interval.cancel($scope.popupNextTimer);
                $scope.popupNextTimer=$interval($scope.runPopupCarosel,$scope.popupTimer);
                $scope.popupImageCounter ++;
            }
             $scope.showPlayCaroselButton=false;//hide the playCarouseSlideShow at the beginning
    }
    //==============stopCaroselSlideShow================
    $scope.exitPopupImageContainer=function(){
        $scope.isDisplayPopupImage=false;
        $scope.isOnCarouselMode=false;
    };

    //=============mouseOver==============
    $scope.mouseOverIndex=-1;
    $scope.isMouseOver=false;
    $scope.mouseOver=function(index)
    {
      $scope.mouseOverIndex=index;
      $scope.isMouseOver=true;

    }

    //============selectThumbPopupImag=============
    $scope.selectThumbPopupImag=function(imgIndex){
      console.log("imgIndex",imgIndex);
      $scope.popupImageCounter=imgIndex;
    }

  }])
  //================Service============================
    .service("MainService",function(){
        var slides = [
                          {image: 'assets/images/slideShow/img00.jpg', description: 'Image 00'},
                          {image: 'assets/images/slideShow/img01.jpg', description: 'Image 01'},
                          {image: 'assets/images/slideShow/img02.jpg', description: 'Image 02'},
                          {image: 'assets/images/slideShow/img03.jpg', description: 'Image 03'},
                          {image: 'assets/images/slideShow/img04.jpg', description: 'Image 04'}
                      ],
        webImageUrlArray=[ "assets/images/imageWebReferences/personalWebThumb.jpg",
                                  "assets/images/imageWebReferences/martialArtWebThumb.jpg"
                          ],

        personalWebArray=[ "assets/images/personalWeb/mainPics/homePage1.jpg",
                                  "assets/images/personalWeb/mainPics/photoPage2.jpg",
                                  "assets/images/personalWeb/mainPics/photoPageShot3.jpg",
                                  "assets/images/personalWeb/mainPics/musicPage4.jpg",
                                  "assets/images/personalWeb/mainPics/musicPageShot5.jpg",
                                  "assets/images/personalWeb/mainPics/collectionPage6.jpg",
                                  "assets/images/personalWeb/mainPics/collectionPageShot7.jpg",
                                  "assets/images/personalWeb/mainPics/aboutPage8.jpg",
                                  "assets/images/personalWeb/mainPics/contactPage9.jpg"
                            ],

        webImageThumbsArray =[ "assets/images/personalWeb/thumbs/thumbHomePage1.jpg",
                                      "assets/images/personalWeb/thumbs/thumbPhotoPage2.jpg",
                                      "assets/images/personalWeb/thumbs/thumbPhotoPageShot3.jpg",
                                      "assets/images/personalWeb/thumbs/thumbMusicPage4.jpg",
                                      "assets/images/personalWeb/thumbs/thumbMusicPageShot5.jpg",
                                      "assets/images/personalWeb/thumbs/thumbCollectionPage6.jpg",
                                      "assets/images/personalWeb/thumbs/thumbCollectionPageShot7.jpg",
                                      "assets/images/personalWeb/thumbs/thumbAboutPage8.jpg",
                                      "assets/images/personalWeb/thumbs/thumbContactPage9.jpg"
                              ],

        martialArtWebArray=[ "assets/images/martialArtWeb/mainPics/Home1.jpg",
                                    "assets/images/martialArtWeb/mainPics/Gallery2.jpg",
                                    "assets/images/martialArtWeb/mainPics/Kids3.jpg",
                                    "assets/images/martialArtWeb/mainPics/Women4.jpg",
                                    "assets/images/martialArtWeb/mainPics/Schedule5.jpg",
                                    "assets/images/martialArtWeb/mainPics/Contactus6.jpg"
                            ],

        martialArtWebThumbArray=[  "assets/images/martialArtWeb/thumbs/thumbHome1.jpg",
                                          "assets/images/martialArtWeb/thumbs/thumbGallery2.jpg",
                                          "assets/images/martialArtWeb/thumbs/thumbKids3.jpg",
                                          "assets/images/martialArtWeb/thumbs/thumbWomen4.jpg",
                                          "assets/images/martialArtWeb/thumbs/thumbSchedule5.jpg",
                                          "assets/images/martialArtWeb/thumbs/thumbContactus6.jpg"
                                  ];
       

        //-------get slides----------
        this.getSlides=function(){
          return slides;
        };
        
        //---------get webImageUrlArray-------
        this.getWebImageUrlArray =function(){
          return webImageUrlArray;
        };
        
        //---------getpersonalWebArray------
        this.getPersonalWebArray = function(){
          return personalWebArray;
        };
       
        //-----------get webImageThumbsArray-----
        this.getWebImageThumbsArray=function(){
          return webImageThumbsArray;
        };
       
        //----------get martialArtWebArray----
        this.getMartialArtWebArray=function(){
          return martialArtWebArray;
        };
       
        //---------get martialArtWebThumbArray-----
        this.getMartialArtWebThumbArray=function(){
          return martialArtWebThumbArray;
        };
       
    })


  //=================animation======================
	.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });


    
   
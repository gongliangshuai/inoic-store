angular.module('starter.controllers', [])
	.controller('HomeView', function($scope) {

	})
	.controller('HomeCtrl', function($scope, $rootScope, $window, $timeout, $ionicLoading, $ionicNavBarDelegate, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicModal) {
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		})

		$timeout(function() {
			$ionicLoading.hide();
		}, 2000)

		console.log($scope);
		console.log($ionicScrollDelegate);

		$scope.headerStyle = {
			'background-color': 'rgba(255, 11, 11,0.001)'
		};
		$rootScope.position = function() {
			position = $ionicScrollDelegate.$getByHandle('content').getScrollPosition();
			console.log(position.top);
			//console.log(Math.min(position.top/100,0.8));
			$scope.headerStyle = {
				'background-color': 'rgba(255, 11, 11,' + Math.min(position.top / 100, 0.8) + ')'
			};
			$scope.$apply();
		}

		$window.$scope = $rootScope;

		console.log("111");
		console.log($rootScope);
		//$scope.scroll = $ionicScrollDelegate.$getByHandle('content').getScrollPosition;
		//console.log($scope.scroll);
		// 这个是可以检测到的
		$scope.$watch("scroll", function() {
			console.log("scroll");
		});

		$scope.test1 = function() {
			console.log("test1");
			//console.log($("#home-content").attr("class"));
			//console.log(angular.element("#home-content"));
			$scope.headerStyle = {
				'background-color': 'rgba(255, 11, 11,1)'
			};

		}
		$scope.test2 = function(temp) {
			//console.log(temp.scrollCtrl.getScrollPosition());
		}
		$scope.test3 = function() {
			console.log("test3");
			//$ionicScrollDelegate.scrollTop();
			$ionicScrollDelegate.$getByHandle('content').scrollTop();
			console.log($ionicScrollDelegate.getScrollPosition());
			console.log($ionicScrollDelegate.$getByHandle('content'));
		};

		$scope.onScroll = function() {
			console.log("onScroll");
		};


		/*
		$scope.$watch(function(){
			console.log("watch");
		})
		*/
		$scope.setNavTitle = function(title) {
			alert('ok');
			$ionicNavBarDelegate.title(title);
		}
		$scope.nextSlide = function() {
			$ionicSlideBoxDelegate.next();
		}
		$scope.doRefresh = function() {
			location.reload();

		};

		/**模型**/
		$ionicModal.fromTemplateUrl('my-modal.html', {
			scope: $scope,
			animation: 'slide-in-up',
			backdropClickToClose: true
		}).then(function(modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function() {
			$scope.modal.show();
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
		//当我们用到模型时，清除它！
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		// 当隐藏的模型时执行动作
		$scope.$on('modal.hide', function() {
			// 执行动作
		});
		// 当移动模型时执行动作
		$scope.$on('modal.removed', function() {
			// 执行动作
		});
	})

.controller('ClassifyCtrl', function($scope, $http, $ionicSideMenuDelegate) {
	$scope.loading = false;
	$scope.classifylists = [{
		title: 'Reggae',
		id: 1
	}, {
		title: 'Chill',
		id: 2
	}, {
		title: 'Dubstep',
		id: 3
	}, {
		title: 'Indie',
		id: 4
	}, {
		title: 'Rap',
		id: 5
	}, {
		title: 'Cowbell',
		id: 6
	}];
	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.toggleRight = function() {
		$ionicSideMenuDelegate.toggleRight();
	};

	var nextItem = 0;
	$scope.items = [];
	for (var i = 0; i < 5; i++) {
		$scope.items.push('Item ' + (nextItem++));
	}

	$scope.addItem = function(atIndex) {
		$scope.items.splice(atIndex + 1, 0, 'Item ' + nextItem);
		nextItem++;
	};

	$scope.loadMore = function() {
		$http.get('/').success(function(items) {
			//useItems(items);
			for (var i = 0; i < 5; i++) {
				//$scope.items.push('Item ' + (nextItem++));
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};

	$scope.$on('stateChangeSuccess', function() {
		$scope.loadMore();
	});
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();
	$scope.remove = function(chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('MyCtrl', function($scope, $stateParams, Chats, $ionicBackdrop, $timeout) {
	$scope.chat = Chats.get($stateParams.chatId);
	$scope.test = "test";
	//一秒显示一个背景
  $scope.action = function() {
  	
  	console.dir($scope);
    $ionicBackdrop.retain();
    $timeout(function() {
      $ionicBackdrop.release();
    }, 1000);
  };
})

.controller('CartCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})
.controller('FindCtrl', function($scope, $stateParams) {

})
.controller('AccountCtrl', function($scope) {
	$scope.settings = {
		enableFriends: true
	};
});
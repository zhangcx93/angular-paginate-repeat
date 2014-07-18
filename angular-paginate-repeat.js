"use strict";

angular.module('paginateRepeat', [])
  .directive('pgRepeat', function ($compile) {
    return {
      restrict: 'AE',
      template: '',
      transclude: true,
      scope: true,
      link: function (scope, element, attrs, ctrl, transclude) {
        var repeat = attrs.pgRepeat;
        var limit, itemName, allData, length;
        var init = function () {
          limit = attrs.limit || 10;
          itemName = repeat.split(' in ')[0];
          allData = scope[repeat.split(' in ')[1]];
          length = allData.length;
          scope.maxPage = Math.ceil(attrs.max / 2) || 3;
          scope.nowPage = 1;
          scope.pages = (function () {
            var arr = [];
            for (var i = 0; i < Math.ceil(length / limit); i++) {
              arr.push(i + 1);
            }
            return arr;
          })();
        };

        var update = function () {
          scope.sliceData = allData.slice((scope.nowPage - 1) * limit, scope.nowPage * limit);
        };

        scope.$watch(repeat.split(' in ')[1], function (newData, oldData) {
          if (newData != oldData) {
            init();
            update();
          }
        }, true);

        init();
        update();
        transclude(scope, function (clone) {
          var repeater = angular.element('<div ng-repeat="' + itemName + ' in sliceData"></div>');
          repeater.append(clone);
          element.append($compile(repeater)(scope));
          var paginate = angular.element([
            '<div class="repeat-paginate" ng-show="pages">',
            '<a class="paginate-prev" ng-show="nowPage!=1" ng-click="prev()">上页</a>',
            '<span ng-show="nowPage > maxPage">...</span>',
            '<a class="paginate-item" ng-class="{active: page == nowPage}" ng-show="page > nowPage - maxPage && page < nowPage + maxPage" ng-repeat="page in pages" ng-click="go(page)">{{ page }}</a>',
            '<span ng-show="nowPage + maxPage < pages.length + 1">...</span>',
            '<a class="paginate-next" ng-show="nowPage!=pages.length" ng-click="next()">下页</a>',
            '</div>'].join(''));
          element.append($compile(paginate)(scope));
        });
        scope.go = function (page) {
          scope.nowPage = page;
          update();
        };
        scope.prev = function () {
          scope.nowPage = scope.nowPage - 1;
          update();
        };
        scope.next = function () {
          scope.nowPage = scope.nowPage + 1;
          update();
        }
      }
    }
  });

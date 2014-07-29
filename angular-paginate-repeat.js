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
        var limit, itemName, allData, length, prevText, nextText;
        var init = function () {
          limit = attrs.limit || 10;
          prevText = attrs.prev || 'Prev';
          nextText = attrs.next || 'Next';
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
          var repeater = clone.clone();
          repeater.attr('ng-repeat', itemName + ' in sliceData');
          element.append($compile(repeater)(scope));
          var paginate = angular.element([
            '<div class="repeat-paginate" ng-show="pages">',
            '<a class="paginate-prev" ng-show="nowPage!=1" ng-click="prev()">',
            prevText,
            '</a>',
            '<a class="paginate-item first" ng-class="{active: 1 == nowPage, onlyOne: pages.length == 1}" ng-click="go(1)">1</a>',
            '<span ng-show="nowPage > maxPage && nowPage != maxPage + 1">...</span>',
            '<a class="paginate-item" ng-class="{active: page == nowPage}" ng-show="page != 1 && page != pages.length && page > nowPage - maxPage && page < nowPage + maxPage" ng-repeat="page in pages" ng-click="go(page)">{{ page }}</a>',
            '<span ng-show="nowPage + maxPage < pages.length">...</span>',
            '<a class="paginate-item last" ng-class="{active: nowPage == pages.length}" ng-click="go(pages.length)" ng-hide="pages.length == 1">{{ pages.length }}</a>',
            '<a class="paginate-next" ng-show="nowPage!=pages.length" ng-click="next()">',
            nextText,
            '</a>',
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

'use strict';

/* Controllers */

var martianRobotsControllers = angular.module('martianRobotsControllers', []);



martianRobotsControllers.controller('MainCtrl', ['$scope', '$filter',
    function MainCtrl($scope, $filter) {
        $scope.isGrid = false;
        $scope.info_msg = "";
        $scope.gridSize = {
            x:'',
            y:''
        };
        $scope.startPoint = {
            x:'',
            y:'',
            dir:'',
            command:'',
            Lost:''
        };
        $scope.direction=['N','E','S','W'];
        $scope.move = [{x:0,y:1},
                        {x:1,y:0},
                        {x:0,y:-1},
                        {x:-1,y:0}];
        $scope.messages =[ {
                text:"Grid Size set"}
        ];
        $scope.setGrid = function() {
            if(($scope.gridSize.x > 0)  && ($scope.gridSize.y > 0)) {
                $scope.isGrid = true;
                $scope.info_msg="";
            }
            else {
                $scope.info_msg = "should be more than 0";
            }
        };
        function turnRight(pos) {
            var re_dir = $scope.direction.indexOf(pos.dir)+1;
            if(re_dir > 3) re_dir = 0;
            pos.dir = $scope.direction[re_dir]; 
            return pos;
        }
        function turnLeft(pos) {
            var re_dir = $scope.direction.indexOf(pos.dir)-1;
            if(re_dir < 0) re_dir = 3;
            pos.dir = $scope.direction[re_dir]; 
            return pos;
        }
        function moveForward(pos) {
            function check_edge(pos) {               
                if(pos.x < 0) {
                    pos.x = 0;
                    pos.Lost = 'LOST';
                }
                if(pos.y < 0){
                    pos.y = 0;
                    pos.Lost = 'LOST';
                }
                if(pos.x > $scope.gridSize.x) {
                    pos.x = $scope.gridSize.x;
                    pos.Lost = 'LOST';
                }
                if(pos.y > $scope.gridSize.y) {
                    pos.y = $scope.gridSize.y;
                    pos.Lost = 'LOST';
                }
                return pos;
            };
            var re_dir = $scope.direction.indexOf(pos.dir);
            if(pos.Lost === 'LOST') return pos;
            var x_pos = parseInt(pos.x,10);
            var y_pos = parseInt(pos.y,10);
            x_pos += $scope.move[re_dir].x;
            y_pos += $scope.move[re_dir].y;
            pos.x = x_pos;
            pos.y = y_pos;
            pos = check_edge(pos);
            return pos;
        }
        $scope.addCommand = function() {    
            $scope.startPoint.Lost='';
            $scope.startPoint.dir = $filter('uppercase')($scope.startPoint.dir);
            $scope.startPoint.command = $filter('uppercase')($scope.startPoint.command);
            var result = angular.copy($scope.startPoint);
            if($scope.gridSize.x < $scope.startPoint.x 
                    || $scope.gridSize.y < $scope.startPoint.y){
                $scope.info_msg = "The start points should be less than grid size";
                $scope.messages.push({text:'Start point set error'});
            }
            else if(!$scope.startPoint.command) {
                $scope.info_msg = "Please set command ";
                $scope.messages.push({text:'Commnad set error'});

            }
            else {
               $scope.messages.push({text:result.command});
                angular.forEach(result.command,function(command) {
                    if(command === 'R'){
                        result=turnRight(result);
                    }
                    if(command === 'L'){
                        result=turnLeft(result);
                    }
                    if(command === 'F'){
                        result=moveForward(result);
                    }
                });
                $scope.messages.push({text:'Result position is '
                            + result.x +','
                            +result.y+','
                            +result.dir+result.Lost});
            }
        };
        
    }]);

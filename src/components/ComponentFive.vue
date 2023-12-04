<template>
    <div id="componentFive">
        <h1>공피하기</h1>
        <div id="canvas"  @keypress="keyHandle()">
            <div v-bind:class="ball_id" :key="index" v-for="index in ballArr" v-bind:style="ball_style"></div>
        </div>
		<div id="heroApp">
            <div v-bind:id="hero_id" v-bind:style="hero_style" ref="target"></div>
        </div>
        <div id="btnBox" v-bind:style="btnBox_style">
            <input v-bind:id="input_id" v-bind:style="input_style" type="number" v-model="ballCnt" @change="changeNum">
            <button v-bind:id="btn_id" v-bind:style="btn_style" @click="btnClick">시작</button>
            <span v-bind:id="time_id" v-bind:style="time_style" ref="target">000:00</span>
        </div>
    </div>
</template>

<script>
    //var w_width = window.innerWidth;
    //var w_height = window.innerHeight;
    var direction_x = [];
    var direction_y = [];
    var ball;
    var ball_rect;
    var box;
    var box_rect;
    var hero;
    var hero_rect;
    var hero_rect_x;
    var hero_rect_y;
    var key;
    //var hero_x = 800;
    //var hero_y = 400;
    var up_flag = false;
    var down_flag = false;
    var left_flag = false;
    var right_flag = false;
    var keydown_flag = false;
    var keyup_flag = false;
    var stop_flag = false;
    var keytime;
    var interval;
    var endTime;
    var startTime;
    var timeDiff;
    var timeSec;
    var timeMiliSec;
    var timeSecStr;
    var timeMiliSecStr;
    export default {
        el: "#componentFive",
        data: function () {
            return {
                show : true,
                ballCnt : 0,
                input_id: 'input',
                input_style: {
                'width' : '150px',
                'height' : '60px',
                'font-size' : '32px',
                'box-sizing' : 'border-box',
                'pading' : '0 20px'
                },
                ball_style:{
                    'background' : 'rgb(0, 0, 0)',
                    'width' : '18px',
                    'height' : '18px',
                    'position': 'fixed',
                    'border-radius': '50%',
                },
                ball_id : 'ball',
                hero_style: {
                    'background': 'rgb(0, 0, 0)',
                    'width': '10px',
                    'height': '10px',
                    'position': 'fixed',
                    'top': '432px',
                    'left': '1048px',
                    'border-radius': '50%'
                },
                hero_id: 'hero',
                btnBox_style:{
                    'margin' : '20px',
                    'width' : "100%",
                    'float' : 'left',
                    'text-align' : 'center',
                    'display' : 'inline-block',
                },
                time_style: {
                    'display': 'inline-block',
                    'width': '200px',
                    'height': '50px',
                    'font-size': '32px',
                },
                btn_id: 'starBtn',
                    btn_style: {
                    'width': '150px',
                    'height': '60px',
                    'font-size' : '1.5em',
                },
                time_id: 'time',
                keytime : 0,
                ballArr : []
            }
        },
        mounted() {
            log('시작');
            //console.log(this.$refs.target);
        },
        methods: {
            changeNum:function(){
                console.time('changeNum')

                console.timeEnd('changeNum');
            },
            btnClick:function(){
                var that  = this;
                
                this.ballArr = []
                var tempDiceNum;
                box = document.getElementById("canvas");
                box_rect = box.getBoundingClientRect();
                var boxWidth = box_rect.right - box_rect.left;
                var boxHeight = box_rect.bottom - box_rect.top;
                var ballXTemp;
                var ballYTemp;
                for (var i = 0; i < this.ballCnt; i++) {
                    tempDiceNum = parseInt(Math.random() * 4 + 1); // 1,2,3,4 발생
                    switch (tempDiceNum) {
                        case 1:
                            ballXTemp = ((Math.random() * boxWidth) + box_rect.left) + 'px';
                            ballYTemp = ((Math.random() * 100) + box_rect.top) + 'px';
                            direction_x[i] = 'r'
                            direction_y[i] = 's'
                            break;
                        case 2:
                            ballXTemp = ((Math.random() * 100) + box_rect.left + 20) + 'px';
                            ballYTemp = ((Math.random() * boxHeight) + box_rect.top) + 'px';
                            direction_x[i] = 'r'
                            direction_y[i] = 's'
                            break;
                        case 3:
                            ballXTemp = ((Math.random() * boxWidth) + box_rect.left) + 'px';
                            ballYTemp = (boxHeight - (Math.random() * 100) + box_rect.top - 20) + 'px';
                            direction_x[i] = 'l'
                            direction_y[i] = 'n'
                            break;
                        case 4:
                            ballXTemp = (box_rect.right - (Math.random() * 100) - 20) + 'px';
                            ballYTemp = ((Math.random() * boxHeight) + box_rect.top) + 'px';
                            direction_x[i] = 'l'
                            direction_y[i] = 'n'
                            break;
                        default:
                            break;
                    }
                    this.ballArr.push({ basedBallX: ballXTemp, ballX: ballXTemp, ballY: ballYTemp, basedBallY: ballYTemp });
                }
                setTimeout(function () {
                    that.gameStart();
                }, 100);
            },
            gameStart:function(){

                stop_flag = false;
                clearInterval(interval);
                var balls = document.getElementsByClassName("ball");

                box = document.getElementById("canvas");
                box_rect = box.getBoundingClientRect();
                
                hero = document.getElementById("hero");
                hero.style.left = '1048px';
                hero.style.top = '432px';
                Array.prototype.forEach.call(balls, (element, index) => {
                    element.style.left = this.ballArr[index].basedBallX;
                    element.style.top = this.ballArr[index].basedBallY;
                });
                startTime = new Date();
                this.function1();
            },

            function1: function() {
                try {
                    interval = setInterval(function () {
                        if(stop_flag){
                            clearInterval(interval);
                            return;
                        }
                        function2();
                        function4();
                    }, 1);
                }catch(error){
                    clearInterval(interval);
                }
            },
        }
    }
            
    window.onkeydown = function (e) {

        keyup_flag = false;
        key = e.key;

        if (key == 'ArrowUp') {
            up_flag = true;
        } else if (key == 'ArrowDown') {
            down_flag = true;
        } else if (key == 'ArrowLeft') {
            left_flag = true;
        } else if (key == 'ArrowRight') {
            right_flag = true;
        }
        
        if (keydown_flag) {
            return;
        }

        keydown_flag = true;
        loopfunc();

    };

    window.onkeyup = function (e) { //키를 뗐을때
        if (e.key == 'ArrowUp') {
            up_flag = false;
        } else if (e.key == 'ArrowDown') {
            down_flag = false;
        } else if (e.key == 'ArrowLeft') {
            left_flag = false;
        } else if (e.key == 'ArrowRight') {
            right_flag = false;
        }

        keyup_flag = true;
        keydown_flag = false;

    }

    function loopfunc() {
        if (stop_flag) {
           return;
        }
        
        if (keyup_flag && !up_flag && !down_flag && !left_flag && !right_flag) {
            clearTimeout(keytime);
            return;
        }

        clearTimeout(keytime);

        box = document.getElementById("canvas");
        box_rect = box.getBoundingClientRect();
        hero = document.getElementById("hero");
        hero_rect = hero.getBoundingClientRect();

        keytime = setTimeout(function () {
            if (up_flag) {
                if(hero_rect.top >= (box_rect.top + 2)){
                    hero.style.top = (hero_rect.top - 4) + 'px';
                }
            }

            if (down_flag) {
                if (hero_rect.bottom <= (box_rect.bottom - 2)) {
                    hero.style.top = (hero_rect.top + 4) + 'px';
                }
            }

            if (left_flag) {
                if (hero_rect.left >= (box_rect.left + 2)) {
                    hero.style.left = (hero_rect.left - 4) + 'px';
                }
            }

            if (right_flag) {
                if (hero_rect.right <= (box_rect.right - 2)) {
                    hero.style.left = (hero_rect.left + 4) + 'px';
                }
            }

            window.isFirstPressed = true; //처음 눌렀다는 속성 반영
            loopfunc();//연속 수행
            
        }, window.isFirstPressed ? 1 : 1);
    }

    function function2() {
        
        ball = document.getElementsByClassName("ball");
        box = document.getElementById("canvas");
        box_rect = box.getBoundingClientRect();
        
        Array.prototype.forEach.call(ball, (element, index) => {
            ball_rect = element.getBoundingClientRect();
            
            if (direction_x[index] == 'r' && ball_rect.right > box_rect.right) {
                direction_x[index] = 'l';
            } else if (direction_x[index] == 'l' && ball_rect.left < box_rect.left) {
                direction_x[index] = 'r';
            }

            if (direction_y[index] == 's' && ball_rect.bottom > box_rect.bottom) {
                direction_y[index] = 'n';
            } else if (direction_y[index] == 'n' && ball_rect.top < box_rect.top) {
                direction_y[index] = 's';
            }

            if (direction_x[index] == 'r') {
                element.style.left = (ball_rect.left + 2) + 'px';
            } else if (direction_x[index] == 'l') {
                element.style.left = (ball_rect.left - 2) + 'px';
            }

            if (direction_y[index] == 's') {
                element.style.top = (ball_rect.top + 1) + 'px';
            } else if (direction_y[index] == 'n') {
                element.style.top = (ball_rect.top - 1) + 'px';
            }
        
            function3(ball_rect);
        });
    }

    function function3(ball_rect){
        hero = document.getElementById("hero");
        hero_rect = hero.getBoundingClientRect();
        hero_rect_x = (hero_rect.right + hero_rect.left) / 2;
        hero_rect_y = (hero_rect.top + hero_rect.bottom) / 2;
        if(hero_rect_x <= ball_rect.right && hero_rect_x >= ball_rect.left && hero_rect_y >= ball_rect.top && hero_rect_y <= ball_rect.bottom){
            stop_flag =  true;
            var input = document.getElementById("input");
            const tempEvt = new CustomEvent('change');
            input.dispatchEvent(tempEvt);
        }
    }

    function function4() {
        endTime = new Date();
        timeDiff = endTime.getTime() - startTime.getTime();
        timeSec = Math.floor(timeDiff / 1000);
        timeMiliSec = Math.floor((timeDiff%1000)/10);
        timeSecStr = timeSec;
        timeMiliSecStr = timeMiliSec < 10 ? '0' + timeMiliSec : timeMiliSec;

        document.getElementById('time').innerHTML = timeSecStr + ':' + timeMiliSecStr;
    }

    function log(str) {
        console.log(str)
    }
</script>

<style scoped>
    #componentFive{
        display: inline-block;
        width: 100%;
        height: auto;
    }

    #canvas{
        display: inline-block;
        width: 900px;
        height: 600px;
        margin: 0 50px;
        box-sizing: border-ball;
        border: 1px solid;
    }
</style>
<template>
    <div class="componentTwo">
        <h1>OTH</h1>
        <div id="btnBox">
            <span id="turnSpan">턴 : {{order}}</span>
            <button class="playBtn" v-on:click="playOth">실행</button>
        </div>
        <div ref="cellBox" id="cellBox">
            <div class="boxes" :key="value" :id="value" v-for="value in cellArr" @click="cellClick"></div>  
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    el: "#componentTwo",
    data: function () {
        log("시작")
        return {
            baseStage : 8,
            boxCnt : 64,
            cellArr : [] as any,
            stoneNumStr : "" as String,
            order: '' as String,
            ourTeam: '' as String,
            enemyTeam: '' as String
        }
    },

    mounted() {
        this.createBox();
    },
    computed: {

    },
    methods: {

        playOth : function(){
            this.createBox();
        },

        createBox: function(){
            this.cellArr = [];
            for (var j = 0; j < this.boxCnt; j++) {
                this.cellArr.push(j.toString());
            }
            var that = this;
            setTimeout(function () {
                that.boxexDesign();
            }, 10);
        },

        boxexDesign:function(){
            var that = this;
            var cellBox = document.querySelector('#cellBox');
            
            if (cellBox != null) {

                var BoxesWidth = ((cellBox.clientWidth - 400 - this.baseStage * 2) / this.baseStage) + 'px';
                var boxes = document.querySelectorAll('.boxes');

                Array.prototype.forEach.call(boxes, (element, index) => {
                    element.innerHTML = '';
                    element.classList.remove('firstRow');
                    element.classList.remove('lastRow');
                    element.classList.remove('firstCol');
                    element.classList.remove('lastCol');

                    if (index < this.baseStage) {
                        element.classList.add('firstRow');
                    }

                    if (index >= this.baseStage * (this.baseStage - 1)) {
                        element.classList.add('lastRow');
                    }

                    if (index % this.baseStage == 0) {
                        element.classList.add('firstCol');
                    }

                    if ((index + 1) % this.baseStage == 0) {
                        element.classList.add('lastCol');
                    }
                    element.classList.add('empty');
                    element.style.width = BoxesWidth;
                    element.style.height = BoxesWidth;
                });
            }

            var token = Math.floor(Math.random() * 2);
            if (token == 1) {
                that.changeStone('27', 'white');
                that.changeStone('28', 'black');
                that.changeStone('35', 'black');
                that.changeStone('36', 'white');
            } else if (token == 0) {
                that.changeStone('27', 'black');
                that.changeStone('28', 'white');
                that.changeStone('35', 'white');
                that.changeStone('36', 'black');
            }  
            token = Math.floor(Math.random() * 2);
            if (token == 1) {
                this.order = 'white';
            } else if (token == 0) {
                this.order = 'black';
            }

            this.createPossibleCell();
            
        },

        changeStone:function(stoneNum: String, className: String){
            var squareElement = document.getElementById(stoneNum.toString());
            if(squareElement!=null){
                squareElement.innerHTML = '';
                squareElement.style.opacity = '100%';
                squareElement.classList.remove('empty');
                squareElement.classList.add(className.toString());
            }

            var newDivElement = document.createElement('div');
            newDivElement.classList.add('stone');
            newDivElement.style.width = '100%';
            newDivElement.style.height = '100%';
            newDivElement.style.border = '1px solid black';
            newDivElement.style.borderRadius = '50%';
            newDivElement.style.boxSizing = 'border-box';
            if(className == 'white' && squareElement != null){
                newDivElement.style.background = className.toString();
                squareElement.classList.remove('black');
                squareElement.classList.add('white');
            }else if(className == 'black' && squareElement != null){
                newDivElement.style.background = className.toString();
                squareElement.classList.remove('white');
                squareElement.classList.add('black');
            }
            squareElement?.appendChild(newDivElement);
        },

        createPossibleCell: function(){
            
            var allBoxes = document.querySelectorAll('.boxes');
            Array.prototype.forEach.call(allBoxes, (element) => {
                element.removeAttribute('directionNum');
                var innerClass = element.childNodes[0];
                if(innerClass != undefined && innerClass.classList.contains('possible')){
                    element.innerHTML = '';
                }
            });


            var directionNum: number;
            var nowNum
            this.ourTeam = this.order;
            if(this.order =='white'){
                this.enemyTeam = 'black';
            }else{
                this.enemyTeam = 'white';
            }
            log('ourTeam : ' + this.ourTeam + ', enemyTeam : ' + this.enemyTeam);
            var ourTeamEl = document.querySelectorAll('.'+ this.ourTeam);
            
            Array.prototype.forEach.call(ourTeamEl, (element) => {
                nowNum = parseInt(element.getAttribute('id'));
                log(nowNum);
                for(var i=0; i<8; i++){
                    if(element.classList.contains('firstRow') && (i == 0 || i == 1 || i == 7)){
                        continue;
                    }
                    
                    if (element.classList.contains('lastRow') && (i == 3 || i == 4 || i == 5)) {
                        continue;
                    }
                    
                    if (element.classList.contains('firstCol') && (i == 5 || i == 6 || i == 7)) {
                        continue;
                    }
                    
                    if (element.classList.contains('lastCol') && (i == 1 || i == 2 || i == 3)) {
                        continue;
                    }

                    switch (i) {
                        case 0:// ↑
                            directionNum = -8;
                            break;
                        case 1://↗
                            directionNum = -7;
                            break;
                        case 2://→
                            directionNum = 1;
                            break;
                        case 3://↘
                            directionNum = 9;
                            break;
                        case 4://↓
                            directionNum = 8;
                            break;
                        case 5://↙
                            directionNum = 7;
                            break;
                        case 6://←
                            directionNum = -1;
                            break;
                        case 7://↖
                            directionNum = -9;
                            break;
                    }
                    var firstFlag = true;
                    var runFlag = true;
                    var nextId = nowNum + directionNum;
                    while(runFlag){
                        var nowElement = document.getElementById(nextId.toString());
                        if(nowElement != null){

                            if(nowElement.classList.contains(this.ourTeam.toString()) && !firstFlag) {// 다른색이 존재했고 같은색일때일때
                                runFlag = false;
                                break;
                            }

                            if(nowElement.classList.contains('empty') && !firstFlag) {// 다른색이 존재했고 빈칸일때
                                log("===================================당첨===========================")
                                log(nextId.toString());
                                var possibleElement = document.getElementById(nextId.toString());
                                if (possibleElement != null) {
                                    var newDivElement = document.createElement('div');
                                    newDivElement.style.width = '100%';
                                    newDivElement.style.height = '100%';
                                    newDivElement.style.border = '1px solid black';
                                    newDivElement.style.borderRadius = '50%';
                                    newDivElement.style.boxSizing = 'border-box';
                                    newDivElement.style.opacity = '0.3';
                                    newDivElement.style.background = this.ourTeam.toString();
                                    newDivElement.classList.add('possible');
                                    if(possibleElement.innerHTML == ""){
                                        possibleElement?.appendChild(newDivElement);
                                    }
                                    if(possibleElement.getAttribute('directionNum') == null){ //이미 속성이 없으면
                                        possibleElement.setAttribute('directionNum', directionNum.toString());
                                    }else{                                                     //이미 속성이 있으면
                                        var tempStr = possibleElement.getAttribute('directionNum') + ',' + directionNum.toString();
                                        possibleElement.setAttribute('directionNum', tempStr);
                                    }
                                }
                                runFlag = false;
                                break;
                            }
                            
                            if(nowElement.classList.contains('empty') && firstFlag) {//처음 빈칸일때
                                log(nowElement)
                                log(nextId + ': 빈칸');
                                runFlag = false;
                                break;
                            }

                            if(nowElement.classList.contains(this.ourTeam.toString()) && firstFlag) {//처음 같은색일때
                                log(nowElement)
                                log(nextId + ' : 같은색');
                                runFlag = false;
                                break;
                            }
                            firstFlag = false;
                        }else{
                           runFlag = false;
                            break; 
                        }
                        nextId += directionNum;
                    }
                }
            });
        },


        cellClick:function(e: any){
            log('==================================================================');
            log(e.target);
            var clickCell = e.target.parentNode;
            
            if (!e.target.classList.contains('possible')) {
                return;
            }

            this.changeStone(clickCell.getAttribute('id'), this.ourTeam);

            var direction_arr: string[] = (clickCell.getAttribute('directionNum')).split(",");
            direction_arr.forEach(element => {
                var arrivalFlag = false
                var multiples = -1;
                while(!arrivalFlag){
                    
                    var nextId = (parseInt(clickCell.getAttribute('id')) + parseInt(element) * (multiples)).toString();
                    log(element);
                    log(nextId);
                    log('ourTeam : ' + this.ourTeam)
                    log('enemyTeam : ' + this.enemyTeam)
                    log(document.getElementById(nextId));
                    if (document.getElementById(nextId)?.classList.contains(this.ourTeam.toString())){
                        arrivalFlag = true;
                    }

                    this.changeStone(nextId, this.ourTeam);
                    multiples--
                }
                
            });

            if (this.order == 'white') {
                this.order = 'black';
            } else {
                this.order = 'white';
            }

            this.createPossibleCell();
        }
    }
})

function log(str: any) {
    console.log(str)
}
</script>

<style scoped>
#btnBox {
    margin: auto 20px;
    text-align: center;
}

#turnSpan{
    font-size: 1.5em;
    font-weight: bolder;
}

.stageSelect {
    height: 32px;
    width: 150px;
    float: left;
    padding: 4px;
    font-size: 16px;
    margin-right: 20px;
}

.playBtn {
    margin-left: 30px;
    height: 32px;
    width: 150px;
    padding: 4px;
    font-size: 16px;
}

#cellBox{
    width: 100%;
    display: inline-block;
    padding: 20px 200px;
    box-sizing: border-box;
    font-size: 0px;
}

.boxes {
    background: green;
    outline: 1px solid black;
    cursor:pointer;
    display: inline-block;
}

.impossible{
    cursor:no-drop;
}
</style>

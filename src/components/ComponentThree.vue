<template>
    <h1>달력({{ thisYear + "-" + thisMonth}})</h1>
    <div id="componentThree">
        <div id="app">
            <button class="rotateBtn" v-on:click="preMonth">〈</button>
            <div class="tableBox">
                <table class="calendar">
                    <thead>
                        <tr>
                            <th v-bind:key="day" v-for="day in days">{{ day }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(week, index) in weeks" :key="index">
                            <td v-bind:id=dayStr(date) v-for="(date, index) in week" :key="index" class="tdDay" :class="[{ today: isToday(date)}, {weekend: isWeekend(index)}]" @click="clickDate($event)">{{ date }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button class="rotateBtn" v-on:click="nextMonth">〉</button>
        </div>
    </div>
</template>

<script>               
    export default {
        el: "#componentThree",
        data: function () {
            log("시작")

            return {
                currentDate: new Date(),
                standardDate : new Date(),
                thisMonth : "",
                thisYear : "",
                updateFlag: false
            }
        },
        computed: {
            
            year() {
                return this.standardDate.getFullYear();
            },
            month() {
                return this.standardDate.getMonth();
            },
            daysInMonth() {
                const firstDay = new Date(this.year, this.month, 1);
                const lastDay = new Date(this.year, this.month + 1, 0);
                return (lastDay.getDate() - firstDay.getDate() + 1);
            },
            firstDayOfWeek() {
                return new Date(this.year, this.month, 1).getDay();
            },
            weeks() {
                const weeks = [];
                let currentWeek = [];
                for (let i = 0; i < this.firstDayOfWeek; i++) {
                    currentWeek.push('');
                }
                for (let day = 1; day <= this.daysInMonth; day++) {
                    currentWeek.push(day);
                    if (currentWeek.length === 7) {
                        weeks.push(currentWeek);
                        currentWeek = [];
                    }
                }
                if (currentWeek.length > 0) {
                    weeks.push(currentWeek);
                }
                return weeks;
            },
            days() {
                return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            }
        },

        mounted() {
            var tempDate = new Date();
            this.thisMonth = tempDate.getMonth() + 1;
            this.thisYear = tempDate.getFullYear();
            
        },

        updated(){
            if(!this.updateFlag){ 
                this.updateFlag = true; 
                this.holidaySearch();
            }
             
        },
        methods: {
            isToday(day) {
                const today = new Date();
                return day === today.getDate() && this.month === today.getMonth() && this.year === today.getFullYear();
            },
            isWeekend(index) {
                return index === 0 || index === 6;
            },
            clickDate(event){
                this.clearClicked();
                event.target.classList.add('clicked');
            },
            clearClicked(){
                var clickedElement = document.getElementsByClassName("clicked");
                Array.prototype.forEach.call(clickedElement, (element) => {
                    element.classList.remove("clicked");
                });
            },
            async clearHoliday() {
                var holidayElement = document.getElementsByClassName("holiday");
                log(holidayElement);
                Array.prototype.forEach.call(holidayElement, (element) => {
                    element.classList.remove("holiday");
                    log(element.classList)
                    log(element)
                })
            },
            async preMonth(){
                this.clearClicked();
                this.clearHoliday();
                //this.afterMonthChange();
                this.updateFlag == false;
                this.standardDate = new Date(this.year, this.month - 1, 1);
                this.holidaySearch();
            },
            async nextMonth() {
                
                this.clearClicked();
                this.clearHoliday();
                //this.afterMonthChange();
                this.updateFlag == false;
                this.standardDate = new Date(this.year, this.month + 1, 1);
                this.holidaySearch();
            },
            /*
            afterMonthChange(){
                this.clearClicked();
                this.clearHoliday();
                this.thisMonth = this.standardDate.getMonth() + 1;
                this.thisYear = this.standardDate.getFullYear();
                this.holidaySearch();
               
            },
            */
            holidaySearch(){
                this.thisMonth = this.standardDate.getMonth() + 1;
                this.thisYear = this.standardDate.getFullYear();
                var tempUrl = "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
                var serviceKey = "?serviceKey=oknCHpBSBO6mEgLCTJoVqNg0HAUnjK%2F1a42yZJDfdGyo%2BUnt79vSKa0q07mfAA7NA6lC1IRelb1zTMVbKqO6tQ%3D%3D";
                var solYear = "&solYear=" + this.year;
                var solMonth = ""
                if(this.thisMonth<10){
                    solMonth = "&solMonth=0" + this.thisMonth;
                }else{
                    solMonth = "&solMonth=" + this.thisMonth;
                }
                //log(solMonth);
                var url = tempUrl + serviceKey + solYear + solMonth;

                this.axios
                    .get(url)
                    .then((res) => {
                        //log(res.data.response); 
                        var resultCode = res.data.response.header.resultCode;
                        //log(resultCode);
                        if(resultCode === '00'){
                            var totalCount = res.data.response.body.totalCount;
                            //log(totalCount);
                        
                            if(totalCount > 0){
                                var item = res.data.response.body.items.item;
                                if (totalCount == 1) {
                                    item = [res.data.response.body.items.item];
                                }   
                                item.forEach(element => {
                                    //log(element);
                                    //log(element.locdate%100)
                                    var tempId = this.dayStr(element.locdate % 100);
                                    var tdElement = document.getElementById(tempId);
                                    var tempElement = document.createElement('p');
                                    tempElement.innerText = element.dateName;
                                    tempElement.style.margin = '0';
                                    tempElement.style.textAlign = 'right';
                                    tempElement.style.fontSize = '12px';
                                    tdElement.classList.add('holiday');
                                    tdElement.appendChild(tempElement);    
                                });
                            } 
                        }
                    })
            },
            dayStr(date){
                if (date < 10) {
                    if(date ==0 ||date == ""){
                        date = "";
                    }else{
                        date = "day_0" + date;
                    }
                } else {
                    date = "day_" + date;
                }
                
                return date;
            },
        },
    }

    function log(str) {
        console.log(str)
    }

</script>

<style scoped>

    .calendar {
        font-family: Arial, sans-serif;
        border-collapse: collapse;
        margin: 0 auto;
    }

    .calendar th, .calendar td {
        border: 1px solid #ccc;
        text-align: center;
        width: 100px;
        padding: 5px;
    }

     .calendar th {
        background-color: #f2f2f2;
        height: 28px;
    }

    .calendar td {
        text-align: left;
        vertical-align: top;
        height: 54px !important;
    }

    .dayInfo{
        text-align: right;
        margin: 0 ;
    }

    .calendar td:hover{
        cursor: pointer;
        background-color: #6c6f74;
        color: #fff;
        font-weight: 600 !important;
    }

    .weekend, .holiday {
        color:red;
    }
    
    .today {
      box-shadow: -2px -2px 1px rgb(63, 194, 247) inset, 2px 2px 1px rgb(63, 194, 247) inset;
    }

    .clicked{
        background-color: #37383a;
        color: #fff;
        cursor: none;
        font-weight: 600 !important;
    }

    .tableBox{
        display: inline-block;
    }

    .rotateBtn{
        vertical-align: top;
        margin: 186px 10px;
        font-size: 2em;
        font-weight: 900;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        background: #eee;
    }

    .rotateBtn:hover{
        background: #000;
        color : #FFF;
        cursor: pointer;
    }
    
</style>
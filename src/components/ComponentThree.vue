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
                            <td v-bind:id=date v-for="(date, index) in week" :key="index" :class="{ today: isToday(date), weekend: isWeekend(index) }" @click="clickDate($event)">{{ date }}</td>
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
            log("aaa");
            var tempDate = new Date();
            this.thisMonth = tempDate.getMonth() + 1;
            this.thisYear = tempDate.getFullYear();
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
                })
            },
            preMonth(){
                this.standardDate = new Date(this.year, this.month - 1, 1);
                this.afterMonthChange();
            },
            nextMonth() {
                this.standardDate = new Date(this.year, this.month + 1, 1);
                this.afterMonthChange();
            },
            afterMonthChange(){
                this.thisMonth = this.standardDate.getMonth() + 1;
                this.thisYear = this.standardDate.getFullYear();
                this.clearClicked();
            }
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
      width: 70px;
      height: 24px !important;
      padding: 20px;
    }
     
    .weekend{
        color:red;
    }
    .calendar th {
      background-color: #f2f2f2;
    }

    .calendar td:hover{
        cursor: pointer;
        background-color: #6c6f74;
        color: #fff;
        font-weight: 900 !important;
    }

    .today {
      box-shadow: -2px -2px 1px rgb(63, 194, 247) inset, 2px 2px 1px rgb(63, 194, 247) inset;
    }

    .clicked{
        background-color: #37383a;
        color: #fff;
        cursor: none;
        font-weight: 900 !important;
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
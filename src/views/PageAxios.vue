<template>
    <div id="app3">
        <div class="btnBox">
            <strong> 페이지 번호 </strong>
            <input type="number" min="1" max="100" v-model="page">
            <strong> 페이지당 로우 </strong>
            <input type="number" min="1" max="100" v-model="per_page">
            <strong> 검색 아이디 </strong>
            <input type="number" min="0" max="100" v-model="id">
            <button v-on:click="axiosGet"> axios통신(get) 클릭! </button>
        </div>
        <br>
        <div class="btnBox">
            <button v-on:click="axiosPost"> axios통신(post) 클릭! </button>
        </div>
        <br>
        <textarea v-model="netSource" cols="100" rows="22"></textarea>
        <div class="table_box">
            <table v-show="table_flag" class="table">
                <thead>
                    <tr>
                        <th >No.</th>
                        <th v-for="val in th_arr" v-bind:key="val">{{ val }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(val, index) in tmp_arr" v-bind:key="val" draggable="true" 
                        v-on:dragover="dragOver" v-on:dragstart="dragStart" v-on:dragend="dragEnd" v-on:dragenter="dragEnter">
                        <td>{{ index + 1  }}</td>
                        <td v-for="(index) in th_arr" v-bind:key="index">{{ (val[index])}}</td>
                    </tr>
                </tbody>
            </table>
            <h1 v-show="h1_flag">
                {{ post_obj.id }}가 {{ post_obj.createdAt }}에 생성되었습니다.
            </h1>
        </div>
    </div>
</template>

<script>
    export default {
        el: "#app3",
        data: function () {
            return {
                styleObject: {
                }, 
                netSource: "",
                tmp_arr: [],
                th_arr: [],
                td_arr : [],
                post_obj : new Object(),
                table_flag : false,
                h1_flag : false,
                s_flag : false,
                page : "",
                per_page : "",
                id : "",
                drag_flag : false
            }
        },
        
        methods: {
            axiosGet: function () {
                var getURL = "https://reqres.in/api/users?page=" + this.page + "&per_page=" + this.per_page + "&id=" + this.id;
                if(this.id == '0'){
                    this.id = 1;
                }
                this.axios
                    //.get("https://reqres.in/api/users?page=" + 1 + "&per_page=&id=")
                    .get(getURL)
                    .then(res => {
                        this.tmp_arr = [];
                        this.th_arr = [];
                        this.td_arr = [];
                        if(Array.isArray(res.data.data)){ //배열
                            this.netSource = JSON.stringify(res.data.data);
                            this.tmp_arr = res.data.data;
                            this.th_arr = Object.keys(res.data.data[0]);
                            this.td_arr = Object.values(res.data.data[0]);
                        }else{ //배열 아닐때
                            this.netSource = JSON.stringify(res.data.data);
                            this.tmp_arr[0] = res.data.data;
                            this.th_arr = Object.keys(this.tmp_arr[0]);
                            this.td_arr = Object.values(this.tmp_arr[0]);
                        }
                        this.table_flag = true;
                        this.h1_flag = false;
                    })
                    .catch(err => {
                        log("실패");
                        log(err);
                    });
            },

            axiosPost: function () {
                this.axios
                    .post("https://reqres.in/api/users", {
                        page: 1
                    })
                    .then(res => {
                        this.netSource = JSON.stringify(res);
                        this.post_obj = res.data;
                        this.table_flag = false;
                        this.h1_flag = true;
                    })
                    .catch(err => {
                        log("실패");
                        log(err);
                    });
            },

            dragStart: function (event) {
                if(event.target.localName ==='tr'){
                    event.target.classList.add('dragging');
                    this.drag_flag = true;
                }
            },
            
            dragEnd: function (event) {
                if (event.target.localName === 'tr') {
                    event.target.classList.remove('dragging');
                }
                this.drag_flag = false;
            },

            dragEnter: function (event) {

                var targetClass = event.target.parentElement.classList;

                if (targetClass.contains('dragging')){
                    return;
                }
                    
                var currentTr = document.getElementsByClassName('dragging');
                var eventY = event.pageY - window.scrollY;
                var targetMidY = (event.target.getBoundingClientRect().top + event.target.getBoundingClientRect().bottom)/2;
                if(this.drag_flag){
                    if(targetMidY >= eventY){
                        event.target.parentElement.after(currentTr.item(0));
                        log(event);
                        log(event.target.getBoundingClientRect().top);
                        log(eventY)
                    } else{
                        event.target.parentElement.before(currentTr.item(0));
                        log(event);
                        log(event.target.getBoundingClientRect().bottom);
                        log(eventY)
                    }
                }
            }
        }
    }

    function log(str) {
        console.log(str)
    }

</script>

<style scoped>

    .btnBox{
        width: 600px;
        margin: 10px 30px;
        text-align: right;
        display: inline-block;
    }

    .btnBox input{
        width: 30px;
        height: 20px;
        border: 1px solid #777;
    }

    .btnBox button{
        width: 150px;
        height: 24px;
        line-height: 1px;
        margin-left: 30px;
    }

    .btnBox strong{
        font-size: 1em;
    }

    .dragging{
        opacity: 0.6;
        font-weight: bold; 
    }

    .table_box{
        text-align: center;
    }

    /*
    table{
        margin: auto;
        border-collapse: collapse;
    }

    th, td{
        border: 1px solid #000;
    }
    */

    /* Style for the entire table */
    .table {
        display: inline-block;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
    }

    /* Style for table headers */
    th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
    }

    /* Style for table rows */
    tr {
    background-color: #fff;
    }

    /* Style for alternating table rows */
    tr:nth-child(even) {
    background-color: #f2f2f2;
    }

    /* Style for table cells */
    td {
    padding: 10px;
    border: 1px solid #ddd;
    }

    /* Hover effect on table rows */
    tr:hover {
    background-color: #ccc;
    }

</style>
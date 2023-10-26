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
                    <tr v-for="(val, index) in tmp_arr" v-bind:key="val">
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
    import axios from 'axios';
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
                id : ""
            }
        },
        methods: {
            axiosGet: function () {
                var getURL = "https://reqres.in/api/users?page=" + this.page + "&per_page=" + this.per_page + "&id=" + this.id;
                console.log(getURL);
                if(this.id == '0'){
                    this.id = 1;
                }

                log("악시오스(Get)");
                axios
                    //.get("https://reqres.in/api/users?page=" + 1 + "&per_page=&id=")
                    .get(getURL)
                    .then(res => {
                        log("성공");
                        log(Array.isArray(res.data.data));
                        log("배열 사이즈 : " + res.data.data.length);
                        
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
                log("악시오스(Post)");
                axios
                    .post("https://reqres.in/api/users", {
                        page: 1
                    })
                    .then(res => {
                        log("성공");
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

    table{
        margin: auto;
        border-collapse: collapse;
    }

    th, td{
        border: 1px solid #000;
    }

</style>
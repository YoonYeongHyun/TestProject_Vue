<template>
    <div class="componentTwo">
        <h1>척 노리스 I.O</h1>
        <div class="btnBox">
            <select class="categorySelect" v-model="selectedOption">
                <option :key="value" :value="value" v-for="value in options">{{ value }}</option>
            </select>
            <button class="apiBtn" v-on:click="apiSearch">API 실행</button>
        </div>
        <div class="infoBox">
            <div class="post-container">
                <div class="category">{{ category }}</div>
                <div class="created-at">{{ created_at }}</div>
                <div class="id">{{ id }}</div>
                <div class="updated-at">{{ updated_at }}</div>
                <div class="value">{{ value }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
export default defineComponent({
    el: "#componentTwo",
    data: function () {
        log("시작")
        return {
            styleObject: {
            },
            options:[],
            category : "",
            created_at : "",
            icon_url : "",
            id : "",
            updated_at : "",
            url : "",
            value : "",
            selectedOption : "",
            axios: axios
        }
    },

    mounted() {
        this.apiCategory();
    },

    methods: {
        apiCategory: function () {
            log("카테고리갱신");
            var url = "/apiOne?textUrl=https://api.chucknorris.io/jokes/categories&method=GET";
            this.axios
            .get(url)
            .then((res:any) => {
                log("통신성공");
                log(res.data);
                this.options = res.data;
                this.selectedOption = res.data[0];
            })
        },
        apiSearch: function () {
            log("카테고리갱신");
            var url = "/apiOne?textUrl=https://api.chucknorris.io/jokes/random?category=" + this.selectedOption + "&method=GET";
            this.axios
                .get(url)
                .then((res: any) => {
                    log("통신성공");
                    log(res.data);
                    
                    this.category = res.data.categories[0];
                    this.created_at = res.data.created_at;
                    this.icon_url = res.data.icon_url;
                    this.id = res.data.id;
                    this.updated_at = res.data.updated_at;
                    this.url = res.data.url;
                    this.value = res.data.value;
                })
        }
    }
})
function log(str: String) {
    console.log(str)
}
</script>

<style scoped>
    .btnBox{
        margin: auto 20px;
    }

    .categorySelect{
        height: 32px;
        width: 150px;
        float: left;
        padding: 4px;
        font-size: 16px;
        margin-right: 20px;
    }

    .apiBtn{
        height: 32px;
        width: 150px;
        padding: 4px;
        font-size: 16px;
    }

    .post-container {
        height: 150px;    
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin: 20px;
        font-family: Arial, sans-serif;
    }

    .category {
        font-size: 16px;
        color: #007BFF;
        margin-bottom: 10px;
    }

    .created-at {
        font-size: 14px;
        color: #888;
    }

    .icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 10px;
    }

    .id {
        font-size: 14px;
        color: #888;
        margin-top: 10px;
    }

    .updated-at {
        font-size: 14px;
        color: #888;
    }

    .value {
        font-size: 18px;
        margin-top: 20px;
    }
</style>

<template>
    <div id="componentFour">
        <h1>사진 등록</h1>
        <div v-if="!files.length" class="contnetNoneBox">
            <div class="btnBox">
                <input type="file" id="fileInput1" ref="files" @change="imgUpload" multiple />
            </div>
        </div>
        <div v-else class="contnetExistBox">
            <div class="imgContent">
                <div v-for="(file, index) in files" :key="index" class="imgWrapper">
                    <div class="imgDeleteBtn" @click="imgDelete" :name="file.number">삭제</div>
                    <img class="realImg" :src="file.preview" /></div>
            </div>
            <div class="btnBox">
                <input type="file" id="fileInput2" ref="files" @change="moreUpload" multiple />
            </div>
        </div>
    </div>
</template>

<script>
export default {

    el: "#componentFour",

    data: function () {
        log("시작")
        return {
            files: [], 
            filesPreview: [],
            uploadImageIndex: 0
        }
    },

    methods: {

        imgUpload() {
            log('업로드');
            log(this.$refs);
            log(this.$refs.files);
            log(this.$refs.files.files);
            let num = -1;
            for (let i = 0; i < this.$refs.files.files.length; i++) {
                this.files = [
                    ...this.files,
                    {
                        file: this.$refs.files.files[i],
                        preview: URL.createObjectURL(this.$refs.files.files[i]),
                        number: i
                    }
                ];
                num = i;
            }
            this.uploadImageIndex = num + 1; 
            log(this.files);
        },

        moreUpload() {
            log('업로드');
            log(this.$refs);
            log(this.$refs.files);
            log(this.$refs.files.files);

            let num = -1;
            let fileArr = document.getElementById("fileInput2").files;
            for (let i = 0; i < this.$refs.files.files.length; i++) {
                log(this.uploadImageIndex);
                this.files = [
                    ...this.files,
                    {
                        file: this.$refs.files.files[i],
                        preview: URL.createObjectURL(this.$refs.files.files[i]),
                        number: i + this.uploadImageIndex
                    }
                ];
                num = i;
                 window.dataTransfer.items.add(fileArr[i])
            }
            this.uploadImageIndex = this.uploadImageIndex + num + 1;

            log(this.files);
        },

        imgDelete(e) {
            const name = e.target.getAttribute('name');
            this.files = this.files.filter(data => data.number !== Number(name));
        },
    }
}
function log(str) {
    console.log(str)
}
</script>

<style scoped>
    .imgContent{
        display: inline-block;
        width: 960px;
        height: 350px;
        padding: 30px 20px;
        overflow: auto;
        white-space: nowrap;
    }

    .imgWrapper{
        display: inline-block;
        position: relative;
        border: 2px solid black;
        margin: auto 20px;
        height: 304px;
        width: 304px;
        padding: 25px;
        box-sizing: border-box;
        background-color: #aaa;
    }

    .imgDeleteBtn{
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 100;
        border: 1px solid black;
        border-radius: 10px;
        background: #eee;
        font-size: 1.2em;
        font-weight: bolder;
        padding: 5px 10px;
    }

    .realImg{
        height: 250px !important;
        width: 250px !important;
    }
</style>
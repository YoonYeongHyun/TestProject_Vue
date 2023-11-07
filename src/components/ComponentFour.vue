<template>
    <div id="componentFour">
        <h1>사진 등록</h1>
        <div v-if="!files.length" class="contnetNoneBox">
            <div class="btnBox">
                <input type="file" id="file" ref="files" @change="imgUpload" multiple />
            </div>
        </div>
        <div v-else class="contnetExistBox">
            <div class="imgContent">
                <div v-for="(file, index) in files" :key="index" class="imgWrapper">
                    <div class="imgDeleteBtn" @click="imgDelete" :name="file.number">삭제</div>
                    <img class="realImg" :src="file.preview" />
                </div>
            </div>
            <div class="btnBox">
                <input type="file" id="file" ref="files" @change="moreUpload" multiple />
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
            log(this.$refs.files.files);

            let num = -1;
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
        height: 500px;
        padding: 30px 20px;
        overflow: auto;
        white-space: nowrap;
    }

    .imgWrapper{
        display: inline-block;
        position: relative;
        border: 2px solid black;
        margin: auto 20px;

    }

    .imgDeleteBtn{
        position: absolute;
        z-index: 100;
    }

    .realImg{
        position: static;
        max-height: 300px;
    }

</style>
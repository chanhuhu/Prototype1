<template>
    <div class="container--fluid">
        <navbar/>
        <v-container fluid>
            <v-row>
                <v-col>
                    <div class="showImage">
                        <vue-slider v-model="value" />
                        <img src="data:image/png;base64,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" alt="">
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <p>detail</p>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn color="success" @click="clicked">อนุมัติ</v-btn>
                </v-col>
                <v-col>
                    <div style="float:right">
                    <v-btn color="error" @click="clicked">ไม่อนุมัติ</v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import navbar from "../components/Navbar";

    export default {
        name: "Admin",
        components: {
            navbar,
        },
        methods:{
            clicked(){
                axios.get('http://localhost:8000/api/somename').then(
                    r => {
                        console.log('success');
                    }
                )
            }
        }
        
    }
    

</script>

<style lang="scss" scoped>
    .showImage {
        height: 60vh;
        background-color: rgb(241, 239, 239);
        border-radius: 15px;
    }

    .showImage img {
        margin: 0;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-height: 13vh;
    }
</style>

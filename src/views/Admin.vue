<template>
    <div class="container--fluid">
        <navbar/>
        <v-container fluid>
            <v-row>
                <v-col>
                    <div class="showImage">
                        <img src="@/assets/logo.png" alt="">
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
                    <v-btn color="success">อนุมัติ</v-btn>
                </v-col>
                <v-col>
                    <v-btn color="error">ไม่อนุมัติ</v-btn>
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
        }
    }
</script>

<style lang="scss" scoped>
    .showImage {
        height: 60vh;
        background-color: black;
        border-radius: 15px;
    }

    .showImage img {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-height: 60vh;
    }
</style>

<template>
    <div class="container--fluid">
        <navbar/>
        <v-card>
            <v-card-title>{{receiptDetails.activity.name}}</v-card-title>
            <v-carousel>
                <v-carousel-item
                        v-for="(image,index) in images"
                        :key="index"
                        :src="image.file_name"
                ></v-carousel-item>
            </v-carousel>
            <v-card-text>
                {{receiptDetails.date}},
                {{receiptDetails.id}},
                {{receiptDetails.cost}},
                {{receiptDetails.remark}}
            </v-card-text>
            <pre>{{receiptDetails}}</pre>
            <v-container>
                <v-row>
                    <v-text-field label="สำหรับกรอกเพื่อตรวจสอบยอดเงินในรูปว่าตรงกับยอดที่พนักงานกรอกไหม"></v-text-field>
                    <v-btn>อนุมัติ</v-btn>
                    <v-btn>ไม่อนุมัติ</v-btn>
                    <v-btn>ตรวจสอบยอดเงิน</v-btn>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import navbar from "../components/Navbar";
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "Admin",
        components: {
            navbar,
        },
        methods: {
            ...mapActions('receipt', ['getImages'])
        },
        computed: {
            receiptDetails: function () {
                if (this.$store.state.receipt.receipts[this.$route.params.receipt_id-1]) {
                    return this.$store.state.receipt.receipts[this.$route.params.receipt_id-1]
                }
                return {}
            },
            ...mapGetters('receipt', ['images'])
        },
        mounted() {
            this.getImages({receipt_id: this.$route.params.receipt_id});
            console.log(this.$route.params.receipt_id);
            console.log(this.$store.state.receipt.receipts[this.$route.params.receipt_id-1]);
        },
    }


</script>

<style lang="scss" scoped>
    .showImage {
        height: 60vh;
        background-color: rgb(241, 239, 239);
        border-radius: 15px;

        img {
            margin: 0;
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-height: 13vh;
        }
    }

    .button {
        width: 5rem;
    }
</style>

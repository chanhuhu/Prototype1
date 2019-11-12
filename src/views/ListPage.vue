<template>
    <div class="container--fluid">
        <navbar/>
        <v-content>
            <div
                    v-if="isInvoice"
                    class="invoice-list"
            >
                <v-row>
                    <v-col>
                        <v-card
                                style="height: auto"
                                tile
                        >
                            <v-card-title class="headline">ใบเสร็จที่รอการตรวจสอบ</v-card-title>
                            <v-list two-line>
                                <v-list-item-group
                                        active-class="pink--text"
                                >
                                    <template v-for="receipt in receipts">
                                        <v-list-item :key="receipt.id" :to="'/receipt/'+receipt.id">
                                            <template v-slot:default="{ active, toggle }">
                                                <v-list-item-content>
                                                    <v-row>
                                                        <v-col>
                                                            <v-list-item-title
                                                                    v-text="receipt.activity.activity"
                                                            ></v-list-item-title>
                                                        </v-col>
                                                        <v-col>
                                                            <v-list-item-subtitle
                                                                    v-text="receipt.date"
                                                            ></v-list-item-subtitle>
                                                        </v-col>
                                                    </v-row>
                                                    <v-list-item-subtitle
                                                            v-text="receipt.created_at"></v-list-item-subtitle>
                                                </v-list-item-content>
                                            </template>
                                        </v-list-item>
                                    </template>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <div
                    v-else
                    class="last-cost pa-0"
            >
                <v-row>
                    <v-col>
                        <BarChart/>
                    </v-col>
                </v-row>
            </div>
        </v-content>
        <v-footer
                absolute
                padless
        >
            <v-toolbar color="#EE6262">
                <div class="d-flex row justify-space-around">
                    <v-btn
                            class="white--text"
                            @click="isInvoice = false"
                            text
                    >
                        Status
                    </v-btn>
                    <v-btn
                            class="white--text"
                            @click="isInvoice = true"
                            text
                    >
                        Invoice
                    </v-btn>
                    <v-btn
                            class="white--text"
                            to="/register"
                            text
                    >
                        Sign Up
                    </v-btn>
                </div>
            </v-toolbar>
        </v-footer>
    </div>
</template>

<script>
    import BarChart from "../components/BarChart";
    import navbar from '../components/Navbar';
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "ListPage",
        data: () => ({
            isInvoice: true,
        }),
        components: {
            navbar, BarChart
        },
        methods: {
            ...mapActions('receipt', ['getReceipts', 'getLastCost']),
        },
        computed: {
            ...mapGetters('receipt', ['receipts'])
        },
        mounted() {
        },
        created() {
            this.getReceipts();
        }
    }
</script>

<style scoped>

</style>

<template>
    <div class="container--fluid">
        <navbar/>
        <v-content>
            <div v-if="!isDashBoard">
                <v-list-item
                        v-for="receipt in receipts"
                        style="cursor: pointer;"
                        v-ripple
                        :to="'/receipt/'+receipt.id"

                >
                    <v-list-item-content>
                        <div class="text-center white pa-12">
                            {{receipt.cost}} {{receipt.date}} {{receipt.activity.name}}
                        </div>
                    </v-list-item-content>
                </v-list-item>
            </div>
            <v-card v-else>
                <BarChart/>
            </v-card>
        </v-content>
        <v-footer
                app
                padless
                fixed
        >
            <v-toolbar color="#EE6262">
                <div class="d-flex row justify-space-around">
                    <v-btn @click="isDashBoard = true" text color="white">
                        DashBoard
                    </v-btn>
                    <v-btn @click="isDashBoard = false" text color="white">
                        List Invoice
                    </v-btn>
                    <v-btn to="/register" text color="white">
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
            isDashBoard: false
        }),
        components: {
            navbar, BarChart
        },
        methods: {
            ...mapActions('receipt', ['getReceipts']),
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
    .btn {
        font-family: Arial, sans-serif;
    }
</style>

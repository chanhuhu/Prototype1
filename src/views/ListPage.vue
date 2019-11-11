<template>
    <div class="container--fluid">
        <navbar/>
        <v-card class="pt-2 mt-2">
            <v-card-title>รายชื่อกิจกรรม</v-card-title>
            <v-list-item
                    v-for="receipt in receipts"
                    style="cursor: pointer;"
                    v-ripple
                    :to="'/receipt/'+receipt.id"

            >
                <v-list-item-content>
                    <div class="text-center">
                        {{receipt.cost}} {{receipt.date}} {{receipt.activity.name}}
                    </div>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
    import navbar from '../components/Navbar';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: "ListPage",
        components: {
            navbar
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

<style>

</style>

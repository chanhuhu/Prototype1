<template>
    <div class="container--fluid">
        <navbar/>
        <v-card class="pt-2 mt-2">
            <v-card-title>รายชื่อกิจกรรม</v-card-title>
            <v-list-item
                    v-for="receipt in receipts"
                    :key="receipt.id"
                    style="cursor: pointer;"
                    v-ripple
                    :to="'/receipt/'+ receipt.id"
            >
                <v-list-item-content>
                    <v-list-item-title>ชื่อกิจกรรม {{receipt.activity.name}} เดือนที่ขอเบิก {{receipt.date}}</v-list-item-title>
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
            this.getReceipts();
        }
    }
</script>

<style>

</style>

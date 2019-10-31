<template>
    <v-col cols="12" sm="6" md="4">
    </v-col>
</template>

<script>
    export default {
        name: "InputDate",
        data: () => ({
            date: new Date().toISOString().substr(0, 7),
            menu: false,
        })
    }
</script>

<style scoped>
</style>

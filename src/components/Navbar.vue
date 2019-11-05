<template>
    <nav>
        <v-toolbar>
            <v-toolbar-title class="grey--text">
                <div style="cursor:pointer" @click="router('/')">PROTOTYPE</div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </v-toolbar>
        <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                right
        >
            <div class="flex-column">
                <v-spacer></v-spacer>
                <div class="pa-2 column col justify-end">
                    <v-btn
                            block
                            @click="logout"
                    >Logout
                    </v-btn>
                </div>
            </div>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "Navbar",
        data: () => ({
            drawer: false,
            items: [
                {title: 'Home', icon: 'dashboard'},
                {title: 'About', icon: 'question_answer'},
            ],
        }),
        methods: {
            async router(link) {
                await this.$router.push(link);
            },
            /******* Methods default run ******/
            load: async function () {
            },
            ...mapActions('user', ['logoutUser']),
            logout: function () {
                this.logoutUser();
            }
        },
    }
</script>

<style scoped>
    nav {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
</style>

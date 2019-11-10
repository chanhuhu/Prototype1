<template>
    <nav>
        <v-app-bar>
            <v-btn
                    v-if="$route.fullPath.includes('/receipt/')"
                    @click="$router.go(-1)"
                    icon>
                <v-icon
                        dense
                >mdi-arrow-left
                </v-icon>
            </v-btn>
            <v-toolbar-title class="grey--text">
                <div>PROTOTYPE</div>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                    text
                    v-ripple
                    @click="logout"
                    dense
            >
                <v-icon class="mx-2">mdi-account-circle</v-icon>
                <div class="logout">
                    Logout<br/>{{this.user.first + ' ' + this.user.last}}
                </div>
            </v-btn>
        </v-app-bar>
    </nav>
</template>

<script>
    import {mapActions} from 'vuex';
    import {mapState} from 'vuex';

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
        computed: {
            ...mapState('user', ['user']),
        },
    }
</script>

<style scoped>
    nav {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .logout {
        font-family: Arial, sans-serif;
    }
</style>

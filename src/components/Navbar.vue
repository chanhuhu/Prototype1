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
            <v-list>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>event</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Client</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>gavel</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Admin</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block>Logout</v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        data: () => ({
            drawer: false,
            items: [
                { title: 'Home', icon: 'dashboard' },
                { title: 'About', icon: 'question_answer' },
            ],
        }),
        methods: {
            async router(link){
                await this.$router.push(link);
            },
            /******* Methods default run ******/
            load: async function() {}
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

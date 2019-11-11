<template>
    <div class="container--fluid ">
        <v-content>
            <v-card
                    xs12
                    md12
                    tile
                    color="#EE6262"
            >
                <v-img src="@/assets/logo.png"></v-img>
            </v-card>
        </v-content>
        <v-row justify="end">
            <v-col>
                <login/>
            </v-col>
        </v-row>
    </div>
</template>
<script>
    import login from "../components/auth/login";

    export default {
        components: {
            login,
        },
    };
</script>

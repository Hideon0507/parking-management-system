<template>
    <v-container fluid>
        <v-row >
            <Header />
        </v-row>
        
        <v-row >
            <v-col cols="9">
                <router-view />
            </v-col>
            <v-col cols="3">
                <SideBar class="sidebar" />
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup lang="ts">
import Header from './header-view/Header.vue'
import SideBar from './side-bar-view/SideBar.vue'
</script>

<style scoped>
.parkgrid{
    --background-color: aquamarine;
}

.sidebar{
    background-color: blueviolet;
}
</style>
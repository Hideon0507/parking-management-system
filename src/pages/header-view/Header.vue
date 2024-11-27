<template>
    
    <v-row align="center" class="header-container pa-5">
        <v-col cols="3" class="pl-16">
            <v-text-field 
                v-model="searchQuery" 
                label="请输入车牌号查询" 
                variant="outlined" 
                prepend-inner-icon="mdi-magnify"
                class="mt-6"  
                density="compact"
                clearable>
            </v-text-field>  
        </v-col>

        <v-col >
            <h1 class="header-title">停车场管理系统</h1>
        </v-col>

        <v-col cols="3" class="action">
            <div>空闲车位/全部车位</div>
            <v-btn color="success">入库</v-btn>
            <v-btn>出库</v-btn>
        </v-col>
    </v-row>

</template>


<script setup lang="ts">
import { ref } from 'vue'
const searchQuery = ref('')

</script>


<style scoped>
.header-container {
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
}

.header-title {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
    text-align: center;
}
  
.action{
    display: flex;
    align-items: center;
}
</style>

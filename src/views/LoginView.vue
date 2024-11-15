<script setup lang="ts">
import {reactive} from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useThemeStore } from '@/stores/ThemeStore';

import RegisterComponent  from '@/components/auth/RegisterComponent.vue'
import LoginComponent  from '@/components/auth/LoginComponent.vue'


const buttons = [
    {text: 'Ingreso', selected: true},
    {text: 'Registro', selected: false},
]

const btns = reactive(buttons)
const themeStore = useThemeStore()
const theme = reactive(themeStore)

function select() {
    if(btns[0].selected) {
        btns[0].selected = !btns[0].selected
    }
    else {
        btns[0].selected = !btns[0].selected
    }

    if(btns[1].selected) {
        btns[1].selected = !btns[1].selected
    }
    else {
        btns[1].selected = !btns[1].selected
    }
}

</script>

<template>
   <div class="w-full px-2 py-16 sm:px-0">
    <TabGroup>
        <!-- Tabs -->
        <TabList
            :class="theme.isDark ? 'bg-white/[0.12]' : 'bg-blue-900/20'"
            class="flex justify-around py-1 rounded ">
                <!-- iterable tabs -->
                <Tab
                    @click="select()"
                    v-for="tab in buttons"
                    :key="tab.text" 
                    :class="[tab.selected ? 'w-full bg-gray-200 rounded transition ease-linear' : 'rounded text-blue-100 hover:bg-white/[0.12] hover:text-white', tab.selected&&theme.isDark ? 'bg-gray-700 text-blue-100' : 'text-blue-500']" 
                    class="w-full focus:outline-none mx-1">
                        <button class="px-10 py-5 mx-1 font-medium">{{ tab.text }}</button>
                </Tab>
        </TabList>

        <!-- Panels -->
        <TabPanels :class="theme.isDark ? 'border bg-gray-700 border-gray-700 text-blue-100' : 'text-blue-500'" class="w-full p-4 bg-gray-200 flex mt-2 rounded shadow md:mt-2 xl:p-0">
            <TabPanel class="w-full">
                <LoginComponent/>
            </TabPanel>
            <TabPanel class="w-full">
                <RegisterComponent/>
            </TabPanel>
        </TabPanels>
    </TabGroup>
   </div>
</template>


<style scoped>

</style>

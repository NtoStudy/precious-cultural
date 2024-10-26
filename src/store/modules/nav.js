import { defineStore } from 'pinia'
import {ref} from "vue";

export const useNavStore  = defineStore('nav', () =>{
    const tocHtml = ref('')
    const setTocHtml = (html) => {
        tocHtml.value = html
    }
    return{
        tocHtml,
        setTocHtml
    }
},{
    persist: true,
})

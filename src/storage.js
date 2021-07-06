 function parse(val) {
     try {
         val = JSON.parse(val)
     } catch {}
     return val
 }

 function stringify(val) {
     try {
         val = JSON.stringify(val)
     } catch {
         val = ''
     }
     return val
 }

 export const useLocalStorage = (KEY) => {
     if (!KEY) {
         KEY = '__TODO_VUE'
     }

     function setItem(val) {
         val = stringify(val)
         window.localStorage.setItem(KEY, val)
     }

     function getItem() {
         let val = window.localStorage.getItem(KEY)
         if (val) {
             val = parse(val)
         }
         return val
     }
     return {
         save: setItem,
         get: getItem
     }
 }
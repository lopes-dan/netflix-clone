
import { useEffect} from "react";


const useOutsideSearch = (ref: any, isWide: boolean, search: string, alterIsWide: (isWide: boolean) => void ) => {
   useEffect(() => {

     function handleClickOutside(event: MouseEvent) {
       if (search.length > 0) {

         alterIsWide(true)
       }
       if (ref.current && !ref.current.contains(event.target) && search.length > 0) {

         alterIsWide(true)
       }
       if (ref.current && !ref.current.contains(event.target) && search.length === 0 && isWide) {
         alterIsWide(false)

       }

     }

     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, [ref, search, isWide]);
 }

export default useOutsideSearch;
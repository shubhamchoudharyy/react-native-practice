import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const useReduxStateHook=(navigation,path='login')=>{

    const {loading,message,error}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(error){
            alert(error)
            dispatch({type:'clearError'})
        }
        if(message){
            alert(message)
            dispatch({type:'clearMessage'})
            // navigation.reset({
            //     index:0,
            //     routes:{{name:path}}
            // })
            navigation.navigate(path)
        }
    },[error,dispatch,message])
    return loading;
}
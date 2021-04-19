import { useEffect, useState } from 'react'

function useCustomTransition() {
    const [transitionClases, settransitionClasses] = useState('fade-enter');


    useEffect(()=>{
        setTimeout(()=>{
            settransitionClasses('fade-enter-active');
        }, 200)
    }, [])
    
    return [transitionClases]
}

export default useCustomTransition

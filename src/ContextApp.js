import {useState, createContext, useContext} from 'react'
const ContextApp = createContext()

export function DataContext (){
    return useContext(ContextApp)
} 

export function ContextProvider ({children}) {
    const [sortArr, setSortArr] = useState([])
    const [sortFlag, setSortFlag] = useState('date')
    const [groupsState, setGroupsState] = useState({
        groups: {
            count: 0,
            items: []
        }
    });
    const setGroups = (count, items) =>
        setGroupsState((prevState) => ({
            ...prevState,
            groups: {
            ...groupsState.groups,
            count,
            items: items
            }
        }));
    
    function qsort (arr, field) {
        if (arr.length < 2) {
            return arr;
        } else {
    
            const pivotPosition = Math.floor(Math.random() * arr.length);
            const pivot = arr[pivotPosition];
            
            let less = [];
            let greater = [];
    
            const fields = field === 'date' ? 
                fieldDate(arr, field, pivot, pivotPosition) : 
                fieldOther(arr, field, pivot, pivotPosition)
    
            return [...qsort(less), pivot, ...qsort(greater)];
        }
        function fieldDate (arr, field, pivot, pivotPosition, greater, less) {
            for (let i = 0; i < arr.length; i++) {
                const isPivot = i === pivotPosition;

                if(arr[i][field] <= pivot[field] && !isPivot) {
                    // arr[i]
                    console.log(cloneDeep(arr[i]));
                    debugger
                    less.push(cloneDeep(arr[i]))
                } else if (arr[i][field] > pivot[field]) {
                    console.log(cloneDeep(arr[i]));
                    debugger
                    greater.push(cloneDeep(arr[i]));
                }
            }
        }
    
        function fieldOther (arr, field, pivot, pivotPosition, greater, less) {
            for (let i = 0; i < arr.length; i++) {
                const isPivot = i === pivotPosition;
    
                if(arr[i][field]['count'] <= pivot[field]['count'] && !isPivot) {
                    // arr[i]
                    less.push(cloneDeep(arr[i]))
                } else if (arr[i][field]['count'] > pivot[field]['count']) {
                    greater.push(cloneDeep(arr[i]));
                }
            }
        } 
        function cloneDeep (obj) {
            const pull = new Map
            const clone = cloneDeepMaster(obj)
        
            pull.clear()
            return clone
        
            function cloneDeepMaster (obj) {
                if (typeof obj !== 'object' || obj === null) {
                    return obj
                }
        
                if (obj instanceof Array) {
                    const clone = []
                    pull.set(obj, clone)
        
                    for (let i = 0; i < obj.length; i++) {
                        if (pull.has(obj[i])) {
                            clone.push(pull.get(obj[i]))
                        }
        
                        else {
                            clone.push(cloneDeepMaster(obj[i]))
                        }
                    }
        
                    return clone
                }
        
                else {
                    const clone = {}
                    pull.set(obj, clone)
        
                    for (const key in obj) {
                        if (pull.has(obj[key])) {
                            clone[key] = pull.get(obj[key])
                        }
        
                        else {
                            clone[key] = cloneDeepMaster(obj[key])
                        }
                    }
        
                    return clone
                }
            }
        }
    };
    /*
    input   -> [{}] 
    output  -> [{}]

        item. field -> date
        item. field -> likes.count
        item. field -> reposts.count
        item. field -> comments.count
    */
    return (
        <ContextApp.Provider value={
            {sortFlag, setSortFlag, qsort, sortArr, setSortArr}
        }>
            {children}
        </ContextApp.Provider>
    )
}


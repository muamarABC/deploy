// import { useEffect, useState } from 'react'
// import { db } from '../../firebase.config'
// import { collection, getDocs } from 'firebase/firestore'

// const useGetData = (collectionName) => {
//     const [data, setData] = useState([])
//     const [Loading, setLoading] = useState(true)
//     const collectionRef = collection(db, collectionName)

//     useEffect(() => {
//         const getData = async() => {
//             const data = await getDocs(collectionRef);
//             setData(data.docs.map(doc => ({...doc.data(), id: doc.id })));
//             setLoading(false);
//         }
//         getData();
//     }, [collectionRef]);

//     return { data, Loading };
// }

// export default useGetData

import { useEffect, useState } from 'react'
import { db } from '../../firebase.config'
import { collection, onSnapshot } from 'firebase/firestore'

const useGetData = (collectionName) => {
    const [data, setData] = useState([])
    const [Loading, setLoading] = useState(true)
    const collectionRef = collection(db, collectionName)

    useEffect(() => {
        const getData = async() => {

            //firebase firestore realtime
            await onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id })));
                setLoading(false);
            })
        };
        getData();
    }, []);

    return { data, Loading };
}

export default useGetData
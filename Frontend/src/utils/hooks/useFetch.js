import axios from "../axiosInstance"
import { useEffect ,useState} from "react";


export const useFetch =(url)=>{
    const [data,setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{
    const fetch= async()=>{
        try{
            const res = await axios.get(url);
            setData(res.data);
        }catch(error){
            setError(error?.message ||"failed to fetch data");
        }finally{
            setLoading(false);
        }
    }
    fetch();
    },[])

    return {data, error, loading}
} 



import React,{useEffect,useState}  from "react";
import config from './config';



export default function utility() {
    return (
        <div>
            
        </div>
    )
}

export const EmployeeApi = () =>{
    const fetchURL = config.drupal_url+'/Employees';
    const [items, setItems] = useState();
  
    useEffect(() => {
      const getItems = () => fetch(fetchURL).then(res => res.json());
       getItems().then(data => setItems(data));
    }, [fetchURL,setItems]);

    return items;
}

export const UserApi = () =>{
    const fetchURL = config.drupal_url+'/users';
    const [items, setItems] = useState();
  
    useEffect(() => {
      const getItems = () => fetch(fetchURL).then(res => res.json());
       getItems().then(data => setItems(data));
    }, [fetchURL,setItems]);

    return items;
}
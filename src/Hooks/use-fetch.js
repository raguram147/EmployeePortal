import { useState, useCallback } from "react";
import config from "../config";
/*
        Component       : It is the functional component(Custom Hooks) that gets the parameter url, that returns the states of data, loading and error.
        Author          : Created by Lister Raguram Sundaravadivel
             
        Last Modified   :
        (Format "Name Date `MM-DD-YYY`")
      */
const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchDetails = useCallback(async (url, resultData) => {
    setLoading(true);
    try {
      const result = await fetch(url, {
        method: "GET",
        mode:"cors",
        headers: {
          'Access-Control-Allow-Origin': config.drupal_url+"/",
          'Access-Control-Allow-Methods':'GET',
          'Access-Control-Allow-Headers':'application/json',
      },
      contentType: 'application/json'
      });
      if (!result.ok) {
        throw new Error("Request failed!");
      }

      let data = await result.json();
      if (data != null) {
        setLoading(false);
        setError(null);
      } else if (data.length === 0) {
        throw new Error("Centers Not Available!");
      }
      resultData(data);
    } catch (error) {
      setError(error.message + "");
      setLoading(false);
    }
  }, []);
  return [loading, fetchDetails, error];
};

export default useFetch;
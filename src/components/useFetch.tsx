import { useState, useEffect } from "react";


const useFetch = (url: string, search?: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data.results);
    };
    fetchData();
  }, [url, search]);

  return [data];
};


export default useFetch;

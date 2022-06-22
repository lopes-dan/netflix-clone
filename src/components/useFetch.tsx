import { useState, useEffect } from "react";


const useFetch = (url: string, search?: string) => {
  const [data, setData] = useState<any>(null);

 
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }, [url]);

 
 return [data]
};

export default useFetch;
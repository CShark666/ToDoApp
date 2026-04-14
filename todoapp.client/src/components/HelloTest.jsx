import { useEffect, useState } from "react";

export function HelloTest() {
  const [data, setData] = useState(null);

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      return result;
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData("/api/test");
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>React + .NET</h1>
      <pre>{data?.message}</pre>
    </div>
  );
}

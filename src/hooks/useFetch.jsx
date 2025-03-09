import { useCallback, useEffect, useState } from "react";
import { axiosInstance } from "../utils";
import { toast } from "react-toastify";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const req = await axiosInstance(url);

      if (req.status !== 200) {
        throw new Error(req.statusText);
      }

      setData(req.data);
      // console.log(req.data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading };
}

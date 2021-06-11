import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  const location = useLocation();

  const [searchFilters, setSearchFilters] = useState({
    saleType: "",
    type: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    rooms: "",
    bathrooms: "",
    category: "",
    filtered: false,
    url: "",
  });

  useEffect(() => {
    let value = false;
    // if (!setLoaded) return;

    if (searchFilters.url === new URLSearchParams(location.search).toString()) {
      // setLoaded(true);
      return;
    }
    const route = new URLSearchParams(location.search).toString();

    Object.keys(searchFilters).forEach((filter_key) => {
      const filter_value = new URLSearchParams(location.search).get(filter_key);
      value = value || !!filter_value;

      setSearchFilters((filter) => ({
        ...filter,
        [filter_key]: filter_value,
        filtered: value,
        url: route,
      }));
    });

    // setLoaded(true);

    return () => {};
  }, [searchFilters, location.search]);

  return { searchFilters };
};

export default useQuery;

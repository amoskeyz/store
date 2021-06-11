import { useState } from "react";
import { useDebounce } from "use-debounce";

const search = ({ children }) => {
  const [search, setSearch] = useState("");
  const [searchQuery] = useDebounce(search, 800);

  const handleChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  const submit = (e) => {
    e.preventDefault();
  };

  return children({
    value: search,
    handleChange,
    submit,
  });
};

export default search;

import { useGetStockInfo } from "@/api/stock/quries";
import React, { useMemo, useState } from "react";
import DropdownList from "../common/DropdownList";
import { Input } from "../ui/input";
import { motion } from "framer-motion";

function SearchStocks() {
  const [search, setSearch] = useState();
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useGetStockInfo(search);

  const debouncedSearch = useMemo(() => {
    let timeoutId;
    return (value) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        if (value === "") {
          setOpen(false);
        } else {
          setOpen(true);
        }
        setSearch(value);
      }, 200);
    };
  }, []);

  const onChangeSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="relative w-full">
      <Input
        onChange={onChangeSearch}
        placeholder="search stocks"
        className="text-black capitalize dark:text-white"
        onBlur={() =>
          setTimeout(() => {
            setOpen(false);
          }, [400])
        }
        onFocus={() => setOpen(true)}
      />
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <DropdownList options={data?.data?.data} isLoading={isLoading} />
        </motion.div>
      )}
    </div>
  );
}

export default SearchStocks;

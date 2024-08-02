import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetch(`http://127.0.0.1:8085/api/data?page=${page}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
          setData(data.data);
          setTotal(data.total);
        });
  }, [page]);

  return (
      <div className="App">
        <Table data={data} />
        <Pagination
            total={total}
            pageSize={pageSize}
            currentPage={page}
            onPageChange={(page) => setPage(page)}
        />
      </div>
  );
};

export default App;

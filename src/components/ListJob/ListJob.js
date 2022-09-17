import { Pagination } from "antd";
import CardJob from "components/CardJob/CardJob";
import "components/ListJob/ListJob.less";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export default function ListJob({ jobs }) {
  const [statePagination, setStatePagination] = useState({
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });

  useEffect(() => {
    setStatePagination({
      totalPage: jobs.length / 6,
      minIndex: 0,
      maxIndex: 6,
    });
  }, [jobs]);

  const handleChange = (page) => {
    setStatePagination({
      current: page,
      minIndex: (page - 1) * 6,
      maxIndex: page * 6,
    });
  };

  return (
    <div className="list-job-container">
      <div className="list-job-title">
        {jobs.length} việc làm IT tại Việt Nam
      </div>
      {jobs.map(
        (job, i) =>
          i >= statePagination.minIndex &&
          i < statePagination.maxIndex && <CardJob job={job}></CardJob>,
      )}
      <Pagination
        pageSize={6}
        current={statePagination.current}
        total={jobs.length}
        onChange={handleChange}
        style={{
          textAlign: "center",
          marginTop: "3rem",
          marginBottom: "3rem",
        }}
      />
    </div>
  );
}

ListJob.propTypes = {
  listJob: PropTypes.array,
};

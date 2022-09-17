import { Col, Row } from "antd";
import DealJob from "components/DealJob/DealJob";
import ListJob from "components/ListJob/ListJob";
import "containers/JobPageSearchByCity/JobPageSearchByCity.less";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSelectedJob } from "Store/modules/Job";

export default function JobPageSearchByCity() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const queryString = query.get("city");
  const [listJob, setListJob] = useState([]);

  useEffect(() => {
    getListJobCity(queryString);
  }, [queryString]);

  const getListJobCity = async (city) => {
    let jobs = await fetch(
      `http://localhost:3001/users/getJobByCity?city=${city}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") return data.data;
        else return [];
      });
    await setListJob(jobs);
    if (jobs.length > 0) {
      dispatch(setSelectedJob(jobs[0]));
    }
    console.log(jobs);
  };

  return listJob.length !== 0 && listJob !== undefined ? (
    <div className="job-page">
      <Row style={{ height: "100%" }}>
        <Col span={12} className="list-job-side">
          <ListJob jobs={listJob} />
        </Col>
        <Col span={12} style={{ height: "100%" }}>
          <DealJob />
        </Col>
      </Row>
    </div>
  ) : (
    <div className="job-page">
      <Row style={{ height: "100%" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <span
            style={{
              fontSize: 40,
            }}
          >
            Không có công việc phù hợp
          </span>
        </Col>
      </Row>
    </div>
  );
}

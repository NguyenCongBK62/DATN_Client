import { Col, Row } from "antd";
import DealJob from "components/DealJob/DealJob";
import ListJob from "components/ListJob/ListJob";
import "containers/JobPageSearchByTechSkill/JobPageSearchByTechSkill.less";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSelectedJob } from "Store/modules/Job";

export default function JobPageSearchByTechSkill() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const queryString = query.get("techskill");
  const [listJob, setListJob] = useState([]);
  const getListJob = async (techskill) => {
    let jobs = await fetch(
      `http://localhost:3001/users/getJobByTechSkill?techskill=${techskill}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data.data;
      });
    await setListJob(jobs);
    if (jobs.length > 0) {
      setTimeout(() => {
        dispatch(setSelectedJob(jobs[0]));
      }, 2);
    }
  };

  useEffect(() => {
    getListJob(queryString);
  }, [queryString]);

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

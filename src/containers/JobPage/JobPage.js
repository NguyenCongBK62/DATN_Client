import { Col, Row } from "antd";
import DealJob from "components/DealJob/DealJob";
import ListJob from "components/ListJob/ListJob";
import "containers/JobPage/JobPage.less";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setSelectedJob } from "Store/modules/Job";

export default function JobPage() {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const queryString = query.get("searchText");
  const { companyid } = useParams();
  const [listJob, setListJob] = useState([]);
  const getListJob = async () => {
    if (companyid === undefined) {
      let jobs = await fetch("http://localhost:3001/users/job", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      await setListJob(jobs);
      if (jobs.length > 0) {
        dispatch(setSelectedJob(jobs[0]));
      }
    } else {
      let jobs = await fetch(`http://localhost:3001/users/job/${companyid}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      await setListJob(jobs);
      if (jobs.length > 0) {
        dispatch(setSelectedJob(jobs[0]));
      }
    }
  };

  const getListJobByQuery = async (queryString) => {
    if (queryString !== null) {
      let jobs = await fetch(
        `http://localhost:3001/users/jobsearch?searchText=${queryString}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      await setListJob(jobs);
      if (jobs.length > 0) {
        await dispatch(setSelectedJob(jobs[0]));
      }
    }
  };

  useEffect(() => {
    getListJobByQuery(queryString);
  }, [queryString]);

  useEffect(() => {
    getListJob();
  }, []);

  return listJob.length !== 0 ? (
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

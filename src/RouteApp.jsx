import Landing from "components/Landing/Landing";
import CompanyProfile from "containers/CompanyProfile/CompanyProfile";
import JobApply from "containers/JobApply/JobApply";
import JobPage from "containers/JobPage/JobPage";
import Layout from "containers/Layout/Layout";
import Login from "containers/Login/Login";
import PostReviewCompany from "containers/PostReviewCompany/PostReviewCompany";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompanyReviewList from "containers/CompanyReviewList/CompanyReviewList";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import Register from "containers/Register/Register";
import ResetPassword from "containers/ResetPassword/ResetPassword";
import JobPageSearchByTechSkill from "containers/JobPageSearchByTechSkill/JobPageSearchByTechSkill";
import JobPageSearchByCity from "containers/JobPageSearchByCity/JobPageSearchByCity";
import CompanyList from "containers/CompanyList/CompanyList";

export default function RouteApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="postreviewcompany/:companyid"
              element={<PostReviewCompany />}
            />
            <Route path="jobapply" element={<JobApply />} />
          </Route>

          <Route path="/CompanyList" element={<CompanyList />} index />
          <Route path="" element={<Landing />} index />
          <Route path="jobs" element={<JobPage />} />
          <Route path="jobs/:companyid" element={<JobPage />} />
          <Route path="jobs/:searchText" element={<JobPage />} />
          <Route path="JobByTechSkill" element={<JobPageSearchByTechSkill />} />
          <Route path="JobByCity" element={<JobPageSearchByCity />} />
          <Route
            path="companyprofile/:companyid"
            element={<CompanyProfile />}
          />

          <Route
            path="companyreviewlist/:companyid"
            element={<CompanyReviewList />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

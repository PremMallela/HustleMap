import { Routes, Route } from "react-router-dom";
import ProfileLayout from "../layouts/ProfileLayout";
import Profile from "../pages/profile/Profile";
import LeetCodeData from "../pages/profile/LeetCodeData";
import GitHubData from "../pages/profile/GitHubData";
import GritEvaluation from "../pages/profile/GritEvaluation";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfileLayout />}>
        <Route index          element={<Profile />} />
        <Route path="leetcode" element={<LeetCodeData />} />
        <Route path="github" element={<GitHubData />} />
        <Route path="grit" element={<GritEvaluation />} />
      </Route>
    </Routes>
  );
};

export default ProfileRoutes;

import { Routes, Route } from "react-router-dom";
import ProfileLayout from "../Components/layouts/ProfileLayout";
import Profile from "../Components/pages/profile/Profile";
import LeetCodeData from "../Components/pages/profile/LeetCodeData";
import GitHubData from "../Components/pages/profile/GitHubData";
import GritEvaluation from "../Components/pages/profile/GritEvaluation";

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

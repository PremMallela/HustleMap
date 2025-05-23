import { Routes, Route } from "react-router-dom";
import ProfileLayout from "../components/layouts/ProfileLayout";
import Profile from "../components/pages/profilePages/Profile";
import LeetCodeData from "../components/pages/profilePages/LeetCodeData";
import GitHubData from "../components/pages/profilePages/GitHubData";
import GritEvaluation from "../components/pages/profilePages/GritEvaluation";

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

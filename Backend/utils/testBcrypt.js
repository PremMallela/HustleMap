import bcrypt from "bcryptjs";

const hash = "$2b$10$wqPeWZ2kZQZPk8YyjpICme74y4cvnkhlJ.RuTPVW/4dnWOVB9ICBW"; // Your stored hash
const password = "prem@3819"; // Replace with the password you think matches

bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error("Error comparing hash:", err);
  } else if (result) {
    console.log("✅ Password matches!");
  } else {
    console.log("❌ Incorrect password.");
  }
});

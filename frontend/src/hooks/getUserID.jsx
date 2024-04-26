import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

const getUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = ACCESS_TOKEN; // or wherever you store the token
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserId(decoded.id); // Assuming 'user_id' is the key in which ID is stored
      } catch (error) {
        console.error("Failed to decode JWT:", error);
      }
    }
  }, []);
  console.log(userId)
  return userId;
};

export default getUserId;
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to admin firewall page
    navigate("/admin-firewall");
  }, [navigate]);

  // This component won't render anything as it immediately redirects
  return null;
};

export default Signin;

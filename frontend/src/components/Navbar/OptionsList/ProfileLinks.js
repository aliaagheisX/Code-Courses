import React, { useState } from "react";
import styles from "./styles/index.module.css";

import useToken from "../../../useToken";
import FormModel from "../../Forms";
import { Link } from "react-router-dom";

export default function ProfileLinks() {
  const [logoutModel, setLogoutModel] = useState(false);

  const { userdata: { USERNAME } } = useToken();


  return (
    <>
      <ul className={styles.optionsList}>
        <Link to={`/me`}>{USERNAME}</Link>
        <li onClick={() => setLogoutModel(true)}>Logout</li>
      </ul>

      <FormModel
        show={logoutModel}
        onHide={() => setLogoutModel(false)}
        type="logout"
      />
    </>
  );
}

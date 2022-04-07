import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const API_TYPE_NAME = "MQL"

export function AppName() {
  return (
    <Typography className="app-bar-title" component="h1" variant="h5">
      <Link style={{ textDecoration: 'none', color: 'unset' }} to="/">LearnlyLog</Link>
    </Typography>
  );
}

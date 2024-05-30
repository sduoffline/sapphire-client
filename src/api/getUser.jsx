import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function getLocalUser() {
  let Status = 0;
  if (!localStorage.getItem("token")) {
    Status = 0;
  } else {
    Status = localStorage.getItem("role") ?? 0;
  }
  return Status;
}

import React from "react";
import { Typography } from "@mui/material";

export const Page404: React.FC = () => {
  return (
    <Typography
      variant="h2"
      sx={{
        textAlign: 'center',
        color: '#e6c638',
        marginTop: "40px",
        fontFamily: '"Karla", sans-serif',
        fontSize: '32px',
        fontWeight: '700',
      }}
    >
      Page not found
    </Typography >
  )
}
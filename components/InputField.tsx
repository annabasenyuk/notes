import React from "react";
import { Box, Input } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { MainButton, InputButton } from "../utils/theme";
import { ErrorMessage } from "../components/ErrorMessage";
import { Link } from "react-router-dom";

interface Props {
  values: { title: string; body: string };
  errors: { title?: string; body?: string };
  touched: { title?: boolean; body?: boolean };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  handleResetField: (field: "title" | "body") => void;
  isMobile: boolean;
  formikSubmit: () => void;
  isEdit: boolean;
}

export const InputField: React.FC<Props> = ({
  values,
  errors,
  touched,
  handleChange,
  handleCancel,
  handleResetField,
  isMobile,
  formikSubmit,
  isEdit,
}) => {
  return (
    <>
      <Box position="relative" display="flex" justifyContent="center" alignItems="center">
        <Input
          type="text"
          name="title"
          placeholder="Header"
          value={values.title}
          onChange={handleChange}
          sx={{
            fontSize: isMobile ? "25px" : "52px",
            padding: "0 40px 0 20px",
            fontWeight: "700",
            border: "none",
            width: "100%",
          }}
        />
        <InputButton
          type="reset"
          onClick={() => handleResetField("title")}
          sx={{
            position: "absolute",
            zIndex: 10,
            right: 0,
            visibility: values.title.length > 0 ? "visible" : "hidden",
          }}
        >
          <ClearIcon fontSize="medium" />
        </InputButton>
      </Box>

      {errors.title && touched.title && <ErrorMessage message={errors.title} />}

      <Box position="relative" display="flex" justifyContent="center" alignItems="center">
        <Input
          type="text"
          name="body"
          placeholder="Please enter the text"
          value={values.body}
          onChange={handleChange}
          sx={{
            fontSize: "18px",
            padding: "0 40px 0 20px",
            border: "none",
            width: "100%",
            marginTop: "40px",
          }}
        />
        <InputButton
          type="reset"
          onClick={() => handleResetField("body")}
          sx={{
            position: "absolute",
            zIndex: 10,
            right: 0,
            visibility: values.body.length > 0 ? "visible" : "hidden",
          }}
        >
          <ClearIcon fontSize="medium" />
        </InputButton>
      </Box>

      {errors.body && touched.body && <ErrorMessage message={errors.body} />}

      <Box
        position="fixed"
        bottom="30px"
        right="50px"
        zIndex="20"
        display="flex"
        flexDirection="row"
      >
        <MainButton
          variant="contained"
          type="button"
          onClick={formikSubmit}
          sx={{
            width: isMobile ? "40px" : "50px",
            height: isMobile ? "40px" : "50px",
            marginRight: "5px",
          }}
        >
          <DoneIcon fontSize="medium" />
        </MainButton>

        {isEdit ? (
          <MainButton
            variant="contained"
            onClick={handleCancel}
            sx={{
              width: isMobile ? "40px" : "50px",
              height: isMobile ? "40px" : "50px",
            }}
          >
            <ClearIcon fontSize="medium" />
          </MainButton>
        ) : (
          <Link to={`/notes/`}>
            <MainButton
              variant="contained"
              sx={{
                width: isMobile ? "40px" : "50px",
                height: isMobile ? "40px" : "50px",
              }}
            >
              <ClearIcon fontSize="medium" />
            </MainButton>
          </Link>
        )}
      </Box>
    </>
  );
};
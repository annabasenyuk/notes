import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { addNote, updateNote } from "../../store/notes/notesSlice";
import { addNotes, updateNotes } from "../../api/api";
import Stack from '@mui/material/Stack';
import { MainButton } from "../../utils/theme";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { InputField } from "../../components/InputField";

export const NotePage: React.FC = () => {
  const { postId } = useParams<{ postId: string | undefined }>();
  const selectedNote = useSelector((state: RootState) =>
    state.notes.find((note) => note.id.toString() === postId)
  );
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleEdit = () => {
    if (postId !== undefined) {
      setEditItemId(postId);
    }
  }

  const handleCancel = () => {
    setEditItemId(null);
    formik.resetForm();
  }

  const formik = useFormik({
    initialValues: {
      title: selectedNote ? selectedNote.title : '',
      body: selectedNote ? selectedNote.body : ''
    },
    validate: (values) => {
      const errors: { title?: string; body?: string } = {};
      if (!values.title.trim()) {
        errors.title = "Title mustn't be empty";
      }
      if (!values.body.trim()) {
        errors.body = "Body mustn't be empty";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        if (selectedNote && values && postId) {
          await updateNotes(postId, values);
          dispatch(updateNote({ id: postId, ...values }));
          setEditItemId(null);
        } else {
          await addNotes(values);
          dispatch(addNote({
            id: postId,
            ...values
          }));
          navigate('/notes');
        }
      } catch (error) {
        console.error('Failed to save note', error);
      }
    },
  });

  const handleResetField = (field: "title" | "body") => {
    formik.setFieldValue(field, "");
  };

  return (
    <Stack>
    <form onSubmit={formik.handleSubmit}>
      <Box padding={"20px 40px"} position={"relative"}>
        {selectedNote ? (
          <>
            {editItemId === postId ? (
              <InputField
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                handleChange={formik.handleChange}
                handleCancel={handleCancel}
                handleResetField={handleResetField}
                isMobile={isMobile}
                formikSubmit={formik.handleSubmit}
                isEdit={true}
              />
            ) : (
              <>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: '"Karla", sans-serif',
                    fontSize: isMobile ? "25px" : "52px",
                    fontWeight: "700",
                    marginBottom: "20px",
                    padding: "0 20px",
                  }}
                  onClick={handleEdit}
                >
                  {formik.values.title}
                </Typography>

                <Box
                  width="100%"
                  height="1px"
                  marginBottom="20px"
                  sx={{ backgroundColor: "#c5c5c5" }}
                ></Box>

                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: '"Karla", sans-serif',
                    fontSize: isMobile ? "15px" : "18px",
                    fontWeight: "700",
                    padding: "0 20px",
                  }}
                  onClick={handleEdit}
                >
                  {formik.values.body}
                </Typography>

                <Box
                  position="fixed"
                  bottom="30px"
                  right="50px"
                  zIndex="20"
                  display="flex"
                  flexDirection="row"
                >
                  <Link to={`/notes/`}>
                    <MainButton
                      variant="contained"
                      sx={{
                        width: "200px",
                        height: "50px",
                      }}
                    >
                      Back to posts
                    </MainButton>
                  </Link>
                </Box>
              </>
            )}
          </>
        ) : (
          <InputField
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            handleChange={formik.handleChange}
            handleCancel={handleCancel}
            handleResetField={handleResetField}
            isMobile={isMobile}
            formikSubmit={formik.handleSubmit}
            isEdit={false}
          />
        )}
      </Box>
    </form>
  </Stack>
  )
}
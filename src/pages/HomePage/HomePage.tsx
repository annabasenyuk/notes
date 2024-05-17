import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { nanoid } from '@reduxjs/toolkit'
import { getNotes, deleteNotes } from '../../api/api'
import type { RootState, AppDispatch } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { noteAddedToStore, removeNote } from "../../store/notes/notesSlice";
import { Note } from "../../types/Note";
import { MainButton } from "../../utils/theme";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

export const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const notes = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch<AppDispatch>();
  const newId = nanoid()

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);

    if (!notes.length) {
      getNotes()
        .then((notes) => {
          notes.forEach((note) => {
            dispatch(noteAddedToStore(note));
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch notes:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, notes.length]);

  const handleRemoveTodo = async (id: string | number) => {
    try {
      await deleteNotes(id)
      dispatch(removeNote(id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  }

  return (
    <Stack>
      <Box sx={{ padding: '20px 40px' }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Karla", sans-serif',
            fontSize: isMobile ? '36px' : '72px',
            fontWeight: '700',
            color: '#89939A',
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          Notes
        </Typography>

        <Link to={`/notes/note/${newId}`}>
          <MainButton
            variant="contained"
            sx={{
              width: isMobile ? '60px' : '100px',
              height: '30px',
              marginBottom: '30px'
            }}
          >
            add
          </MainButton>
        </Link>

        {loading ? (
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Karla", sans-serif',
              fontSize: isMobile ? '20px' : '32px',
              fontWeight: '700',
            }}
          >
            Loading...
          </Typography>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            boxShadow={'0px 3px 13px 0px #c5c5c5'}
            margin={isMobile ? '5px' : '30px'}
            sx={{ border: "1px solid #b3b3b3" }}
          >
            {notes.map((note: Note) => (
              <Box
                key={note.id}
                height={45}
                padding="0 20px"
                sx={{ border: "1px solid #b3b3b3" }}
                display="flex"
                alignItems="center"
                justifyContent='space-between'
                overflow="hidden"
                position="relative"
              >
                <Link to={`/notes/note/${note.id}`}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: '"Karla", sans-serif',
                      fontSize: isMobile ? '14px' : '22px',
                      fontWeight: '500',
                      whiteSpace: "nowrap",
                    }}
                  >
                    {note.title}
                  </Typography>
                </Link>

                <MainButton
                  variant="contained"
                  onClick={() => handleRemoveTodo(note.id)}
                  sx={{
                    width: isMobile ? '40px' : '80px',
                    position: "absolute",
                    right: 0,
                    zIndex: 20
                  }}
                >
                  <DeleteIcon
                    fontSize={isMobile ? "small" : "medium"}
                  />
                </MainButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Stack >
  )
}
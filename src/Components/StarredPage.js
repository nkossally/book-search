import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  ToggleButton,
} from "@mui/material";
import { addBook, removeBook } from "../reducers/savedBooksSlice";

const StarredPage = () => {
  const savedBooks = useSelector((state) => state.savedBooks);

  const dispatch = useDispatch();

  const getIsStarred = (data) => {
    const key = data.key;
    const idx = savedBooks.findIndex((elem) => elem.key === key);
    return idx !== -1;
  };

  const handleToggle = (data) => {
    const isStarred = getIsStarred(data);
    if (isStarred) {
      dispatch(removeBook(data));
    } else {
      dispatch(addBook(data));
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {savedBooks.map((elem) => {
              return (
                <TableRow>
                  <TableCell>{elem.title}</TableCell>
                  <TableCell>{elem.author_name}</TableCell>
                  <TableCell>link</TableCell>
                  <TableCell>
                    <ToggleButton
                      value="check"
                      selected={getIsStarred(elem)}
                      onChange={() => {
                        handleToggle(elem);
                        //   setSelected(!selected);
                      }}
                    ></ToggleButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StarredPage;

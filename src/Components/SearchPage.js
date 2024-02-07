import { useState , useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Input,
  Button,
  ToggleButton,
} from "@mui/material";
import { addBook, removeBook } from "../reducers/savedBooksSlice";

const SEARCH_URL = "https://openlibrary.org/search.json?q=";
const PARAMETERS =
  "&limit=10&fields=key,title,first_publish_year,author_name,cover_i&lang=language:en&page=";

const COVERS_URL = "https://covers.openlibrary.org/b/id/";
const ARCHIVE_URL = "https://openlibrary.org";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const savedBooks = useSelector((state) => state.savedBooks);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const resp = await fetch(SEARCH_URL + input + PARAMETERS + page);
      const json = await resp.json();
      console.log(json);
      const resultsArr = json.docs;
      for (let i = 0; i < resultsArr.length; i++) {
        // const data = resultsArr[i]
        // console.log("cover", data["cover_i"], data.key)
        // const coverResp = await fetch(`${COVERS_URL}${data["cover_i"]}-M.jpg`)
        // console.log(coverResp)
        // const archiveResp = await fetch(`${ARCHIVE_URL}${data.key}`)
        // console.log(archiveResp)
      }
      setResults(json.docs);
    } catch {}
  };

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

  const handleNexPage = async() => {
    await handleSearch(page + 1)
    setPage(page + 1)
  }

  useEffect(()=>{

  }, [page])

  return (
    <>
      <Box>
        <Input
          placeholder="enter search terms"
          onChange={handleInputChange}
        ></Input>
        <Button onClick={handleSearch} type="submit">
          Submit
        </Button>
        <Button onClick={handleNexPage}>
            Get Next Page
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableBody>
            {results.map((elem) => {
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

export default SearchPage;

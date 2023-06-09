import ArticlePanel from "./ArticlePanel";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./Articles.css";
import * as api from "../api";
import dayjs from "dayjs";
import { Chip, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import SortBySelector from "./SortBySelector";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#7B3CBB",
      darker: "#dddddd",
    },
    pageGreen: {
      main: "#7cbb3c",
      darker: "#dddddd",
    },
    darker: {
      main: "#5ca373",
    },
    neutral: {
      main: "#b46544",
      contrastText: "#fff",
    },
  },
});

const Articles = ({ articles, setArticles, setIsLoading, isLoading }) => {
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    api.fetchArticles(topic, sortByQuery, orderQuery).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic, sortByQuery, orderQuery]);
  if (isLoading) {
    return <h4>is loading...</h4>;
  } else
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              mt: 1,
              pt: 0,
              ml: 1,
            }}
            className="topics_sortby_bar"
          >
            <Link
              to="/articles/topic/coding"
              style={{ textDecoration: "none" }}
              className="coding_sort_link"
            >
              <Chip
                sx={{
                  m: 0.2,
                }}
                color="primary"
                size="small"
                label="coding"
                clickable
              />
            </Link>
            <Link
              to="/articles/topic/football"
              style={{ textDecoration: "none" }}
              className="football_sort_link"
            >
              <Chip
                sx={{
                  m: 0.2,
                }}
                color="primary"
                size="small"
                label="football"
                clickable
              />
            </Link>
            <Link
              to="/articles/topic/cooking"
              style={{ textDecoration: "none" }}
              className="cooking_sort__link"
            >
              <Chip
                sx={{
                  m: 0.2,
                }}
                color="primary"
                size="small"
                label="cooking"
                clickable
              />
            </Link>
            <SortBySelector
              sortByQuery={sortByQuery}
              orderQuery={orderQuery}
              setSearchParams={setSearchParams}
              searchParams={searchParams}
            />
          </Box>
        </ThemeProvider>
        <div className="all_item_articles">
          {articles.map((article) => (
            <ArticlePanel
              topic={topic}
              key={article.item_id}
              article={article}
              article_id={article.article_id}
              title={article.title}
              author={article.author}
              topics={article.topic}
              created_at={dayjs(article.created_at).format(
                "h:mm A - MMM, DD, YYYY"
              )}
              article_img_url={article.article_img_url}
              votes={article.votes}
              comment_count={article.comment_count}
            />
          ))}
        </div>
      </div>
    );
};

export default Articles;

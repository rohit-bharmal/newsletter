import React, { useState, useEffect } from "react";

const Index = () => {
  const [news, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5; // Number of articles per page

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // https://newsapi.org/docs/get-started#top-headlines
        const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${
          import.meta.env.VITE_APP_API_KEY
        }`;
        const response = await fetch(url);
        const newsData = await response.json();
        setNewsData(newsData.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNewsData();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="container">
      <h1 className="title">ABP माझा : उघडा डोळे बघा नीट </h1>
      {currentArticles.map((option, index) => (
        <div key={index} className="news-card">
          <h2 className="news-title">{option.title}</h2>
          <p className="publish-author">
            Published by: {option.author || "Unknown"} on{" "}
            {new Date(option.publishedAt).toLocaleString()}
          </p>
          <div>
            <p className="content">
              {option.content || "No content available"}
            </p>
          </div>

          {option.urlToImage && (
            <img src={option.urlToImage} alt="News" className="img" />
          )}

          <div className="url">
            <a href={option.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(news.length / articlesPerPage) ? prev + 1 : prev
            )
          }
          disabled={currentPage >= Math.ceil(news.length / articlesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Index;

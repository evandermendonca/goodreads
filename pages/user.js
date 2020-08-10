import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { CalendarIcon, LocationIcon, ChevronRightIcon, ChevronLeftIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: #121212;
        color: #ddd;
        font-family: 'Inter', 'system', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Arial', 'sans-serif';
    }

    a {
        text-decoration: none;
        color: rgb(124, 124, 225);
        font-family: 'Inter', 'system', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Arial', 'sans-serif';
    }

    a:hover {
        text-decoration: underline;
    }

    p {
        line-spacing: 1.5;
    }

    div#shelf-data {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;

        .shelf-header {
            padding: 10px 15px;
            margin: 0 auto;
            max-width: 900px;
            color: #772ce8;
            text-decoration: none;
            font-weight: 300;

            @media (max-width: 700px) {
                min-width: 90%;
            }
        }

        .shelf-header h1 {
            font-weight: 300;
            margin: 0;

            @media (max-width: 700px) {
                font-size: 1.75rem; 
            }
        }

        h2 {
            text-transform: capitalize; 
            font-size: 1.75rem; 
            margin: 0;
            margin-left: 1rem;
            margin-bottom: 1rem;  
            font-weight: 300; 
        }
        
        h2 span {
            font-size: 1rem;
            color: #D3D3D3;
            font-weight: 300;
            display: block;
            margin-left: 5px;
            font-family: 'Inter', 'system', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Arial', 'sans-serif';
            text-transform: lowercase;
        }
        
        div.shelf {
            margin-left: auto;
            margin-right: auto; 
            margin-top: 25px;
            margin-bottom: 45px;
            background: #222629;
            padding: 10px 15px;
            max-width: 900px;
            border-radius: 10px;
        
            @media (max-width: 700px) {
                min-width: 90%;
            }
        }

        .container {
            display: table;
            width: fit-content;
            margin: 0 auto;
            overflow: hidden;
        }

        figure.book {
            display: inline-table;
            margin: 0 25px;
            text-align: center;

            @media (max-width: 700px) {
                display: block; 
                margin: 15px 0;
                text-align: left;
            }
        }

        figure.book img {
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);

            @media (max-width: 700px) {
                height: 70%; 
                width: 70%; 
            }
        }

        figure.book a {
            color: #ddd;
            letter-spacing: none;
            font-family: 'Inter', 'system', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Arial', 'sans-serif';
            text-decoration: none;
        }

        figcaption.title {
            display: table-caption;
            caption-side: bottom;
            font-size: 0.75rem;
            margin-top: 2.5px;
        }

        div.container button {
            border: none;
            background: transparent;
            color: #fff;
            margin-top: 3.5rem;
            padding: 7.5px;
            outline: none;

            @media (max-width: 700px) {
                margin-top: 0px; 
            }
        }

        div.container button.left-button {
            float: left; 

            @media (max-width: 700px) {
                float: none; 
            }
        }

        div.container button.right-button { 
            float: right; 

            @media (max-width: 700px) {
                float: none; 
            }
        }

        div.container button.right-button:hover { 
            background: rgba(255,255,255,.05);
            border-radius: 5px;   
            text-decoration: none;
        }

        div.container button.left-button:hover { 
            background: rgba(255,255,255,.05);
            border-radius: 5px;   
            text-decoration: none;
        }

        div.shelf div#link-container {
           text-align: center;  
           margin-top: 20px; 
           margin-bottom: 15px;
        }

        div.shelf div#link-container a:hover {
            padding: 7.5px;  
            background: rgba(255,255,255,.05);
            border-radius: 5px;   
            text-decoration: none;
        }
    }

    div#footer {
        margin: 0 auto;
        padding: 25px;
        width: 80%;
        text-align: center;
        padding-top: 0px;
    }

    div#footer span {
        display: block;
        margin-bottom: 10px;
    }
`

const StyledContainer = styled.div`
    font-family: 'Inter', 'system', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Arial', 'sans-serif';
    height: 50vh;
    background-color: #000000;
    padding: 3rem 5rem 15rem;
    margin: 0 0 0 0;
    text-align: center;
    color: #fff;

    @media (max-width: 500px) {
        padding: 0;
        margin: 0;
        height: 100%;
    }

    div#profile-card {
        @media (min-width: 501px) {
            width: 30%;
            max-width: 450px;
            margin: 2.5rem auto;
            background-color: #222629;
            padding: 2.5rem 0;
            border-radius: 2.5%;
        }

        @media (max-width: 1450px) {
            width: 100%;
        }

        @media (max-width: 500px) {
            background-color: #000;
            border-radius: none;
            margin-top: 0;
            padding: 1.5rem 0 0 0;
        }

        div#profile-image {
            img {
                border-radius: 76px;
                max-width: 150px;
                object-fit: cover;
                box-sizing: border-box;
                height: 150px;
                width: 150px;
                background-color: #FFFFFF;
                border: 1px solid #D8D8D8;
            }
        }

        div#profile-info {
            padding: 1.5rem 3rem;
            font-size: 2rem;

            @media (max-width: 500px) {
                font-size: 1.5rem;
            }
        }

        div#profile-link {
            padding: 0.75rem;
            font-size: 1.5rem;
            padding-top: 0.25rem;

            @media (max-width: 500px) {
                font-size: 1.25rem;
            }
        }

        div#profile-stats {
            font-size: 1rem;
            text-align: center;

            @media (max-width: 500px) {
                font-size: 0.75rem;
            }

            span#stats {
                margin-right: 1rem;

                svg {
                    margin-right: 5px;
                }
            }
        }

        div#about {
            font-size: 1rem;
            margin-top: 1.5rem;
        }
    }

    div#profile-metadata {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(3, minmax(100px, 150px));
        gap: 0.75rem;

        @media (max-width: 500px) {
            padding: 1rem 0.5rem;
        }

        div.square {
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            flex-direction: column;
            background-color: #222629;
            text-align: center;
            padding: 1rem;
            border-radius: 0.25rem;
        }

        span.numbers {
            font-size: 1.5rem;
            font-weight: 300;
        }

        span.label {
            text-transform: uppercase;
            font-size: 1rem;
            letter-spacing: 1px;
            margin-top: 0.5rem;
            font-weight: 300;
        }
    }
`;

const User = () => {
    // vars
    const query = useRouter().query.id;
    const apiKey = 'OUyNdPsBt3nn0uA61V7g';
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [profileLink, setProfileLink] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const [interests, setInterests] = useState(null);
    const [location, setLocation] = useState(null);
    const [dateJoined, setDateJoined] = useState(null);
    const [reviewsCount, setReviewsCount] = useState(null);
    const [shelvesCount, setShelvesCount] = useState(null);
    const [friendsCount, setFriendsCount] = useState(null);
    const [shelfNames, setShelfNames] = useState(null); 
    const [shelfCounts, setShelfCounts] = useState(null);
    const [shelfLinks, setShelfLinks] = useState(null);
    const [pageNumber, setPageNumber] = useState([1, 1, 1]); 
    const [allShelves, setAllShelves] = useState([]);
    const [error, setError] = useState({ active: false, type: 200 }); // must add condition for errors or invalid id numbers

    // lists
    var shelfNamesTemp = [];
    var shelfCountsTemp = [];
    var shelfLinksTemp = [];
    var allShelvesTemp = [];

    const getNewPage = (i, action) => {    
        // vars for updating state 
        const clone = [...allShelves]; 

        // update page number 
        if (action == 'next') {
            const newNumber = pageNumber[i] + 1;
            var stringNumber = newNumber.toString(); 
            const pageNumberClone = [...pageNumber]; 
            pageNumberClone[i] = newNumber; 
            setPageNumber(pageNumberClone); 
        } else if (action === 'back') {
            const newNumber = pageNumber[i] - 1;
            var stringNumber = newNumber.toString(); 
            const pageNumberClone = [...pageNumber]; 
            pageNumberClone[i] = newNumber; 
            setPageNumber(pageNumberClone); 
        }

        // vars for extacting data from api response
        var bookData = [];
        var shelfItems = [];
        var bookTitle;
        var bookImage; 
        var bookLink;
        fetch(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/${query}.xml?key=${apiKey}&v=2&shelf=${shelfNames[i]}&page=${stringNumber}&per_page=5`)
            .then(response => response.text())
            .then((response) => {
                if (response.status === 404) {
                    return setError({ active: true, type: 404 });
                }
                if (response.status === 403) {
                    return setError({ active: true, type: 403 });
                }
                var convert = require('xml-js');
                var result = convert.xml2json(response, {compact: false, spaces: 4});
                var parsedData = JSON.parse(result);

                console.log(parsedData);

                if (parsedData.elements['0'].elements['2'].elements.length !== 0) {
                    console.log("test"); 
                    var extractedCount = parsedData.elements['0'].elements['2'].attributes['end'] - parsedData.elements['0'].elements['2'].attributes['start'];
                    console.log(extractedCount); 
                    var extractedBooks = parsedData.elements['0'].elements['2'].elements;

                    if (extractedCount == 4) {
                        for (var j = 0; j < 5; j++) {
                            var bookIndex = j.toString();
                            var bookInfo = extractedBooks[bookIndex].elements['1'];
    
                            bookTitle = bookInfo.elements['5'].elements['0']['text'];
                            bookImage = bookInfo.elements['7'].elements['0']['text'];
                            bookLink = bookInfo.elements['10'].elements['0']['text'];
    
                            bookTitle = truncate(bookTitle, 25); 

                            bookData.push(bookTitle);
                            bookData.push(bookImage);
                            bookData.push(bookLink);
    
                            shelfItems = shelfItems.concat([bookData]);
                            bookData = []; //clear list
                        }
                    } else {
                        for (var j = 0; j < extractedCount + 1; j++) {
                            var bookIndex = j.toString();
                            var bookInfo = extractedBooks[bookIndex].elements['1'];
    
                            bookTitle = bookInfo.elements['5'].elements['0']['text'];
                            bookImage = bookInfo.elements['7'].elements['0']['text'];
                            bookLink = bookInfo.elements['10'].elements['0']['text'];
    
                            bookTitle = truncate(bookTitle, 25); 

                            bookData.push(bookTitle);
                            bookData.push(bookImage);
                            bookData.push(bookLink);
    
                            shelfItems = shelfItems.concat([bookData]);
                            bookData = []; //clear list
                        }
                    }
                    clone[i] = shelfItems; 
                    console.log(clone); 

                    setAllShelves(clone); 

                    shelfItems = []; //clear list
                }
            })
            .catch(error => {
                setError({ active: true, type: 400 });
                console.error('Error: ', error);
            });
    }

    const getUserData = () => {
        fetch(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/user/show/${query}.xml?key=${apiKey}`)
            .then(response => response.text())
            .then((response) => {
                if (response.status === 404) {
                    return setError({ active: true, type: 404 });
                }
                if (response.status === 403) {
                    return setError({ active: true, type: 403 });
                }
                var convert = require('xml-js');
                var result = convert.xml2json(response, {compact: false, spaces: 4});
                var parsedData = JSON.parse(result);

                var profileData = parsedData.elements['0'].elements['1'].elements;
                var profileImageBefore = profileData['4'].elements['0']['cdata'];
                var profileImageAfter = profileImageBefore.replace("p3", "p6"); // change to larger image
                setImgUrl(profileImageAfter);

                // console.log("All profile data:");
                // console.log(profileData);
                setName(profileData['1'].elements['0']['text']);
                setProfileLink(profileData['3'].elements['0']['cdata']);
                setLocation(profileData['9'].elements['0']['text']);
                setDateJoined(profileData['11'].elements['0']['text']);
                setUsername(profileData['2'].elements['0']['text']);
                setInterests(profileData['13'].elements['0']['cdata']);
                setReviewsCount(profileData['20'].elements['0']['text']);
                setShelvesCount(profileData['21'].elements['length']);
                setFriendsCount(profileData['18'].elements['0']['text']);
            })
            .catch(error => {
                setError({ active: true, type: 400 });
                console.error('Error:', error);
            });
    };

    const getShelfData = () => {
        var shelfName = ['read', 'to-read', 'currently-reading'];
        for (var i = 0; i < 3; i++) {
            var bookData = [];
            var shelfItems = [];
            var bookTitle;
            var bookImage;
            var bookLink;

            fetch(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/${query}.xml?key=${apiKey}&v=2&shelf=${shelfName[i]}&page=1&per_page=5`)
            .then(response => response.text())
            .then((response) => {
                if (response.status === 404) {
                    return setError({ active: true, type: 404 });
                }
                if (response.status === 403) {
                    return setError({ active: true, type: 403 });
                }
                var convert = require('xml-js');
                var result = convert.xml2json(response, {compact: false, spaces: 4});
                var parsedData = JSON.parse(result);

                if (parsedData.elements['0'].elements['2'].elements.length !== 0) {
                    var extractedName = parsedData.elements['0'].elements['1'].attributes['name'];
                    var extractedCount = parsedData.elements['0'].elements['2'].attributes['total'];
                    var extractedBooks = parsedData.elements['0'].elements['2'].elements;
                    var shelfLink = "https://www.goodreads.com/review/list/" + query + "?shelf=" + extractedName;
                    shelfNamesTemp.push(extractedName);
                    shelfCountsTemp.push(extractedCount);
                    shelfLinksTemp.push(shelfLink); 

                    if (extractedCount >= 5) {
                        for (var j = 0; j < 5; j++) {
                            var bookIndex = j.toString();
                            var bookInfo = extractedBooks[bookIndex].elements['1'];
    
                            bookTitle = bookInfo.elements['5'].elements['0']['text'];
                            bookImage = bookInfo.elements['7'].elements['0']['text'];
                            bookLink = bookInfo.elements['10'].elements['0']['text'];

                            bookTitle = truncate(bookTitle, 25); 
    
                            bookData.push(bookTitle);
                            bookData.push(bookImage);
                            bookData.push(bookLink);
    
                            shelfItems = shelfItems.concat([bookData]);
                            bookData = []; //clear list
                        }
                    } else {
                        for (var j = 0; j < extractedCount; j++) {
                            var bookIndex = j.toString();
                            var bookInfo = extractedBooks[bookIndex].elements['1'];
    
                            bookTitle = bookInfo.elements['5'].elements['0']['text'];
                            bookImage = bookInfo.elements['7'].elements['0']['text'];
                            bookLink = bookInfo.elements['10'].elements['0']['text'];

                            bookTitle = truncate(bookTitle, 25); 
    
                            bookData.push(bookTitle);
                            bookData.push(bookImage);
                            bookData.push(bookLink);
    
                            shelfItems = shelfItems.concat([bookData]);
                            bookData = []; //clear list
                        }
                    }

                    allShelvesTemp = allShelvesTemp.concat([shelfItems]);
                    setAllShelves(allShelvesTemp); 
                    shelfItems = []; //clear list
                }
            })
            .catch(error => {
                setError({ active: true, type: 400 });
                console.error('Error: ', error);
            });
        }
        setShelfNames(shelfNamesTemp);
        setShelfCounts(shelfCountsTemp);
        setShelfLinks(shelfLinksTemp);
    };

    function truncate(str, n){
        return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    };

    useEffect(() => {
        getUserData();
        getShelfData();
    }, []);

    return (
        <main>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{`${name ? `GoodReads | ${name}` : 'GoodReads'}`}</title>
            </head>

            <GlobalStyle/>

            <StyledContainer>
                <div id="profile-card">
                    <div id="profile-image">
                        <img src={imgUrl}></img>
                    </div>
                    <div id="profile-info">
                        <div id="name">
                            {name}
                        </div>
                        <div id="other-info">
                            <div id="profile-link">
                                {username ? <a href={profileLink}>@{username}</a> : <a href={profileLink}>@{username}{query}</a>}
                            </div>
                            <div id="profile-stats">
                                <span id="stats"><LocationIcon size="small" />{location}</span>
                                <span id="stats"><CalendarIcon size="small" />Joined {dateJoined}</span>
                            </div>
                            <div id="about">
                                {interests ? <span id="interests"><b>Interests</b>: {interests}</span> : <span id="interests"><b>Interests</b>: No about section or interests available</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="profile-metadata">
                    <div class="square"><span class="numbers">{shelvesCount}</span><span class="label">Shelves</span></div>
                    <div class="square"><span class="numbers">{friendsCount}</span><span class="label">Friends</span></div>
                    <div class="square"><span class="numbers">{reviewsCount}</span><span class="label">Reviews</span></div>
                </div>
            </StyledContainer>

            <div id="shelf-data">
                <div class="shelf-header"><h1>{name}'s Shelves</h1></div>
                {allShelves.map((shelf, i) =>
                    <div key={i} id={shelfNames[i]} class="shelf"> <div class="books-container">    <h2>
                                                                                                        {shelfNames[i]} 
                                                                                                        {shelfCounts[i] > 5 && pageNumber[i] != (shelfCounts[i] / 5).toFixed() && <span>{(pageNumber[i] - 1) * 5 + 1}-{(pageNumber[i]) * 5} of {shelfCounts[i]} books</span>}
                                                                                                        {shelfCounts[i] > 5 && pageNumber[i] >= (shelfCounts[i] / 5).toFixed() && <span>{(pageNumber[i] - 1) * 5 + 1}-{shelfCounts[i]} of {shelfCounts[i]} books</span>} 
                                                                                                        {shelfCounts[i] <= 5 && <span>{(pageNumber[i] - 1) * 5 + 1}-{shelfCounts[i]} of {shelfCounts[i]} books</span>}
                                                                                                    </h2> 
                        <div class="container"> {pageNumber[i] > 1 && <button class="left-button" id={i} onClick={() => getNewPage(i, 'back')}><ChevronLeftIcon size="medium"></ChevronLeftIcon></button> } {shelf.map((book, j) => 
                            <figure class="book">
                                <a href={book[2]}><img src={book[1]}></img></a>
                                <figcaption class="title"><a href={book[2]}>{book[0]}</a></figcaption>
                            </figure>
                        )} {shelfCounts[i] > 5 && pageNumber[i] < (shelfCounts[i] / 5).toFixed() && <button class="right-button" id={i} onClick={() => getNewPage(i, 'next')}><ChevronRightIcon size="medium"></ChevronRightIcon></button> }  </div><div id="link-container"><span id="shelf-link"><a href={shelfLinks[i]}>See shelf on GoodReads <ChevronRightIcon size="small"></ChevronRightIcon></a></span></div></div>  
                    </div>
                )} 
            </div>

            <div id="footer">
                <span>
                    Created with <a href="https://nextjs.org/">Next.js</a> · <a href="https://styled-components.com/">Styled Components</a> · <a href="https://www.goodreads.com/api">Goodreads API</a> and more by <a href="">Evander Mendonça</a>
                </span>
                <span>
                    View more at <a href="https://github.com/evandermendonca/goodreads">github/evandermendonca</a>
                </span>
            </div>
        </main>
    );
};

export default User;
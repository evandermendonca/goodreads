import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import PropTypes from 'prop-types';
import { CalendarIcon, LocationIcon } from '@primer/octicons-react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const theme = {
    fonts: {
      inter: 'Inter, system, -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Arial, sans-serif',
      mono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace',
    },
};

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Notable');
    body {
        margin: 0;
        padding: 0; 
        font-family: 'Notable';
        background: #121212; 
        color: #ddd;
    }

    a {
        text-decoration: none; 
        color: #1DB954;
        font-family: ${theme.fonts.mono}; 
    }

    a:hover {
        text-decoration: underline;
    }

    p {
        line-spacing: 1.5;
    }
`

const StyledContainer = styled.div`
    font-family: ${theme.fonts.inter};
    height: 50vh;
    background-color: #000000; 
    padding: 3rem 5rem 10rem;
    margin: 0 0 5rem 0;
    text-align: center; 
    color: #fff; 
    
    @media (max-width: 500px) {
        padding: 0; 
        margin: 0;
        height: 100%;
    }

    div#profile-card {
        width: 30%; 
        max-width: 450px;
        margin: 2.5rem auto;
        background-color: #222629; 
        padding: 2.5rem 0;
        border-radius: 2.5%;

        @media (max-width: 1450px) {
            width: 100%;
        }

        @media (max-width: 500px) {
            background-color: #000;
            border-radius: none;
            margin-top: 0;
            padding: 1.5rem 0;
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
`; 

const User = () => {
    const query = useRouter().query.id;
    const apiKey = 'OUyNdPsBt3nn0uA61V7g'; 
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null); 
    const [profileLink, setProfileLink] = useState(null); 
    const [imgUrl, setImgUrl] = useState(null); 
    const [interests, setInterests] = useState(null); 
    const [location, setLocation] = useState(null); 
    const [dateJoined, setDateJoined] = useState(null); 
    const [error, setError] = useState({ active: false, type: 200 });
  
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
                var profileImageAfter = profileImageBefore.replace("p3", "p6");

                console.log(profileData)
                setName(profileData['1'].elements['0']['text']); 
                setProfileLink(profileData['3'].elements['0']['cdata']); 
                setLocation(profileData['9'].elements['0']['text']); 
                setDateJoined(profileData['11'].elements['0']['text']);  
                setUsername(profileData['2'].elements['0']['text']);    
                setInterests(profileData['13'].elements['0']['cdata']);
                setImgUrl(profileImageAfter); 


                console.log(profileData['13'].elements['0']['cdata'])
            })
            .catch(error => {
                setError({ active: true, type: 400 });
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        getUserData();    
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
            </StyledContainer>
        </main>
    );
};

export default User;
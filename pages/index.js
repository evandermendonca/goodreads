import React, { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { QuestionIcon, XIcon } from '@primer/octicons-react';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0; 
    font-family: 'Inter', 'system', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Arial', 'sans-serif';
  }

  p {
    line-spacing: 1.5;
  }
`

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121212;
  color: #ddd;

  form {
    background-color: #222629;
    margin-bottom: 5vh;
    max-width: 750px;
    text-align: center;
    padding: 10vh;
    border-radius: 10px;

    svg {
      fill: #ddd;
    }

    label {
      display: block;
      font-size: 1.5rem;
      font-weight: 300;
      margin: 2rem;
    }

    input {
      background-color: transparent;
      border: 0;
      outline: none;
      width: 80%;
      max-width: 250px;
      margin: 0 auto;
      font-size: 2rem;
      font-weight: 300;
      text-align: center;
      color: #772ce8;
      border-bottom: solid #ddd 1px;
      padding-bottom: 5px;
    }

    input::placeholder {
      font-size: 1.5rem;
    }

    .submit {
      margin-top: 3rem;
      filter: none;
    }

    .question-icon {
      display: inline-block;
      vertical-align: bottom;
      padding: 10px 10px 0 10px;
    }

    #help-menu {
      position: fixed;
      width: 20vw;
      background: #121212;
      display: inline-block;
      padding: 30px;
      border-radius: 5px;
      text-align: left;
      box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
    }

    #close-menu {
      width: 25px;
      position: absolute;
      top: 0;
      right: 0;
      margin: 7.5px;
      cursor: pointer;
    }

    #help-menu img {
      display: block;
      width: 300px;
      margin: 10px auto;
    }
  }
`;

const Home = () => {
  const [id, setId] = useState('');
  const handleChange = e => setId(e.target.value);
  const [isShown, setIsShown] = useState(false);

  return (
    <main>
      <head>
        <meta charSet="UTF-8"/>
        <title>Goodreads Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </head>

      <GlobalStyle/>

      <StyledContainer>
        <form
          onSubmit={e => {
            e.preventDefault();
            Router.push({    
              pathname: '/user',
              query: { id: id },
            });
          }}>
          <svg width="100px" height="100px" viewBox="0 0 100 100"><path id="Goodreads" d="M49.289 68.463c9.74-.081 16.666-4.953 20.775-14.614h.215v14.735c0 1.098-.072 2.801-.215 5.115-.293 2.395-1.076 4.973-2.346 7.733-1.273 2.598-3.328 4.812-6.16 6.637-2.801 1.989-6.709 3.024-11.727 3.106-4.834 0-8.922-1.259-12.268-3.775-3.42-2.477-5.418-6.496-5.998-12.057h-4.252c.436 7.225 2.742 12.381 6.922 15.467 4.07 2.962 9.234 4.445 15.488 4.445 6.178 0 10.996-1.157 14.449-3.472 3.416-2.232 5.869-5.014 7.361-8.343 1.49-3.328 2.381-6.495 2.67-9.498.221-3.005.328-5.156.328-6.455V6.717h-4.254v13.396h-.215c-1.637-4.911-4.344-8.625-8.127-11.143-3.816-2.476-8.033-3.715-12.648-3.715-8.037.163-14.143 3.268-18.322 9.317-4.291 6.007-6.434 13.417-6.434 22.226 0 9.053 2.035 16.542 6.105 22.469 4.112 6.05 10.327 9.115 18.653 9.196zM33.912 17.861c3.342-5.481 8.467-8.322 15.377-8.525 7.088.204 12.338 2.964 15.758 8.282 3.416 5.319 5.125 11.712 5.125 19.182 0 7.47-1.709 13.822-5.125 19.059-3.42 5.563-8.67 8.403-15.758 8.525-6.689-.123-11.781-2.884-15.269-8.282-3.527-5.237-5.289-11.671-5.289-19.303-.001-7.145 1.726-13.458 5.181-18.938z"/></svg>
          <label htmlFor="id">Type your Goodreads ID number on the line below</label>
          <input name="id" type="text" onChange={handleChange} />
          <div onMouseEnter={() => setIsShown(true)} class="question-icon"><QuestionIcon verticalAlign="bottom" size="medium"></QuestionIcon></div>

          {isShown && (
            <div id="help-menu">
              <div id="close-menu" onClick={() => setIsShown(false)}>
                <XIcon size="small"></XIcon>
              </div>
              You can find your Goodreads ID by going to your Goodreads profile and copying the number that's in the address bar.
              <br></br>
              <br></br>
              Example below:
              <br></br>
              <img src="https://i.ibb.co/j5jrtbP/ID.png"/>
              <br></br>
              You can also just copy and paste mine: 118599197
            </div>
          )}
        </form>
      </StyledContainer>
    </main>
  );
};

export default Home;
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}

label {
  cursor: pointer;
}

input,
textarea {
  -moz-user-select: auto;
  -webkit-user-select: auto;
  -ms-user-select: auto;
  user-select: auto;
  border: none;
  outline: none;
}

input:focus {
  outline: none;
}

button {
  outline: none;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}

.link {
  color: black;
  text-decoration: underline;
}

div {
  margin:0;
  padding: 0;
}
`;


export default GlobalStyle;
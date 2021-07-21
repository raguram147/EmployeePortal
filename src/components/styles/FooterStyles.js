import styled from 'styled-components';

export const Heading=styled.div`
font-weight:700;
`;



export const Container=styled.div`
padding:30px;
background: #444444;
margin-bottom:0px;
color:#fff;
`;


export const Column=styled.div`
  margin-left:30px;
  float: left;
  width: 30%;
  padding: 10px;
  height: auto; /* Should be removed. Only for demonstration */
  @media screen and (max-width: 670px) {
    
      width: 100%;
    }
`;

/* Clear floats after the columns */
export const Row=styled.div`
  content: "";
  display: table;
  clear: both;
`;


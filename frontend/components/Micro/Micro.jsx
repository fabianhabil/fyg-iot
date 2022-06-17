import styled from "styled-components";

const TagLineWrap = styled.div`
    background-color: #ffb800 !important;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    padding: 16px;
    border-radius: 6px;
`;

const Tagline = styled.h1`
    font-size: 3vw;
    @media (max-width: 900px) {
        font-size: 5vw;
    }
    @media (max-width: 550px) {
        font-size: 5vw;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

const TextButton = styled.p`
    padding: 0;
    margin: 0;
    font-size: 20px;
    @media (max-width: 470px) {
        font-size: 14px;
    }
    @media (max-width: 360px) {
        font-size: 10px;
    }
    @media (max-width: 320px) {
        font-size: 9px;
    }
`;

export { Tagline, Img, TextButton, TagLineWrap };

import React, { useState, useEffect } from 'react';
import './App.css'
import styled from 'styled-components';
import axios from "axios";

import {
  Layout, 
  Flex
} from 'antd';
import {
  CheckCircleTwoTone,
  QuestionCircleOutlined
} from '@ant-design/icons';

const { Content } = Layout;

import { Results } from './components/Results';
import { Message } from './components/Message';

const ContainerResults = styled.div`
  width: 100%;
  flex: 1;
`;
const ContentResults = styled.div`
  border: 2px solid #413c65;
  color: #fff;
  width: 50%;
  margin: 24px auto;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 2px 2px 18px #413d65;
  min-height: 82vh;
`;
const ContainerMessage = styled.div`
  background: #242038;
  color: #fff;
  height: 102px;
  position: sticky;
  bottom: 0;
  z-index: 999;
`;
const ContentMessage = styled.div`
  border: 2px solid #413c65;
  border-radius: 8px;
  background: #413c65;
  color: #fff;
  width: 50%;
  padding: 16px 24px;
  margin: 0 auto;
`;
const Question = styled.div`
    padding: 8px 50px 8px 8px;
    background: #413d65;
    border-radius: 6px;
    margin-left: 20%;
    text-align: right;
    position: relative;

    &:before {
        content: "Q";
        font-size: 30px;
        line-height: 38px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -19px;
        color: #665e9d;
        z-index: 1;
        width: 38px;
        height: 38px;
        text-align: center;
        font-family: "Basier Circle Bold", Sans-serif;
        font-weight: 700;
    }

`;
const Answer = styled.div`
    padding: 8px 8px 8px 50px;
    color: #fff;
    text-align: left;
    position: relative;

    h1 {
      margin-top: 10px!important;
      font-size: 1.5rem;
    }
    h2 {
      font-size: 1.25rem;
    }

    &:before {
        content: "A";
        font-size: 30px;
        line-height: 38px;
        position: absolute;
        left: 0;
        top: 10px;
        color: #d6256d;
        z-index: 1;
        width: 38px;
        height: 38px;
        text-align: center;
        font-family: "Basier Circle Bold", Sans-serif;
        font-weight: 700;
    }
`;

interface Item {
  color: string | JSX.Element; // Color can be a string (hex code) or JSX (icon)
  children: JSX.Element;       // Children must be a JSX element
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
    }, 200);
  }, [items]);
 

  const handleAddMessage = (inputValue: string) => {
    setIsLoading(true);
    const newQuestion = {
      color: '#E2306D',
      dot: <QuestionCircleOutlined twoToneColor="#d6256d" />,
      children: (
          <>
            <Question>{inputValue}</Question>
          </>
      ),
    }
    setItems((prevItems) => [...prevItems, newQuestion]);
    getResponse(inputValue);
  };

  const getResponse = async (input_value: string) => {
    try {
      const baseURL = import.meta.env.VITE_APP_BASE_URL;
      const endPoint = '/api';
      const body = {
        input_value
      }
      const response = await axios.post(`${baseURL}${endPoint}`, body);
      const htmlContent = response.data.html;
      const newAnswer = {
        color: '#d6256d',
        dot: <CheckCircleTwoTone twoToneColor="#d6256d" />,
        children: (
            <>
              <Answer> 
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </Answer>
            </>
        ),
      }
      setItems((prevItems) => [...prevItems, newAnswer]);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const htmlContent = `
        <h3>Error: ${err.message}!</h3>
      `;
      const newAnswer = {
        color: '#d6256d',
        dot: <CheckCircleTwoTone twoToneColor="#d6256d" />,
        children: (
            <>
              <Answer> 
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </Answer>
            </>
        ),
      }
      setItems((prevItems) => [...prevItems, newAnswer]);
      setIsLoading(false);
    }
  };

  return (
    <Layout 
      style={{
        backgroundColor: '#242038',
      }}
    >
      <Content>
        <Flex 
          vertical={true}
          justify="space-between"
          style={{ 
            minHeight: '100vh'
          }}
        >
          <ContainerResults>
            <ContentResults>
              <Results 
                items={items}
                isLoading={isLoading} 
              />
            </ContentResults>
          </ContainerResults>
          <ContainerMessage>
            <ContentMessage>
              <Message 
                onAddMessage={handleAddMessage} 
                isLoading={isLoading} 
              />
            </ContentMessage>
          </ContainerMessage>
        </Flex>
      </Content>
    </Layout>
  )
}

export default App

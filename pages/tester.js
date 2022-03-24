import React, { useState } from 'react';
import { Layout } from 'antd';
import ConnectWallet from 'components/ConnectWallet'
// import GlobalStyles from 'themes/global.style';
import { ThemeProvider } from 'styled-components';
// import styled from 'styled-components';

// import theme from 'themes/default.theme';
const { Footer, Content } = Layout;
// import "antd/dist/antd.css";

export default function App({ Component, router, pageProps }) {
    return (
        <ThemeProvider >
            <Layout>
                {/* <GlobalStyles> */}
                    <ConnectWallet />
                    <Content>
                        <Component {...pageProps} />
                    </Content>
                    <Footer>Footer</Footer>
                {/* </GlobalStyles> */}
            </Layout>
        </ThemeProvider>
    )
  }
  
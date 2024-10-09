import Head from 'next/head';

import Error500Contents from '@/contents/500';

import type { ReactElement } from 'react';

function Error500() {
  return (
    <>
      <Head>
        <title>服务器错误</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <Error500Contents />
    </>
  );
}

Error500.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Error500;

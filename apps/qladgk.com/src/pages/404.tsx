import Head from 'next/head';

import Error404Contents from '@/contents/404';

import type { ReactElement } from 'react';

function Error404() {
  return (
    <>
      <Head>
        <title>页面未找到</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      <Error404Contents />
    </>
  );
}

Error404.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default Error404;

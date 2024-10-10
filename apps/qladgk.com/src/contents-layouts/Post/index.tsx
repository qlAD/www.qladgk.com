import { PropsWithChildren, useEffect } from 'react';

import WithReactions from '@/components/layouts/WithReactions';
import WithTableOfContents from '@/components/layouts/WithTableOfContents';
import Head from '@/components/meta/Head';
import SkipNavigation from '@/components/navigations/SkipNavigation';
import PageHeader from '@/components/PageHeader';

import { getPostOgImageUrl, getPostStructuredData } from '@/helpers/post';

import PostFooter from '@/contents-layouts/Post/PostFooter';
import PostMeta from '@/contents-layouts/Post/PostMeta';

import type { TPostFrontMatter, TTableOfContents } from '@/types';

declare const twikoo: {
  init: (options: { envId: string; el: string }) => void;
};

interface PostProps {
  frontMatter: TPostFrontMatter;
  tableOfContents: TTableOfContents;
}

function Post({
  frontMatter: { title, description, caption, category, date, lang, tags },
  tableOfContents,
  children = null,
}: PropsWithChildren<PostProps>) {
  const postOgImages = getPostOgImageUrl({
    category: caption || category,
    title,
    date,
    lang,
    tags,
  });

  const structuredData = getPostStructuredData({
    title,
    dateModified: date,
    datePublished: date,
    images: [postOgImages['1/1'], postOgImages['4/3'], postOgImages['16/9']],
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/twikoo@1.6.39/dist/twikoo.nocss.js';
    script.async = true;

    script.onload = () => {
      twikoo.init({
        envId: 'https://twikoo.qladgk.com/.netlify/functions/twikoo',
        el: '#tcomment',
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head
        title={title}
        description={description}
        ogImage={postOgImages.default}
        structuredData={structuredData}
      />
      <SkipNavigation />
      <PageHeader title={title} description={description} caption={caption} />
      <PostMeta date={date} lang={lang} />
      <WithTableOfContents tableOfContents={tableOfContents}>
        {children}
        <PostFooter tags={tags} category={category} />
      </WithTableOfContents>
      <WithReactions contentTitle={title} contentType="POST" />
      <div className="content-wrapper">
        <div id="tcomment" />
      </div>
    </>
  );
}

export default Post;

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

interface PostProps {
  frontMatter: TPostFrontMatter;
  tableOfContents: TTableOfContents;
}

function Post({
  frontMatter: { title, description, caption, category, date, lang, tags },
  tableOfContents,
  children = null,
}: PropsWithChildren<PostProps>) {
  // get og image urls
  const postOgImages = getPostOgImageUrl({
    category: caption || category,
    title,
    date,
    lang,
    tags,
  });

  // get structured data
  const structuredData = getPostStructuredData({
    title,
    dateModified: date,
    datePublished: date,
    images: [postOgImages['1/1'], postOgImages['4/3'], postOgImages['16/9']],
  });

  useEffect(() => {
    // 动态加载 Twikoo 脚本
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/twikoo@1.6.39/dist/twikoo.nocss.js';
    script.async = true;

    script.onload = () => {
      // 初始化 Twikoo
      // 请将 '您的环境id' 替换为你的实际环境 ID
      twikoo.init({
        envId: 'https://twikoo.qladgk.com/.netlify/functions/twikoo',
        el: '#tcomment', // 容器元素
      });
    };

    document.body.appendChild(script);

    // 清理函数以移除脚本
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

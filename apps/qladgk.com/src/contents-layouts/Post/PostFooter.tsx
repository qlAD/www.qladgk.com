import clsx from 'clsx';
import Link from 'next/link';
import { useEffect } from 'react';

import type { PropsWithChildren } from 'react';
import { TPostFrontMatter } from '@/types';

// 为 window 声明 twikoo 类型
declare global {
  interface Window {
    twikoo: any;
  }
}

type ChipProps = {
  href: string;
};

function Chip({ href, children = null }: PropsWithChildren<ChipProps>) {
  return (
    <Link
      href={href}
      className={clsx(
        'bg-accent-600/[0.08] text-accent-600 inline-flex h-6 items-center gap-1 rounded-full px-2 text-[13px] font-medium',
        'dark:text-accent-400 dark:dark:bg-accent-400/10 dark:font-normal'
      )}
    >
      {children}
    </Link>
  );
}

interface PostFooterProps {
  tags: TPostFrontMatter['tags'];
  category: TPostFrontMatter['category'];
}

function PostFooter({ tags, category }: PostFooterProps) {
  useEffect(() => {
    // 动态加载 Twikoo 脚本
    const twikooScript = document.createElement('script');
    twikooScript.src = 'https://cdn.jsdelivr.net/npm/twikoo@1.6.39/dist/twikoo.all.min.js';
    twikooScript.onload = () => {
      // 在 window 对象上使用 twikoo
      if (window.twikoo) {
        window.twikoo.init({
          envId: 'https://twikoo.qladgk.com/.netlify/functions/twikoo', // 替换为你的环境 ID
          el: '#tcomment', // 容器元素
        });
      }
    };
    document.body.appendChild(twikooScript);

    return () => {
      // 清理 Twikoo 脚本
      document.body.removeChild(twikooScript);
    };
  }, []);

  return (
    <div>
      <div
        className={clsx(
          'mt-24 flex flex-col gap-6 text-sm text-slate-600',
          'md:flex-row md:items-center md:justify-between',
          'dark:text-slate-400'
        )}
      >
        <div className={clsx('flex flex-wrap gap-x-1 gap-y-2')}>
          Posted on
          <Link
            href="/blog"
            className={clsx('text-accent-600 font-bold', 'dark:text-accent-400')}
          >
            {category}
          </Link>
          with tags:
          <div className={clsx('flex flex-wrap gap-1')}>
            {tags.map((tag) => (
              <Chip href="/blog" key={tag}>
                #{tag}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Twikoo 评论区域 */}
      <div className="mt-8">
        <h3 className="text-lg font-bold">评论</h3>
        <div id="tcomment" />
      </div>
    </div>
  );
}

export default PostFooter;

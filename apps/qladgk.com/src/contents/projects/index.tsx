import clsx from 'clsx';
import { useState } from 'react';

import { GitHubIcon, NpmIcon } from '@/components/Icons';
import { SectionButton } from '@/components/sections/SectionButton';
import SectionContent from '@/components/sections/SectionContent';
import SectionTitle from '@/components/sections/SectionTitle';
import AppWindow from '@/components/wireframes/AppWindow';
import GitHubWireframe from '@/components/wireframes/GitHub';
import NpmWireframe from '@/components/wireframes/Npm';

function ProjectsContents() {
  const [currentState, setCurrentState] = useState<'npm' | 'github'>('github');

  return (
    <>
      <SectionTitle
        title="动态的强调色。"
        caption="tailwindcss-accent"
        description="添加强调色，以便在 Tailwind CSS 项目中添加动态、灵活的颜色使用。"
        button={{
          title: '了解更多',
          href: '/docs/tailwindcss-accent',
        }}
      />
      <SectionContent>
        <div className={clsx('flex', 'lg:gap-12')}>
          <div className={clsx('hidden flex-1 flex-col gap-3 pt-8', 'lg:flex')}>
            <div className={clsx('flex flex-col gap-3')}>
              <SectionButton
                title="在 GitHub 上可用"
                icon={<GitHubIcon className={clsx('my-2 h-16 w-16')} />}
                description="使用 MIT 许可证访问 GitHub 上强大而灵活的包。"
                active={currentState === 'github'}
                onClick={() => setCurrentState('github')}
              />
              <SectionButton
                title="npm 包"
                icon={<NpmIcon className={clsx('my-2 h-16 w-16')} />}
                description="由于其类型选项，可以轻松安装和使用该包。"
                active={currentState === 'npm'}
                onClick={() => setCurrentState('npm')}
              />
            </div>
          </div>
          <div className={clsx('w-full', 'lg:w-auto')}>
            <div className={clsx('-mt-[41px]')}>
              <div className={clsx('w-full', 'lg:h-[400px] lg:w-[600px]')}>
                <AppWindow
                  type="browser"
                  browserTabs={[
                    {
                      icon: <GitHubIcon className="h-4 w-4" />,
                      title: 'enjidev/tailwindcss-accent - GitHub',
                      isActive: currentState === 'github',
                    },
                    {
                      icon: <NpmIcon className="h-4 w-4" />,
                      title: 'tailwindcss-accent - npm',
                      isActive: currentState === 'npm',
                    },
                  ]}
                >
                  {currentState === 'github' && (
                    <GitHubWireframe
                      author="qlAD"
                      license="MIT"
                      repository="tailwindcss-accent"
                      description="添加强调色，使颜色利用更加动态和灵活。"
                    />
                  )}
                  {currentState === 'npm' && (
                    <NpmWireframe
                      packageName="tailwindcss-accent"
                      description="添加强调色，使颜色利用更加动态和灵活。"
                      isWithTypeScript
                    />
                  )}
                </AppWindow>
              </div>
            </div>
          </div>
        </div>
      </SectionContent>
    </>
  );
}

export default ProjectsContents;

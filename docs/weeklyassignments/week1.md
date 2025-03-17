# Week 1 - Project Management

## Assignments of the Week
- Read, sign the student/instructor/lab agreements, and commit to your repos
- Work through a git tutorial
- Build a personal site in the class archive describing you and your final project

### Steps:
1. Install Git
2. Configure GitHub account
3. Set up a personal website (using VitePress)
4. Populate content
5. Deploy to GitHub

## 1.Install Git
- You can download and install Git for Windows from the [official Git website](https://git-scm.com/), or use GitHub Desktop to install Git. Here, I choose the first method.

## 2.Configure Git
- When configuring Git, you need to set the username and email address. Run the following commands to set them:

```bash
git config --global user.name "Ao"
git config --global user.email "aol1926@outlook.com"
```
## 3.Set up the website (VitePress)
- **Install Node.js**
First, you need to install Node.js. Visit the [official Node.js](https://nodejs.org/zh-cn) website to download and install the latest stable version. Here, I installed version 22.13. After installation, add the ```bin ```directory to the environment variables.

- **clone repository**
 Clone the project locally: Use the ```git clone``` command to clone the remote project locally.
```bash
git clone https://github.com/UNNC-Fab/2025-1-AL.git
```
- **Install VitePress**
Run the following command outside the project folder to install VitePress:
```bash
npm add -D vitepress
```
Running this command in the project root directory will generate a ```node_modules``` folder, which may cause issues with large cache uploads to GitHub. Therefore, I choose to use VitePress separately rather than within the project. After installation, place the ```.bin``` file in the environment variables.

Run the following command in the project to start building the project and follow the wizard to configure it:
```bash
npx vitepress init
```

Now, a basic website has been built, and the next step is to populate some content.

- **Populate content**
VitePress configures the site's basic information through docs/.vitepress/config.ts, including title, description, theme, plugins, navigation bar, sidebar, etc.
1. I first set the website title to "Fab Academy", which will be displayed on the browser tab.
2. Next is the top navigation bar, in addition to Home, I added three others: About (which contains my personal introduction), Assignments (which includes my weekly assignments), Project (my final project).
3. Finally, I set the left sidebar to display "Assignments" and "Project". The content includes the title of my weekly assignments and my final project. Clicking on them will lead to the corresponding interfaces.
```bash
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/2025-1-AL/',
  title: "Fablab Academy",
  description: "Welcome to Ao Liu's Fab Academy 2025 site!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/about' },
      { text: 'Assignments', link: '/weeklyassignments/week1' },
      { text: 'Project', link: '/project/project' }
    ],

    sidebar: {
      '/week': [
        {
          text: 'Assignments',
          items: [
            { text: 'Week1.Project Management', link: '/weeklyassignments/week1' },
            { text: 'Week2.Embedded Programming', link: '/weeklyassignments/week2' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

```
## 4. Deploy to GitLab
- **Use Git to commit and push changes**
Use Git to commit and push changes to the remote repository on GitHub:
```bash
git add --all    # Add all changes
git commit -m "v1"    # Commit changes
git push origin main   # Push changes to GitLab
```
- **Configure the ```.gdeploy.yml``` file**
```bash
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消此区域注释
      #   with:
      #     version: 9
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22.14.0
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: npm run docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```



![](https://cdn.jsdelivr.net/gh/aliu0926/imageuploadservice/img/20250306162603447.png)

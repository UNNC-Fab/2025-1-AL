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

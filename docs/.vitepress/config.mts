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
          text: 'Project',
          items: [
            { text: 'Fianl Project', link: '/project/peoject' },
          ]
        },
        {
          text: 'Assignments',
          items: [
            { text: 'Week1.Project Management', link: '/weeklyassignments/week1' },
            { text: 'Week2.Embedded Programming', link: '/weeklyassignments/week2' },
            { text: 'Week3.Electronics Design', link: '/weeklyassignments/week3' },
            { text: 'Week4.Computer-Controlled Cutting', link: '/weeklyassignments/week4' },
            { text: 'Week5.3D Scanning and Printing', link: '/weeklyassignments/week5' },
            { text: 'Week6.Electronics Production', link: '/weeklyassignments/week6' },
            { text: 'Week7.Computer-Controlled Machining', link: '/weeklyassignments/week7' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

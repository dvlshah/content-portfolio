# Modern Content Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-2.x-teal)](https://chakra-ui.com/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF)](https://vitejs.dev/)

A modern, responsive content portfolio template built with React, Vite, and Chakra UI. Perfect for writers, technical authors, and content creators to showcase their work with a beautiful, mobile-friendly interface.

## 🌐 Live Demo

Check out the live version: [portfolio.neurink.ai](https://portfolio.neurink.ai)

Experience a fully functional implementation showcasing:
- Responsive design across all devices
- Real-time search functionality
- Smooth animations and transitions
- Dark/light mode toggle
- Company and topic-based filtering

![Portfolio Preview](preview.png)

## ✨ Features

- 🎨 Modern, clean design with dark/light mode
- 📱 Fully responsive across all devices
- 🔍 Advanced search functionality with tag filtering
- 🏷️ Topic-based content organization
- 📊 Featured articles section
- 📈 Company-wise content grouping
- 📬 Integrated contact form (using Formspree)
- ⚡ Fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 🎯 SEO-friendly structure (SEO score is > 95 on most site analyzers)

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/content-portfolio.git
cd content-portfolio
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory
```env
VITE_FORMSPREE_FORM_ID=your_formspree_form_id
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:5173` to see your portfolio!

## 🛠️ Configuration

### Content Structure

Add your blog post details in `src/data/blogs.js`:
```javascript
export const blogs = [
  {
    id: "1",
    title: "Your Article Title",
    description: "Article description",
    image: "/path/to/image.jpg",
    company: "Company Name",
    tags: ["AI", "Machine Learning"],
    date: "2023-12-25",
    source_url: "https://yourarticle.com"
  }
  // ... more articles
];
```

### Customization

- **Theme**: Modify `src/theme/index.js` for custom colors and styling
- **Components**: All components in `src/components` are modular and customizable
- **Layout**: Adjust the layout in `src/components/ModernPortfolio.jsx`

## 📖 Documentation

### Project Structure

```
content-portfolio/
├── src/
│   ├── components/         # React components
│   ├── data/              # Content data
│   ├── theme/             # Chakra UI theme
│   ├── utils/             # Utility functions
│   └── App.jsx            # Root component
├── public/                # Static assets
└── index.html            # Entry point
```

### Key Components

- `ModernPortfolio`: Main layout component
- `BlogCard`: Article display component
- `SearchBar`: Search functionality
- `FeaturedArticleSection`: Featured content section
- `ContactForm`: Contact form integration

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Chakra UI](https://chakra-ui.com/) for the component library
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) for icons
- [Formspree](https://formspree.io/) for form handling

## 📞 Support

- Create an issue for bug reports or feature requests
- Star the repository if you find it useful
- Follow for updates

---

Built with ❤️ by Deval Shah. Find me on [Twitter](https://twitter.com/dvlshah) and [LinkedIn](https://linkedin.com/in/dvlshah).
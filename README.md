# AstroView  

AstroView is an interactive web application that integrates multiple NASA APIs—APOD, DONKI, Mars Rover, NEO, and GIBS—to provide users with a unified platform for exploring space and Earth data. The application showcases the Astronomy Picture of the Day, visualizes solar activity and space weather events, displays real-time asteroid and comet approach data, and allows users to browse Mars rover images. It also leverages GIBS to deliver high-quality Earth observation imagery. Built with React.js, Node.js/Express, and Tailwind CSS, AstroView makes space exploration accessible through an engaging and data-driven interface.  

## 🚀 Features  

- 📸 **Astronomy Picture of the Day (APOD):** Stunning daily space imagery with descriptions.  
- ☀️ **DONKI (Space Weather):** Real-time updates on solar flares, CMEs, and geomagnetic storms.  
- 🚀 **Mars Rover Photos:** Browse raw images taken by NASA’s Curiosity, Opportunity, and Perseverance rovers.  
- 🪐 **Near Earth Objects (NEO):** Track asteroids and comets approaching Earth.  
- 🌍 **GIBS (Earth Observing System):** Explore Earth in true-color imagery through interactive visualizations.  

## 🛠️ Tech Stack  

- **Frontend:** React.js, Vite, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **APIs:** NASA APOD, DONKI, Mars Rover, NEO, GIBS  
- **Deployment:** Vercel

## 🌐 Live Demo
  https://astro-view-five.vercel.app/

## ⚡ Getting Started  

### 1. Clone the repository  
```bash
git clone https://github.com/Harsha4112004/astroview.git
cd astroview
```
### 2. Install dependencies  
```bash
npm install
```
### 3. Add your NASA API Key
Go to https://api.nasa.gov/
 and request a free API key.
Once you have it, create a .env file in the root directory and add:
```bash
VITE_NASA_API_KEY=your_api_key_here
```

### 4. Run the app locally  
```bash
npm run dev
```

## 🤝 Contributing
Contributions are welcome! If you’d like to improve AstroView, please fork the repo and submit a pull request.

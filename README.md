# Snake Game with Login System

This project is a simple Snake game with a login system. Users can log in, play the game, and see their highest scores.　Adapted from　https://github.com/supergoat/snake.git （snake part) and https://github.com/eman289/smart-login-system.git (login system)

## Features

- User login and logout
- Snake game with score tracking
- Highest score display
- Pause functionality

## Technologies Used

- HTML
- CSS
- JavaScript

## Getting Started

### Prerequisites

- A web browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/snake-game-login.git
   ```

2. Navigate to the project directory:

   ```bash
   cd snake-game-login
   ```

3. Open index.html in your web browser to start the application.

## Usage
    Open index.html in your web browser.
    Enter your email and password to log in.
    Play the Snake game.
    Press the spacebar to pause the game.
    Click the "Log Out" button to log out and navigate back to the login page.

## File Structure
snake-game-login/
├── css/
│   ├── all.min.css
│   ├── bootstrap.min.css
│   ├── style.css
│   └── Snake.css
├── images/
│   ├── snake_icon.jpeg
│   └── snake_background.jpeg
├── js/
│   ├── bootstrap.bundle.js
│   ├── sweetalert.min.js
│   ├── main.js
│   └── home.js
├── Snake.js
├── index.html
├── home.html
└── README.md

#　Customization
Changing the Canvas Size
To change the size of the game canvas, update the canvas.width and canvas.height properties in Snake.js:

##　Changing the Canvas Size
To change the size of the game canvas, update the canvas.width and canvas.height properties in Snake.js:

## Code Snippet

```javascript
var canvas = document.getElementById('game');
canvas.width = 800; // Set the width of the canvas
canvas.height = 800; // Set the height of the canvas
```

##　Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

##　License
This project is licensed under the MIT License. See the LICENSE file for details.

##　Acknowledgements
Bootstrap
SweetAlert
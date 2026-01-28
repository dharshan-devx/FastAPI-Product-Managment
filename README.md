# Dhxrshxn FastAPI Project

A modern full-stack web application demonstrating a product management system with FastAPI backend and React frontend.

## Table of Contents
- [About This Project](#about-this-project)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [What I've Learned](#what-ive-learned)
- [Getting Started](#getting-started)
- [How to Run the Project](#how-to-run-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## About This Project

This project is a comprehensive demonstration of a modern web application built with FastAPI and React. It showcases a complete product management system with CRUD operations, featuring a responsive user interface and a robust backend API.

The application allows users to:
- View all products with filtering and sorting capabilities
- Add new products to the database
- Update existing product information
- Delete products from the database
- Search through products by ID, name, or description

## Technologies Used

### Backend
- **Python** - Programming language
- **FastAPI** - High-performance web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Primary database (with SQLite fallback)
- **Pydantic** - Data validation and settings management

### Frontend
- **React** - JavaScript library for building user interfaces
- **Axios** - Promise-based HTTP client for API requests
- **CSS** - Styling with modern design principles

## Features

- **Full CRUD Operations**: Create, Read, Update, Delete products
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Filtering**: Search and filter products instantly
- **Sorting Capabilities**: Sort products by ID, name, price, or quantity
- **Modern UI/UX**: Clean, intuitive user interface with animations
- **Error Handling**: Comprehensive error handling and user feedback
- **Database Fallback**: Automatic fallback from PostgreSQL to SQLite if needed

## What I've Learned

Through building this project, I gained valuable experience in:

- **Full-Stack Development**: Integrating backend APIs with frontend applications
- **FastAPI Best Practices**: Dependency injection, data validation, and API documentation
- **React Patterns**: Hooks, state management, and component composition
- **Database Integration**: Working with both PostgreSQL and SQLite
- **Modern CSS**: Creating responsive designs with CSS variables and flexbox/grid
- **API Design**: RESTful API principles and error handling
- **Environment Configuration**: Managing environment variables and fallback mechanisms
- **Frontend Performance**: Optimizing React applications for performance
- **User Experience**: Creating intuitive interfaces with proper feedback

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js and npm/yarn
- PostgreSQL (optional, SQLite is used as fallback)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dhxrshxn-fastapi-project
```

2. Set up the backend:
```bash
# Navigate to project root
cd d:\fastapi-demo-products-with-ui

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install fastapi uvicorn sqlalchemy python-dotenv pydantic psycopg2-binary
```

3. Set up the frontend:
```bash
# Navigate to frontend directory
cd frontend

# Install JavaScript dependencies
npm install
```

## How to Run the Project

### Running the Backend

1. Make sure you're in the project root directory
2. Activate your virtual environment
3. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### Running the Frontend

1. Navigate to the `frontend` directory
2. Start the React development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

### Environment Configuration

Create a `.env` file in the project root with your database configuration:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
# Or use SQLite as fallback
# DATABASE_URL=sqlite:///./products.db
```

## Project Structure

```
d:\Dhxrshxn FastAPI Project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Main CSS styles
│   │   ├── TaglineSection.js # Marketing section component
│   │   ├── TaglineSection.css # Marketing section styles
│   │   ├── index.js        # React entry point
│   │   └── index.css       # Global CSS
│   ├── package.json
│   └── package-lock.json
│
├── main.py                 # FastAPI application
├── models.py               # Pydantic models
├── database.py             # Database connection setup
├── database_models.py      # SQLAlchemy models
├── .env                    # Environment variables
└── README.md               # This file
```

## API Endpoints

The following API endpoints are available:

- `GET /products/` - Get all products
- `GET /products/{product_id}` - Get a specific product
- `POST /products/` - Create a new product
- `PUT /products/{product_id}` - Update an existing product
- `DELETE /products/{product_id}` - Delete a product

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow PEP 8 style guide for Python code
- Use descriptive variable and function names
- Write clear, concise commit messages
- Add tests for new functionality
- Document any major changes in the README

## Deploying to Render

This project is configured for deployment on Render, a cloud platform that makes it easy to deploy both web services and databases.

### Steps to Deploy on Render

1. Create a new Web Service in your Render dashboard
2. Connect your GitHub/GitLab repository
3. Select the root directory of this project
4. Set the environment variables in Render dashboard:
   - `DATABASE_URL`: Your PostgreSQL database connection string
5. Render will automatically detect the Python environment and run the build process
6. The service will be deployed with automatic SSL certificate

### Render Configuration

The project includes `render.yaml` which defines:
- A Python web service running FastAPI
- A PostgreSQL database with automatic backup
- Environment variable mapping for database connection

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to the FastAPI community for excellent documentation
- React team for the wonderful ecosystem
- All contributors who help make this project better
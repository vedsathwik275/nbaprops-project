# NBA Props Analyzer

⚠️ **Important Notice**: This is a public repository. Please be mindful when pushing code. If you'd like to make changes, please fork the repository and submit a pull request.

## Overview

NBA Props Analyzer is a sophisticated tool designed to help users make data-driven decisions on NBA player proposition bets. By analyzing historical performance data and matchup statistics, the tool provides insights and recommendations for points, rebounds, and assists prop bets.

## Features

- Historical player performance analysis against specific opponents
- Home/away game context consideration
- Statistical insights including mean, median, and trends
- Confidence-based recommendations for prop bets
- Command-line interface (Phase 1)
- Web application interface (Phase 2 - Coming Soon)

## Project Structure

```
nbaprops-project/
├── documents/          # Project documentation
├── backend/           # Python backend code
└── frontend/         # React frontend code (Phase 2)
```

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js and npm (for frontend development)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nbaprops-project.git
cd nbaprops-project
```

2. Set up the backend:
```bash
cd backend
# Install dependencies using Poetry or pip
poetry install
# or
pip install -r requirements.txt
```

3. Set up the frontend (when available):
```bash
cd frontend
npm install
```

### Usage

For detailed usage instructions, please refer to:
- [Backend Documentation](documents/BACKEND-README.md)
- [Frontend Documentation](documents/FRONTEND-README.md)

## Technology Stack

### Backend
- Python 3.9+
- Pandas & NumPy for data analysis
- FastAPI for web API (Phase 2)
- SQLite for data storage

### Frontend (Phase 2)
- React
- Tailwind CSS
- Chart.js for data visualization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Basketball-Reference
- Open source community
- All contributors and users

## Contact

Project Link: [https://github.com/yourusername/nbaprops-project](https://github.com/yourusername/nbaprops-project)

---

For more detailed information about the project, please refer to our documentation in the `documents` folder:
- [Product Requirements Document](documents/prd.md)
- [Technical Stack Details](documents/tech_stack.md)
- [Backend Documentation](documents/BACKEND-README.md)
- [Frontend Documentation](documents/FRONTEND-README.md) 
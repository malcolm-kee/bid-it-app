# bid-it-app

Frontend Application for [`bid-it`](https://github.com/malcolm-kee/bid-it)

## Getting Started

### Prerequisites

1. Download and install [Node.js](https://nodejs.org/en/)
1. Download and install [Yarn (v1)](https://classic.yarnpkg.com/lang/en/)

### Installing

1. Clone this repo.

   ```bash
   git clone https://github.com/malcolm-kee/bid-it-app.git
   ```

1. Install all the dependencies

   ```bash
   yarn
   ```

### Runing Local Development Server

```bash
yarn start
```

## Running Tests

To run the tests in watch mode, use

```bash
yarn test
```

Else, run the tests and generating code coverage report with:

```bash
yarn test:ci
```

## Deployment

Build frontend bundle with

```bash
yarn build
```

which will generates a `build` folder with all the static files for the application. You can deploy those files in anywhere that can host static files.

## Built with

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/) as CSS frameworks
- [Create React App](https://create-react-app.dev/) for build pipeline, test framework setup, and ESLint configuration

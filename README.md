# Movie Finder App 🎬

A React Native movie discovery app built with Expo, featuring user authentication, movie search, saved movies, and detailed movie information.

## Features

- 🔍 **Movie Search** - Search through 300+ movies with real-time results
- 💾 **Save Movies** - Save movies to your personal collection
- 🔐 **User Authentication** - Sign up and sign in with email/password
- 📱 **Movie Details** - View comprehensive movie information
- 📊 **Trending Movies** - Discover popular and trending films
- 🌟 **Rating System** - See movie ratings and vote counts

## Prerequisites

Before running this project locally, you need to obtain API keys and configuration from the following services:

### Required Services

1. **TMDB (The Movie Database)** - For movie data
   - Sign up at [https://www.themoviedb.org/](https://www.themoviedb.org/)
   - Go to Settings → API → Create API Key
   - You'll need both the API Key and Access Token

2. **Appwrite** - For backend services (authentication, database)
   - Sign up at [https://appwrite.io/](https://appwrite.io/)
   - Create a new project
   - Set up database with collections for metrics and saved movies
   - Get your Project ID, Database ID, Collection IDs, and API Key

## Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rn-movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment file**
   
   Create a `.env` file in the root directory with the following variables:

   ```env
   # TMDB API Configuration
   EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   EXPO_PUBLIC_TMDB_ACCESS_TOKEN=your_tmdb_access_token_here

   # Appwrite Configuration
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_METRIC_COLLECTION_ID=your_metrics_collection_id
   EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_COLLECTION_ID=your_saved_movies_collection_id
   EXPO_PUBLIC_APPWRITE_API_KEY=your_appwrite_api_key
   ```

   **Where to get these values:**
   
   - **TMDB Values**: From your TMDB account dashboard → API section
   - **Appwrite Project ID**: From your Appwrite project settings
   - **Appwrite Database ID**: From your Appwrite database settings
   - **Appwrite Collection IDs**: From your Appwrite database collections
   - **Appwrite API Key**: From your Appwrite project settings → API Keys
   - **Appwrite Endpoint**: Use the cloud endpoint or your self-hosted URL

4. **Set up Appwrite Database**
   
   Create the following collections in your Appwrite database:
   
   - **Metrics Collection** - For tracking search analytics
   - **Saved Movies Collection** - For storing user's saved movies
   
   Make sure to configure proper permissions for authenticated users.

## Running the App

1. **Start the development server**
   ```bash
   npx expo start
   ```

2. **Run on your preferred platform**
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

## Project Structure

```
├── app/                    # App screens and routing
│   ├── (tabs)/            # Tab-based navigation screens
│   └── movies/            # Movie detail screens
├── components/            # Reusable UI components
├── constants/             # App constants (icons, images, colors)
├── hooks/                 # Custom React hooks
├── interfaces/            # TypeScript type definitions
├── services/              # API services and utilities
├── store/                 # State management (Zustand)
└── assets/                # Static assets (images, icons)
```

## Technologies Used

- **React Native** with **Expo**
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Zustand** for state management
- **Appwrite** for backend services
- **TMDB API** for movie data
- **NativeWind** for styling
- **AsyncStorage** for local persistence

## Development

This project uses [file-based routing](https://docs.expo.dev/router/introduction) with Expo Router. Start developing by editing files in the **app** directory.

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [React Native documentation](https://reactnative.dev/)
- [TMDB API documentation](https://developers.themoviedb.org/)
- [Appwrite documentation](https://appwrite.io/docs)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
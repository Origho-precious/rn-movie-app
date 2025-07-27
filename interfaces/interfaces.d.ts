interface Movie {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


interface SavedMovie {
  title: string;
	user_id: number;
	movie_id: number;
	poster_url: string;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}


// AUTH
interface IUser {
	$id: string;
	name: string;
	hash: string;
	mfa: boolean;
	email: string;
	phone: string;
	status: boolean;
	labels: string[];
	password: string;
	targets: Target[];
	$createdAt: string;
	$updatedAt: string;
	accessedAt: string;
	registration: string;
	passwordUpdate: string;
	hashOptions: HashOptions;
	emailVerification: boolean;
	phoneVerification: boolean;
	prefs: Record<string, unknown>;
}

interface HashOptions {
	type: string; // e.g., 'argon2'
	threads: number;
	timeCost: number;
	memoryCost: number;
}

interface Target {
	$id: string;
	name: string;
	userId: string;
	expired: boolean;
	providerId: string;
	$createdAt: string;
	$updatedAt: string;
	identifier: string;
	providerType: string; // e.g., 'email'
}

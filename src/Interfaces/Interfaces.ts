export interface Movie {
  id: string;
  type: string;
  title: string;
  description: string;
  match: string;
  genres: string[];
  writers: string[];
  cast: string[];
  editing: string;
  producers: string[];
  costumeDesign: string[];
  director: string;
  cinematography: string;
  age: string;
  img: string;
  trailer: string;
  video: string;
  popular: boolean;
  newReleases: boolean;
  comingSoon: boolean;
  ourRecommendation: boolean;
  imdb: number;
  comments: movieComment[];
}
export interface movieComment {
  id: string;
  userID: string | undefined;
  text: string;
  time: number;
}
export interface Artist {
  id: string;
  name: string;
  about: string;
  img: string;
  rewards: string[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  confPassword: string;
  img: string;
  type: string;
  interests: string[];
  totorial: string;
  subscribtion: string;
  userName: string;
  bio: string;
  cultures: string[];
  fav_categories: string[];
  notifications: [
    {
      email_notifications: boolean;
      app_notifications: boolean;
      no_notifications: boolean;
    }
  ];
  privacy: string;
  isLogged: boolean;
  friends: string[];
  followers: string[];
  lastWatched: string[];
}
export interface Geners {
  action: boolean;
  comedy: boolean;
  horror: boolean;
  drama: boolean;
  history: boolean;
  sciFi: boolean;
  thriller: boolean;
  documentaries: boolean;
}
export interface CommentInterface {
  id: string;
  commentID: string | null;
  postID: string | undefined;
  userID: string | undefined;
  content: string;
  likes: string[];
}
export interface PostInterface {
  id: string;
  userID: string | undefined;
  content: string;
  text: string;
  likes: string[];
  dislikes: string[];
}

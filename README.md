# what.blog

A modern blogging platform built with React 19, Vite, and Appwrite. This full-stack application allows users to create, publish, and read blog posts with a rich text editing experience.

## 🚀 Features

- **User Authentication**: Secure sign-up and login with Appwrite
- **Blog Creation**: Rich text editor powered by TinyMCE for creating engaging posts
- **Featured Images**: Add images to blog posts with URL support
- **Post Management**: Create, view, and manage blog posts
- **User Profiles**: Personalized author profiles with avatars
- **Responsive Design**: Beautiful dark-themed UI optimized for all devices
- **Real-time Updates**: Instant content updates with Appwrite real-time database

## 🛠️ Tech Stack

- **Frontend**: React 19 with Hooks
- **Build Tool**: Vite 6
- **Backend**: Appwrite (Authentication & Database)
- **Styling**: TailwindCSS v4
- **Rich Text Editor**: TinyMCE
- **Routing**: React Router
- **Notifications**: React Toastify
- **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

Before you begin, ensure you have the following:
- Node.js (v18 or higher)
- npm or yarn
- An Appwrite project (create one at [appwrite.io](https://appwrite.io))
- TinyMCE API key (get one at [tiny.cloud](https://www.tiny.cloud))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/what.blog.git
cd what.blog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Appwrite

Create a `.env` file in the root directory based on `.env.example`:

```env
VITE_APPWRITE_ENDPOINT=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_PROJECT_NAME=your-project-name
VITE_APPWRITE_DB_ID=your-database-id
VITE_TINY_MCE=your-tinymce-api-key
```

To get these values:
1. Go to your [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project or select an existing one
3. Go to Settings → General to find your Endpoint and Project ID
4. Create a database and note the Database ID
5. Create a table named `posts` with the following structure:
   - `title` (string, size 255): Blog post title
   - `content` (string): Blog post content (rich text)
   - `image_url` (string): Featured image URL
   - `author_name` (string): Author's name
   - `author_image` (string): Author's profile image URL
6. Enable Anonymous and Guest permissions for read access
7. Configure write permissions for authenticated users
8. Get your TinyMCE API key from [tiny.cloud](https://www.tiny.cloud)

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

## 📁 Project Structure

```
what.blog/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component with routing
│   ├── main.jsx        # Application entry point
│   ├── index.css       # Global styles
│   ├── appwriteConfig.js  # Appwrite TablesDB configuration
│   ├── assets/         # Image assets and logos
│   ├── components/     # Reusable components (DotSpinner)
│   ├── context/        # React Context providers (Auth, Data)
│   ├── lib/            # Appwrite client setup
│   ├── pages/          # Page components
│   │   ├── AuthPages/  # Authentication pages (Login, Signup)
│   │   └── UserPages/  # User pages (Home, AddBlog, Post, Profile)
│   ├── routes/         # Route configurations
│   └── utils/          # Utility functions (auth, dbUpload)
├── .env                # Environment variables (not in git)
├── .env.example        # Environment variables template
├── index.html          # HTML template
├── package.json        # Project dependencies
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## 🎯 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## � Configuration

### Appwrite Setup

1. **Create Database**: In your Appwrite console, create a new database
2. **Create Table**: Create a table named `posts` with attributes:
   - `title` (string, size 255)
   - `content` (string)
   - `image_url` (string, size 500)
   - `author_name` (string, size 100)
   - `author_image` (string, size 500)
3. **Set Permissions**:
   - Read: Any (Guests and Anonymous)
   - Create: Users (Authenticated)
   - Update: Users (Authenticated, document owner)
   - Delete: Users (Authenticated, document owner)

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APPWRITE_ENDPOINT` | Your Appwrite server URL | `https://cloud.appwrite.io/v1` |
| `VITE_APPWRITE_PROJECT_ID` | Your Appwrite project ID | `1234567890abcdef` |
| `VITE_APPWRITE_PROJECT_NAME` | Your Appwrite project name | `My Blog` |
| `VITE_APPWRITE_DB_ID` | Your Appwrite database ID | `default` |
| `VITE_TINY_MCE` | Your TinyMCE API key | `no-api-key` |

## 📝 Usage

### Authentication
- **Sign Up**: Create a new account with email and password
- **Login**: Access your account to create and manage posts
- **Logout**: Securely end your session

### Creating Blog Posts
1. Click "Publish Blog" on the home page
2. Enter a compelling title for your post
3. Add a featured image URL (optional)
4. Write your content using the rich text editor
5. Click "Publish Post" to share your blog

### Reading Posts
- Browse all posts on the home page
- Click "Read article" to view the full post
- View author information and publication date

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Appwrite Documentation](https://appwrite.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [TinyMCE Documentation](https://www.tiny.cloud/docs)
- [React Router Documentation](https://reactrouter.com)

## 💡 Additional Notes

- This project uses the new Appwrite TablesDB API for database operations
- The application features a modern dark-themed UI with purple accents
- TinyMCE provides a powerful rich text editing experience
- Environment variables must start with `VITE_` to be accessible in client-side code
- The app uses React Context for state management (AuthContext, DataContext)

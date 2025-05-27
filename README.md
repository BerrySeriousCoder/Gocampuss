# GoCampusS

GoCampusS is a modern web application designed to help users explore, search, and manage information related to colleges and educational institutions. Built with React and Vite, it offers a responsive and intuitive user experience.

## Features

*   **College Listing:** Browse a comprehensive list of colleges.
*   **College Details:** View detailed information for each college.
*   **College Search:** Efficiently search for colleges based on various criteria.
*   **Responsive Design:** Optimized for both desktop and mobile devices using Tailwind CSS.
*   **User Interface:** Utilizes Shadcn UI components for a consistent and accessible design.
*   **Data Management:** Integrates with Supabase for backend data operations.

## Technologies Used

*   **Frontend:**
    *   React (with TypeScript)
    *   Vite (Build Tool)
    *   Tailwind CSS (Styling)
    *   Shadcn UI (Component Library)
*   **Backend/Database:**
    *   Supabase (Authentication, Database, Realtime)

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/gocampuss.git
    cd gocampuss
    ```

2.  **Install dependencies:**
    This project uses `bun` as its package manager. If you don't have `bun` installed, you can install it by following the instructions on the [Bun website](https://bun.sh/docs/installation).
    ```bash
    bun install
    ```
    Alternatively, if you prefer `npm` or `yarn`:
    ```bash
    # Using npm
    npm install

    # Using yarn
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root of the project based on `.env.example`. You will need to configure your Supabase project URL and `anon` key.

    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

4.  **Run the development server:**
    ```bash
    bun dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once the development server is running, you can:

*   Navigate to the college list page to see all available colleges.
*   Use the search functionality to find specific colleges.
*   Click on a college card to view its detailed information.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
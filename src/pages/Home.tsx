import { SignedOut, SignInButton } from '@clerk/clerk-react';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex flex-col items-center justify-center">
      <header className="text-3xl font-bold mb-6">BFTaskTrack</header>
      <main className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to BFTaskTrack</h1>
        <p className="text-lg mb-6">
          Please log in to access your tasks and manage them efficiently.
        </p>
        <SignedOut>
          <SignInButton>
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </main>
      <footer className="absolute bottom-4 text-sm text-gray-200">
        © 2024 BFTaskTrack. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';

const LoginPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
            <form className="bg-white shadow-md rounded-lg p-8">
                <div className="mb-4">
                    <InputField id="email" label="Email" type="email" placeholder="you@example.com" />
                </div>
                <div className="mb-6">
                    <InputField id="password" label="Password" type="password" placeholder="••••••••" />
                </div>
                <Button variant="primary" className="w-full">
                    Sign In
                </Button>
            </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;

import React from 'react';
import PropTypes from 'prop-types';

function AuthAside({ title, subtitle }) {
  return (
    <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#0a0f1d]">
      <img
        src="/forum.jpeg"
        alt="Forum"
        className="absolute inset-0 h-full w-full object-cover opacity-40 scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-tr from-[#0a0f1d] via-[#0f172a]/80 to-blue-900/20" />

      {/* Decorative elements - Blue glow is back */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col justify-center px-16 text-white">
        <div className="mb-8 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 w-fit">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
            Dicoding Forum
          </span>
        </div>

        <h1 className="text-5xl font-bold mb-6 tracking-tight leading-tight text-blue-50 drop-shadow-sm">
          {title}
        </h1>

        <div className="h-1 w-16 bg-linear-to-r from-blue-600 to-indigo-500 mb-8 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]" />

        <p className="text-lg max-w-lg leading-relaxed text-blue-200/70 font-medium">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

AuthAside.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default AuthAside;

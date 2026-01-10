import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Loader2, Send } from 'lucide-react';
import useInput from '../../hooks/useInput';

function CommentInput({ addComment, loading = false }) {
  const { t } = useTranslation();
  const { value: content, onChange: onContentChange, setValue: setContent } = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="relative">
        <textarea
          value={content}
          onChange={onContentChange}
          placeholder={t('common.writeYourComment')}
          rows="3"
          className="block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute bottom-3 right-3 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default CommentInput;

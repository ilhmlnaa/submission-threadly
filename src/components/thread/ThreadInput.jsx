import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Loader2, X } from 'lucide-react';
import useInput from '../../hooks/useInput';

function ThreadInput({ addThread, onCancel, loading = false }) {
  const { t } = useTranslation();
  const {
    value: title,
    onChange: onTitleChange,
    setValue: setTitle,
  } = useInput('');
  const {
    value: body,
    onChange: onBodyChange,
    setValue: setBody,
  } = useInput('');
  const {
    value: category,
    onChange: onCategoryChange,
    setValue: setCategory,
  } = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    addThread({ title, body, category });
    setTitle('');
    setBody('');
    setCategory('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {t('homePage.newThread')}
        </h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('common.title')}
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={onTitleChange}
            placeholder={t('common.title')}
            className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('common.category')}
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={onCategoryChange}
            placeholder={t('common.category')}
            className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('common.content')}
          </label>
          <textarea
            id="body"
            value={body}
            onChange={onBodyChange}
            placeholder={t('common.writeYourThread')}
            rows="5"
            className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            required
            disabled={loading}
          />
        </div>

        <div className="flex justify-end space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('common.cancel')}
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('common.loading')}</span>
              </>
            ) : (
              t('common.submit')
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

ThreadInput.propTypes = {
  /** The function that will be called when the form is submitted to add a new thread */
  addThread: PropTypes.func.isRequired,
  /** The function that will be called when the cancel button is clicked */
  onCancel: PropTypes.func,
  /** The loading state of the thread creation process */
  loading: PropTypes.bool,
};

ThreadInput.defaultProps = {
  onCancel: null,
  loading: false,
};

export default ThreadInput;

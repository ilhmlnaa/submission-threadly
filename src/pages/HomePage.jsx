import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  ThreadsList,
  ThreadInput,
  CategoryFilter,
  Sidebar,
  PageTransition,
  ThreadItemSkeleton,
} from '../components';
import useThreads from '../hooks/useThreads';

function HomePage() {
  const {
    threads,
    categories,
    authUser,
    createThread,
  } = useThreads();

  const { t } = useTranslation();
  const [showThreadInput, setShowThreadInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddingThread, setIsAddingThread] = useState(false);

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  const onAddThread = ({ title, body, category }) => {
    if (!authUser) {
      toast.error(
        t('common.pleaseLogin', {
          action: t('homePage.newThread').toLowerCase(),
        })
      );
      return;
    }

    setIsAddingThread(true);
    createThread({ title, body, category })
      .then(() => {
        setShowThreadInput(false);
        toast.success(t('homePage.threadCreated'));
      })
      .finally(() => {
        setIsAddingThread(false);
      });
  };

  const onToggleThreadInput = () => {
    if (!authUser) {
      toast.error(
        t('common.pleaseLogin', {
          action: t('homePage.newThread').toLowerCase(),
        })
      );
      return;
    }
    setShowThreadInput(!showThreadInput);
  };

  return (
    <PageTransition>
      <div className=" bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {t('homePage.discussions')}
                </h1>
                {authUser ? (
                  !showThreadInput && (
                    <button
                      type="button"
                      onClick={onToggleThreadInput}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>{t('homePage.newThread')}</span>
                    </button>
                  )
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <span>{t('homePage.loginToPost')}</span>
                  </Link>
                )}
              </div>

              <AnimatePresence>
                {showThreadInput && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <ThreadInput
                      addThread={onAddThread}
                      onCancel={() => setShowThreadInput(false)}
                      loading={isAddingThread}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {categories.length > 0 && (
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              )}

              {threads.length === 0 ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <ThreadItemSkeleton key={i} />
                  ))}
                </div>
              ) : filteredThreads.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    {selectedCategory
                      ? t('common.noThreadsInCategory')
                      : t('common.noThreads')}
                  </p>
                </div>
              ) : (
                <ThreadsList threads={filteredThreads} />
              )}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-20">
                <Sidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default HomePage;

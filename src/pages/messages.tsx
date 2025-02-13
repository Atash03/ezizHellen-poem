import PageLayout from '@/components/layout/page-layout';
import CommentCard from '@/components/shared/comment-card';
import MobCommentModal from '@/components/shared/mob-comment-modal';
import Pagination from '@/components/shared/pagination';
import PopupComment from '@/components/shared/popup-comment';
import PopupMessage from '@/components/shared/popup-message';

import { Button } from '@/components/ui/button';
import { scrollTop } from '@/lib/utils';
import { useGetComments } from '@/query/use-get-comments';
import { useGetStatic } from '@/query/use-get-static-words';
import { useAuthStore } from '@/store/useAuthStore';
import { useCommentsStore } from '@/store/useComments';
import { useLoginStore } from '@/store/useLogin';
import { usePopupStore } from '@/store/usePopup';
import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const Messages = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  scrollTop(currentPage);

  const [mobComment, setMobComment] = useState(false);
  const desktop = useMediaQuery('(min-width: 768px)');

  const commentSuccess = useCommentsStore((state) => state.commentSucces);
  const setCommentSuccess = useCommentsStore((state) => state.setCommentSuccess);

  const { data, isLoading } = useGetComments();

  const setMode = usePopupStore((state) => state.setMode);
  const setLoginMob = useLoginStore((state) => state.setMobActive);
  const setDeskActive = useLoginStore((state) => state.setActive);

  const commentOpen = useCommentsStore((state) => state.commentOpen);
  const setCommentOpen = useCommentsStore((state) => state.setCommentOpen);

  const perPage = 6;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const displayedData = useMemo(() => {
    return data ? data.slice((currentPage - 1) * perPage, currentPage * perPage) : [];
  }, [data, currentPage]);

  const accessToken = useAuthStore((state) => state.accessToken);

  const handleDesktopComment = () => {
    if (accessToken) {
      setMode('comment');
      setCommentOpen(true);
    } else {
      setDeskActive(true);
      setMode('login');
    }
  };

  const handleMobileComment = () => {
    if (accessToken) {
      setMobComment(true);
    } else {
      setLoginMob(true);
    }
  };

  const onComment = () => (desktop ? handleDesktopComment() : handleMobileComment());

  const { data: staticData } = useGetStatic(11, 'messagesData');

  return (
    <>
      <AnimatePresence>
        {commentOpen && <PopupComment active={commentOpen} setActive={setCommentOpen} />}
        {commentSuccess && (
          <PopupMessage
            active={commentSuccess}
            title={staticData?.[3]?.word}
            text={staticData?.[4]?.word}
            setActive={setCommentSuccess}
          />
        )}
        {mobComment && <MobCommentModal setActive={setMobComment} />}
      </AnimatePresence>

      <PageLayout
        loading={isLoading}
        title={staticData?.[0]?.word}
        // messagesText="Hormatly muşdaklar!"
        text={staticData?.[1]?.word}
        className="gap-12">
        <div className="">
          <div className="mx-auto w-[892px] flex flex-col gap-6">
            {displayedData?.map((item, i) => (
              <CommentCard key={i} {...item} />
            ))}
          </div>

          {data && data?.length > 10 && (
            <Pagination
              perPage={perPage}
              currentPage={currentPage}
              totalPages={data?.length || 0}
              onChangePage={handlePageChange}
              className="mt-8"
            />
          )}

          <div className="flex justify-center">
            <Button onClick={onComment} className="px-6 mt-16">
              {staticData?.[2]?.word}
            </Button>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Messages;
